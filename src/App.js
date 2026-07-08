import * as react from "react";
import * as react_dom from "react-dom";

export function helloWorld() {
    const children_4 = [react.createElement("h1", {}, "Sharpino Live Simulation"), react.createElement("p", {}, "Hello from Fable & React!")];
    return react.createElement("div", {}, ...children_4);
}

react_dom.render(helloWorld(), document.getElementById("root"));

