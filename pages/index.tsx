import { useState } from "react";
import Layout from "../components/Layout";

import PlantillaI, { Seccion } from "../interfaces/plantilla.interface";
import TipoResultado from "../interfaces/tipo_resultado.interface";

import styles from "@/styles/home.module.css";

import Plantilla from "@/components/Plantilla";
import Preview from "@/components/Preview";
import Formulario from "@/components/Formulario";

export default function Home({
  tiposResultado,
}: {
  tiposResultado: TipoResultado[];
}) {
  const [plantilla, setPlantilla] = useState<PlantillaI>({
    idPlantilla: 1,
    nombrePlantilla: "",
    version: "1.0.0",
    imprimible: true,
    secciones: [] as Seccion[],
  } as PlantillaI);

  return (
    <Layout title="Generador de plantillas">
      <div className={styles.container}>
        <div className={styles.div_title}>
          <h1 className={styles.title}>Generador de plantillas</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.div_plantilla}>
            <Plantilla
              data={plantilla}
              setData={(p: PlantillaI) => setPlantilla({ ...p })}
              tiposResultado={tiposResultado}
            />
          </div>
          <div className={styles.div_preview}>
            <Preview data={plantilla} />
          </div>
          <div className={styles.div_form}>
            <Formulario data={plantilla} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  var tiposResultado = [] as TipoResultado[];

  try {
    const res = await fetch(process.env.API_URL + "tipos-resultado");

    if (res.status === 200) {
      const { data } = await res.json();
      tiposResultado = data;
    }
  } catch (error: any) {
    tiposResultado = [] as TipoResultado[];
  }

  return { props: { tiposResultado } };
}
