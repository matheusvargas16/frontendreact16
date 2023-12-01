import Aluno from '../core/Aluno';

// alunos iniciais
let alunosList: Aluno[] = [
  new Aluno(1, "João Silva", 20, "joao@example.com", "2003-05-15"),
  new Aluno(2, "Maria Oliveira", 22, "maria@example.com", "2001-02-20"),
];

// controlar o próximo id ao cadastrar um novo aluno
let proximoId = alunosList.length + 1;

// simular o fetch de alunos
export const fetchAlunos = async (): Promise<Aluno[]> => {
  try {
    // simular o carregamento
    await new Promise((resolve) => setTimeout(resolve, 500));
    // retornar alunoos
    return alunosList;
  } catch (error) {
    throw new Error('Erro ao buscar alunos');
  }
};

// cadastrar um novo aluno
export const cadastrarAluno = async (novoAluno: Aluno): Promise<Aluno> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    novoAluno.id = proximoId++;
    alunosList.push(novoAluno);

    return novoAluno;
  } catch (error) {
    console.error("Erro ao cadastrar aluno:", error);
    throw error;
  }
};

//atualizar um aluno existente
export const atualizarAluno = async (alunoAtualizado: Aluno): Promise<Aluno> => {
  try {
    
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = alunosList.findIndex((aluno) => aluno.id === alunoAtualizado.id);

    if (index !== -1) {
      alunosList[index] = alunoAtualizado;
      return alunoAtualizado;
    } else {
      throw new Error('Aluno não encontrado');
    }
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error);
    throw error;
  }
};

// excluir um aluno 
export const excluirAluno = async (id: number): Promise<void> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    alunosList = alunosList.filter((aluno) => aluno.id !== id);
  } catch (error) {
    console.error("Erro ao excluir aluno:", error);
    throw error;
  }
};
