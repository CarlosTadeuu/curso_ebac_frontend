const alunos = [
	{nome: "João", nota: 7.5},
	{nome: "Maria", nota: 3},
	{nome: "Pedro", nota: 6.5},
	{nome: "Aline", nota: 9.5},
	{nome: "Paulo", nota: 8.5},
	{nome: "Ana", nota: 6.1},
	{nome: "Lucas", nota: 5.9},
	{nome: "Julia", nota: 4},
	{nome: "Carlos", nota: 5.5},
];

const alunosAprovados = alunos.filter((aluno) => aluno.nota >= 6);
const nomeDosAprovados = alunosAprovados.map((aluno) => aluno.nome);
console.log("Alunos aprovados:");
console.log(nomeDosAprovados.join(", "));
