// Definindo Parte de uma Pizza:
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

// Builder:
class PizzaBuilder {
    constructor() {
        this.massa = null;
        this.tamanho = null;
        this.molho = null;
        this.coberturas = [];
        this.preco = null;
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
        return new Pizza(this.massa, this.tamanho, this.molho, this.coberturas);
    }
}

// Construir Pizza:
class Pizza {
    constructor(massa, tamanho, molho, coberturas) {
        this.massa = massa;
        this.tamanho = tamanho;
        this.molho = molho;
        this.coberturas = coberturas;
    }

    mostrarPizza() {
        return {
            Massa: this.massa.borda,
            Tamanho: this.tamanho.medida,
            Molho: this.molho.sabor,
            Coberturas: this.coberturas.sabores
        }
    }
}

class Pedido {
    // itens = [{Pizza, qtd}]
    itens = []
    adicionarItem(pizza, qtd) {
        this.itens.push({pizza, qtd})
    }
    mostrarItens() {
        return this.itens
    }
}


// USO DO MODELO BUILDER - Construindo uma Pizza:
// const builder = new PizzaBuilder();
