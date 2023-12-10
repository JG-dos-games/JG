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
  setTimeout(showSlides, 5000); 
}

//////////////////////////////////////////////////// BUSCAR PRODUTOS /////////////////////////////////////////////////////////////////////

document.getElementById('campopesquisa').addEventListener('input', function() {
  var searchTerm = this.value.toLowerCase();
  var produto = document.querySelectorAll('.produto');
  produto.forEach(function(produto) {
    var produtoName = produto.dataset.name.toLowerCase();
    if (produtoName.includes(searchTerm)) {
      produto.style.display = 'block';
    } else {
      produto.style.display = 'none';
    }
  });
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
