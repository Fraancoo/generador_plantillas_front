import TipoResultado from "./tipo_resultado.interface";

export default interface Plantilla {
  idPlantilla: number;
  nombrePlantilla: string;
  version: string;
  imprimible: boolean;
  secciones: Seccion[];
  resultados?: SeccionResultado[];
}

export interface PlantillaFormulario extends Omit<Plantilla, "secciones"> {
  secciones: SeccionFormulario[];
}

export interface Seccion {
  idSeccion: number;
  nombreSeccion: string;
  campos: Campo[];
  camposProps: CampoProps[];
}

export interface SeccionFormulario extends Omit<Seccion, "campos"> {
  campos: number[];
}

export interface Campo {
  idCampo: number;
  nombreCampo: string;
  tipoResultado: TipoResultado;
}

export interface CampoProps {
  index: number;
  idCampo: number;
  obligatorio: boolean;
}

export interface SeccionResultado {
  idSeccion: number;
  campos: CampoResultado[];
}

export interface CampoResultado {
  idCampo: number;
  valor?: string | number;
}
