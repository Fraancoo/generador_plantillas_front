import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { ReactNode } from "react";

import styles from "@/styles/layout.module.css";

export default function Layout({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <>
      <Head>
        <title>{title ? title : "Generador de plantillas"}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.webp" />
      </Head>
      <header className={styles.div_title}>
        <Link href="/">
          <h1 className={styles.title}>Generador de plantillas</h1>
        </Link>
      </header>
      <main className={styles.container}>{children}</main>
      <Script
        src={process.env.API_URL + "formulario/script"}
        strategy="lazyOnload"
      />
    </>
  );
}
