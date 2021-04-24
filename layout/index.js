import Head from "next/head";
import styles from "@/styles/Layout.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout({ children, title, description, keywords }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
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
