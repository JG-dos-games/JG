<script>
let inputElement = document.querySelector("input")
let listElement = document.querySelector("ul")
let itemElement = listElement.querySelectorAll("li")

inputElement.addEventListener("input", (e) => {
  let inputed = e.target.value.toLowerCase()
  itemElement.forEach((li) => {
    let text = li.textContent.toLowerCase()
    if(text.includes(inputed)){
      li.style.display = "block"
    }else{
      li.style.display = "none"
    }
  })
})
</script>

<script>
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
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 5000); 
}
</script>
