import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ShowList from "./components/Pages/ShowList";

const myComponent = <ShowList />;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(myComponent);