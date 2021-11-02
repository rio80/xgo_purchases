import 'tailwindcss/tailwind.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Head } from 'next/document';
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  <Head>
    <title>Payment - XGO</title>
    <link rel="icon" href={'../png/logo.png'} />
  </Head>

  return <Component {...pageProps} />
}

export default MyApp
