$(document).ready(async function () {
	const nameElement = $("#name");
	const userName = $("#userName");
	const foto = $("#avatar");
	const repositorios = $("#repositorios");
	const seguidores = $("#seguidores");
	const seguindo = $("#seguindo");
	const link = $("#link");

	const endpoint = "https://api.github.com/users/CarlosTadeuu";

	try {
		const resposta = await fetch(endpoint);
		if (!resposta.ok) {
			throw new Error("Erro ao buscar dados do usuário");
		}
		const json = await resposta.json();

		nameElement.text(json.name);
		userName.text(json.login);
		foto.attr("src", json.avatar_url);
		repositorios.text(json.public_repos);
		seguindo.text(json.following);
		seguidores.text(json.followers);
		link.attr("href", json.html_url);
	} catch (erro) {
		alert("Erro ao buscar dados do usuário, tente novamente mais tarde.");
	}
});
