/* Untyped file generated by genType. */

import * as SelectBS from './Select.bs';

export const make = function _(Arg1) { const result = SelectBS.make({block:Arg1.block, className:Arg1.className, hasError:Arg1.hasError, id:Arg1.id, name:Arg1.name, onBlur:Arg1.onBlur, onChange:Arg1.onChange, options:Arg1.options.map(function _element(ArrayItem) { return [ArrayItem.value, ArrayItem.label]}), value:Arg1.value}); return result };
