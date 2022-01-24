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
                <div className="wrapper-gbl">
                    <h3>Something is wrong. Please try again later.</h3>
                </div>
            </Layout>
        </>
    )
}

export default ErrorPage
