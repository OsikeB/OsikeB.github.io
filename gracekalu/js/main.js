/*gracekalu.com JavaScript File*/
"use strict";

// Navigation Element and Function
let offcanvas = document.querySelector('[data-toggle="offcanvas"]');
let navbarToggle = document.querySelector("#navbarToggle");
let navLinks = document.querySelectorAll(".navbar-nav .nav-item a");

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", removeCover);
}
offcanvas.addEventListener("click", openClose);

function openClose() {
  navbarToggle.classList.toggle("open");
}

function removeCover() {
  navbarToggle.classList.remove("open");
}

//Declaring and assigning variables and Dom Manipulation For Gallery;

let i = 0;
let images = [];
let time = 5000;

//Gallery image list

images[0] = "./img/gallery/img-1.jpg";
images[1] = "./img/gallery/img-2.jpg";
images[2] = "./img/gallery/img-3.jpg";
images[3] = "./img/gallery/img-4.jpg";
images[4] = "./img/gallery/img-5.jpg";
images[5] = "./img/gallery/img-6.jpg";
images[6] = "./img/gallery/img-7.jpg";
images[7] = "./img/gallery/img-8.jpg";
images[8] = "./img/gallery/img-9.jpg";
images[9] = "./img/gallery/img-10.jpg";
images[10] = "./img/gallery/img-11.jpg";

//Change image function
function changeImg() {
  document.querySelector("#slide").src = images[i];
  if (i < images.length - 1) {
    i++;
  } else {
    i = 0;
  }

  setTimeout("changeImg()", time);
}

window.onload = changeImg();

/** PopUp and Scroll top event listener */
window.addEventListener('scroll', function(){
    if(this.scrollY){
  
      document.querySelector('[up] a').classList.add('up');
      document.querySelector('[up] a').setAttribute ('title', "scroll to the top");
    }else{
      
      document.querySelector('[up] a').classList.remove('up');
    }

});

let toUp = document.querySelector('[up] a i');
let goUp = document.querySelector('[up] a');

toUp.addEventListener("click", function(){
  goUp.setAttribute("href", "#onTopScroll")
})
