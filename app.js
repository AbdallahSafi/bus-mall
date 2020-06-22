'use strict';

var mainSection = document.getElementsByTagName('main');

//get Images elements
var imageBoxs = document.getElementsByClassName('box-up');
var votBtns = document.getElementsByClassName('cart');
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

//dispalying the 3 products for the first time

displayProducts();

// ********************* functions section *********************

// productSection.addEventListener('click', changeProducts);

// ------------------------- Function to change products -------------------------
function changeProducts() {
  totalClicks += 1;
  // If he has finished all 25 clicks, statistics will be shown
  if (totalClicks === 26) {
    for (var y = 0; y < 3; y++) {
      votBtns[y].onclick = null;
    }

    // display statistics
    mainSection[0].appendChild(statisticsSection);
    for (var i = 0; i < products.length; i++) {
      products[i].displayStatistics();
    }
    statisticsSection.appendChild(list);
    return;
  }
  var itemClicked = event.target.id;
  console.log(itemClicked);
  for (var z = 0; z < products.length; z++) {
    if (Number(itemClicked) === z) {
      products[z].clicks += 1;
    }
  }
  displayProducts();
}

// ------------------------- Function to display products -------------------------
function displayProducts() {
  var currentProducts = [];
  var imgsCreated = [];
  //   removing the pervous images pefore generating new
  for (var i = 0; i < imageBoxs.length; i++) {
    if (imageBoxs[i].hasChildNodes()) {
      imageBoxs[i].innerHTML = '';
    }
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
      img.setAttribute('class', 'img');
      img.setAttribute('id', random);
      imgsCreated.push(img);
      // calculating the shown of the image
      products[random].shown += 1;
    }
  } while (currentProducts.length < 3);

  for (var s = 0; s < 3; s++) {
    votBtns[s].setAttribute('id', imgsCreated[s].id);
    imageBoxs[s].appendChild(imgsCreated[s]);
  }
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




// -------------------- Charts Section -----------------------
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: 'bar',

  // The data for our dataset
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45]
    }]
  },

  // Configuration options go here
  options: {}
});
