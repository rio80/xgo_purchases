import Document, { Head, Html, Main, NextScript } from 'next/document';
import * as React from 'react';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <title>Payment - XGO</title>
                    <link rel="icon" href={'../png/logo.png'} />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

MyDocument.getInitialProps = async ctx => {
    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
    };
};
