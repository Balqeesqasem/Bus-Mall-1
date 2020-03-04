'use strict';
// global variables
var productImage = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
var productObject = [];
var numClick = 0;
var imgClick;
var countClickImage = 0;
var imageName=[];
Product.forSet = [];
var centerImageObject;
var leftImageObject;
var rightImageObject;
var testArray;
var testCount= 0;
// functions
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// constructor function
function Product(typeProduct){
  this.typeProduct = typeProduct;
  this.name = typeProduct.split('.')[0];
  imageName.push(this.name);
  this.shown= 0;
  this.counter= 0;
  this.urlProduct = `img/${this.typeProduct}`;
  productObject.push(this);
}
for (var i=0;i<productImage.length;i++){
  new Product(productImage[i]);
}




// DOM
intialData();
var leftImage= document.getElementById('leftImage');
var rightImage = document.getElementById('rightImage');
var centerImage = document.getElementById('centerImage');
var intRandomNumber=[];
// function generate random number
function generateRandomNumber(){
  var randomNumber = getRandomInt(0,productObject.length-1);
  if (countClickImage<4){
    while(intRandomNumber.includes(randomNumber)){
      randomNumber = getRandomInt(0,productObject.length-1);
    }
    intRandomNumber.push(randomNumber);
  }
  else if (countClickImage === 4){
    testCount++;
    if (testCount===1){
      intRandomNumber = [];
    }
    console.log('which I want '+ testArray);
    while(testArray.includes(randomNumber) || intRandomNumber.includes(randomNumber)){
      randomNumber = getRandomInt(0,productObject.length-1);
    }
    intRandomNumber.push(randomNumber);
    if (testCount===3){
      testArray = [];
      countClickImage= 0;
      testCount = 0;
    }
  }
  return randomNumber;
}


//funtion for render
function render(){
  var newRandomNumbe = generateRandomNumber();
  leftImageObject = productObject[newRandomNumbe];
  leftImage.setAttribute('src', leftImageObject.urlProduct);
  leftImage.setAttribute('alt',leftImageObject.typeProduct);
  leftImageObject.shown++;
  newRandomNumbe = generateRandomNumber();
  rightImageObject = productObject[newRandomNumbe];
  rightImage.setAttribute('src', rightImageObject.urlProduct);
  rightImage.setAttribute('alt',rightImageObject.typeProduct);
  rightImageObject.shown++;
  newRandomNumbe = generateRandomNumber();
  centerImageObject = productObject[newRandomNumbe];
  centerImage.setAttribute('src',centerImageObject.urlProduct);
  centerImage.setAttribute('alt',centerImageObject.typeProduct);
  centerImageObject.shown++;
}

render();

function intialData(){
  imgClick = document.getElementById('allImage');
  imgClick.addEventListener('click',onClick);
}

// event
// var imgClick = document.getElementsByTagName('img');
// for (var l=0; l<imgClick.length;l++){
//   imgClick[l].addEventListener('click',onClick);}
function renderList(){
  for (var li=0;li<productObject.length;li++){
    var unorder = document.getElementById('list');
    var list = document.createElement('li');
    unorder.appendChild(list);
    list.textContent= `${productObject[li].name} had ${productObject[li].counter} votes and was shown ${productObject[li].shown} times.`;}
  set();
}
// function renderListPrevious(){
//   for (var li=0;li<productObject.length;li++){
//     var unorder = document.getElementById('list2');
//     var list = document.createElement('li');
//     unorder.appendChild(list);
//     list.textContent= `${productObject[li].name} had ${productObject[li].counter} votes and was shown ${productObject[li].shown} times.`;}
// }


//function of event
function onClick(event){
  // stop it after 25 iterations and make validation
  numClick++;
  if (numClick>25){
    imgClick.removeEventListener('click', onClick);
    alert('you finish your tamplet');
    renderList();
    barChart();
  }
  else{
    if (event.target.id === 'leftImage'){
      leftImageObject.counter += 1;
    }
    else if (event.target.id === 'rightImage'){
      rightImageObject.counter += 1;
    }
    else if (event.target.id === 'centerImage'){
      centerImageObject.counter += 1;
    }
    if(countClickImage === 3){
      testArray = intRandomNumber.slice(intRandomNumber.length-3,intRandomNumber.length);
    }
    console.log(intRandomNumber);
    countClickImage++;
    render();
  }
}
//test
// The type of chart we want to create is bar
function barChart(){
  var placeOfChart = document.getElementById('chart').getContext('2d');
  var counterArray = [];
  var shownArray = [];
  for (var i=0; i<productObject.length;i++){
    counterArray.push(productObject[i].counter);
    shownArray.push(productObject[i].shown);
  }
  var chart = new Chart(placeOfChart, {
    type: 'bar',
    data: {
      labels: imageName,
      datasets: [{
        label: 'Number of view',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: shownArray
      }
      ,{label: 'Number of votes',
        backgroundColor: 'rgb(155, 99, 132)',
        borderColor: 'rgb(155, 99, 132)',
        data: counterArray}
      ]
    },
    options: {}
  });}

function set(){
  var productObjectStorage = JSON.stringify(productObject);
  localStorage.setItem('set1',productObjectStorage);
}

function get(){
  var set1 = localStorage.getItem('set1');
  console.log(set1);
  if(set1 !== null) {
    console.log('hi');
    productObject = JSON.parse(set1);
    renderList();
  }
}
get();
