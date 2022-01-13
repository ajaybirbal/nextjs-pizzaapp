import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import Card from '../components/Card'
import Head from 'next/head'

export default function Home({pizzas}) {

  return (
    <>
      <Head>
        <title>Tasty Pizza - Order online</title>
      </Head>
      <Layout>
        <h1>Our Pizzas: </h1>
        <div className={styles.cardContainer}>
          {pizzas.map(pizza => <Card pizza={pizza} key={pizza.id}/>)}
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {

  const baseUrl = "http://localhost:3004/";

  const data = await axios.get(`${baseUrl}pizza`)

  return {
    props:{
      pizzas: data.data
    }
  }
}
