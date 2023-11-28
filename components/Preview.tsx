import { useEffect, useRef } from "react";

import PlantillaI, {
  Campo,
  CampoProps,
  Seccion,
} from "@/interfaces/plantilla.interface";

import styles from "@/styles/preview.module.css";

export default function Preview({ data }: { data: PlantillaI }) {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const pre = preRef.current;

    if (pre) {
      pre.innerText = "{\n";
      pre.innerText += setPlantillaData();
      pre.innerText += "}";
    }
  }, [data]);

  const setPlantillaData = () => {
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
          res += `${seccs.length > 0 ? setSeccionesData(value) : "[]"}`;
          break;

        default:
          res += "null";
          break;
      }

      res += `,\n`;
    });
    return res;
  };

  const setSeccionesData = (seccs: Seccion[]) => {
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
              if (s === "campos") res += setCampos(arr);
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

  const setCampos = (camps: Campo[]) => {
    var res = `[`;

    camps.map((c, i_camp) => {
      res += `${c.idCampo}`;
      if (i_camp + 1 !== camps.length) res += ", ";
    });

    res += `]`;
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

  return <pre ref={preRef} className={styles.content}></pre>;
}
