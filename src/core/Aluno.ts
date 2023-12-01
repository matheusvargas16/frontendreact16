import { stringParaEntradaDeData } from "@/utils/converters";

export default class Aluno {
  // propriedades
  id: number | null;
  nome: string;
  idade: number;
  email: string;
  dataNascimento: string;

  // construtor da classe Aluno
  constructor(id: number | null, nome: string, idade: number, email: string, dataNascimento: string) {
    this.id = id;
    this.nome = nome;
    this.idade = idade;
    this.email = email;
    this.dataNascimento = dataNascimento;
  }

  // gerar alunos fictícios (mock)
  static geraAlunosMock() {
    return [
      new Aluno(1, "João Silva", 20, "joao@gmail.com", "01/01/2002"),
      new Aluno(2, "Maria Oliveira", 22, "maria@gmail.com", "05/03/2000"),
    ];
  }

  // criar uma instância vazia de Aluno
  static vazio(): Aluno {
    return new Aluno(null, "", 0, "", stringParaEntradaDeData(""));
  }
}
