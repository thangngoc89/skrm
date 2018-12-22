import React from "react";

const rowFirst = [16, 12, 11, 21, 22, 26];
const rowLast = [46, 42, 41, 31, 32, 36];

const RenderTableMIH = ({ values, handleChange, handleBlur }) => {
  return (
    <table className="Form-table">
      <tbody>
        <tr>{rowFirst.map(row => <td key={row}>{row}</td>)}</tr>
        <tr>
          {rowFirst.map(row => {
            const inputId = "mih-" + row;
            return (
              <td key={row}>
                <input
                  id={inputId}
                  name={inputId}
                  value={values[inputId] || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </td>
            );
          })}
        </tr>
        <tr>
          {rowLast.map(row => {
            const inputId = "mih-" + row;
            return (
              <td key={row}>
                <input
                  id={inputId}
                  name={inputId}
                  value={values[inputId] || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </td>
            );
          })}
        </tr>
        <tr>{rowLast.map(row => <td key={row}>{row}</td>)}</tr>
      </tbody>
    </table>
  );
};

export default RenderTableMIH;
