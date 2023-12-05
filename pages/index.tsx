import Link from "next/link";
import { useMemo } from "react";

import styles from "@/styles/home.module.css";

import Layout from "@/components/Layout";

export default function Home() {
  const menu = useMemo(
    () => [
      {
        href: "generar-formulario",
        name: "Generar formulario",
      },
      {
        href: "crear-documento",
        name: "Crear documento",
      },
    ],
    []
  );

  return (
    <Layout title="Generador de plantillas">
      <div className={styles.container}>
        <div className={styles.menu}>
          {menu.map((item) => (
            <Link href={"/" + item.href} key={item.name}>
              <div className={styles.item}>{item.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
