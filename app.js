'use strict';

//get Images elements
var imageBoxs = document.getElementsByClassName('box-up');
var votBtns = document.getElementsByClassName('cart');
var addRounds = document.getElementById('addRounds');
var defaultRounds = 26;

var products = [];
var previousProducts = [];
var totalClicks = 0;
var productsName = [];
var clicksArr = [];
var shownArr = [];
var chart;

// product Object decleration
function product(name, path) {
  this.name = name;
  this.path = path;
  this.clicks = 0;
  this.shown = 0;
  products.push(this);
  productsName.push(this.name);
}

//object function to return back all of the values that have been stored in local storage to each object
product.prototype.setItBack = function () {
  for (var i = 0; i < localStorage.length; i++) {
    var itemKey = localStorage.key(i);
    var itemValue = localStorage.getItem(itemKey);
    var itemAsObj = JSON.parse(itemValue);
    if (itemAsObj.name === this.name) {
      this.clicks = itemAsObj.clicks;
      this.shown = itemAsObj.shown;
    }
  }
};

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

retrieveProducts();
// console.log(products);
//dispalying the 3 products for the first time
displayProducts();

// ********************* functions section *********************

// ------------------------- Function to change products -------------------------

addRounds.addEventListener('submit', addNumRounds);
function addNumRounds() {
  event.preventDefault();
  defaultRounds = Number(event.target.numRounds.value) + 1;
}

getTotalsfromStorage();

function changeProducts(id) {
  totalClicks += 1;
  console.log('totalClicks: ',totalClicks);
  localStorage.setItem('totalClicks', totalClicks);

  // If he has finished all 25 clicks, statistics will be shown
  if (totalClicks >= defaultRounds) {
    totalClicks = 0;
    localStorage.setItem('totalClicks', totalClicks);
    for (var y = 0; y < 3; y++) {
      votBtns[y].onclick = null;
    }
    console.log(products);
    // Destroys a specific chart instance
    if (chart) {
      // console.log("chart exist");
      chart.destroy();
    }
    displayStatisticsChart();
   
    return;
  }
  var itemClicked = id;
  for (var z = 0; z < products.length; z++) {
    if (Number(itemClicked) === z) {
      products[z].clicks += 1;
      storeProducts(products[z]);
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
      storeProducts(products[random]);
    }
  } while (currentProducts.length < 3);

  for (var s = 0; s < 3; s++) {
    votBtns[s].setAttribute('id', imgsCreated[s].id);
    votBtns[s].setAttribute('id', imgsCreated[s].id);
    imageBoxs[s].appendChild(imgsCreated[s]);
  }
  previousProducts = currentProducts;
}

//------------------------- function generate random number -------------------------
function generatRandomProduct() {
  return Math.floor(Math.random() * products.length);
}

//------------------------- function check existanse  -------------------------
function checkExistence(e) {
  return e === this;
}

// -------------------- Charts function -----------------------

function displayStatisticsChart() {
  //make sure the arrays are empty
  shownArr = [];
  clicksArr = [];
  // store clicks and showns in arrays
  console.log(products);
  for (var i = 0; i < products.length; i++) {
    shownArr.push(products[i].shown);
    clicksArr.push(products[i].clicks);
  }
  var ctx = document.getElementById('myChart').getContext('2d');

  chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: productsName,
      datasets: [
        {
          label: 'votes',
          backgroundColor: '#c94b4b',
          borderColor: '#c94b4b',
          data: clicksArr,
        },
        {
          label: 'showns',
          backgroundColor: '#4b134f',
          borderColor: '#4b134f',
          data: shownArr,
        },
      ],
    },

    // Configuration options go here
    options: {},
  });
}

// -------------------- Function to Store in Local Storage -----------------------
function storeProducts(item) {
  var itemStr = JSON.stringify(item);
  localStorage.setItem(item.name, itemStr);
}

//----------------------------------------------------------------------------------
//  Function that checks if there is products that saved in the local storage
// and if is it true it will call an object function that will set back the values to the objects
function retrieveProducts() {
  if (localStorage.length === 0) {
    console.log('there is no item with this name');
    return;
  }
  for (var i = 0; i < products.length; i++) {
    products[i].setItBack();
  }
  // call dispaly chart function to dispaly the stored data
  displayStatisticsChart();
}

function getTotalsfromStorage() {
  var tc = parseInt(localStorage.getItem('totalClicks'));
  if (localStorage.getItem('totalClicks')) {
    totalClicks = tc;
  }
  console.log('tc: ', tc);
}
