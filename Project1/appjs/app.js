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
				list.append("<li><a onClick=GetAccount(" + account.cid + ")><h2>" + account.cfName + " " + 
					account.clName + "</h2><p><strong>Number: " + account.cAccountNumber +  "</strong></p>" + 
					"<p> Mailing Address: " + account.cMailing + "</p>" + 
					"<p> Billing Address: " + account.cBilling + "</p>" +
					"<p> Credit Card: *****" + account.ccCard.substr(5,6) + "</p>" +
					"<p class=\"ui-li-aside\"> Rank: " + account.rank + "</p></a></li>");
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
	$("#upd-fname").val(currentAccount.cfName);
	$("#upd-lname").val(currentAccount.clName);
	$("#upd-mailing").val(currentAccount.cMailing);
	$("#upd-billing").val(currentAccount.cBilling);
	$("#upd-creditCard").val(currentAccount.ccCard);
	
});


$(document).on('pagebeforeshow', "#catProductView", function(event, ui) {
	
	$.ajax({
		url : "http://localhost:3412/Project1Srv/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
		var productCat = currentCategory.productList;
		var len =productCat.length;
		var list = $("#product-list");
		list.empty();
		var item;
		for (var i=0; i < len; ++i){
		item =productCat[i];
		list.append("<li><a onClick=GetProduct("+item.price+")>" + item.itemName + "</a></li>");
		}
		list.listview("refresh");},
		
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data item not found!");
		}
	});
	
});

$(document).on('pagebeforeshow', "#productPage", function(event, ui) {
	
	var parameters= $(this).data("url").split("?")[1];
    parameter = parameters.replace("p=","");  
    var table1= $("#my-table");
	table1.append("<td><b class=&quot;ui-table-cell-label&quot;>Price:	</b> $"+parameter+"</td>");
	$('#item-image').prepend('<img id="theImg" src="http://image.weather.com/web/multimedia/images/slideshows/fall09/fall20.jpg" />');
	table1.table("refresh"); 	
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
	$.mobile.loading("show");
	var form = $("#account-view-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var updAccount = ConverToJSON(formData);
	updAccount.id = currentAccount.id;
	console.log("Updated Account: " + JSON.stringify(updAccount));
	var updAccountJSON = JSON.stringify(updAccount);
	$.ajax({
		url : "http://localhost:3412/Project1Srv/accounts/" + updAccount.id,
		method: 'put',
		data : updAccountJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#accounts");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Data could not be updated!");
			}
			else {
				alert("Internal Error.");		
			}
		}
	});
}

function DeleteAccount(){
	$.mobile.loading("show");
	var id = currentAccount.id;
	$.ajax({
		url : "http://localhost:3412/Project1Srv/accounts/" + id,
		method: 'delete',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
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
				alter("Internal Server Error.");
			}
		}
	});
}

function GetProduct(value){
	$.mobile.changePage("item.html", {
		data: { p: value},
		type:'get'
	});
}

var currentCategory = {};

function GetCategory(id){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/categories"+ id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentCategory= data.category;
			$.mobile.loading("hide");
			$.mobile.navigate("#catProductView");},
			
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
