function Product(itemName, price, quantity, condition, location, shipping, payment, description, itemPage){
	this.id="";
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
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var fictionBooksList= new Array(
	new Product("Eragon", "5.00", "5", "New", "Puerto Rico", "Standard", "Paypal", "Author: Christopher Paolini", "item.html"),
	new Product("Harry Potter", "12.00", "25", "New", "Wisconsin", "Standard", "Paypal", "Author: J.K. Rowling", "item.html")
);

$(document).on('pagebeforeshow', "#artsBooks", function(event, ui) {
	var len =artsBooksList.length;
	var list = $("#artsBooks-list");
	list.empty();
	var book;
	for (var i=0; i < len; ++i){
		book =artsBooksList[i];
		list.append("<li><a onClick=GetProduct("+book.price+")>" + book.itemName + "</a></li>");
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
		list.append("<li><a onClick=GetProduct("+book.price+")>" + book.itemName + "</a></li>");
	}
	list.listview("refresh");
});

$(document).on('pagebeforeshow', "#productPage", function(event, ui) {
	
	var parameters= $(this).data("url").split("?")[1];
    parameter = parameters.replace("p=","");  
    var table1= $("#my-table");
	table1.append("<td><b class=&quot;ui-table-cell-label&quot;>Price:	</b> $"+parameter+"</td>");
	$('#item-image').prepend('<img id="theImg" src="http://image.weather.com/web/multimedia/images/slideshows/fall09/fall20.jpg" />');
	table1.table("refresh"); 	
});

function GetProduct(value){
	$.mobile.changePage("item.html", {
		data: { p: value},
		type:'get'
	});
}