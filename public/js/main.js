const staticUserID = '5eb45d392661049473f808af';
$(document).ready(function () {
  getProducts();
  getUser(); 
});

function getUser(){
  var request = new XMLHttpRequest();
  request.open('GET', `https://wake-pritvi-task.herokuapp.com/user/${staticUserID}`);
  request.onload = function () {
    var userData = request.responseText;
    var userJson = JSON.parse(userData);

    console.log(userJson);
    var html = parseUserHTML(userJson); 
    
    var jumbo = document.getElementById('flex-container'); 
    jumbo.innerHTML+= html;

    jumbo.innerHTML+= `<button id="" class="transaction-button-class" onclick="getTransaction('` + staticUserID + `')"><b>Transaction</b></button>`
    


  };
  request.send();

}

function parseUserHTML(userJson){
  var HTMLstring = ` <h2 class="display-3"><span class="prod-price-span">Balance : $${userJson.wallet}</span></h2>
  <h4 class="prod-title"><span class="prod-title-span">Name : ${userJson.name}</span></h4>
  <h4 class="prod-title"><span class="prod-title-span">Email : ${userJson.email}</span></h4>
  <h4 class="prod-title"><span class="prod-title-span">User id : ${userJson._id}</span></h4>`; 

  return HTMLstring; 
}






function getProducts() {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://wake-pritvi-task.herokuapp.com/product');
  request.onload = function () {
    var productData = request.responseText;
    var productJson = JSON.parse(productData);
    var f = renderHTML(productJson);
    //console.log(productJson);

    //console.log(f);
    var documentRow = document.getElementById('main-row');
    documentRow.innerHTML = f;

  };
  request.send();
}

function renderHTML(productJson) {
  var HTMLstring = "";
  for (i = 0; i < productJson.length; i++) {
    var id = productJson[i]._id;
    var button = `<button id="${productJson[i]._id}" class="buy-button-class" onclick="buyButton('` + id + `')"><b>Buy now</b></button>`;
    HTMLstring += `<div class ="col-lg-3 col-xl-3 col-sm-6 col-12">
        <div class="card">
          <div id="picture-div-id" class="picture-div-class center-cropped"
          style="background-image: url('${productJson[i].image}');">
             
          </div>
          <div class="container">
            <h4 class="prod-title"><span class="prod-title-span">${productJson[i].pname}</span></h4>
            <h4 class="prod-price"><span class="prod-price-span">Price : <b> $${productJson[i].price} </b></span></h4>
            <p>
              ${button}
            </p>
          </div>
        </div>
      </div>`;
  }
  return HTMLstring;
}

function buyButton(prodID) {
  var request = new XMLHttpRequest();
  request.open('GET', `https://wake-pritvi-task.herokuapp.com/product/${prodID}`);
  request.onload = function () {
    var productData = request.responseText;
    var productJson = JSON.parse(productData);
    console.log(productJson);



  };
  request.send();

}

function getTransaction(morning){

}