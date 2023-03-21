import React from "react";
import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import { Search } from "./pages/search/Search";
import { Show } from "./pages/show/Show";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="show/:id" element={<Show />} />
      </Routes>
      <Outlet />
    </ChakraProvider>
  );
}

export default App;
