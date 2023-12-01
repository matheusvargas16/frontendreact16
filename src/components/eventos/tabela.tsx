import Aluno from "@/core/Aluno";
import { IconeEdicao, IconeLixo } from "../icones/tabela";


interface TabelaProps {
  alunos: Aluno[]; // lista de alunos
  alunoSelecionado?: (aluno: Aluno) => void; 
  alunoExcluido?: (aluno: Aluno) => void;
}

// componente tabela
export default function Tabela(props: TabelaProps) {
  const exibirAcoes = props.alunoSelecionado || props.alunoExcluido;

  // cabeçalho da tabela
  function renderHeader() {
    return (
      <tr>
        <th className="px-6 py-4">ID</th>
        <th className="px-6 py-4">Nome</th>
        <th className="px-6 py-4">Idade</th>
        <th className="px-6 py-4">Email</th>
        <th className="px-6 py-4">Data de Nascimento</th>
        {exibirAcoes && <th className="px-6 py-3">Ações</th>}
      </tr>
    );
  }

  // dados da tabela
  function renderDados() {
    return props.alunos?.map((aluno, i) => {
      return (
        <tr key={aluno.id} className={`${i % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}`}>
          <td className="px-6 py-4">{aluno.id}</td>
          <td className="px-6 py-4 text-center">{aluno.nome}</td>
          <td className="px-6 py-4 text-center">{aluno.idade}</td>
          <td className="py-4 text-center">{aluno.email}</td>
          <td className="px-6 py-4 text-end">{aluno.dataNascimento}</td>
          {exibirAcoes && renderizarAcoes(aluno)}
        </tr>
      );
    });
  }

  //ações (editar/excluir) na tabela
  function renderizarAcoes(aluno: Aluno) {
    return (
      <td className="flex justify-center ">
        {props.alunoSelecionado && (
          // botao edicao
          <button
            onClick={() => props.alunoSelecionado?.(aluno)}
            className="text-gray-900 hover:text-gray-900 focus:outline-none"
          >
            {IconeEdicao}
          </button>
        )}
        {props.alunoExcluido && (
          // botao excluir
          <button
            onClick={() => props.alunoExcluido?.(aluno)}
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            {IconeLixo}
          </button>
        )}
      </td>
    );
  }

  // 
  return (
    <table className="w-full table-fixed rounded-xl overflow-hidden bg-white shadow-md">
      <thead className="text-gray-700 bg-gradient-to-r from-amber-500 to-amber-600">
        {renderHeader()}
      </thead>
      <tbody>{renderDados()}</tbody>
    </table>
  );
}
