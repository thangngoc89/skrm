import React from "react";

const rowFirst = ["16N", "11N", "26N"];
const rowLast = ["46T", "31N", "36T"];

const RenderTableChenChuc = ({ values, handleChange, handleBlur }) => {
  return (
    <table className="Form-table">
      <tbody>
        <tr>
          {rowFirst.map(row => {
            const inputId = "chenchuc-" + row;
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
            const inputId = "chenchuc-" + row;
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
      </tbody>
    </table>
  );
};

export default RenderTableChenChuc;
