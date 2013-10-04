
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