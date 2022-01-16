import Layout from "../../components/Layout";
import { getPizzas, getSinglePizza } from "../../services/pizza";
import Image from 'next/image'
import styles from "./../../styles/SinglePizza.module.css"
import AddToCartButton from './../../components/AddToCartButton'
import Link from "next/link";
import Head from "next/head";
import ErrorPage from "../../components/ErrorPage";
import { useRouter } from "next/router";

const Pizza = ({ pizza }) => {

    const router = useRouter();

    if (router.isFallback) {
        return(
            <Layout>
                <h1>Please wait...</h1>
            </Layout>
        )
    }

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
    const pizzas = await getPizzas().then(pizza => pizza);
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
    const data = await getSinglePizza(params.id).then(pizza => pizza);

    if (!data) {
        return {
            props: {
                pizza: null
            },
            revalidate: 10,
        }
    }

    return {
        props: {
            pizza: data
        }
    }
}


export default Pizza;