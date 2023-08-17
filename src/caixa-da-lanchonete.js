class CaixaDaLanchonete {
    constructor() {
        // Menu com os preços dos itens e formas de pagamento aceitas
        this.menu = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50,
        };
        this.formasDePagamento = ['dinheiro', 'debito', 'credito'];
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        // Verifica se a forma de pagamento é válida
        if (!this.formasDePagamento.includes(formaDePagamento)) 
            return 'Forma de pagamento inválida!';

        // Verifica se há itens no carrinho de compra
        if (itens.length === 0) 
            return 'Não há itens no carrinho de compra!';

        // Inicializa um objeto para o carrinho
        const carrinho = {};

        // Loop para processar cada item e calcular quantidades
        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');

            // Verifica se o item existe no menu
            if (!this.menu[codigo])
                return 'Item inválido!';

            // Calcula a quantidade do item no carrinho
            carrinho[codigo] = (carrinho[codigo] || 0) + parseInt(quantidade);

        }

        // Calcula o total da compra
        let total = 0;
        for (const codigo in carrinho) {
            total += this.calcularSubtotal(codigo, carrinho[codigo]);
        }

        // Aplica desconto ou acréscimo baseado na forma de pagamento
        if (formaDePagamento === 'dinheiro')
            total *= 0.95; // Desconto de 5% em pagamento em dinheiro
        else if (formaDePagamento === 'credito')
            total *= 1.03; // Acréscimo de 3% em pagamento a crédito

        // Formata e retorna o total a pagar
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    calcularSubtotal(codigo, quantidade) {
        // Calcula o subtotal baseado no código e quantidade
        if (codigo === 'combo1')
            return (this.menu.suco + this.menu.sanduiche) * quantidade;
        if (codigo === 'combo2')
            return (this.menu.cafe + this.menu.sanduiche) * quantidade;
        
        return this.menu[codigo] * quantidade;
    }
}

module.exports = { CaixaDaLanchonete };
