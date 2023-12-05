import { useEffect, useState } from "react";

import PlantillaI, { Seccion } from "@/interfaces/plantilla.interface";
import TipoResultado from "@/interfaces/tipo_resultado.interface";

import styles from "@/styles/generar_formulario.module.css";

import Formulario from "@/components/Formulario";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import Plantilla from "@/components/Plantilla";
import Preview from "@/components/Preview";

export default function GenerarFormulario({
  tiposResultado,
}: {
  tiposResultado: TipoResultado[];
}) {
  const [plantilla, setPlantilla] = useState<PlantillaI>({} as PlantillaI);

  useEffect(() => {
    const storage: PlantillaI = JSON.parse(
      localStorage.getItem("plantilla") as string
    );

    if (storage) {
      setPlantilla(storage);
    } else {
      setPlantilla({
        idPlantilla: 1,
        nombrePlantilla: "",
        version: "1.0.0",
        imprimible: true,
        secciones: [] as Seccion[],
      } as PlantillaI);
    }
  }, []);

  return (
    <Layout title="Generador de plantillas">
      {plantilla.idPlantilla ? (
        <div className={styles.container}>
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
            <Formulario plantilla={plantilla} />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  var tiposResultado = [] as TipoResultado[];

  try {
    const res = await fetch(process.env.SELF_URL + "tipos-resultado");

    if (res.status === 200) {
      const { data } = await res.json();
      tiposResultado = data;
    }
  } catch (error: any) {
    tiposResultado = [] as TipoResultado[];
  }

  return { props: { tiposResultado } };
}
