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
	new Account("Luis", "Tavarez", "123", "lt@example.com", "123456", "luistavarez", "Puerto Rico", "Puerto Rico", "987654321", "****")
);
 var accountNextId = 0;
 
for (var i=0; i < accountList.length;++i){
	accountList[i].cid = accountNextId++;
}

//Product:

var product = require("./product.js");
var Product = product.Product;

var artsBooksList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "http://image.weather.com/web/multimedia/images/slideshows/fall09/fall20.jpg"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "http://image.weather.com/web/multimedia/images/slideshows/fall09/fall20.jpg")
);

var comicBooksList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var mysteryBooksList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var romanceBooksList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var fictionBooksList= new Array(
	new Product("Eragon", "5.00", "5", "New", "Puerto Rico", "Standard", "Paypal", "Author: Christopher Paolini", "item.html"),
	new Product("Harry Potter", "12.00", "25", "New", "Wisconsin", "Standard", "Paypal", "Author: J.K. Rowling", "item.html")
);

var entertainmentMagList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var fashionMagList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var moviesMagList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var newsMagList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var scienceMagList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var tvElecList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var audioElecList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var phonesElecList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var camerasElecList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var videoElecList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var laptopCompList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var desktopCompList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var tabletsCompList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var printersCompList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var childrenClothesList= new Array(
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

var womenShirtsList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var womenPantsList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var womenDressesList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var childrenShoesList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var menShoesList= new Array(
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

var golfSportsList= new Array(
	new Product("Drawings", "50.00", "12", "New", "California", "Standard", "Visa, Paypal", "Author: Lala", "item.html"),
	new Product("Color & Light", "28.00", "2", "New", "Florida", "Standard", "Paypal", "Author: Pablo", "item.html")
);

var fishingSportsList= new Array(
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
	new Category ("EntertainmentMagazine", "Entertainment", entertainmentMagList),
	new Category ("FashionMagazine", "Fashion & Style", fashionMagList),
	new Category ("MoviesMagazine", "Movies & Music", moviesMagList),
	new Category ("NewsMagazine", "News & Politics", newsMagList),
	new Category ("ScienceMagazine", "Science", scienceMagList),
	new Category ("TvElectronics", "TV", tvElecList),
	new Category ("AudioElectronics", "Audio", audioElecList),
	new Category ("PhonesElectronics", "Phones", phonesElecList),
	new Category ("CamerasElectronics", "Cameras",camerasElecList),
	new Category ("VideoElectronics", "Video", videoElecList),
	new Category ("LaptopsComp", "Laptops", laptopCompList),
	new Category ("DesktopComp", "Desktops", desktopCompList),
	new Category ("TabletsComp", "Tablets", tabletsCompList),
	new Category ("PrintersComp", "Printers", printersCompList),
	new Category ("ChildrenClothes", "Children", childrenClothesList),
	new Category ("MenShirts", "Men Shirts", menShirtsList),
	new Category ("MenPants", "Men Pants", menPantsList),
	new Category ("WomenShirts", "Women Shirts", womenShirtsList),
	new Category ("WomenPants", "Women Pants", womenPantsList),
	new Category ("WomenDresses", "Women Dresses", womenDressesList),
	new Category ("ChildrenShoes", "Children Shoes", childrenShoesList),
	new Category ("MenShoes", "Men Shoes", menShoesList),
	new Category ("BicycleSports", "Bicycles", bicycleSportsList),
	new Category ("KayakSports", "Kayaks", kayakSportsList),
	new Category ("GolfSports", "Golf", golfSportsList),
	new Category ("FishingSports", "Fishing", fishingSportsList)
);

var productId=0;

for (var i=0; i < categoryList.length; ++i){
			for(var j=0; j< categoryList[i].productList.length; ++j)
			{
				categoryList[i].productList[j].id= productId++;
			}
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

app.get('/Project1Srv/products/:id', function(req, res){
		
	var id = req.params.id;
	
	var target = -1;
	var target2= -1;
		for (var i=0; i < categoryList.length; ++i){
			for(var j=0; j< categoryList[i].productList.length; ++j)
			{
				if(categoryList[i].productList[j].id== id){
					target= i;
					target2=j;
					break;
				}
			}
		}
		
		if (target == -1 || target2 == -1){
			res.statusCode = 404;
			res.send("Product not found.");
		}
		else {
			var response = {"product" : categoryList[target].productList[target2]};
  			res.json(response);	
  		}		
});


// REST Operation - HTTP GET to read a car based on its id
app.get('/Project1Srv/accounts/:cid', function(req, res) {
	var cid = req.params.cid;
		console.log("GET account: " + cid);
	if ((cid < 0) || (cid >= accountNextId)){
		// not found
		res.statusCode = 404;
		res.send("Account not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < accountList.length; ++i){
			if (accountList[i].cid == cid){
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
app.put('/Project1Srv/accounts/:cid', function(req, res) {
	var cid = req.params.cid;
		console.log("PUT account: " + cid);

	if ((cid < 0) || (cid >= accountNextId)){
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
			if (accountList[i].cid == id){
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
app.del('/Project1Srv/accounts/:cid', function(req, res) {
	var id = req.params.cid;
		console.log("DELETE account: " + cid);

	if ((id < 0) || (id >= accountNextId)){
		// not found
		res.statusCode = 404;
		res.send("Account not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < accountList.length; ++i){
			if (accountList[i].cid == cid){
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
