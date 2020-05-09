export interface Pair {
  value: string,
  label: string
}

interface BaseEntry {
  type: string,
  id: string,
  label?: string,
  /* Default to yes */
  required?: boolean,
  relavent?: string
}

export interface Text extends BaseEntry {
  type: "text",
}

export interface Note extends BaseEntry {
  type: "note",
}

export interface Decimal extends BaseEntry {
  type: "decimal",
}

export interface SelectOne extends BaseEntry { 
  type: "select_one",
  params: Array<Pair>
}

export interface SelectOneMatrix extends BaseEntry { 
  type: "select_one_matrix",
  params: Array<Pair>,
  subQuestions: Array<Pair>
}

export interface SelectMultiple extends BaseEntry { 
  type: "select_multiple",
  params: Array<Pair>
}

export interface SelectMultipleMatrix extends BaseEntry { 
  type: "select_multiple_matrix",
  params: Array<Pair>,
  subQuestions: Array<Pair>,
}

// Date in YYYY/MM/DD format
export interface Date extends BaseEntry { 
  type: "date",
}

// Time in 24hrs HH:mm format
export interface Time extends BaseEntry {
  type: "time",
}

// Date time in 24hrs YYYY/MM/DD-HH:mm format
export interface DateTime extends BaseEntry {
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
