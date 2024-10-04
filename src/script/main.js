let compradores = []; // Armazena os compradores e as cartelas compradas
let totalCartelas = 0; // Armazena o número total de cartelas
let currentSkin = ""; // Armazena o nome da skin atual

// Função para salvar os dados no localStorage
function salvarDadosSkin(skinName, totalRifa, compradores) {
	const dadosSkin = {
		totalRifa: totalRifa,
		compradores: compradores,
	};
	localStorage.setItem(skinName, JSON.stringify(dadosSkin));
	atualizarSugestoesSkins(); // Atualiza a lista de sugestões de skins
	atualizarSugestoesCompradores(); // Atualiza a lista de sugestões de compradores
}

// Função para carregar os dados de uma skin
function carregarDadosSkin(skinName) {
	const dadosSkin = localStorage.getItem(skinName);
	if (dadosSkin) {
		const { totalRifa, compradores: compradoresSalvos } = JSON.parse(dadosSkin);
		compradores = compradoresSalvos;
		criarCartelas(totalRifa);
		compradores.forEach(({ cartelas }) => {
			cartelas.forEach((num) => {
				const cartela = document.getElementById(`cartela-${num}`);
				if (cartela) {
					const imgX = cartela.querySelector("img");
					imgX.style.display = "block"; // Mostra a imagem do "X" na cartela comprada
					imgX.style.width = "50px";
					imgX.style.height = "50px";
				}
			});
		});
		document.getElementById("apagar-skin").style.display = "inline"; // Mostra o botão de apagar skin
		return totalRifa;
	}
	document.getElementById("apagar-skin").style.display = "none"; // Esconde o botão se não houver skin carregada
	return null;
}

// Função para apagar a skin atual
function apagarSkin() {
	if (currentSkin) {
		localStorage.removeItem(currentSkin); // Remove os dados da skin atual
		resetarJogo(); // Reseta o jogo e limpa a interface
		alert(`Skin "${currentSkin}" apagada com sucesso.`);
	}
}

// Função para cadastrar a rifa e gerar as cartelas
function cadastrarRifa(event) {
	event.preventDefault(); // Previne o recarregamento da página

	const nomeSkin = document.getElementById("name-skin-input").value;

	if (!nomeSkin) {
		alert("Por favor, insira o nome da skin.");
		return;
	}

	currentSkin = nomeSkin;

	// Verifica se a skin já foi cadastrada anteriormente
	const cartelasExistentes = carregarDadosSkin(currentSkin);

	// Se a skin não foi cadastrada ainda, define o número de rifas
	if (!cartelasExistentes) {
		const totalRifas = parseInt(document.getElementById("TotalRifa").value);
		if (isNaN(totalRifas) || totalRifas <= 0) {
			alert("Por favor, insira um número válido de rifas.");
			return;
		}

		totalCartelas = totalRifas;
		criarCartelas(totalRifas);
		compradores = [];
	} else {
		totalCartelas = cartelasExistentes; // Usa o total de rifas carregado da skin
		document.getElementById("TotalRifa").value = totalCartelas;
		document.getElementById("TotalRifa").disabled = true; // Desabilita o campo totalRifa
	}

	salvarDadosSkin(currentSkin, totalCartelas, compradores);
}

// Função para cadastrar o comprador e as cartelas compradas
function cadastrarComprador(event) {
	event.preventDefault(); // Previne o recarregamento da página

	const nomeComprador = document.getElementById("name-comprador").value;
	const numerosCartelas = document
		.getElementById("number-cartela")
		.value.split(",")
		.map((num) => parseInt(num.trim()));

	const cartelasCompradas = compradores.flatMap((c) => c.cartelas);
	const cartelasJaCompradas = numerosCartelas.filter((num) => cartelasCompradas.includes(num));

	if (cartelasJaCompradas.length > 0) {
		alert(`Os números já comprados são: ${cartelasJaCompradas.join(", ")}. Escolha outros números.`);
		return;
	}

	// Verifica se o comprador já existe
	let compradorExistente = compradores.find((c) => c.nome === nomeComprador);

	if (compradorExistente) {
		// Adiciona as novas cartelas ao comprador existente
		compradorExistente.cartelas.push(...numerosCartelas);
	} else {
		// Cria um novo comprador
		compradorExistente = {
			nome: nomeComprador,
			cartelas: numerosCartelas,
		};
		compradores.push(compradorExistente);
	}

	// Marca as cartelas compradas com o "X"
	numerosCartelas.forEach((num) => {
		const cartela = document.getElementById(`cartela-${num}`);
		if (cartela) {
			const imgX = cartela.querySelector("img");
			imgX.style.display = "block";
			imgX.style.width = "50px";
			imgX.style.height = "50px";
		}
	});

	salvarDadosSkin(currentSkin, totalCartelas, compradores);

	// Limpa os campos de entrada
	document.getElementById("name-comprador").value = "";
	document.getElementById("number-cartela").value = "";
}

// Função para criar as cartelas
function criarCartelas(totalCartelas) {
	const cartelasList = document.getElementById("cartelas-list");
	cartelasList.innerHTML = ""; // Limpa as cartelas anteriores

	for (let i = 1; i <= totalCartelas; i++) {
		const li = document.createElement("li");
		li.classList.add("cartela");
		li.id = `cartela-${i}`;
		li.innerHTML = `
            <h2>${i}</h2>
            <img src="./img/letra-x.png" alt="letra-x" style="display: none;">
        `;
		cartelasList.appendChild(li);
	}
}

// Função para atualizar as sugestões de skins no input
function atualizarSugestoesSkins() {
	const skinsList = document.getElementById("skins-list");
	skinsList.innerHTML = ""; // Limpa as sugestões anteriores

	// Adiciona as skins salvas no localStorage como sugestões
	for (let i = 0; i < localStorage.length; i++) {
		const skinName = localStorage.key(i);
		const option = document.createElement("option");
		option.value = skinName;
		skinsList.appendChild(option);
	}
}

// Função para atualizar as sugestões de compradores no input de "Nome do Comprador"
function atualizarSugestoesCompradores() {
	const compradoresList = document.getElementById("compradores-list");
	compradoresList.innerHTML = ""; // Limpa as sugestões anteriores

	compradores.forEach(({ nome }) => {
		const option = document.createElement("option");
		option.value = nome;
		compradoresList.appendChild(option);
	});
}

// Função para resetar o jogo
function resetarJogo() {
	compradores = [];
	totalCartelas = 0;
	document.getElementById("cartelas-list").innerHTML = "";
	document.getElementById("name-skin-input").value = "";
	document.getElementById("TotalRifa").value = "";
	document.getElementById("TotalRifa").disabled = false;
	document.getElementById("apagar-skin").style.display = "none";
}

// Função para sortear um número
function sortear() {
	if (compradores.length === 0) {
		alert("Nenhum comprador foi registrado.");
		return;
	}

	const todasCartelas = compradores.flatMap((c) => c.cartelas);
	const numeroSorteado = todasCartelas[Math.floor(Math.random() * todasCartelas.length)];
	alert(`Número sorteado: ${numeroSorteado}`);
}

// Adiciona eventos aos botões
document.getElementById("nomeDaRifa").addEventListener("submit", cadastrarRifa);
document.getElementById("cadastro-comprador").addEventListener("submit", cadastrarComprador);
document.getElementById("apagar-skin").addEventListener("click", apagarSkin);

// Função para mostrar as cartelas compradas pelo comprador selecionado
function mostrarSkinsCompradas() {
	const nomeComprador = document.getElementById("name-comprador").value;

	if (!nomeComprador) {
		alert("Por favor, selecione um comprador.");
		return;
	}

	const comprador = compradores.find((c) => c.nome === nomeComprador);

	if (!comprador) {
		alert("Comprador não encontrado.");
		return;
	}

	// Limpa a visualização anterior
	const cartelasList = document.getElementById("cartelas-compradas");
	cartelasList.innerHTML = "";

	// Exibe as cartelas compradas por este comprador
	if (comprador.cartelas.length > 0) {
		comprador.cartelas.forEach((cartela) => {
			const li = document.createElement("li");
			li.textContent = `Cartela: ${cartela}`;
			cartelasList.appendChild(li);
		});
	} else {
		alert("Este comprador não comprou nenhuma cartela.");
	}
}

// Adiciona o evento ao botão "Mostrar Skins Compradas"
document.getElementById("mostrar-skins").addEventListener("click", mostrarSkinsCompradas);

// Inicializa as sugestões de skins e compradores ao carregar a página
atualizarSugestoesSkins();
atualizarSugestoesCompradores();
