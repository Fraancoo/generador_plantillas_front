import { NextApiRequest, NextApiResponse } from "next";

import Plantilla from "@/interfaces/plantilla.interface";

export default async function getFormulario(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const plantilla: Plantilla = req.body;

    const resp = await fetch(process.env.API_URL + "formulario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plantilla),
    });

    if (resp.status === 200) {
      const { data } = await resp.json();
      console.log(data);
      res.status(200).json(data);
    } else {
      const err = await resp.json();
      res.status(resp.status).json(err);
    }
  } else {
    res.status(200).json({ message: "api/formulario works!" });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
