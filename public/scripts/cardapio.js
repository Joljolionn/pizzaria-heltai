const PizzaPreco = {
	massas: {
		normal: 0,
		crocante: 4,
		recheada: 6,
		sem_borda: -2,
	},

	tamanhos: {
		pequena: 20,
		média: 30,
		grande: 40,
	},

	molhos: {
		tomate: 0,
		branco: 3,
		barbecue: 4,
		sem_molho: -1,
	},

	coberturas: {
		queijo: 5,
		calabresa: 5,
		frango: 6,
		portuguesa: 7,
		napolitana: 7,
		atum: 8,
	},
};

// gera os inputs dinamicamente
let coberturasHTML = "";
for (let cobertura of Object.keys(PizzaPreco.coberturas)) {
	const valor = PizzaPreco.coberturas[cobertura];
	coberturasHTML += `
            <label>
			<input type="checkbox" data-preco="${valor}" id="${cobertura.toLowerCase()}"> ${cobertura.charAt(0).toUpperCase() + cobertura.slice(1)} - R\$${valor}
            </label>
	`;
}

// gera os options dinamicamente
let massasHTML = "";
for (let massa of Object.keys(PizzaPreco.massas)) {
	const valor = PizzaPreco.massas[massa];
	massasHTML += `
			<option data-preco="${valor}" value="${massa.toLowerCase()}">${massa.charAt(0).toUpperCase() + massa.slice(1)} - R\$${valor}</option>
	`;
}

// gera os options dinamicamente
let tamanhosHTML = "";
for (let tamanho of Object.keys(PizzaPreco.tamanhos)) {
	const valor = PizzaPreco.tamanhos[tamanho];
	tamanhosHTML += `
			<option data-preco="${valor}" value="${tamanho.toLowerCase()}">${tamanho.charAt(0).toUpperCase() + tamanho.slice(1)} - R\$${valor}</option>
	`;
}

// gera os options dinamicamente
let molhosHTML = "";
for (let molho of Object.keys(PizzaPreco.molhos)) {
	const valor = PizzaPreco.molhos[molho];
	molhosHTML += `
			<option data-preco="${valor}" value="${molho.toLowerCase()}">${molho.charAt(0).toUpperCase() + molho.slice(1)} - R\$${valor}</option>
	`;
}

// 👉 Função que cria e injeta o modal no DOM
function createPizzaModal() {
	let preco = Number(
		PizzaPreco.massas["normal"] +
			PizzaPreco.molhos["tomate"] +
			PizzaPreco.tamanhos["pequena"],
	);
	const modal = document.createElement("div");
	modal.id = "pizzaModal";
	modal.className = "modal";
	modal.style.display = "none"; // começa escondido

	modal.innerHTML = `
			<div class="modal-content">
				<div class="modal-preco">
                <p>Preço: R\$ ${preco}</p>
                <span class="close" id="closeModalBtn">&times;</span>
                </div>
				<h2>Personalize sua pizza</h2>

				<label for="massa">Escolha a Massa (Borda)</label>
				<select id="massa">
                    ${massasHTML}
				</select>

				<label for="tamanho">Escolha o Tamanho</label>
				<select id="tamanho">
					${tamanhosHTML}
				</select>

				<label for="molho">Escolha o Molho</label>
				<select id="molho">
                    ${molhosHTML}
				</select>

				<label>Coberturas</label>
				<div class="modal-coberturas">
                ${coberturasHTML}
				</div>

				<button id="finalizarPedidoBtn">Finalizar Pedido</button>
			</div>
		`;

	document.body.appendChild(modal); // injeta no DOM
}

function atualizarPreco() {
	let preco = 0;

	// Massa
	const massaSelect = document.getElementById("massa");
	if (massaSelect && massaSelect.selectedOptions[0]) {
		preco += Number(massaSelect.selectedOptions[0].dataset.preco || 0);
	}

	// Tamanho
	const tamanhoSelect = document.getElementById("tamanho");
	if (tamanhoSelect && tamanhoSelect.selectedOptions[0]) {
		preco += Number(tamanhoSelect.selectedOptions[0].dataset.preco || 0);
	}

	// Molho
	const molhoSelect = document.getElementById("molho");
	if (molhoSelect && molhoSelect.selectedOptions[0]) {
		preco += Number(molhoSelect.selectedOptions[0].dataset.preco || 0);
	}

	// Coberturas
	const coberturas = document.querySelectorAll(
		".modal-coberturas input[type='checkbox']",
	);
	coberturas.forEach((c) => {
		if (c.checked) preco += Number(c.dataset.preco || 0);
	});

	// Atualiza o preço no modal
	const precoElemento = document.querySelector(".modal-preco p");
	if (precoElemento) {
		precoElemento.textContent = `Preço: R$ ${preco}`;
	}
}

createPizzaModal();

// selects
document.getElementById("massa").addEventListener("change", atualizarPreco);
document.getElementById("tamanho").addEventListener("change", atualizarPreco);
document.getElementById("molho").addEventListener("change", atualizarPreco);

// checkboxes
document
	.querySelectorAll(".modal-coberturas input[type='checkbox']")
	.forEach((c) => {
		c.addEventListener("change", atualizarPreco);
	});

// 👉 Renderiza o modal assim que o DOM estiver pronto

// 👉 Agora já pode manipular o modal
const customPizzaCard = document.getElementById("custom");
// Manipulação do Modal
const pizzaModal = document.getElementById("pizzaModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const finalizarPedidoBtn = document.getElementById("finalizarPedidoBtn");
const resultDiv = document.getElementById("result");
const pizzaCustom = document.getElementById("custom");

// Exibir o modal ao escolher "Customizada"
pizzaCustom.addEventListener("click", function (e) {
	e.currentTarget.blur();
	pizzaModal.style.display = "flex"; // Exibe o modal
});

// Fechar o modal
closeModalBtn.addEventListener("click", function () {
	pizzaModal.style.display = "none";
});

// Fechar o modal clicando fora dele
window.addEventListener("click", function (event) {
	if (event.target === pizzaModal) {
		pizzaModal.style.display = "none";
	}
});

function calcularPrecoPizza() {
	let preco = 0;

	// Massa
	const massaSelect = document.getElementById("massa");
	preco += Number(massaSelect.selectedOptions[0].dataset.preco || 0);

	// Tamanho
	const tamanhoSelect = document.getElementById("tamanho");
	preco += Number(tamanhoSelect.selectedOptions[0].dataset.preco || 0);

	// Molho
	const molhoSelect = document.getElementById("molho");
	preco += Number(molhoSelect.selectedOptions[0].dataset.preco || 0);

	// Coberturas
	const coberturas = document.querySelectorAll(
		".modal-coberturas input[type='checkbox']",
	);
	coberturas.forEach((c) => {
		if (c.checked) preco += Number(c.dataset.preco || 0);
	});

	return preco;
}

// Finalizar pedido
finalizarPedidoBtn.addEventListener("click", function () {
	const massa = document.getElementById("massa").value;
	const tamanho = document.getElementById("tamanho").value;
	const molho = document.getElementById("molho").value;
	const coberturas = [];

	document
		.querySelectorAll(".modal-coberturas input[type='checkbox']")
		.forEach((c) => {
			if (c.checked)
				coberturas.push(c.id.charAt(0).toUpperCase() + c.id.slice(1));
		});

	// Montar descrição da pizza
	const descricao =
		 `Pizza ${tamanho.charAt(0).toUpperCase() + tamanho.slice(1)} com massa ${massa}, molho de ${molho}` +
		(coberturas.length ? ` e coberturas: ${coberturas.join(", ")}` : "");

	// Calcula preço
	const preco = calcularPrecoPizza();

	// Adiciona no carrinho
	addToCart(descricao, preco);

	// Fecha modal
	pizzaModal.style.display = "none";
});

document.getElementById("pizza-margherita").addEventListener("click", () => addToCart("Pizza Margherita", 35))
document.getElementById("pizza-calabresa").addEventListener("click", () => addToCart("Pizza Calabresa", 35))
document.getElementById("pizza-portuguesa").addEventListener("click", () => addToCart("Pizza Portuguesa", 35))
document.getElementById("pizza-frango").addEventListener("click", () => addToCart("Pizza Frango", 35))
document.getElementById("pizza-vegetariana").addEventListener("click", () => addToCart("Pizza Vegetariana", 35))
