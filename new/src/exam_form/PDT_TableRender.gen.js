/* Untyped file generated by genType. */

import * as Curry from 'bs-platform/lib/es6/curry.js';

import * as PDT_TableRenderBS from './PDT_TableRender.bs';

import * as ReasonReact from 'reason-react/src/ReasonReact.js';

export const PDT_TableRender = ReasonReact.wrapReasonForJs(
  PDT_TableRenderBS.component,
  (function _(jsProps) {
     return Curry._7(PDT_TableRenderBS.make, jsProps.table, jsProps.value, jsProps.error, jsProps.onCellChange, jsProps.onCellBlur, jsProps.id, jsProps.children);
  }));

export default PDT_TableRender;
