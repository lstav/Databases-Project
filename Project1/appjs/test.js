var accountList = new Account("Luis", "123", "Puerto Rico", "Puerto Rico", "987654321", "****");

$(document).on('pagebeforeshow', "#accounts", function( event, ui ) {
	// currentCar has been set at this point
	
	$("#name").append("<p>" + accountList.name + "</p>");	
});