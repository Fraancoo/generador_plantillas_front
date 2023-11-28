import { NextApiRequest, NextApiResponse } from "next";

import TipoResultado from "../../interfaces/tipo_resultado.interface";

export default function getTiposResultado(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const tiposResultado = mockupTiposResultado();

    if (tiposResultado.length > 0) {
      res.status(200).json({
        statusCode: 200,
        data: tiposResultado,
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        message: "No se encontraron tipos de resultado",
      });
    }
  } catch (error: any) {
    res.status(401).json({
      statusCode: 401,
      message: error,
    });
  }
}

function mockupTiposResultado(): TipoResultado[] {
  return [
    {
      idTipoResultado: "number",
      nombreTipoResultado: "Numérico",
    },
    {
      idTipoResultado: "log",
      nombreTipoResultado: "Lógico",
    },
    {
      idTipoResultado: "text",
      nombreTipoResultado: "Texto",
    },
    {
      idTipoResultado: "rich_text",
      nombreTipoResultado: "Texto enriquecido",
    },
  ] as TipoResultado[];
}
