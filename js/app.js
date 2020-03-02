'use strict';
// global variables
var productImage = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
var productObject = [];
var numClick = 0;


// functions
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


// constructor function
function Product(typeProduct){
  this.typeProduct = typeProduct;
  this.nameProduct = typeProduct.split('.')[0];
  this.urlProduct = `img/${this.typeProduct}`;
  productObject.push(this);
}
for (var i=0;i<productImage.length;i++){
  new Product(productImage[i]);
}

// DOM
var leftImage= document.getElementById('leftImage');
var rightImage = document.getElementById('rightImage');
var centerImage = document.getElementById('centerImage');
var randomNumber = getRandomInt(0,productObject.length-1);
//funtion for render
function render(){
  while(((leftImage.alt === rightImage.alt) || (leftImage.alt === centerImage.alt)) || (rightImage.alt=== centerImage.alt)){
    leftImage.setAttribute('src', productObject[randomNumber].urlProduct);
    leftImage.setAttribute('alt',productObject[randomNumber].typeProduct);
    randomNumber = getRandomInt(0,productObject.length);
    rightImage.setAttribute('src', productObject[randomNumber].urlProduct);
    rightImage.setAttribute('alt',productObject[randomNumber].typeProduct);
    randomNumber = getRandomInt(0,productObject.length);
    centerImage.setAttribute('src', productObject[randomNumber].urlProduct);
    centerImage.setAttribute('alt',productObject[randomNumber].typeProduct);
  }}
render();
// counter and showen
var counter =[];
var shown = [];
console.log(counter);
for (var r=0;r<productObject.length;r++){
  counter.push(0);
  shown.push(0);
}

for(var k=0;k<productObject.length;k++){
  if (productObject[k].typeProduct===leftImage.alt){
    shown[k] +=1;
  }
  else if (productObject[k].typeProduct===rightImage.alt){
    shown[k] +=1;
  }
  else if (productObject[k].typeProduct===centerImage.alt){
    shown[k] +=1;
  }}

// event
// var imgClick = document.getElementsByTagName('img');
// for (var l=0; l<imgClick.length;l++){
//   imgClick[l].addEventListener('click',onClick);}

// another solution
var imgClick = document.getElementById('allImage');
imgClick.addEventListener('click',onClick);

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
      list.textContent= `${productObject[li].nameProduct} had ${counter[li]} votes and was shown ${shown[li]} times.`;}
  }
  else{
    randomNumber = getRandomInt(0,productObject.length);
    leftImage.setAttribute('src', productObject[randomNumber].urlProduct);
    leftImage.setAttribute('alt',productObject[randomNumber].typeProduct);
    randomNumber = getRandomInt(0,productObject.length);
    rightImage.setAttribute('src', productObject[randomNumber].urlProduct);
    rightImage.setAttribute('alt',productObject[randomNumber].typeProduct);
    randomNumber = getRandomInt(0,productObject.length);
    centerImage.setAttribute('src', productObject[randomNumber].urlProduct);
    centerImage.setAttribute('alt',productObject[randomNumber].typeProduct);
    while(((leftImage.alt === rightImage.alt) || (leftImage.alt === centerImage.alt)) || (rightImage.alt=== centerImage.alt)){
      leftImage.setAttribute('src', productObject[randomNumber].urlProduct);
      leftImage.setAttribute('alt',productObject[randomNumber].typeProduct);
      randomNumber = getRandomInt(0,productObject.length);
      rightImage.setAttribute('src', productObject[randomNumber].urlProduct);
      rightImage.setAttribute('alt',productObject[randomNumber].typeProduct);
      randomNumber = getRandomInt(0,productObject.length);
      centerImage.setAttribute('src', productObject[randomNumber].urlProduct);
      centerImage.setAttribute('alt',productObject[randomNumber].typeProduct);
    }
  }

  //counter
  for(var k=0;k<productObject.length;k++){
    if (event.target.alt===productObject[k].typeProduct){
      counter[k] += 1;
    }
    if (productObject[k].typeProduct===leftImage.alt){
      shown[k] +=1;
    }
    else if (productObject[k].typeProduct===rightImage.alt){
      shown[k] +=1;
    }
    else if (productObject[k].typeProduct===centerImage.alt){
      shown[k] +=1;
    }
  }
}

