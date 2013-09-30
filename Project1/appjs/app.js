var accountList = new Array(
	new Account("Luis", "123", "Puerto Rico", "Puerto Rico", "987654321", "****")
);

$(document).on('pagebeforeshow', "#accounts", function( event, ui ) {
	var len = accountList.length;
	var list = $("#account-list");
	list.empty();
	var account;
	for (var i=0; i < len; ++i){
		account = accountList[i];
		list.append("<h2>" + account.customerName + "</h2>" + 
			"<p><strong>Number: " + account.accountNumber +  "</strong></p>" + 
			"<p> Mailing Address: " + account.mailingAddress + "</p>" + 
			"<p> Billing Address: " + account.billingAddress + "</p>" +
			"<p> Credit Card: *****" + account.creditCard.substr(5,6) + "</p>" +
			"<p class=\"ui-li-aside\"> Rank: " + account.rank + "</p>");
	}
	list.listview("refresh");
});