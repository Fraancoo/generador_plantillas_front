import TipoResultado from "./tipo_resultado.interface";

export default interface Plantilla {
  idPlantilla: number;
  nombrePlantilla: string;
  version: string;
  imprimible: boolean;
  secciones: Seccion[];
}

export interface Seccion {
  idSeccion: number;
  nombreSeccion: string;
  campos: Campo[];
  camposProps: CampoProps[];
}

export interface Campo {
  idCampo: number;
  nombreCampo: string;
  obligatorio: boolean;
  tipoResultado: TipoResultado;
}

export interface CampoProps {
  index: number;
  idCampo: number;
  obligatorio: boolean;
}
