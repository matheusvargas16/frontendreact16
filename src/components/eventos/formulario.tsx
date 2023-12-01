import Aluno from "@/core/Aluno";
import Entrada from "./entrada";
import { useState } from "react";
import { stringParaEntradaDeData } from "@/utils/converters";
import Botao from "./botao";

// Definindo a interface para as propriedades do Formulario
interface FormularioProps {
  aluno: Aluno;
  alunoMudou?: (aluno: Aluno) => void;
  cancelado?: () => void;
}

// componente formulario
export default function Formulario(props: FormularioProps) {
  // obtendo as propriedades de cada aluno
  const id = props.aluno?.id;
  const [nome, setNome] = useState(props.aluno?.nome || "");
  const [idade, setIdade] = useState(props.aluno?.idade);
  const [email, setEmail] = useState(props.aluno?.email || "");
  const [data, setData] = useState(props.aluno?.dataNascimento);
  
  // verificar se o email é válido
  const isValidEmail = (email: string): boolean => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // salvar/alterar
  const handleSalvarAlterar = (): void => {
    // validando nome e email
    if (nome.trim() === "" && email.trim() === "") {
      alert("Nome e Email são obrigatórios");
    } else if (nome.trim() === "") {
      alert("Nome é obrigatório");
    } else if (email.trim() === "") {
      alert("Email é obrigatório");
    } else if (!isValidEmail(email)) {
      alert("Email não é válido.");
    } else {
      props.alunoMudou?.(new Aluno(id, nome, idade, email, data));
    }
  };

  return (
    <div>
      {id && <Entrada texto="ID" valor={id} somenteLeitura />}
      <Entrada texto="Nome" valor={nome} onChange={setNome} />
      <Entrada texto="Idade" valor={idade} onChange={setIdade} />
      <Entrada texto="Email" valor={email} onChange={setEmail} />
      <Entrada
        texto="Data de Nascimento"
        tipo="date"
        valor={stringParaEntradaDeData(data)}
        onChange={setData}
      />
      {/* Botões para Salvar/Alterar e Cancelar */}
      <div className="flex justify-end mt-5">
        <Botao
          className="mr-3"
          cor="bg-gradient-to-r from-amber-500 to-amber-600"
          onClick={handleSalvarAlterar}
        >
          {id ? "Alterar" : "Salvar"}
        </Botao>
        <Botao
          cor="bg-gradient-to-r from-gray-500 to-gray-700"
          onClick={props.cancelado}
        >
          Cancelar
        </Botao>
      </div>
    </div>
  );
}
