import Head from "../components/Head_c";
import Header from "../components/Header";
import "../styles/globals.css";
import dynamic from "next/dynamic";
import Footer from "../components/Footer";

const Navbar = dynamic(() => import("../components/Header"), { ssr: false });

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head />
      <Navbar />
      <div className="pt-24">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}

export default MyApp;
