import { NextApiRequest, NextApiResponse } from "next";

import Plantilla from "@/interfaces/plantilla.interface";

export default function getFormulario(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const plantilla = req.body;
  const form = generateForm(plantilla);

  console.log(form);

  res.status(200).json({
    statusCode: 200,
    message: "Todo bien (y)",
  });
}

function generateForm(plantilla: Plantilla) {
  return "Formulario";
}
