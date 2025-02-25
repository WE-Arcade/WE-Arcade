import React from 'react';

import Doll from "./doll.jsx";
import Guard from "./guard.jsx";

function PlayGroundTopSection({ dollRef }) {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        height: "20vh",
        width: "80%",
        position: "relative",
        marginTop: "30px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Guard />
      <Doll ref={dollRef} />
      <Guard />
    </div>
  );
}

export default PlayGroundTopSection;
