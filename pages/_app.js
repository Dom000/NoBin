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
  const Layout = Component.Layout || EmptyLayout;

  return (
    <Provider store={store}>
      <Head />
      <Navbar />{" "}
      <div className="pt-24">
        <Layout>
          <SnackbarProvider maxSnack={3}>
            <div>
              <Component {...pageProps} />
            </div>
          </SnackbarProvider>
        </Layout>
        <Footer />{" "}
      </div>
    </Provider>
  );
}

export default MyApp;
const EmptyLayout = ({ children }) => <>{children}</>;
