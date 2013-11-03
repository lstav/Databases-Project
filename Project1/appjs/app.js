
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
						
			var img= $("#user-image");
			img.empty();
			img.append("<p> <center> <img src='http://img707.imageshack.us/img707/9563/i5n.gif'/> </center> </p>");
			
			var iname= $("#username");
			iname.empty();
			iname.append("<center>"+currentAccount.ausername+"</center>");
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

$(document).on('pagebeforeshow', "#profile-page", function( event, ui ) {
	
	var list= $("#profile-info");
	list.empty();
	list.append("<li><a <h4>Name: "+profile.afname +" "+ profile.alname+"</h4></a> </li>");
	list.append("<li><a <h4>Rank: "+ profile.rank  +"</h4></a> </li>");
	//list.append("<li><a <h4>Location:"+profile.location  +"</h4></a> </li>");
	
	var iname= $("#username");
	iname.empty();
	iname.append("<center>"+profile.ausername+"</center>");
	
	var img= $("#user-image");
	img.empty();
	img.append("<p> <center> <img src='http://img707.imageshack.us/img707/9563/i5n.gif'/> </center> </p>");
	list.listview("refresh");

});

$(document).on('pagebeforeshow', "#uSalePage", function(event, ui) {
	
	var iname= $("#message");
	iname.empty();
	iname.append("<center>No sales to display.</center>");
	
	$.ajax({
		url : "http://localhost:3412/Project1Srv/categories",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){

		var productCat = currentSalesList;
		var len =productCat.length;
		
		if(len==0){
			var iname= $("#message");
			iname.empty();
			iname.append("<center>No sales to display.</center>");
			
			if(profile.ausername== currentAccount.ausername){
			var sell= $("#sell-button");
			sell.empty();
			sell.append("<h4>Sell an item</h4>");
			}
		}
		else{
		var list = $("#sales-list");
		list.empty();
		var item;
		for (var i=0; i < len; ++i){
		item =productCat[i];
		list.append("<li><a onClick=GetProduct("+item.pid+")> <img src='"+ item.img+ "'/>" + item.itemname + "<h4> Price: $"+item.price+"<\h4></a></li>");
		}
		list.listview("refresh");}},
		
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data item not found!");
		}
	});

});

$(document).on('pagebeforeshow', "#auctionPage", function(event, ui) {

$.ajax({
		url : "http://localhost:3412/Project1Srv/categories",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){

		var productCat = currentAuctionList;
		var len =productCat.length;
		
		if(len==0){
			var iname= $("#message");
			iname.empty();
			iname.append("<center>No auctions to display.</center>");
			
			if(profile.ausername== currentAccount.ausername){
			var sell= $("#sell-button");
			sell.empty();
			sell.append("<h4>Sell an item</h4>");
			}
		}
		else{
		var list = $("#auction-list");
		list.empty();
		var item;
		for (var i=0; i < len; ++i){
		item =productCat[i];
		list.append("<li><a onClick=GetProduct("+item.pid+")> <img src='"+ item.img+ "'/>" + item.itemname + "<h4> Price: $"+item.price+"<\h4></a></li>");
		}
		list.listview("refresh");}
		
		},
		
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data item not found!");
		}
	});

});

///// Category and product

$(document).on('pagebeforeshow', "#catProductView", function(event, ui) {
	
	$.ajax({
		url : "http://localhost:3412/Project1Srv/categories",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){

		var productCat = currentCategoryProducts;
		var len =productCat.length;
		var list = $("#product-list");
		list.empty();
		var item;
		for (var i=0; i < len; ++i){
		item =productCat[i];
		list.append("<li><a onClick=GetProduct("+item.pid+")> <img src='"+ item.img+ "'/>" + item.itemname + "<h4> Price: $"+item.price+"<\h4></a></li>");
		}
		list.listview("refresh");
		
		var iname= $("#catName2");
		iname.empty();
		iname.append("<center>"+currentCategory+"</center>");
		
		},
		
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data item not found!");
		}
	});
	
});

$(document).on('pagebeforeshow', "#productPage", function(event, ui) {
	
    //var table1= $("#my-table");
	//table1.append("<td><b class=&quot;ui-table-cell-label&quot;>Price:	</b> $"+currentProduct.price  +"</td>");
	//table1.append("<td><b class=&quot;ui-table-cell-label&quot;>Quantity:	</b> "+currentProduct.quantity  +"</td>");
	//table1.append("<td><b class=&quot;ui-table-cell-label&quot;>Condition:	</b> "+currentProduct.condition  +"</td>");
	//table1.append("<td><b class=&quot;ui-table-cell-label&quot;>Shipping:	</b> "+currentProduct.shipping  +"</td>");
	//table1.append("<td><b class=&quot;ui-table-cell-label&quot;>Payments:	</b> "+currentProduct.payment  +"</td>");
	
	var list= $("#item-info");
	list.empty();
	list.append("<li><a <h4>Price:	 $"+currentProduct.price  +"</h4></a> </li>");
	list.append("<li><a <h4>Quantity: "+currentProduct.quantity  +"</h4></a> </li>");
	list.append("<li><a <h4>Condition:"+currentProduct.condition  +"</h4></a> </li>");
	list.append("<li><a <h4>Location:"+currentProduct.location  +"</h4></a> </li>");
	list.append("<li><a <h4>Shipping: "+currentProduct.shipping  +"</h4></a> </li>");
	list.append("<li><a <h4>Payments: "+currentProduct.payment  +"</h4></a> </li>");

	var pid= $("#productid");
	pid.append("ID:"+currentProduct.id+"<br>");
	
	var idescription= $("#description");
	idescription.append("<p>"+currentProduct.description+"</p>");
	$('#item-image').prepend('<center><img id="theImg" src="' + currentProduct.img+'"/></center>');
	//table1.table("refresh"); 
	
	var pname= $("#productName2");
	pname.empty();
	pname.append("<center>"+currentProduct.itemname+"</center>");
		
	var pname= $("#sellerInfo");
	pname.empty();
	pname.append("<a href=# onClick= GoProfile('"+currentProduct.seller+"')><h5>"+currentProduct.seller+"</h5>");
	
	list.listview("refresh");

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
var profile={};

function GetAccount(aid){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/accounts/" + aid,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentAccount = aconvert(data.account);
			profile= aconvert(data.account);
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

function GoProfile(id){
	console.log("getting profile");
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/profiles/"+id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			profile= data.profile[0];
			$.mobile.loading("hide");
			$.mobile.changePage("profile.html");
			},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Profile loading error.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});	
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
			currentProduct= data.product[0];
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
	
function Sortby(id){

	$.ajax({
		url : "http://localhost:3412/Project1Srv/sortProducts/"+ id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentCategoryProducts= data.productsIncategory;
			$.mobile.navigate("#catProductView");		
			//window.location.reload(true);
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Product loading error.");
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

var currentCategory= {};
function GetCategory(id){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/category/"+ id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentCategory= data.categoryName[0].name;},			
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Category does not exist!");
			}
			else {
				alter("Internal Server Error.");
			}
		}

	});
}

var currentCategoryProducts = {};
function GetCategoryProducts(id){
	GetCategory(id);
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/categoryProducts/"+ id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentCategoryProducts= data.productsIncategory;
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

var currentAuctionList = {};
function GetAuctions(){
	id= profile.ausername;
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/auctions/"+ id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentAuctionList= data.userAuctions;
			$.mobile.loading("hide");
			$.mobile.changePage("uauctions.html", {
				info: id,
			});},			
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Sales Empty!");
			}
			else {
				alter("Internal Server Error.");
			}
		}

	});
}

var currentSalesList = {};
function GetSales(){
	id= profile.ausername;
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/sales/"+ id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentSalesList= data.userSales;
			$.mobile.loading("hide");
			$.mobile.changePage("usales.html", {
				info: id,
			});},			
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Sales Empty!");
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



