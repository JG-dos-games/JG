function calcularPrecoTotalCarrinho() {
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    var precoTotalCarrinho = carrinho.reduce(function (total, produto) {
        return total + produto.quantidade * produto.preco;
    }, 0);

    return precoTotalCarrinho;
}

function finalizar() {
    var precoTotal = calcularPrecoTotalCarrinho();

    if (Math.abs(precoTotal - 15) < 0.001) {
        window.location.href = 'https://www.mercadolivre.com.br/';
    } else if (Math.abs(precoTotal - 30) < 0.001) {
        window.location.href = 'https://br.shein.com/';
    } else {
        window.location.href = 'pinoled.html';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    finalizar(); // Adicione isso para executar o redirecionamento no carregamento da página
});
