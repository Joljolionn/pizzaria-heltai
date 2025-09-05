const corpo = document.querySelector("main.corpo");

// pega os pedidos do localStorage
const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

// percorre cada pedido e cria o HTML
pedidos.forEach((pedido, index) => {
	const pedidoHTML = document.createElement("div");
	pedidoHTML.className = "pedido";

	// monta o conteúdo do pedido
	pedidoHTML.innerHTML = `
        <h3>Pedido #${index + 1}</h3>
        <ul>
            ${pedido
				.map(
					(pizza) => `
                <li>${pizza.name} - R$ ${pizza.price.toFixed(2)}</li>
            `,
				)
				.join("")}
        </ul>
        <p><strong>Total do pedido:</strong> R$ ${pedido.reduce((sum, pizza) => sum + pizza.price, 0).toFixed(2)}</p>
        <hr>
    `;

	// adiciona no container principal
	corpo.appendChild(pedidoHTML);
});
