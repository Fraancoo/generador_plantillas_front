import { useEffect, useState } from "react";

import PlantillaI, { Seccion } from "@/interfaces/plantilla.interface";

import styles from "@/styles/crear_documento.module.css";

import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import Preview from "@/components/Preview";

export default function CrearDocumento() {
  const [plantilla, setPlantilla] = useState({} as PlantillaI);

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
    <Layout>
      {plantilla.idPlantilla ? (
        <div className={styles.container}>
          <div className={styles.div_preview}>
            <Preview data={plantilla} showSave={false} />
          </div>
          <div className={styles.div_formulario}></div>
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
}
