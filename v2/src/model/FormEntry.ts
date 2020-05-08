export interface Pair {
  value: string,
  label: string
}

export interface BaseEntry {
  type: string,
  id: string,
  label?: string,
  /* Default to yes */
  required?: boolean,
  relavent?: string // /\${([^{]+)}/g (parseing template literal format)
}

export interface BaseQuestion extends BaseEntry {   
  question: string,
}

export interface Text extends BaseQuestion {
  type: "text",
  params: string
}

export interface Note extends BaseQuestion {
  type: "note",
}

export interface Decimal extends BaseQuestion {
  type: "decimal",
  params: string
}

export interface SelectOne extends BaseQuestion { 
  type: "select_one",
  params: Array<Pair>
}

export interface SelectOneMatrix extends BaseQuestion { 
  type: "select_one_matrix",
  params: Array<Pair>,
  subQuestions: Array<Pair>
}

export interface SelectMultiple extends BaseQuestion { 
  type: "select_multiple",
  params: Array<Pair>
}

export interface SelectMultipleMatrix extends BaseQuestion { 
  type: "select_multiple_matrix",
  params: Array<Pair>,
  subQuestions: Array<Pair>,
}

// Date in YYYY/MM/DD format
export interface Date extends BaseQuestion { 
  type: "date",
}

// Time in 24hrs HH:mm format
export interface Time extends BaseQuestion {
  type: "time",
}

// Date time in 24hrs YYYY/MM/DD-HH:mm format
export interface DateTime extends BaseQuestion {
  type: "date_time",
}

export interface Group extends BaseEntry {
  type: "group",
  params: Array<FormEntry>
}

export type FormEntry = 
  | Text 
  | Note 
  | Decimal 
  | SelectOne
  | SelectOneMatrix
  | SelectMultiple
  | SelectMultipleMatrix
  | Date
  | Time
  | DateTime
  | Group

export const make = {
  pair: (value: string, label: string): Pair => ({value, label}),
  group: (child: Array<FormEntry>, id: string, label: string): Group => ({
    type: "group",
    params: child,
    id,
    label
  })
}
