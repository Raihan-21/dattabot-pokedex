import { pokemonSolid } from "@/assets/fonts/font";
import React from "react";

const Topbar = () => {
  return (
    <div
      className={`absolute top-0 w-full bg-primary p-4 text-[30px]  text-yellow ${pokemonSolid.className}`}
    >
      Pokedex
    </div>
  );
};

export default Topbar;
