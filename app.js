'use strict';

var productSection = document.getElementById('products');
var products = [];

function product(name, path) {
  this.name = name;
  this.path = path;
  this.clicks = 0;
  this.shown = 0;
  products.push(this);
}

//Creating the objects
new product('bag', 'img/bag.jpg');
new product('banana', 'img/banana.jpg');
new product('bathroom', 'img/bathroom.jpg');
new product('boots', 'img/boots.jpg');
new product('breakfast', 'img/breakfast.jpg');
new product('bubblegum', 'img/bubblegum.jpg');
new product('chair', 'img/chair.jpg');
new product('cthulhu', 'img/cthulhu.jpg');
new product('dog-duck', 'img/dog-duck.jpg');
new product('pen', 'img/pen.jpg');
new product('pet-sweep', 'img/pet-sweep.jpg');
new product('scissors', 'img/scissors.jpg');
new product('shark', 'img/shark.jpg');
new product('sweep', 'img/sweep.png');
new product('tauntaun', 'img/tauntaun.jpg');
new product('unicorn', 'img/unicorn.jpg');
new product('usb', 'img/usb.gif');
new product('water-can', 'img/water-can.jpg');
new product('wine-glass', 'img/wine-glass.jpg');



displayProducts();

// ---------------------- functions section ---------------------------
productSection.addEventListener('click', changeProducts);

function changeProducts(){
  displayProducts();
}


function displayProducts() {
  var currentProducts = [];
  //removing the pervous images pefore generating new
  if(productSection.hasChildNodes()){
    productSection.innerHTML = '';
  }
  do {
    var random = generatRandomProduct();
    // checking if the number is exist
    var isExist = currentProducts.some(checkExistence, random);
    // if not exist push it to the array
    if (!isExist) {
      currentProducts.push(random);
      //creat an image element
      var img = document.createElement('img');
      img.setAttribute('src', products[random].path);
      img.setAttribute('id', 'image' + random);
      productSection.appendChild(img);
    }
  } while (currentProducts.length < 3);
}

//generate random number function
function generatRandomProduct() {
  return Math.floor(Math.random() * products.length);
}

//check existanse function
function checkExistence(e) {
  return e === this;
}
