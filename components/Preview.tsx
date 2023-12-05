import { useEffect, useRef } from "react";

import PlantillaI, {
  Campo,
  CampoProps,
  Seccion,
} from "@/interfaces/plantilla.interface";
import TipoResultado from "@/interfaces/tipo_resultado.interface";

import styles from "@/styles/preview.module.css";

import CopyIcon from "./CopyIcon";

export default function Preview({
  data,
  showSave,
  showGen,
}: {
  data: PlantillaI;
  showSave?: boolean;
  showGen?: boolean;
}) {
  const saveRef = useRef<HTMLPreElement>(null),
    genRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const save = saveRef.current,
      gen = genRef.current;

    if (save) {
      save.innerText = "{\n";
      save.innerText += setSavePlantilla();
      save.innerText += "}";
    }

    if (gen) {
      gen.innerText = "{\n";
      gen.innerText += setGeneratePlantilla();
      gen.innerText += "}";
      localStorage.setItem("plantilla", JSON.stringify(data));
    }
  }, [data]);

  const setSavePlantilla = () => {
    var res = "";
    Object.keys(data).map((p) => {
      const value = data[p as keyof Object];
      res += `  ${p}: `;

      switch (typeof value) {
        case "number":
        case "boolean":
          res += `${value}`;
          break;

        case "string":
          res += `${value != "" ? `'${value}'` : "''"}`;
          break;

        case "object":
          const seccs = value as Array<any>;
          res += `${seccs.length > 0 ? setSaveSeccion(value) : "[]"}`;
          break;

        default:
          res += "null";
          break;
      }

      res += `,\n`;
    });
    return res;
  };

  const setGeneratePlantilla = () => {
    var res = "";
    Object.keys(data).map((p) => {
      const value = data[p as keyof Object];
      res += `  ${p}: `;

      switch (typeof value) {
        case "number":
        case "boolean":
          res += `${value}`;
          break;

        case "string":
          res += `${value != "" ? `'${value}'` : "''"}`;
          break;

        case "object":
          const seccs = value as Array<any>;
          res += `${seccs.length > 0 ? setGenerateSeccion(value) : "[]"}`;
          break;

        default:
          res += "null";
          break;
      }

      res += `,\n`;
    });
    return res;
  };

  const setSaveSeccion = (seccs: Seccion[]) => {
    var res = "[\n";

    for (const secc of seccs) {
      res += `    {\n`;
      Object.keys(secc).map((s) => {
        const value = secc[s as keyof Object];
        res += `      ${s}: `;

        switch (typeof value) {
          case "number":
            res += `${value}`;
            break;

          case "string":
            res += `${value !== "" ? `'${value}'` : "''"}`;
            break;

          case "object":
            const arr = value as Array<any>;
            if (arr.length > 0) {
              if (s === "campos") res += setSaveCampos(arr);
              else if (s === "camposProps") res += setCamposProps(arr);
            } else res += "[]";
            break;

          default:
            res += "null";
            break;
        }

        res += `,\n`;
      });
      res += `    },\n`;
    }

    res += "  ]";
    return res;
  };

  const setGenerateSeccion = (seccs: Seccion[]) => {
    var res = "[\n";

    for (const secc of seccs) {
      res += `    {\n`;
      Object.keys(secc).map((s) => {
        const value = secc[s as keyof Object];
        res += `      ${s}: `;

        switch (typeof value) {
          case "number":
            res += `${value}`;
            break;

          case "string":
            res += `${value !== "" ? `'${value}'` : "''"}`;
            break;

          case "object":
            const arr = value as Array<any>;
            if (arr.length > 0) {
              if (s === "campos") res += setGenerateCampos(arr);
              else if (s === "camposProps") res += setCamposProps(arr);
            } else res += "[]";
            break;

          default:
            res += "null";
            break;
        }

        res += `,\n`;
      });
      res += `    },\n`;
    }

    res += "  ]";
    return res;
  };

  const setSaveCampos = (camps: Campo[]) => {
    var res = `[`;

    camps.map((c, i_camp) => {
      res += `${c.idCampo}`;
      if (i_camp + 1 !== camps.length) res += ", ";
    });

    res += `]`;
    return res;
  };

  const setGenerateCampos = (camps: Campo[]) => {
    var res = `[\n`;

    for (const camp of camps) {
      res += `        {\n`;

      Object.keys(camp).map((c) => {
        const value: any = camp[c as keyof Object];
        res += `          ${c}: `;

        switch (typeof value) {
          case "number":
            res += `${value}`;
            break;

          case "string":
            res += `${value !== "" ? `'${value}'` : "''"}`;
            break;

          case "object":
            res += value.idTipoResultado ? setTipoResultado(value) : "{}";
            break;

          default:
            res += "null";
            break;
        }

        res += `,\n`;
      });

      res += `        },\n`;
    }

    res += `      ]`;
    return res;
  };

  const setCamposProps = (camps: CampoProps[]) => {
    var res = "[\n";

    for (const camp of camps) {
      res += "        {\n";
      Object.keys(camp).map((c) => {
        const value = camp[c as keyof Object];
        res += `          ${c}: ${value},\n`;
      });
      res += "        },\n";
    }

    res += "      ]";
    return res;
  };

  const setTipoResultado = (tipoResultado: TipoResultado) => {
    var res = "{\n";

    Object.keys(tipoResultado).map((tr) => {
      const value = tipoResultado[tr as keyof Object];
      res += `            ${tr}: ${value},\n`;
    });

    res += "          }";
    return res;
  };

  const copySave = () => {
    const save = saveRef.current as HTMLPreElement;
    if (save) navigator.clipboard.writeText(save.innerText);
  };

  const copyGen = () => {
    const gen = genRef.current as HTMLPreElement;
    if (gen) navigator.clipboard.writeText(gen.innerText);
  };

  return (
    <div className={styles.container}>
      {(showSave === undefined || showSave) && (
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.subtitle}>Guardar plantilla</h2>
            <CopyIcon hover={"var(--bold-blue)"} onClick={copySave} />
          </div>
          <div className={styles.div_pre}>
            <pre ref={saveRef} className={styles.pre}></pre>
          </div>
        </div>
      )}
      {(showGen === undefined || showGen) && (
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.subtitle}>Generar formulario</h2>
            <CopyIcon hover={"var(--bold-blue)"} onClick={copyGen} />
          </div>
          <div className={styles.div_pre}>
            <pre ref={genRef} className={styles.pre}></pre>
          </div>
        </div>
      )}
    </div>
  );
}
