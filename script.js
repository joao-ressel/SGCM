let botaoAdd = document.getElementById("add"); // Exibir form

botaoAdd.addEventListener("click", () => {
	document.getElementById("formCadastro").style.display = "block";
});

let botaoCancelar = document.querySelector('input[value="Cancelar"]'); // Cancelar form

botaoCancelar.addEventListener("click", () => {
	document.getElementById("formCadastro").style.display = "none";
});

let botoesExcluir = document.querySelectorAll("a.botao.excluir"); // Excluir linha

function excluir(botao) {
	botao.addEventListener("click", () => {
		if (confirm("Deseja realmente excluir?")) {
			botao.parentNode.parentNode.remove();
			contadorRegistros();
		}
	});
}

for (const botao of botoesExcluir) {
	excluir(botao);
}

function adicionarLinhaTabela(tabela, dados, search = false) {
	let linha = document.createElement("tr");
	let id = document.createElement("td");
	let acoes = document.createElement("td");

	id.classList.add("fit");
	id.textContent = tabela.rows.length - 1;
	acoes.innerHTML = `<a href="javascript:void(0)" class="botao">Editar</a> <a href="javascript:void(0)" class="botao excluir">Excluir</a>`;

	linha.appendChild(id);

	let camposApular = ["id", "senha"];

	for (const [chave, valor] of Object.entries(dados)) {
		let celula = document.createElement("td");

		if (camposApular.includes(chave.toLocaleLowerCase())) {
			continue;
		} else {
			if (search)
				celula.innerHTML = valor.replace(
					new RegExp(inputBusca.value, "gi"),
					(match) => `<mark>${match}</mark>`
				);
			else celula.textContent = valor;

			linha.appendChild(celula);
		}
	}

	linha.appendChild(acoes);

	tabela.tBodies[0].appendChild(linha);

	let botaoExcluir = linha.querySelector("a.botao.excluir");
	excluir(botaoExcluir);
}

//------------ Buscar dados na tabela ------------//

let inputBusca = document.getElementById("busca");

function buscar(pagina) {
	inputBusca.addEventListener("input", () => {
		const tabela = document.querySelector("table");
		const url = "./dados.json";

		fetch(url)
			.then((resposta) => resposta.json())
			.then((dados) => {
				let busca = inputBusca.value.toLowerCase();

				let resultado = dados[pagina].filter((item) => {
					return Object.keys(item).some((key) => {
						return String(item[key]).toLowerCase().includes(busca);
					});
				});

				const rows = document.querySelectorAll("tbody tr");
				rows.forEach((row) => row.remove());

				if (resultado.length === 0) {
					let linha = document.createElement("tr");
					let celula = document.createElement("td");
					celula.colSpan = tabela.rows[0].cells.length;
					celula.style.textAlign = "center";
					celula.textContent = "Nenhum resultado encontrado.";
					linha.appendChild(celula);
					tabela.tBodies[0].appendChild(linha);

					contadorRegistros(true);
				} else {
					resultado.forEach((item) => {
						adicionarLinhaTabela(tabela, item, true);
					});

					contadorRegistros();
				}
			})
			.catch((erro) => {
				console.log(erro);
			});
	});
}

let pagina = window.location.pathname.split("/").pop().split(".")[0];
buscar(pagina);

//------------ Fim ------------//

function contadorRegistros(zero = false) {
	const tabela = document.querySelector("table");
	const registrosContador = document.querySelector("table tfoot tr td");
	registrosContador.textContent = `Total de registros: ${tabela.rows.length - 2}`;
	registrosContador.colSpan = tabela.rows[0].cells.length;

	zero ? (registrosContador.textContent = "Total de registros: 0") : null;
}

//------------ Fim ------------//

//------------ Salvar dados do form na tabela ------------//

let botaoSalvar = document.querySelector('input[value="Salvar"]');

botaoSalvar.addEventListener("click", (event) => {
	event.preventDefault();

	let tabela = document.querySelector("table");

	let dados = {};

	let form = document.querySelector("form#formCadastro");

	let elementos = Array.from(form.elements);

	for (const input of elementos) {
		if (input.type === "checkbox") {
			if (input.checked) {
				dados[input.name] = input.value;
			}
		} else if (input.type === "radio") {
			if (input.checked) {
				dados[input.name] = input.value;
			}
		} else if (input.type === "select-one") {
			dados[input.name] = input.options[input.selectedIndex].label;
		} else if (input.type === "button" || input.type === "submit") {
			continue;
		} else {
			dados[input.name] = input.value;
		}
	}

	adicionarLinhaTabela(tabela, dados);
	contadorRegistros();
	form.reset();
});

//------------ Fim ------------//
