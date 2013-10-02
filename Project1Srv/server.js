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

var account = require("./account.js");
var Account = account.Account;

var accountList = new Array(
	new Account("Luis", "123", "Puerto Rico", "Puerto Rico", "987654321", "****");	
);
 var accountNextId = 0;
 
for (var i=0; i < accountList.length;++i){
	accountList[i].id = accountNextId++;
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

// REST Operation - HTTP GET to read all cars
app.get('/Project1Srv/account', function(req, res) {
	console.log("GET");
	//var tom = {"make" : "Ford", "model" : "Escape", "year" : "2013", "description" : "V4 engine, 30mpg, Gray", "price" : "$18,000"};
	//var tom = new Car("Ford", "Escape", "2013", "V4 engine, 30mpg, Gray", "$18,000");
	//console.log("tom: " + JSON.stringify(tom));
	var response = {"account" : accountList};
  	res.json(response);
});

// REST Operation - HTTP GET to read a car based on its id
app.get('/Project1Srv/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET account: " + id);

	if ((id < 0) || (id >= accountNextId)){
		// not found
		res.statusCode = 404;
		res.send("Car not found.");
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
			var response = {"account" : accountList[target]};
  			res.json(response);	
  		}	
	}
});

// REST Operation - HTTP PUT to updated a car based on its id
app.put('/Project1Srv/accounr:id', function(req, res) {
	var id = req.params.id;
		console.log("PUT car: " + id);

	if ((id < 0) || (id >= accountNextId)){
		// not found
		res.statusCode = 404;
		res.send("Car not found.");
	}
	else if(!req.body.hasOwnProperty('make') || !req.body.hasOwnProperty('model')
  	|| !req.body.hasOwnProperty('year') || !req.body.hasOwnProperty('price') || !req.body.hasOwnProperty('description')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for car.');
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
app.del('/ClassDemo3Srv/cars/:id', function(req, res) {
	var id = req.params.id;
		console.log("DELETE car: " + id);

	if ((id < 0) || (id >= carNextId)){
		// not found
		res.statusCode = 404;
		res.send("Car not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < carList.length; ++i){
			if (carList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Car not found.");			
		}	
		else {
			carList.splice(target, 1);
  			res.json(true);
  		}		
	}
});

// REST Operation - HTTP POST to add a new a car
app.post('/ClassDemo3Srv/cars', function(req, res) {
	console.log("POST");

  	if(!req.body.hasOwnProperty('make') || !req.body.hasOwnProperty('model')
  	|| !req.body.hasOwnProperty('year') || !req.body.hasOwnProperty('price') || !req.body.hasOwnProperty('description')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for car.');
  	}

  	var newCar = new Car(req.body.make, req.body.model, req.body.year, req.body.description, req.body.price);
  	console.log("New Car: " + JSON.stringify(newCar));
  	newCar.id = carNextId++;
  	carList.push(newCar);
  	res.json(true);
});


// Server starts running when listen is called.
app.listen(process.env.PORT || 3412);
console.log("server listening");
