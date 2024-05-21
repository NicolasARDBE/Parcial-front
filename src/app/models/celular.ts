import { Gama } from "../enum/gama.enum";
import { SistemaOperativo } from "../enum/sistema-operativo.enum";

export class Celular {
    constructor(
        public id?: number | null,
        public marca?: string | null,
        public serial?: number | null,
        public fechaCompra?: Date | null,
        public anioLanzamiento?: Date | null,
        public precio?: number | null,
        public os?: SistemaOperativo | null, 
        public gama?: Gama | null
      ){}
}