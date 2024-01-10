/////////////////////////////////////////////////// LIMITAR QUANTIDADE //////////////////////////////////////////////////////////////////////////

var meuInput = document.getElementById('quantidade');
meuInput.addEventListener('input', function() {
var valor = parseInt(meuInput.value);
        if (valor > 1) {
            meuInput.value = 1;
            alert('Você atingiu a quantidade máxima disponível por cor.');
        }
    });
    
/////////////////////////////////////////////////// CARREGAR PÁGINA //////////////////////////////////////////////////////////////////////////

function carregarPagina() {
        exibirCarrinho();
	    calculofinal();
        calcularPrecoTotalCarrinho();
}

/////////////////////////////////////////////////// COR SINC IAMGEM //////////////////////////////////////////////////////////////////////////

function verificarCorSelecionada() {
    var corSelecionada = document.querySelector('input[name="cor"]:checked');
    if (!corSelecionada) {
        alert('Por favor, escolha uma cor antes de adicionar ao carrinho ou comprar.');
        return false;
    }
    return true; 
}
    
/////////////////////////////////////////////////// ADD ITEM //////////////////////////////////////////////////////////////////////////

function additem() {
verificarCorSelecionada();
    var nomeProduto = document.querySelector('.nomeprodutopino').textContent;
    var precoProduto = parseFloat(document.querySelector('.precoprodutopino').textContent.replace('R$', '').trim());
    var corSelecionada = document.querySelector('input[name="cor"]:checked').value;
    var quantidadeProduto = document.getElementById('quantidade').value;
    var imgproduto = document.getElementById('mainImage').src;
    var produto = {
        nome: nomeProduto,
        preco: precoProduto,
        cor: corSelecionada,
        quantidade: quantidadeProduto,
        imagem: imgproduto
    };
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
    calcularPrecoTotalCarrinho();
    calculofinal();
    alert('Produto adicionado ao carrinho!');
}

/////////////////////////////////////////////////// ABREVIAR NOME //////////////////////////////////////////////////////////////////////////

function abreviarNomeProduto(nome, comprimentoMaximo) {
  if (nome.length > comprimentoMaximo) {
    return nome.substring(0, comprimentoMaximo) + '...';
  } else {
    return nome;
  }
}

/////////////////////////////////////////////////// EXIBIR CARRINHO //////////////////////////////////////////////////////////////////////////

function exibirCarrinho() {
  var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  var carrinhoContainer = document.getElementById('carrinhoItens');
  carrinhoContainer.innerHTML = '';
  var cartNotification = document.getElementById('cartNotification');
  if (carrinho.length === 0) {
    cartNotification.style.display = 'block';
    document.getElementById('precofinal').style.display= 'none';
  } else {
    cartNotification.style.display = 'none';
    document.getElementById('precofinal').style.display= 'block';   
  }
  var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  var quantidadeTotalProdutos = carrinho.length;
  var quanticarElement = document.querySelector('.quanticar');
  if (quanticarElement) {
    quanticarElement.textContent = quantidadeTotalProdutos.toString();
  }
  carrinho.forEach(function (produto, index) {
    if (produto.quantidade > 1) {
      produto.quantidade = 1;
      alert('Você atingiu a quantidade máxima permitida.');
    }
    var nomeAbreviado = abreviarNomeProduto(produto.nome, 18);
    var precoTotal = calcularPrecoTotal(produto);
    var itemLista = document.createElement('li');
    itemLista.classList.add('carrinhoitem');
    var corElement = produto.cor ? `<hr class="hrseteum"><span class="bordercar"></span>Cor: ${produto.cor}` : '';
    itemLista.innerHTML = `
      <img class="imgcar" src="${produto.imagem}" alt="${produto.nome}"><span class="inforcar"><span class="nomeespecial">${nomeAbreviado}</span>${corElement} <hr class="hrsete"><span class="bordercar"></span>R$${produto.preco.toFixed(2)} <hr class="hrsete"><span class="bordercar"></span>Quantidade: <input type="number" value="${produto.quantidade}" min="1" onchange="atualizarQuantidade(${index}, this.value)" style="max-width: 50px"><br><hr class="hrcarrinho"><span class="precototal">Preço Total: R$${precoTotal.toFixed(2)}</span></span> `;
    var btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.classList.add('buttonremover');
    btnRemover.onclick = function () {
      removerDoCarrinho(index);
    };
    itemLista.appendChild(btnRemover);
    carrinhoContainer.appendChild(itemLista);
  });
}

/////////////////////////////////////////////////// PREÇO TOTAL PRODUTO //////////////////////////////////////////////////////////////////////////

function calcularPrecoTotal(produto) {
  return produto.quantidade * produto.preco;
}

/////////////////////////////////////////////////// PREÇO TOTAL CARRINHO //////////////////////////////////////////////////////////////////////////

function calcularPrecoTotalCarrinho() {
  var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  var precoTotalCarrinho = carrinho.reduce(function (total, produto) {
    var quantidadeConsiderada = Math.min(produto.quantidade, 1);
    return total + quantidadeConsiderada * produto.preco;
  }, 0);
  var precoTotalElement = document.getElementById('precoTotalCarrinho');
  if (precoTotalElement) {
    precoTotalElement.textContent = 'R$ ' + precoTotalCarrinho.toFixed(2);
  }
}

/////////////////////////////////////////////////// ATUALIZAR //////////////////////////////////////////////////////////////////////////

function atualizarQuantidade(index, novaQuantidade) {
  var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  if (index >= 0 && index < carrinho.length) {
    carrinho[index].quantidade = parseInt(novaQuantidade);
    var precoUnitario = carrinho[index].preco;
    var novoPrecoTotal = carrinho[index].quantidade * precoUnitario;
    carrinho[index].precoTotal = novoPrecoTotal;
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
    calcularPrecoTotalCarrinho();
    calculofinal();
  }
}

/////////////////////////////////////////////////// REMOVER ITEM //////////////////////////////////////////////////////////////////////////

function removerDoCarrinho(index) {
  var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  exibirCarrinho();
  calcularPrecoTotalCarrinho();
  calculofinal();
}

/////////////////////////////////////////////////// MENU CELULAR/////////////////////////////////////////////////////////////////////////

function openNav() {
  document.getElementById("mySidenav").style.width = "50%";
  var imagens = document.getElementById('slides');
  imagens.style.display = 'none';
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  var imagens = document.getElementById('slides');
  imagens.style.display = 'block';
}

//////////////////////////////////////////////////// BUSCAR PRODUTOS ////////////////////////////////////////////////////////////////////

function removerAcentos(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
document.getElementById('campopesquisa').addEventListener('input', function() {
  var searchTerm = removerAcentos(this.value.toLowerCase());
  var produto = document.querySelectorAll('.produto'); 
  produto.forEach(function(produto) {
    var produtoName = removerAcentos(produto.dataset.name.toLowerCase());    
    if (produtoName.includes(searchTerm)) {
      produto.style.display = 'block';
    } else {
      produto.style.display = 'none';
    }
  });
});

//////////////////////////////////////////////////// OCULTAR PRODUTO /////////////////////////////////////////////////////////////////////

const campopesquisa = document.getElementById('campopesquisa');
const pino = document.getElementById('pino');
const car = document.getElementById('carrinhoContainer');
const descricao = document.getElementById('descricao');

campopesquisa.addEventListener('focus', function() {
pino.classList.add('hidden');
car.classList.add('hidden');
descricao.classList.add('hidden');	
});
campopesquisa.addEventListener('blur', function() {
pino.classList.remove('hidden');
car.classList.remove('hidden');
descricao.classList.remove('hidden');	
});

//////////////////////////////////////////////////// APARECER ENDERECO /////////////////////////////////////////////////////////////////////

document.getElementById('comprar').addEventListener('click', function() {
 if (verificarCorSelecionada()) {
        document.getElementById('entrega').style.display = 'block';
        document.getElementById('entrega').scrollIntoView({
            behavior: 'smooth'
        });
 }
});

///////////////////////////////////////////////////// CATEGORIA PC ///////////////////////////////////////////////////////////////////////

function filterProducts() {
    var selectedCategory = document.getElementById("category").value;
    var products = document.getElementsByClassName("produto");
    var pino = document.getElementById('pino');
    var carrinhoContainer = document.getElementById('carrinhoContainer');
    if (selectedCategory !== "tudo") {
        carrinhoContainer.style.display = 'none';
        pino.style.display = 'none';
    } else {
        carrinhoContainer.style.display = 'block';
        pino.style.display = 'block';
    }
    for (var i = 0; i < products.length; i++) {
        var productCategory = products[i].getAttribute("data-category");
        if (selectedCategory === "tudo" || selectedCategory === productCategory) {
            products[i].style.display = "block";
        } else {
            products[i].style.display = "none";
        }
    }
}

///////////////////////////////////////////////////// CATEGORIA CELL /////////////////////////////////////////////////////////////////////

function filterproducts(category) {
  var products = document.querySelectorAll('.produto');
  var pino = document.getElementById('pino');
  var carrinhoContainer = document.getElementById('carrinhoContainer');
  pino.style.display = 'none';
  carrinhoContainer.style.display = 'none';
  products.forEach(function(product) {
    var productCategory = product.dataset.category;
    if (category === 'all' || productCategory === category) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
  if (category === 'all') {
    carrinhoContainer.style.display = 'block';
  }
}

////////////////////////////////////////////////////// MUDAR MINIATURA //////////////////////////////////////////////////////////////////

function mudarImagemCor(novaImagemURL) {
        document.getElementById('mainImage').src = novaImagemURL;
}

function mudarImagem(novaImagem) {
  document.getElementById('mainImage').src = novaImagem;
}
