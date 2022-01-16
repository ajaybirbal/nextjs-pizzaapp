import Head from 'next/head'
import React from 'react'
import Layout from './Layout'

function ErrorPage() {
    return (
        <>
            <Head>
                <title>Tasty Pizza - Order online</title>
            </Head>
            <Layout>
                <h3>Something is wrong. Please try again later.</h3>
            </Layout>
        </>
    )
}

export default ErrorPage
