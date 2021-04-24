import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@/styles/Layout.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Showcase from "@/components/Showcase";

export default function Layout({ children, title, description, keywords }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {router.pathname === "/" && <Showcase />}
      <main className={styles.container}>{children}</main>

      <Footer />
    </div>
  );
}
Layout.defaultProps = {
  title: "Dj Events | Find the hottest parties",
  description: "Find the lastest Dj and other musical events",
  keywords: "music, dj, edm, events",
};
