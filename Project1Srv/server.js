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
	new Account("Luis", "Tavarez", "123", "lt@example.com", "123456", "luistavarez", "Example Example Puerto Rico", "Example Example Puerto Rico", "987654321", "****"),
	new Account("Heidi", "Negron", "323", "lt@example.com", "321456", "heidinegron", "Example Example Puerto Rico", "Example Example Puerto Rico", "123456789", "****"),
	new Account("Lexter", "Seda", "232", "lt@example.com", "123321", "lexterseda", "Example Example Puerto Rico", "Example Example Puerto Rico", "098765432", "****")
	
);
var accountNextId = 0;
 
for (var i=0; i < accountList.length;++i){
	accountList[i].aid = accountNextId++;
}

//Product:

var product = require("./product.js");
var Product = product.Product;

var artsBooksList= new Array(
	new Product("Women Artists: An Illustrated History", "27.55", "12", "New", "California", "Standard", "Visa, Paypal", "Authors: Nancy G. Heller & Ovidio Guaita", "http://img689.imageshack.us/img689/9591/q9en.jpg"),
	new Product("The Bay Area School", "52.43", "2", "New", "Florida", "Standard", "Paypal", "Authors: Thomas Williams & Michael Peppiatt", "http://img15.imageshack.us/img15/9931/aaku.jpg")
);

var comicBooksList= new Array(
	new Product("The Walking Dead Volume 19 TP: March to War", "9.07", "12", "New", "California", "Standard", "Visa, Paypal", "Authors: Robert Kirkman & Charlie Adlard", "http://img703.imageshack.us/img703/8320/ca18.jpg"),
	new Product("Justice League, Vol.3: Throne of Atlantis (The New 52)", "16.98", "2", "New", "Florida", "Standard", "Paypal", "Authors: Geoff Johns & Ivan Reis", "http://img203.imageshack.us/img203/7104/s6hg.jpg")
);

var mysteryBooksList= new Array(
	new Product("Istanbul Passage: A Novel", "10.38", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Joseph Kanon", "http://img23.imageshack.us/img23/4227/kfh2.jpg"),
	new Product("Doctor Sleep: A Novel", "10.99", "2", "New", "Florida", "Standard", "Paypal", "Author: Stephen King", "http://img703.imageshack.us/img703/2497/yyvw.jpg")
);

var romanceBooksList= new Array(
	new Product("Beautiful Disaster: A Novel", "11.20", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Jamie McGuire", "http://img17.imageshack.us/img17/8192/cdt8.jpg"),
	new Product("Fifty Shades of Grey", "10.04", "2", "New", "Florida", "Standard", "Paypal", "Author: E L James", "http://img694.imageshack.us/img694/8062/osbz.jpg")
);

var fictionBooksList= new Array(
	new Product("A Dance with Dragons ( A Song of Ice and Fire, Book 5)", "19.97", "5", "New", "Puerto Rico", "Standard", "Paypal", "Author: George R.R. Martin", "http://img89.imageshack.us/img89/7601/abe.jpg"),
	new Product("Eragon", "7.56", "5", "New", "Puerto Rico", "Standard", "Paypal", "Author: Christopher Paolini", "http://img191.imageshack.us/img191/7442/t8q7.png")
);

//HERE
var phonesElecList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var camerasElecList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var laptopCompList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var tabletsCompList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var menShirtsList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var menPantsList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var womenDressesList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var bicycleSportsList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var kayakSportsList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

//Category

var category= require("./category.js");
var Category= category.Category;
var categoryList= new Array(
	new Category ("ArtBooks", "Arts & Photography", artsBooksList),
	new Category ("ComicBooks", "Comic & Graphic Novels", comicBooksList),
	new Category ("MysteryBooks", "Mystery, Thriller & Suspense", mysteryBooksList),
	new Category ("RomanceBooks", "Romance", romanceBooksList),
	new Category ("ScienceFictionBooks", "Science Fiction & Fantasy", fictionBooksList),
	new Category ("PhonesElectronics", "Phones", phonesElecList),
	new Category ("CamerasElectronics", "Cameras",camerasElecList),
	new Category ("LaptopsComp", "Laptops", laptopCompList),
	new Category ("TabletsComp", "Tablets", tabletsCompList),
	new Category ("MenShirts", "Men Shirts", menShirtsList),
	new Category ("MenPants", "Men Pants", menPantsList),
	new Category ("WomenDresses", "Women Dresses", womenDressesList),
	new Category ("BicycleSports", "Bicycles", bicycleSportsList),
	new Category ("KayakSports", "Kayaks", kayakSportsList)
);

var productId=0;

for (var i=0; i < categoryList.length; ++i){
			for(var j=0; j< categoryList[i].productList.length; ++j)
			{
				categoryList[i].productList[j].id= productId++;
			}
}

// History

var history= require("./history.js");
var History= history.History;

var historyList= new Array(
	new History("0", artsBooksList[0]),
	new History("0", golfSportsList[1])
);

var historyNextId = 0;
 
for (var i=0; i < historyList.length;++i){
	historyList[i].hid = historyNextId++;
}

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

app.get('/Project1Srv/categories', function(req, res){
	
	console.log("GET");
	var response = {"categories": categoryList};
	res.json(response);
	
});

app.get('/Project1Srv/histories', function(req, res) {
	console.log("GET");
	
	var response = {"histories" : historyList};
  	res.json(response);
});

app.get('/Project1Srv/categories/:id', function(req, res){
		
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

app.get('/Project1Srv/histories/:hid', function(req, res){
		
	var hid = req.params.hid;
	
	var target = -1;
		for (var i=0; i < historiesList.length; ++i){
			if(historyList[0].productList[i].id == hid){
					target= i;
					break;
				}
		}
		
		if (target == -1){
			res.statusCode = 404;
			res.send("Product not found.");
		}
		else {
			var response = {"product" : categoryList[0].productList[target]};
  			res.json(response);	
  		}		
});


// REST Operation - HTTP GET to read a car based on its id
app.get('/Project1Srv/accounts/:aid', function(req, res) {
	var aid = req.params.aid;
		console.log("GET account: " + aid);
	if ((aid < 0) || (aid >= accountNextId)){
		// not found
		res.statusCode = 404;
		res.send("Account not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < accountList.length; ++i){
			if (accountList[i].aid == aid){
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
app.put('/Project1Srv/accounts/:aid', function(req, res) {

});

// REST Operation - HTTP DELETE to delete a car based on its id
app.del('/Project1Srv/accounts/:aid', function(req, res) {
	
});

// REST Operation - HTTP POST to add a new a car
app.post('/Project1Srv/accounts', function(req, res) {
	
});


// Server starts running when listen is called.
app.listen(process.env.PORT || 3412);
console.log("server listening");
