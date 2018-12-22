import React from "react";

const rowFirst = ["16N", "11N", "26N"];
const rowLast = ["46T", "31N", "36T"];

const RenderTableOHIS = ({ prefix = "ci", values, handleChange, handleBlur }) => {
  return (
    <table className="Form-table Form-table-OHIS">
      <tbody>
        <tr>{rowFirst.map(row => <td key={row}>{row}</td>)}</tr>
        <tr>
          {rowFirst.map(row => {
            const inputId = `${prefix}-${row}`;
            return (
              <td key={row}>
                <input
                  id={inputId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values[inputId] || ""}
                  required
                />
              </td>
            );
          })}
        </tr>
        <tr>
          {rowLast.map(row => {
            const inputId = `${prefix}-${row}`;
            return (
              <td key={row}>
                <input
                  id={inputId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values[inputId] || ""}
                  required
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

export default RenderTableOHIS;
