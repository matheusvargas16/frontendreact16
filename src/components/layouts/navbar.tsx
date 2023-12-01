import React from "react";

export default function Navbar(props: any) {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-xl font-bold">
          Cadastro de Alunos
        </div>
        <div className="flex space-x-4">
          <a
            href="/"
            className="text-white hover:text-amber-300 transition duration-300"
          >
            Home
          </a>
          <a
            href="/eventos"
            className="text-white hover:text-amber-300 transition duration-300"
          >
            Alunos
          </a>
        </div>
      </div>
    </nav>
  );
}
