import { NextApiRequest, NextApiResponse } from "next";

export default function Send(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const respuestas = req.body;

    console.log(respuestas);

    res.status(200).json({
      statusCode: 200,
      message: "Datos enviados correctamente",
    });
  } else {
    res.status(200).json({
      statusCode: 200,
      message: "API para enviar los datos del formulario",
    });
  }
}
