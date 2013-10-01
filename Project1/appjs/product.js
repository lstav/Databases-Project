function Product(itemName, price, quantity, condition, location, shipping, payment, description, itemPage){
	this.id= "";
	this.itemName = itemName;
	this.price = price;
	this.quantity = quantity;
	this.condition = condition;
	this.shipping = shipping;
	this.payment = payment;
	this.description= description;
	this.itemPage= itemPage;
}

var artsBooksList= new Array(
	new Product("Pride & Prejudice", "5.00", "5", "New", "Puerto Rico", "Standard", "Paypal", "Author: Jane Austen", "item.html"),
	new Product("Harry Potter", "12.00", "25", "New", "Wisconsin", "Standard", "Paypal", "Author: J.K. Rowling", "item.html")
);

var fictionBooksList= new Array(
	new Product("Pride & Prejudice", "5.00", "5", "New", "Puerto Rico", "Standard", "Paypal", "Author: Jane Austen", "item.html"),
	new Product("Harry Potter", "12.00", "25", "New", "Wisconsin", "Standard", "Paypal", "Author: J.K. Rowling", "item.html")
);

$(document).on('pagebeforeshow', "#artsBooks", function(event, ui) {
	var len =artsBooksList.length;
	var list = $("#artsBooks-list");
	list.empty();
	var book;
	for (var i=0; i < len; ++i){
		book =artsBooksList[i];
		list.append("<li><a onClick=GetProduct("+book.id+")>" + book.itemName + "</a></li>");
	}
	list.listview("refresh");
});


$(document).on('pagebeforeshow', "#fictionBooks", function(event, ui) {
	var len =fictionBooksList.length;
	var list = $("#fictionBooks-list");
	list.empty();
	var book;
	for (var i=0; i < len; ++i){
		book =fictionBooksList[i];
		list.append("<li><a onClick=GetProduct("+book.id+")>" + book.itemName + "</a></li>");
	}
	list.listview("refresh");
});

function GetProduct(id){
	$.mobile.changePage("item.html");
}