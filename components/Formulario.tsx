import { useEffect, useRef, useState } from "react";

import PlantillaI from "@/interfaces/plantilla.interface";

export default function Formulario({ plantilla }: { plantilla: PlantillaI }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formulario, setFormulario] = useState("");

  useEffect(() => {
    if (plantilla.idPlantilla) requestFormulario();
  }, [plantilla]);

  const requestFormulario = async () => {
    try {
      const res = await fetch(process.env.SELF_URL + "formulario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plantilla),
      });

      if (res.ok) {
        const { data } = await res.json();
        setFormulario(data);
      } else {
        const err = await res.json();
        console.log(err);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (formulario) {
      const form = formRef.current as HTMLFormElement;
      form.innerHTML = formulario;
    }
  }, [formulario]);

  const sendForm = (e: any) => {
    e.preventDefault();
  };

  return (
    <form ref={formRef} onSubmit={sendForm} style={{ padding: "15px" }}></form>
  );
}
