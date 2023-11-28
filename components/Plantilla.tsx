import { useEffect, useState } from "react";

import PlantillaI, {
  Campo,
  CampoProps,
  Seccion,
} from "@/interfaces/plantilla.interface";
import TipoResultado from "@/interfaces/tipo_resultado.interface";

import styles from "@/styles/plantilla.module.css";

export default function Plantilla({
  data,
  setData,
  tiposResultado,
}: {
  data: PlantillaI;
  setData: Function;
  tiposResultado: TipoResultado[];
}) {
  const [plantilla, setPlantilla] = useState<PlantillaI>(data);

  useEffect(() => {
    setData(plantilla);
  }, [plantilla]);

  const setPlantillaData = (key: keyof Object, value: any) => {
    const p = plantilla;
    p[key] = value;
    setPlantilla({ ...p });
  };

  const addSeccion = () => {
    const p = plantilla;
    p.secciones.push({
      idSeccion: p.secciones.length + 1,
      nombreSeccion: "",
      campos: [] as Campo[],
      camposProps: [] as CampoProps[],
    } as Seccion);
    setPlantilla({ ...p });
  };

  const deleteSeccion = (i_secc: number) => {
    const p = plantilla;
    p.secciones.splice(i_secc, 1);
    setPlantilla({ ...p });
  };

  const setSeccionData = (i_secc: number, key: keyof Object, value: any) => {
    const p = plantilla;
    p.secciones[i_secc][key] = value;
    setPlantilla({ ...p });
  };

  const addCampo = (i_secc: number) => {
    const p = plantilla,
      campo = {
        idCampo: p.secciones[i_secc].campos.length + 1,
        nombreCampo: "",
        obligatorio: false,
        tipoResultado: tiposResultado[0]
          ? tiposResultado[0]
          : ({} as TipoResultado),
      } as Campo;

    p.secciones[i_secc].campos.push(campo);

    p.secciones[i_secc].camposProps.push({
      index: p.secciones[i_secc].campos.length - 1,
      idCampo: campo.idCampo,
      obligatorio: campo.obligatorio,
    } as CampoProps);

    setPlantilla({ ...p });
  };

  const deleteCampo = (i_secc: number, i_camp: number) => {
    const p = plantilla;
    p.secciones[i_secc].campos.splice(i_camp, 1);
    setPlantilla({ ...p });
  };

  const setCampoData = (
    i_secc: number,
    i_camp: number,
    key: keyof Object,
    value: any
  ) => {
    const p = plantilla;
    p.secciones[i_secc].campos[i_camp][key] = value;
    setPlantilla({ ...p });
  };

  const setCampoObligatorio = (
    i_secc: number,
    i_camp: number,
    status: boolean
  ) => {
    const p = plantilla;
    p.secciones[i_secc].campos[i_camp].obligatorio = status;
    p.secciones[i_secc].camposProps[i_camp].obligatorio = status;
    setPlantilla({ ...p });
  };

  const setTipoResultado = (
    i_secc: number,
    i_camp: number,
    idTipoResultado: string
  ) => {
    const p = plantilla,
      tipoResultado = tiposResultado.find(
        (tr) => tr.idTipoResultado === idTipoResultado
      );

    if (tipoResultado !== undefined) {
      p.secciones[i_secc].campos[i_camp].tipoResultado = tipoResultado;
    } else {
      p.secciones[i_secc].campos[i_camp].tipoResultado = {} as TipoResultado;
    }

    setPlantilla({ ...p });
  };

  return (
    <form
      className={styles.plantilla}
      onSubmit={(e: any) => e.preventDefault()}
    >
      <div className="div_input">
        <label htmlFor="nombrePlantilla">Nombre de la plantilla:</label>
        <input
          id="nombrePlantilla"
          name="nombrePlantilla"
          type="text"
          value={plantilla.nombrePlantilla}
          onChange={(e: any) => setPlantillaData(e.target.name, e.target.value)}
        />
      </div>
      <div className="div_input">
        <label htmlFor="version">Versión de la plantilla:</label>
        <input
          id="version"
          name="version"
          type="text"
          value={plantilla.version}
          onChange={(e: any) => setPlantillaData(e.target.name, e.target.value)}
        />
      </div>
      <div className="div_checkbox">
        <label htmlFor="imprimible">
          <span>Plantilla imprimible:</span>
          <input
            id="imprimible"
            name="imprimible"
            type="checkbox"
            checked={plantilla.imprimible}
            onChange={(e: any) =>
              setPlantillaData(e.target.name, e.target.checked)
            }
          />
        </label>
      </div>
      <div className="div_secciones">
        <div className="div_subtitle">
          <h2 className="subtitle">
            Secciones ({plantilla.secciones.length} secciones)
          </h2>
        </div>
        {plantilla.secciones.map((s, i_secc) => (
          <div key={`secc_${i_secc}`} className="div_seccion">
            <div className="div_close">
              <span className="close" onClick={() => deleteSeccion(i_secc)}>
                ✘
              </span>
            </div>
            <div className="div_input">
              <label htmlFor="nombreSeccion">
                Nombre de la sección {i_secc + 1}
              </label>
              <input
                id="nombreSeccion"
                name="nombreSeccion"
                type="text"
                value={s.nombreSeccion}
                onChange={(e: any) =>
                  setSeccionData(i_secc, e.target.name, e.target.value)
                }
              />
            </div>
            <div className="div_campos">
              <div className="div_subtitle">
                <h2 className="subtitle">
                  Campos ({plantilla.secciones[i_secc].campos.length} campos)
                </h2>
              </div>
              {s.campos.map((c, i_camp) => (
                <div
                  key={`secc_${i_secc}_camp_${i_camp}`}
                  className="div_campo"
                >
                  <div className="div_close">
                    <span
                      className="close"
                      onClick={() => deleteCampo(i_secc, i_camp)}
                    >
                      ✘
                    </span>
                  </div>
                  <div className="div_input">
                    <label htmlFor="nombreCampo">
                      Nombre del campo {i_camp + 1}
                    </label>
                    <input
                      id="nombreCampo"
                      name="nombreCampo"
                      type="text"
                      value={c.nombreCampo}
                      onChange={(e: any) =>
                        setCampoData(
                          i_secc,
                          i_camp,
                          e.target.name,
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="div_select">
                    <label>Tipo de resultado</label>
                    <select
                      name="idTipoResultado"
                      value={c.tipoResultado.idTipoResultado}
                      onChange={(e: any) =>
                        setTipoResultado(i_secc, i_camp, e.target.value)
                      }
                    >
                      <option value="">- - -</option>
                      {tiposResultado.map((tr: TipoResultado, i_tr: number) => (
                        <option
                          key={`secc_${i_secc}_camp_${i_camp}_tr_${i_tr}`}
                          value={tr.idTipoResultado}
                        >
                          {tr.nombreTipoResultado}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
            <div className="div_btn">
              <button
                className="btn btn-green"
                onClick={() => addCampo(i_secc)}
              >
                Agregar campo
              </button>
            </div>
          </div>
        ))}
        <div className="div_btn">
          <button className="btn btn-blue" onClick={addSeccion}>
            Agregar sección
          </button>
        </div>
      </div>
    </form>
  );
}
