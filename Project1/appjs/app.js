$(document).on('pagebeforeshow', "#accounts", function( event, ui ) {
	console.log("Luis");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/accounts",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var accountList = data.accounts;
			var len = accountList.length;
			var list = $("#account-list");
			list.empty();
			var account;			
				account = accountList[0];
				list.append("<li>" + account.afname + " " +	account.alname + "</li>" + 
					"<li GetAddress(" + account.ashippingid +")>Shipping Address: </li>" + 
					"<li>Billing Address: " + account.abillingid + "</li>" +
					"<li>Credit Card: *****" + account.accard.substr(5,6) + "</li>" +
					"<li> Rank: " + account.rank + "</li>");			
			list.listview("refresh");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});

$(document).on('pagebeforeshow', "#account-view", function( event, ui ) {
	// currentAccount has been set at this point
	var len = currentAccount.aPassword.length;
	var pass = "";
	for (var i=0; i < len; ++i){
		pass = pass + "*";
	}
	
	$("#upd-username").val(currentAccount.aUsername);
	$("#upd-fname").val(currentAccount.afName);
	$("#upd-lname").val(currentAccount.alName);
	$("#upd-shipping").val(currentAccount.aShipping);
	$("#upd-billing").val(currentAccount.aBilling);
	$("#upd-creditCard").val("*****" + currentAccount.acCard.substr(5,6));
	$("#upd-email").val(currentAccount.aEmail);
	$("#upd-password").val(pass);
	
	$("#username").html("Username: " + currentAccount.aUsername);
	$("#fname").html("First Name: " + currentAccount.afName);
	$("#lname").html("Last Name: " + currentAccount.alName);
	$("#shippingA").html("Shipping Address: " + currentAccount.aShipping);
	$("#billingA").html("Billing Address: " + currentAccount.aBilling);
	$("#cCard").html("Credit Card Number: *****" + currentAccount.acCard.substr(5,6));
	$("#email").html("Email: " + currentAccount.aEmail);
	$("#password").html("Password: " + pass);
	
});


///// Category and product

$(document).on('pagebeforeshow', "#catProductView", function(event, ui) {
	
	$.ajax({
		url : "http://localhost:3412/Project1Srv/categories",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){

		var productCat = currentCategory.productList;
		var len =productCat.length;
		var list = $("#product-list");
		list.empty();
		var item;
		for (var i=0; i < len; ++i){
		item =productCat[i];
		list.append("<li><a onClick=GetProduct("+item.id+")> <img src='"+ item.img+ "'/>" + item.itemName + "<h4> Price: $"+item.price+"<\h4></a></li>");
		}
		list.listview("refresh");
		
		var iname= $("#catName2");
		iname.empty();
		iname.append("<center>"+currentCategory.name+"</center>");
		
		var sort= $("#sort-bylist");
		sort.empty();
		sort.append("<li><a>Best Sellers </a></li>");
		sort.append("<li><a>Price: Low to High</a></li>");
		sort.append("<li><a>Price: High to Low</a></li>");
		sort.append("<li><a>Avg. Customer Review</a></li>");
		sort.listview("refresh");
		},
		
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data item not found!");
		}
	});
	
});

$(document).on('pagebeforeshow', "#productPage", function(event, ui) {
	
    var table1= $("#my-table");
	table1.append("<td><b class=&quot;ui-table-cell-label&quot;>Price:	</b> $"+currentProduct.price  +"</td>");
	table1.append("<td><b class=&quot;ui-table-cell-label&quot;>Quantity Available:	</b> "+currentProduct.quantity  +"</td>");
	table1.append("<td><b class=&quot;ui-table-cell-label&quot;>Condition:	</b> "+currentProduct.condition  +"</td>");
	table1.append("<td><b class=&quot;ui-table-cell-label&quot;>Shipping:	</b> "+currentProduct.shipping  +"</td>");
	table1.append("<td><b class=&quot;ui-table-cell-label&quot;>Payments:	</b> "+currentProduct.payment  +"</td>");

	var idescription= $("#description");
	idescription.append("<p>"+currentProduct.description+"</p>");
	$('#item-image').prepend('<center><img id="theImg" src="' + currentProduct.img+'"/></center>');
	table1.table("refresh"); 
	
	var pname= $("#productName2");
	pname.empty();
	pname.append("<center>"+currentProduct.itemName+"</center>");
});

////////// Checkout

$(document).on('pagebeforeshow', "#checkoutItem", function(event, ui) {
	
	var info= $("#totalPurchase");
	info.empty();
	info.append("Total: $     "+ shoppingcartTotal);
	
});

////////// Shopping Cart

var shoppingcartTotal=0;

$(document).on('pagebeforeshow', "#shopCartView", function(event, ui) {
	$.ajax({
		url : "http://localhost:3412/Project1Srv/shoppingcarts",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var shoppingcartList = data.shoppingcarts;
			var len =shoppingcartList[0].productList.length;
			var list = $("#shopping-list");
			list.empty();
			var shoppingcart;
			shoppingcart = shoppingcartList[0];
			shoppingcartTotal=0;
			for (var i=0; i < len; ++i){
				shoppingcartTotal+= parseFloat(shoppingcart.productList[i].price);
				list.append("<li data-icon='delete' ><a onClick=DeleteShoppingCart(" + shoppingcart.productList[i].id + ")>"+ 
				"<img src='"+ shoppingcart.productList[i].img+ "'/>" + shoppingcart.productList[i].itemName + 
					"<h4> Price: $"+shoppingcart.productList[i].price+"<\h4></a></li>");
			}	
			if (len < 1){
				list.append("<li data-icon='false'> <a No items in your shopping cart. </a> </li>");
			}
			list.listview("refresh");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});

//////// History

$(document).on('pagebeforeshow', "#history", function(event, ui) {
	$.ajax({
		url : "http://localhost:3412/Project1Srv/histories",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var historyList = data.histories;
			var hlen = historyList.length;
			for (var j=0; j<hlen; j++) {
				if (historyList[j].purchased == 0) {		
					var len = historyList[j].productList.length;
					var list = $("#purchase-list");
					list.empty();
					var history;
					history = historyList[j];
					for(var i=0; i<len; i++) {
						list.append("<li><a onclick=GetProduct(" + history.productList[i].id + ")>" +
							"<h2>" + history.productList[i].itemName + "</h2>" + 
							"<p><strong> Payment: " + history.productList[i].payment + "</strong></p>" + 
							"<p>" + history.productList[i].description + "</p>" +
							"<p class=\"ui-li-aside\">$" + history.productList[i].price + "</p>" +
							"</a></li>");
					}
					list.listview("refresh");
				} else if (historyList[j].purchased == 1) {
					var len = historyList[j].productList.length;
					var list = $("#sale-list");
					list.empty();
					var history;
					history = historyList[j];
					for(var i=0; i<len; i++) {
						list.append("<li><a onclick=GetProduct(" + history.productList[i].id + ")>" +
							"<h2>" + history.productList[i].itemName + "</h2>" + 
							"<p><strong> Payment: " + history.productList[i].payment + "</strong></p>" + 
							"<p>" + history.productList[i].description + "</p>" +
							"<p class=\"ui-li-aside\">$" + history.productList[i].price + "</p>" +
							"</a></li>");
					}
					list.listview("refresh");
				}
			}
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});


////////// Message

$(document).on('pagebeforeshow', "#inbox", function(event, ui) {
	$.ajax({
		url : "http://localhost:3412/Project1Srv/messages",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var messageList = data.messages;
			var len = messageList.length;
			var list = $("#inbox-list");
			list.empty();
			var message;
			message = messageList[0];
			list.append("<li><h2>"+message.sName+ "</h2><p>" +message.mText+"</p></li>");
			list.listview("refresh");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});
$(document).on('pagebeforeshow', "#sent", function(event, ui) {
	$.ajax({
		url : "http://localhost:3412/Project1Srv/messages",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var messageList = data.messages;
			var len = messageList.length;
			var list = $("#sentMessage-list");
			list.empty();
			var message;
			message = messageList[1];
			list.append("<li><h2>"+message.sName+ "</h2><p>" +message.mText+"</p></li>");
			list.listview("refresh");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});

///////////////////////////////
function ConverToJSON(formData){
	var result = {};
	$.each(formData, 
		function(i, o){
			result[o.name] = o.value;
	});
	return result;
}

function aconvert(dbModel){
	var aliModel = {};
	
	aliModel.aid = dbModel.aid;
	aliModel.afName = dbModel.afname;
	aliModel.alName = dbModel.alname;
	aliModel.aEmail = dbModel.aemail;
	aliModel.aUsername = dbModel.ausername;
	aliModel.aPassword = dbModel.apassword;
	aliModel.aShipping = dbModel.ashippingid;
	aliModel.aBilling = dbModel.abillingid;
	aliModel.acCard = dbModel.accard;
	aliModel.rank = dbModel.rank;
	
	return aliModel;
}

function SaveAccount(){
	alert("Account Created!");
}

var currentAccount = {};

function GetAccount(aid){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/accounts/" + aid,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentAccount = aconvert(data.account);
			$.mobile.loading("hide");
			$.mobile.navigate("#accounts");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Account not found.");
			}
			else {
				alert("Internal Server Error.");
			}
		}
	});
}

function adconvert(dbModel){
	var adliModel = {};
	
	adliModel.addressid = dbModel.addressid;
	adliModel.address = dbModel.address;
	
	return adliModel;
}

var currentAddress = {};

function GetAddress(addressid){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/address/" + addressid,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentAddress = adconvert(data.address);
			$.mobile.loading("hide");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Address not found.");
			}
			else {
				alert("Internal Server Error.");
			}
		}
	});
}

function UpdateAccount(){
	alert("Account Saved!");
}

function DeleteAccount(){
	var decision = confirm("Delete Account?");
	if(decision == true) {
		alert("Account Deleted");
	}
}

////// Product

var currentProduct= {};
function GetProduct(id){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/products/"+ id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentProduct= data.product;
			$.mobile.loading("hide");	
			$.mobile.changePage("item.html");
			},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Product error.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});}
	
//////// Shopping Cart

var currentShoppingCart = {};
function GetShoppingCart(scid){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/shoppingcarts/"+ scid,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentShoppingCart= data.shoppingcart;
			$.mobile.loading("hide");
			$.mobile.changePage("shopping.html");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Shopping Cart error.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}
	
function UpdateShoppingCart(){
	alert("Account Saved!");
}

function DeleteShoppingCart(id){
	var decision = confirm("Delete Product?");
		if(decision == true) {
			alert("Product Deleted");		
		}
}

//////// Category

var currentCategory = {};
function GetCategory(id){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/categories/"+ id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentCategory= data.category;
			$.mobile.loading("hide");
			$.mobile.navigate("#catProductView", {
				info: id,
			});},			
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Category Empty!");
			}
			else {
				alter("Internal Server Error.");
			}
		}

	});
}

////// Check out

function checkOut(scid){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/shoppingcarts/"+scid,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentShoppingCart= data.shoppingcart;
			$.mobile.loading("hide");
			$.mobile.navigate("check.html");
			},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Check out error.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});	
}

/////////// History

var currentHistory = {};
function GetHistory(hid){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/histories/"+ hid,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentHistory= data.history;
			$.mobile.loading("hide");
			$.mobile.navigate("#history", {
				info: hid,
			});},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("History error.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}

/////////// Message

var currentMessage = {};
function GetMessage(mid){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/messages/" + mid,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentMessage = data.message;
			$.mobile.loading("hide");
			if(mid==0)
			$.mobile.navigate("inbox.html");
			else
			$.mobile.navigate("sentMessages.html");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Message not found.");
			}
			else {
				alert("Internal Server Error.");
			}
		}
	});
}

function submitMessage(){
	alert("Message have been sent");
	location.href="message.html";
}

////// Order

function SaveOrder(){
	alert("Order Processed!");
}

///// Bid

function UpdateBid(){
	alert("Bid submitted!");
}



