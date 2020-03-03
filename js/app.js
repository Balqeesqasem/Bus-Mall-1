'use strict';
// global variables
var productImage = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
var productObject = [];
var numClick = 0;
var counter =[];
var shown = [];
var imgClick;
var countClickImage = 0;
var imageName=[];



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
var idImages = [leftImage,rightImage,centerImage];
var intRandomNumber=[];

// function generate random number
function generateRandomNumber(){
  var randomNumber = getRandomInt(0,productObject.length-1);
  while(intRandomNumber.includes(randomNumber))
  {randomNumber = getRandomInt(0,productObject.length-1);
  }
  intRandomNumber.push(randomNumber);
  return randomNumber;
}
//funtion for create Image
function createImage(image){
  var newRandomNumbe = generateRandomNumber();
  image.setAttribute('src', productObject[newRandomNumbe].urlProduct);
  image.setAttribute('alt',productObject[newRandomNumbe].typeProduct);
  image.setAttribute('id',newRandomNumbe);
}
//funtion for render
function render(){
  for (var i=0;i<idImages.length;i++){
    createImage(idImages[i]);
  }
}

render();
// counter and showen

function intialData(){
  for (var r=0;r<productObject.length;r++){
    counter.push(0);
    shown.push(0);
  }
  imgClick = document.getElementById('allImage');
  imgClick.addEventListener('click',onClick);
}

// event
// var imgClick = document.getElementsByTagName('img');
// for (var l=0; l<imgClick.length;l++){
//   imgClick[l].addEventListener('click',onClick);}



//function of event
function onClick(event){
  // stop it after 25 iterations and make validation
  numClick++;
  // console.log(event.stopPropagation());
  if (numClick>25){
    imgClick.removeEventListener('click', onClick);
    alert('you finish your tamplet');
    for (var li=0;li<productObject.length;li++){
      var unorder = document.getElementById('list');
      var list = document.createElement('li');
      unorder.appendChild(list);
      list.textContent= `${productObject[li].name} had ${counter[li]} votes and was shown ${shown[li]} times.`;}
    barChart();
  }
  else{
    shown[leftImage.id]++;
    shown[rightImage.id]++;
    shown[centerImage.id]++;
    if(countClickImage === 5){
      countClickImage= 0;
      intRandomNumber = [];
    }

    console.log(intRandomNumber);
    countClickImage++;
    render();
    var index = event.target.id;
    counter[index]++;
  }
}

// The type of chart we want to create is bar
function barChart(){
  var placeOfChart = document.getElementById('chart').getContext('2d');
  var chart = new Chart(placeOfChart, {
    type: 'bar',
    data: {
      labels: imageName,
      datasets: [{
        label: 'Number of view',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: shown
      }
      ,{label: 'Number of votes',
        backgroundColor: 'rgb(155, 99, 132)',
        borderColor: 'rgb(155, 99, 132)',
        data: counter}
      ]
    },
    options: {}
  });}


