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
			for (var i=0; i < len; ++i){
				account = accountList[i];
				list.append("<h2>" + account.cfName + " " + 
					account.clName + "</h2><p><strong>Number: " + account.cAccountNumber +  "</strong></p>" + 
					"<p> Mailing Address: " + account.cMailing + "</p>" + 
					"<p> Billing Address: " + account.cBilling + "</p>" +
					"<p> Credit Card: *****" + account.ccCard.substr(5,6) + "</p>" +
					"<p class=\"ui-li-aside\"> Rank: " + account.rank + "</p></a>");
			}
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
	var len = currentAccount.cPassword.length;
	var pass = "";
	for (var i=0; i < len; ++i){
		pass = pass + "*";
	}
	
	$("#upd-username").val(currentAccount.cUsername);
	$("#upd-fname").val(currentAccount.cfName);
	$("#upd-lname").val(currentAccount.clName);
	$("#upd-mailing").val(currentAccount.cMailing);
	$("#upd-billing").val(currentAccount.cBilling);
	$("#upd-creditCard").val("*****" + currentAccount.ccCard.substr(5,6));
	$("#upd-email").val(currentAccount.cEmail);
	$("#upd-password").val(pass);
	
	$("#username").html("Username: " + currentAccount.cUsername);
	$("#fname").html("First Name: " + currentAccount.cfName);
	$("#lname").html("Last Name: " + currentAccount.clName);
	$("#mailingA").html("Mailing Address: " + currentAccount.cMailing);
	$("#billingA").html("Billing Address: " + currentAccount.cBilling);
	$("#cCard").html("Credit Card Number: *****" + currentAccount.ccCard.substr(5,6));
	$("#email").html("Email: " + currentAccount.cEmail);
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
	$.mobile.loading("show");
	var form = $("#account-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newAccount = ConverToJSON(formData);
	console.log("New Account: " + JSON.stringify(newAccount));
	var newAccountJSON = JSON.stringify(newAccount);
	$.ajax({
		url : "http://localhost:3412/Project1Srv/accounts",
		method: 'post',
		data : newAccountJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#accounts");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Data could not be added!");
		}
	});
}

var currentAccount = {};

function GetAccount(cid){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/accounts/" + cid,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentAccount = data.account;
			$.mobile.loading("hide");
			$.mobile.navigate("#account-view");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Account not found.");
			}
			else {
				alter("Internal Server Error.");
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
