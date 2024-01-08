import { pokemonSolid } from "@/assets/fonts/font";
import React from "react";

const Topbar = () => {
  return (
    <div
      className={`w-full bg-primary p-4 text-lg text-yellow ${pokemonSolid.className}`}
    >
      Pokedex
    </div>
  );
};

export default Topbar;
