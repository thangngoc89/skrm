import { render } from "react-dom";

export function reactFormatter(getComponent) {
  return function customFormatter(cell, formatterParams, onRendered) {
    //cell - the cell component
    //formatterParams - parameters set for the column
    //onRendered - function to call when the formatter has been rendered
    onRendered(() => {
      const cellEl = cell.getElement();
      const reactElement = getComponent(cell);
      render(reactElement, cellEl.querySelector(".formatterCell"));
    });
    return '<div class="formatterCell"></div>';
  };
}
