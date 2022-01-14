import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import Card from '../components/Card'
import Head from 'next/head'
import { getPizzas } from '../services/pizza'
import ErrorPage from '../components/ErrorPage'

export default function Home({ pizzas }) {

  console.log("Index pizzas:", pizzas);

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

  const data = await getPizzas().then(pizza => pizza);

  if (data) {
    return {
      props: {
        pizzas: data
      }
    }
  }

  return {
    props: {
      pizzas: null
    }
  }
}
