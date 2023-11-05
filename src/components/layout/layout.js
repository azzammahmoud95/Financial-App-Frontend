import React from "react";
import SideBar from "../sideBar/sideBar.js";
import Header from "../Header/Header";
import "./layout.css";
import { Container } from "@mui/material";
import { Stack } from "@mui/system";

export default function Layout({ children, title }) {
  return (
    <div
      className="layout"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <SideBar />
      <Stack
        direction="column"
        spacing={2}
        paddingX={5}
        margin={2}
        width="100%"
        position="relative"
        // overflow="auto"
      >
        <Header title={title}/>
        {children}
      </Stack>
    </div>
  );
}
