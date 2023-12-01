'use client'
import Botao from "@/components/eventos/botao";
import Formulario from "@/components/eventos/formulario";
import Layout from "@/components/eventos/layout";
import Tabela from "@/components/eventos/tabela";
import Aluno from "@/core/Aluno";
import { atualizarAluno, cadastrarAluno, excluirAluno, fetchAlunos } from "@/service/eventoService";
import { useEffect, useState } from "react";

export default function Alunos() {
  // armazenar dados do aluno
  const [aluno, setAluno] = useState<Aluno>(Aluno.vazio());
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela');
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  // efeito que carrega os alunos quando a visibilidade é 'tabela'
  useEffect(() => {
    if (visivel === 'tabela') {
      const loadAlunos = async () => {
        try {
          const dados = await fetchAlunos();
          setAlunos(dados);
        } catch (error) {
          console.error("Erro ao buscar alunos:", error);
        }
      };

      loadAlunos();
    }
  }, [visivel]);

  // funcao para quando um aluno é selecionado na tabela
  function alunoSelecionado(aluno: Aluno) {
    setAluno(aluno);
    setVisivel('form');
  }

  // funcao para quando um aluno é excluído
  async function alunoExcluido(aluno: Aluno) {
    const confirmacao = window.confirm("Tem certeza de que deseja excluir este aluno?");
    if (confirmacao) {
      try {
        if (aluno.id !== null) {
          await excluirAluno(aluno.id);
        } else {
          console.error("alunoId é null!");
        }
        setAlunos((prevAlunos) => prevAlunos.filter((al) => al.id !== aluno.id));
      } catch (error) {
        console.error("Erro ao excluir aluno:", error);
      }
    }
  }

  // funcao para salvar ou alterar um aluno
  function salvarOuAlterarAluno(aluno: Aluno) {
    if (aluno.id) {
      alterarAluno(aluno);
    } else {
      salvarAluno(aluno);
    }
  }

  // funcao para atualizar aluno
  async function alterarAluno(aluno: Aluno) {
    try {
      await atualizarAluno(aluno);
      setVisivel("tabela");
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
    }
  }

  // funcao para salvar um novo aluno
  async function salvarAluno(aluno: Aluno) {
    try {
      await cadastrarAluno(aluno);
      setVisivel("tabela");
    } catch (error) {
      console.error("Erro ao salvar aluno:", error);
    }
  }

  // funcao ao clicar no botão para criar um novo aluno
  function novoAluno() {
    setAluno(Aluno.vazio());
    setVisivel("form");
  }

  // visibilidade tabela
  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-bl from-gray-200 to-gray-400
      text-gray-800
    `}>
      <Layout titulo="Cadastro de alunos">
        {visivel === 'tabela' ? (
          <>
            <div className="flex justify-end">
              <Botao className="mb-4" cor="mb-4 bg-gradient-to-r from-amber-600 to-amber-700"
                onClick={() => novoAluno()}>
                Novo aluno
              </Botao>
            </div>
            <Tabela alunos={alunos}
              alunoSelecionado={alunoSelecionado}
              alunoExcluido={alunoExcluido}></Tabela>
          </>
        ) : (
          <Formulario aluno={aluno}
            alunoMudou={salvarOuAlterarAluno}
            cancelado={() => setVisivel('tabela')} />
        )}
      </Layout>
    </div>
  );
}
