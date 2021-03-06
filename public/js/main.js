const staticUserID = '5eb45d392661049473f808af';
$(document).ready(function () {
  getProducts();
  getUser(true);
});

function getUser(flag) {
  var request = new XMLHttpRequest();
  request.open('GET', `https://wake-pritvi-task.herokuapp.com/user/${staticUserID}`);
  request.onload = function () {
    var userData = request.responseText;
    var userJson = JSON.parse(userData);

    //console.log(userJson);
    if (flag) {
      var html = parseUserHTML(userJson);
      var modal = `<div id="myModal" class="modal fade" role="dialog">
      <div class="modal-dialog">
    
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Transactions</h4>
          </div>
          <div class="modal-body" id="modal-body-id">
            <p>Transaction data for user = ${staticUserID}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
    
      </div>
    </div>
    `;
    var butt = `<button id="" class="transaction-button-class" data-toggle="modal" data-target="#myModal" onclick="getTransaction('` + staticUserID + `')"><b>Transaction</b></button>`; 
      var jumbo = document.getElementById('flex-container');
      jumbo.innerHTML = html + butt +modal; 

    }
    //return userJson;

  };
  request.send();
}

function parseUserHTML(userJson) {
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



    var request2 = new XMLHttpRequest();
    request2.open('GET', `https://wake-pritvi-task.herokuapp.com/user/${staticUserID}`);
    request2.onload = function () {
      var userData = request2.responseText;
      var userJson = JSON.parse(userData);

      console.log(userJson);
      console.log(productJson);
      if(userJson.wallet >= productJson.price){
        var balance = userJson.wallet-productJson.price; 
        postTransaction(productJson._id, userJson._id, "None", productJson.price); 
        updateWallet(userJson.email, userJson.password, userJson.name, balance);
      }else{
        alert('wallet balance low'); 
      }
      

    };
    request2.send();


  };
  request.send();
}


function postTransaction(pid, uid, cid, amt){
  var updateRequest = new XMLHttpRequest(); 
        updateRequest.open('POST', `https://wake-pritvi-task.herokuapp.com/transaction`); 
        var data = {
          "pid" : pid,
          "uid" : uid,
          "cid" : cid,
          "amount" : amt
        }; 
        updateRequest.setRequestHeader('Content-Type', 'application/json');
        updateRequest.send(JSON.stringify(data)); 
}

function updateWallet(email, password, namex, amt){
  var updateRequest = new XMLHttpRequest(); 
        updateRequest.open('POST', `https://wake-pritvi-task.herokuapp.com/user/update/${staticUserID}`); 
        var data = {
          "email" : email,
          "password" : password,
          "name" : namex,
          "wallet" : amt
        }; 
        updateRequest.setRequestHeader('Content-Type', 'application/json');
        updateRequest.send(JSON.stringify(data)); 
}

function getTransaction(morning) {
  var request = new XMLHttpRequest();
  request.open('GET', `https://wake-pritvi-task.herokuapp.com/transaction/${staticUserID}`);
  request.onload = function () {
    var transactionData = request.responseText;
    var transactionJson = JSON.parse(transactionData);
    var parent = document.getElementById('modal-body-id'); 
    //parent.innerHTML = JSON.stringify(transactionJson);
    var i = 0, temp = ""; 
    for(i = 0; i<transactionJson.length; i++){
      temp += `<p style="font-size:13px"><b>
      ${i} = {transationID = ${JSON.stringify(transactionJson[i]._id)}
      Amount = $${JSON.stringify(transactionJson[i].amount)}
      UserId = ${JSON.stringify(transactionJson[i].uid)}
      ProductId = ${JSON.stringify(transactionJson[i].pid)}
      Coupon Id = ${JSON.stringify(transactionJson[i].cid)}}
      
      </b></p>`;
    }
    parent.innerHTML = temp; 
    //alert(parent);
    //alert(JSON.stringify(transactionJson));
    
  };
  request.send();
}