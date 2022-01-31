import Layout from "../../components/Layout";
import { getPizzas, getSinglePizza } from "../../services/pizza";
import Image from 'next/image'
import styles from "./../../styles/SinglePizza.module.css"
import AddToCartButton from './../../components/AddToCartButton'
import Link from "next/link";
import Head from "next/head";
import ErrorPage from "../../components/ErrorPage";
import { useRouter } from "next/router";

//Loading of the data during the build time
import pizzasData from "../../pizzaMenu";

const Pizza = ({ pizza }) => {

    const router = useRouter();

    if (router.isFallback) {
        return(
            <Layout>
                <h1>Please wait...</h1>
            </Layout>
        )
    }

    //If pizza failed to load
    if (pizza === null) {
        return <ErrorPage />
    }

    return (
        <div>
            <Head>
                <title>Order {pizza.name} online!</title>
            </Head>
            <Layout>
                <div className={`wrapper-gbl ${styles.wrapper}`}>
                    <div className={styles.imageContainer}>
                        <Image
                            src={`/${pizza.imageUrl}`}
                            layout="responsive"
                            width="100%"
                            height="100%"
                            alt={pizza.name}
                        />
                    </div>
                    <div className={styles.infoContainer}>
                        <h1>{pizza.name}</h1>
                        <p>{pizza.description}</p>
                        <h2>Rs. {pizza.price}</h2>
                        <AddToCartButton id={pizza.id} size="big" />
                        <Link href='\'>
                            <a><u><h5 className="">Go Back</h5></u></a>
                        </Link>
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export const getStaticPaths = async () => {
    let pizzas = await getPizzas().then(pizza => pizza);

    //Build time loading of all pizzas becausse API won't be available by then
    if (pizzas === undefined) {
        pizzas = pizzasData['pizza']
    }

    const paths = pizzas.map(pizza => {
        return {
            params: { id: pizza.id.toString() },
        }
    })

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps = async ({ params }) => {
    
    let data = await getSinglePizza(params.id).then(pizza => pizza);

    //---Build time loading of all pizzas becausse API won't be available until full build
    if(data === undefined){
        let tempPizzas = pizzasData['pizza']
        data = tempPizzas.filter(pizza => pizza.id === Number(params.id))[0]   
    }

    if (!data) {
        return {
            props: {
                pizza: null
            },
        }
    }

    return {
        props: {
            pizza: data
        },
        revalidate: 10,
    }
}


export default Pizza;