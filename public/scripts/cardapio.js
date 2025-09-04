// Manipulação do Modal
const pizzaModal = document.getElementById("pizzaModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const finalizarPedidoBtn = document.getElementById("finalizarPedidoBtn");
const resultDiv = document.getElementById("result");
const pizzaCustom = document.getElementById("custom");

// Exibir o modal ao escolher "Customizada"
pizzaCustom.addEventListener("click", function (e) {
        e.currentTarget.blur()
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

// Finalizar pedido
finalizarPedidoBtn.addEventListener("click", function () {
	const massa = document.getElementById("massa").value;
	const tamanho = document.getElementById("tamanho").value;
	const molho = document.getElementById("molho").value;
	const coberturas = [];

	if (document.getElementById("queijo").checked) coberturas.push("Queijo");
	if (document.getElementById("calabresa").checked)
		coberturas.push("Calabresa");
	if (document.getElementById("napolitana").checked)
		coberturas.push("Napolitana");
	if (document.getElementById("frango").checked) coberturas.push("Frango");
	if (document.getElementById("portuguesa").checked)
		coberturas.push("Portuguesa");

	// Construir a pizza customizada
	class Massa {
		constructor(borda) {
			this.borda = borda;
		}
	}

	class Tamanho {
		constructor(medida) {
			this.medida = medida;
		}
	}

	class Molho {
		constructor(sabor) {
			this.sabor = sabor;
		}
	}

	class Coberturas {
		constructor(sabores) {
			this.sabores = sabores;
		}
	}

	class Pizza {
		constructor(massa, tamanho, molho, coberturas) {
			this.massa = massa;
			this.tamanho = tamanho;
			this.molho = molho;
			this.coberturas = coberturas;
		}

		mostrarPizza() {
			return `
            <h3>Sua Pizza Customizada:</h3>
            <p><strong>Massa:</strong> ${this.massa.borda}</p>
            <p><strong>Tamanho:</strong> ${this.tamanho.medida}</p>
            <p><strong>Molho:</strong> ${this.molho.sabor}</p>
            <p><strong>Coberturas:</strong> ${this.coberturas.sabores.join(", ")}</p>
          `;
		}
	}

	class PizzaBuilder {
		constructor() {
			this.massa = null;
			this.tamanho = null;
			this.molho = null;
			this.coberturas = [];
		}

		addMassa(borda) {
			this.massa = new Massa(borda);
			return this;
		}

		addTamanho(medida) {
			this.tamanho = new Tamanho(medida);
			return this;
		}

		addMolho(sabor) {
			this.molho = new Molho(sabor);
			return this;
		}

		addCoberturas(sabores) {
			this.coberturas = new Coberturas(sabores);
			return this;
		}

		construir() {
			return new Pizza(
				this.massa,
				this.tamanho,
				this.molho,
				this.coberturas,
			);
		}
	}

	// Montar a pizza
	const builder = new PizzaBuilder();
	const pizza = builder
		.addCoberturas(coberturas)
		.addMassa(massa)
		.addMolho(molho)
		.addTamanho(tamanho)
		.construir();

	resultDiv.innerHTML = pizza.mostrarPizza();
	pizzaModal.style.display = "none"; // Fecha o modal após finalizar o pedido
});
