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
				list.append("<li>" + account.afName + " " +	account.alName + "</li>" + 
					"<li>Number: " + account.aAccountNumber +  "</li>" + 
					"<li>Mailing Address: " + account.aMailing + "</li>" + 
					"<li>Billing Address: " + account.aBilling + "</li>" +
					"<li>Credit Card: *****" + account.acCard.substr(5,6) + "</li>" +
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
	$("#upd-mailing").val(currentAccount.aMailing);
	$("#upd-billing").val(currentAccount.aBilling);
	$("#upd-creditCard").val("*****" + currentAccount.acCard.substr(5,6));
	$("#upd-email").val(currentAccount.aEmail);
	$("#upd-password").val(pass);
	
	$("#username").html("Username: " + currentAccount.aUsername);
	$("#fname").html("First Name: " + currentAccount.afName);
	$("#lname").html("Last Name: " + currentAccount.alName);
	$("#mailingA").html("Mailing Address: " + currentAccount.aMailing);
	$("#billingA").html("Billing Address: " + currentAccount.aBilling);
	$("#cCard").html("Credit Card Number: *****" + currentAccount.acCard.substr(5,6));
	$("#email").html("Email: " + currentAccount.aEmail);
	$("#password").html("Password: " + pass);
	
});

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
		list.append("<li><a onClick=GetProduct("+item.id+")> <img src="+ item.img+ "/>" + item.itemName + "</a></li>");
		}
		list.listview("refresh");
		
		var iname= $("#catName2");
		iname.empty();
		iname.append("<center>"+currentCategory.name+"</center>");

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

/**$(document).on('pagebeforeshow', "#history", function(event, ui) {
	$.ajax({
		url : "http://localhost:3412/Project1Srv/histories",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var historyList = data.histories;
			var len = historyList.length;
			var list = $("#purchase-list");
			list.empty();
			var history;
			history = historyList[0];
			list.append("<li><a onClick=GetProduct("+ history.productList[0].id +")>"  
				+ history.productList[0].itemName + "</a></li>"");
			list.listview("refresh");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});**/

///////////////////////////////
function ConverToJSON(formData){
	var result = {};
	$.each(formData, 
		function(i, o){
			result[o.name] = o.value;
	});
	return result;
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
			currentAccount = data.account;
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

function UpdateAccount(){
	alert("Account Saved!");
}

function DeleteAccount(){
	var desicion = confirm("Delete Account?")
	if(desicion == true) {
		alert("Account Deleted");		
	}
}

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
				alert("Category error.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}

var currentHistory = {};

function GetHistory(hid){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/histories/"+ hid,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentCategory= data.category;
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
