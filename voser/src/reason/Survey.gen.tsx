/* TypeScript file generated from Survey.re by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:interface-over-type-literal
export type metadata = {
  readonly id: string; 
  readonly label: string; 
  readonly required?: boolean; 
  readonly relavent?: string
};

// tslint:disable-next-line:interface-over-type-literal
export type dateTime = {
  readonly id: string; 
  readonly label: string; 
  readonly required?: boolean; 
  readonly relavent?: string; 
  readonly format?: string
};

// tslint:disable-next-line:interface-over-type-literal
export type integer = {
  readonly id: string; 
  readonly label: string; 
  readonly required?: boolean; 
  readonly relavent?: string
};

// tslint:disable-next-line:interface-over-type-literal
export type note = {
  readonly id: string; 
  readonly label: string; 
  readonly required?: boolean; 
  readonly relavent?: string
};

// tslint:disable-next-line:interface-over-type-literal
export type pair = { readonly value: string; readonly label: string };

// tslint:disable-next-line:interface-over-type-literal
export type select = {
  readonly id: string; 
  readonly label: string; 
  readonly required?: boolean; 
  readonly relavent?: string; 
  readonly params: pair[]
};

// tslint:disable-next-line:interface-over-type-literal
export type selectMatrix = {
  readonly id: string; 
  readonly label: string; 
  readonly required?: boolean; 
  readonly relavent?: string; 
  readonly params: pair[]; 
  readonly subQuestion: pair[]
};

// tslint:disable-next-line:interface-over-type-literal
export type text = {
  readonly id: string; 
  readonly label: string; 
  readonly required?: boolean; 
  readonly relavent?: string
};

// tslint:disable-next-line:interface-over-type-literal
export type field = 
    { tag: "Text"; value: text }
  | { tag: "Note"; value: note }
  | { tag: "Integer"; value: integer }
  | { tag: "SelectOne"; value: select }
  | { tag: "SelectOneMatrix"; value: selectMatrix }
  | { tag: "SelectMultiple"; value: select }
  | { tag: "SelectMultipleMatrix"; value: selectMatrix }
  | { tag: "Date"; value: dateTime }
  | { tag: "Time"; value: dateTime }
  | { tag: "DateTime"; value: dateTime }
  | { tag: "Group"; value: group };

// tslint:disable-next-line:interface-over-type-literal
export type group = {
  readonly id: string; 
  readonly label: string; 
  readonly required?: boolean; 
  readonly relavent?: string; 
  readonly params: field[]
};

// tslint:disable-next-line:interface-over-type-literal
export type t = { readonly title: string; readonly fields: field[] };
