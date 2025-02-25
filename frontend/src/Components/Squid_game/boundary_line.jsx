import React, { Component, useRef } from "react";

function BoundaryLine({ Customstyle }) {
    const defaultStyle = {
        width: "95%",
        height: "5px",
        backgroundColor: "#2E8F46"
    };

    const combinedStyle = { ...defaultStyle, ...Customstyle };

    return <div style={combinedStyle}></div>;
}

export default BoundaryLine;