import { PlantillaFormulario } from "@/interfaces/plantilla.interface";
import { useEffect, useState } from "react";

export default function Formulario({ data }: { data: PlantillaFormulario }) {
  const [formulario, setFormulario] = useState<any>();

  useEffect(() => {
    if (data) requestFormulario();
  }, [data]);

  const requestFormulario = async () => {
    try {
      const res = await fetch(process.env.API_URL + "formulario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
      }
    } catch (error: any) {}
  };

  return <div>Hola</div>;
}
