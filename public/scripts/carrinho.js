const openModalButton = document.querySelector("#open-modal");
const closeModalButton = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

const toggleModal = () => {
	[modal, fade].filter(Boolean).forEach((el) => el.classList.toggle("hide"));
};

// previne navegação do <a>
openModalButton?.addEventListener("click", (e) => {
	e.preventDefault();
	toggleModal();
});

// listeners só para quem existe
[closeModalButton, fade].filter(Boolean).forEach((el) => {
	el.addEventListener("click", toggleModal);
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = cart.reduce((sum, item) => sum + item.price, 0); // recalcula total

updateCart(); // Atualiza o DOM com os itens do localStorage

function addToCart(name, price) {
	price = Number(price);
	if (isNaN(price)) return;
	cart.push({ name, price });
	total += price;
	updateCart();
}

function updateCart() {
	const cartItems = document.getElementById("cart-items");
	const totalElement = document.getElementById("total");

	cartItems.innerHTML = "";
	cart.forEach((item) => {
		const div = document.createElement("div");
		div.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
		cartItems.appendChild(div);
	});

	totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
    localStorage.setItem("cart", JSON.stringify(cart))
}

function checkout() {
	if (cart.length === 0) {
		alert("O carrinho está vazio!");
		return;
	}
	document.getElementById("payment-options").style.display = "block";
}

function pay(method) {
	alert(`Pagamento realizado com ${method}. Total: R$ ${total.toFixed(2)}`);
	updateCart();
	document.getElementById("payment-options").style.display = "none";
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || []
    pedidos.push(cart)
    localStorage.setItem("pedidos", JSON.stringify(pedidos))
    cart = []
    localStorage.setItem("cart", JSON.stringify(cart))
	toggleModal();
}

// como seu <script> usa "defer", o DOM já estará parseado aqui
const finalizarCompra = document.getElementById("finalizar-compra");
const pix = document.getElementById("pix");
const cartao = document.getElementById("cartao");

finalizarCompra?.addEventListener("click", checkout);
pix?.addEventListener("click", () => pay("pix"));
cartao?.addEventListener("click", () => pay("cartao"));
