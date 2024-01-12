/////////////////////////////////////////////////// COOKIE TERMOS //////////////////////////////////////////////////////////////////////////

function checkCookie() {
  var cookieValue = getCookie('alertShown');    
  if (cookieValue === null || cookieValue === "") {
    alert ('Clicando em OK, você concorda com os Termos de Uso e Políticas de Privacidade JGLoot presente no final da página');
    setCookie('alertShown', 'true', 365);
  }
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
return null;
}
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
document.cookie = name + "=" + value + expires + "; path=/";
}

/////////////////////////////////////////////////// CARREGAR PÁGINA //////////////////////////////////////////////////////////////////////////

function carregarPagina() {
  checkCookie();
  exibirCarrinho();
  calculofinal();
  calcularPrecoTotalCarrinho();
  var produtosContainer = document.getElementById("produtos");
  var produtos = Array.from(produtosContainer.getElementsByClassName("produto"));
  produtos.sort(function () {
      return 0.5 - Math.random();
  });
  produtosContainer.innerHTML = "";
  produtos.forEach(function (produto) {
      produtosContainer.appendChild(produto);
  });
}

/////////////////////////////////////////////////// NOME ABREVIADO //////////////////////////////////////////////////////////////////////////

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
  }
  var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  var quantidadeTotalProdutos = carrinho.length;
  var quanticarElement = document.querySelector('.quanticar');
  if (quanticarElement) {
    quanticarElement.textContent = quantidadeTotalProdutos.toString();
  }
  carrinho.forEach(function (produto, index) {
    if (produto.quantidade > 5) {
      produto.quantidade = 5;
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
    var quantidadeConsiderada = Math.min(produto.quantidade, 5);
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

/////////////////////////////////////////////////// MENU CELULAR//////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////// SLIDES /////////////////////////////////////////////////////////////////////////////

let slideIndex = 0; 
showSlides();
function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1
  }    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 4000); 
}

//////////////////////////////////////////////////// BUSCAR PRODUTOS /////////////////////////////////////////////////////////////////////

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
const slide = document.getElementById('slides');

campopesquisa.addEventListener('focus', function() {
  slide.classList.add('hidden');
});
campopesquisa.addEventListener('blur', function() {
  slide.classList.remove('hidden');
});

///////////////////////////////////////////////////// CATEGORIA PC ///////////////////////////////////////////////////////////////////////

function filterProducts() {
  var selectedCategory = document.getElementById("category").value;
  var products = document.getElementsByClassName("produto");
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
  products.forEach(function(product) {
    var productCategory = product.getAttribute('data-category');
    if (category === 'all' || productCategory === category) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
  var categories = document.querySelectorAll('.category');
  categories.forEach(function(cat) {
    cat.classList.remove('selected');
  });
  var selectedCategory = document.getElementById(category);
  selectedCategory.classList.add('selected');
}
