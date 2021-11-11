import 'tailwindcss/tailwind.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Head } from 'next/document';
config.autoAddCss = false;
import NextNProgress from 'nextjs-progressbar';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../store/index'

const store = createStore(reducer);

function MyApp({ Component, pageProps }) {

  <Head>
    <title>Payment - XGO</title>
    <link rel="icon" href={'../png/logo.png'} />
  </Head>

  return (
    <>
      <Provider store={store}>
        <NextNProgress />
        <Component {...pageProps} />
      </Provider>

    </>
  )
}

export default MyApp
