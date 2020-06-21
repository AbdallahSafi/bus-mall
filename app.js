'use strict';
var mainSection = document.getElementsByTagName('main');
//creating elements for the statistics section
var statisticsSection = document.createElement('section');
statisticsSection.setAttribute('id', 'statisticsSection');
var list = document.createElement('ul');
var productSection = document.getElementById('products');

// product Object decleration
var products = [];
var previousProducts = [];
var totalClicks = 0;
function product(name, path) {
  this.name = name;
  this.path = path;
  this.clicks = 0;
  this.shown = 0;
  products.push(this);
}

// ----------------- Creating the objects ------------------
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

// ********************* functions section *********************

productSection.addEventListener('click', changeProducts);


// ------------------------- Function to change products -------------------------
function changeProducts(event) {
  totalClicks += 1;
  // If he has finished all 25 clicks, statistics will be shown
  if (totalClicks === 25) {
    productSection.removeEventListener('click', changeProducts);
    // display statistics
    mainSection[0].appendChild(statisticsSection);
    for (var i = 0; i < products.length; i++) {
      products[i].displayStatistics();
    }
    statisticsSection.appendChild(list);
    return;
  }
  var itemClicked = event.target.id;
  for (var z = 0; z < products.length; z++) {
    if (itemClicked === products[z].name) {
      products[z].clicks += 1;
    }
  }
  displayProducts();
}

// ------------------------- Function to display products -------------------------
function displayProducts() {
  var currentProducts = [];
  //removing the pervous images pefore generating new
  if (productSection.hasChildNodes()) {
    productSection.innerHTML = '';
  }
  do {
    var random = generatRandomProduct();
    // checking if the number is exist in the current or in the previous
    var isExistInCurrent = currentProducts.some(checkExistence, random);
    var isExistInPrevious = previousProducts.some(checkExistence, random);

    // if not exist push it to the array
    if (!isExistInCurrent && !isExistInPrevious) {
      currentProducts.push(random);
      //create an image element
      var img = document.createElement('img');
      img.setAttribute('src', products[random].path);
      img.setAttribute('id', products[random].name);
      productSection.appendChild(img);
      //calculating the shown of the image
      products[random].shown += 1;
    }
  } while (currentProducts.length < 3);
  previousProducts = currentProducts;
}

// ------------------------- Function to display statistcs -------------------------
//display a section with list that contains statistics about the products
product.prototype.displayStatistics = function () {
  var listItem = document.createElement('li');
  listItem.textContent =
    this.name +
    ' had ' +
    this.clicks +
    ' votes and was shown ' +
    this.shown +
    ' times ';
  list.appendChild(listItem);
};

//------------------------- function generate random number -------------------------
function generatRandomProduct() {
  return Math.floor(Math.random() * products.length);
}

//------------------------- function check existanse  -------------------------
function checkExistence(e) {
  return e === this;
}
