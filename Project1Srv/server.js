// Express is the web framework 
var express = require('express');
var app = express();
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.configure(function () {
  app.use(allowCrossDomain);
});


app.use(express.bodyParser());

//Account: 

var account = require("./account.js");
var Account = account.Account;

var accountList = new Array(
	new Account("Luis", "123", "Puerto Rico", "Puerto Rico", "987654321", "****")	
);
 var accountNextId = 0;
 
for (var i=0; i < accountList.length;++i){
	accountList[i].id = accountNextId++;
}

//Category

var category= require("./category.js");
var Category= category.Category;
var categoryList= new Array(
	new Category ("ArtBooks"),
	new Category ("ChildrenBooks"),
	new Category ("ComicBooks"),
	new Category ("MysteryBooks"),
	new Category ("RomanceBooks"),
	new Category ("ScienceBooks"),
	new Category ("ScienceFictionBooks"),
	new Category ("ArtsMagazine"),
	new Category ("ElectronicsMagazine"),
	new Category ("EntertainmentMagazine"),
	new Category ("FashionMagazine"),
	new Category ("MoviesMagazine"),
	new Category ("NewsMagazine"),
	new Category ("ScienceMagazine"),
	new Category ("TvElectronics"),
	new Category ("AudioElectronics"),
	new Category ("PhonesElectronics"),
	new Category ("CamerasElectronics"),
	new Category ("VideoElectronics"),
	new Category ("LaptopsComp"),
	new Category ("DesktopComp"),
	new Category ("TabletsComp"),
	new Category ("PrintersComp"),
	new Category ("ChildrenClothes"),
	new Category ("MenShirts"),
	new Category ("MenPants"),
	new Category ("MenSocks"),
	new Category ("WomenShirts"),
	new Category ("WomenPants"),
	new Category ("WomenDresses"),
	new Category ("ChildrenShoes"),
	new Category ("MenShoes"),
	new Category ("BicycleSports"),
	new Category ("KayakSports"),
	new Category ("GolfSports"),
	new Category ("FishingSports")
);

//Product:

var product = require("./product.js");
var Product = product.Product;

var artsBooksList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var fictionBooksList= new Array(
	new Product("Eragon", "5.00", "5", "New", "Puerto Rico", "Standard", "Paypal", "Author: Christopher Paolini", "item.html"),
	new Product("Harry Potter", "12.00", "25", "New", "Wisconsin", "Standard", "Paypal", "Author: J.K. Rowling", "item.html")
);

categoryList[0].productList= artsBooksList;
categoryList[6].productList= fictionBooksList;

// REST Operations
// Idea: Data is created, read, updated, or deleted through a URL that 
// identifies the resource to be created, read, updated, or deleted.
// The URL and any other input data is sent over standard HTTP requests.
// Mapping of HTTP with REST 
// a) POST - Created a new object. (Database create operation)
// b) GET - Read an individual object, collection of object, or simple values (Database read Operation)
// c) PUT - Update an individual object, or collection  (Database update operation)
// d) DELETE - Remove an individual object, or collection (Database delete operation)

// REST Operation - HTTP GET 
app.get('/Project1Srv/accounts', function(req, res) {
	console.log("GET");
	
	var response = {"accounts" : accountList};
  	res.json(response);
});

app.get('/Project1Srv/products', function(req, res){
	
	console.log("GET");
	var response = {"products": artsBooksList};
	res.json(response);
	
});

app.get('/Project1Srv/categories', function(req, res){
	
	console.log("GET");
	var response = {"categories": categoryList};
	res.json(response);
	
});

app.get('/Project1Srv/categories:id', function(req, res){
		
	var id = req.params.id;
	console.log("GET category:"+ id);
	var target = -1;
		for (var i=0; i < categoryList.length; ++i){
			if (categoryList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Category not found.");
		}
		else {
			var response = {"category" : categoryList[target]};
  			res.json(response);	
  		}		
});


// REST Operation - HTTP GET 
app.get('/Project1Srv/accounts/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET account: " + id);

	if ((id < 0) || (id >= accountNextId)){
		// not found
		res.statusCode = 404;
		res.send("Account not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < accountList.length; ++i){
			if (accountList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Account not found.");
		}
		else {
			var response = {"account" : accountList[target]};
  			res.json(response);	
  		}	
	}
});

// REST Operation - HTTP PUT to updated a car based on its id
app.put('/Project1Srv/accounts/:id', function(req, res) {
	var id = req.params.id;
		console.log("PUT account: " + id);

	if ((id < 0) || (id >= accountNextId)){
		// not found
		res.statusCode = 404;
		res.send("Account not found.");
	}
	else if(!req.body.hasOwnProperty('make') || !req.body.hasOwnProperty('model')
  	|| !req.body.hasOwnProperty('year') || !req.body.hasOwnProperty('price') || !req.body.hasOwnProperty('description')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for account.');
  	}
	else {
		var target = -1;
		for (var i=0; i < accountList.length; ++i){
			if (accountList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Car not found.");			
		}	
		else {
			var theAccount= accountList[target];
			theAccount.make = req.body.make;
			theAccount.model = req.body.model;
			theAccount.year = req.body.year;
			theAccount.price = req.body.price;
			theAccount.description = req.body.description;
			var response = {"Carritos" : theAccount};
  			res.json(response);		
  		}
	}
});

// REST Operation - HTTP DELETE to delete a car based on its id
app.del('/Project1Srv/accounts/:id', function(req, res) {
	var id = req.params.id;
		console.log("DELETE account: " + id);

	if ((id < 0) || (id >= accountNextId)){
		// not found
		res.statusCode = 404;
		res.send("Account not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < accountList.length; ++i){
			if (accountList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Account not found.");			
		}	
		else {
			accountList.splice(target, 1);
  			res.json(true);
  		}		
	}
});

// REST Operation - HTTP POST to add a new a car
app.post('/Project1Srv/accounts', function(req, res) {
	console.log("POST");

  	if(!req.body.hasOwnProperty('customerName') || !req.body.hasOwnProperty('accountNumber')
  	|| !req.body.hasOwnProperty('mailingAddress') || !req.body.hasOwnProperty('billingAddress') || !req.body.hasOwnProperty('creditCard')
  	|| !req.body.hasOwnProperty('rank')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for account.');
  	}

  	var newAccount = new Account(req.body.customerName, req.body.accountNumber, req.body.mailingAddress, req.body.billingAddress, req.body.creditCard, req.body.rank);
  	console.log("New Account: " + JSON.stringify(newAccount));
  	newAccount.id = accountNextId++;
  	accountList.push(newAccount);
  	res.json(true);
});


// Server starts running when listen is called.
app.listen(process.env.PORT || 3412);
console.log("server listening");
