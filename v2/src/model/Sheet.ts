import {FormEntry} from "./FormEntry"

export type  SheetSchema = Array<FormEntry>

export interface Sheet { 
  name: string,
  schema: SheetSchema
}
