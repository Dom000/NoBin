import Head from "../components/Head_c";
import Header from "../components/Header";
import "../styles/globals.css";
import dynamic from "next/dynamic";
import Footer from "../components/Footer";
import { store } from "../features/store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
const Navbar = dynamic(() => import("../components/Header"), { ssr: false });

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <div>
          <Head />
          <Navbar />
          <div className="pt-24">
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </SnackbarProvider>
    </Provider>
  );
}

export default MyApp;
