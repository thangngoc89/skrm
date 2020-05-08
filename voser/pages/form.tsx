import * as React from "react";
import Showcase from "../src/components/Survey/Showcase.gen";

export default function Form() {
  return (
    <>
      <div className="container">
        <Showcase />
      </div>
      <style jsx>
        {`
          .container {
            min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
          }
        `}
      </style>
    </>
  );
}
