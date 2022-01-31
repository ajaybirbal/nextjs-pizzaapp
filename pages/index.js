import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import Card from '../components/Card'
import Head from 'next/head'
import { getPizzas } from '../services/pizza'
import ErrorPage from '../components/ErrorPage'

//pizzas for buildtime data
import  pizzasData  from './../pizzaMenu'

export default function Home({ pizzas }) {

  if (pizzas === null) {
    return <ErrorPage />
  }

  return (
    <>
      <Head>
        <title>Tasty Pizza - Order online</title>
      </Head>
      <Layout>
        <h1>Our Pizza Range: </h1>
        <div className={styles.cardContainer}>
          {pizzas.map(pizza => <Card pizza={pizza} key={pizza.id} />)}
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  let data = await getPizzas().then(pizza => pizza);

  //For the build time handling of data because api is not loaded during the build time
  if (data === undefined || data === null) {
    data = pizzasData['pizza'];
  }

  if (data) {
    return {
      props: {
        pizzas: data
      },
      revalidate: 45,
    }
  }

  return {
    props: {
      pizzas: null
    }
  }
}
