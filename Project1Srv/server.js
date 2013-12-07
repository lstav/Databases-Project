// Express is the web framework 
var express = require('express');
var pg = require('pg');

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

// Database connection string: pg://<username>:<password>@host:port/dbname 

//var conString = "pg://cuitailwlenzuo:hg3c_iWgd_9NAKdADhq9H4eaXA@ec2-50-19-246-223.compute-1.amazonaws.com:5432/dfbtujmpbf387c";

//var conString = "pg://postgres:course@localhost:5432/db2";
var conString = "pg://course:course@localhost:5432/db2";

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

	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * FROM account");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"accounts" : result.rows};
		client.end();
		res.json(response);
	});
});

// REST Operation - HTTP GET 
app.get('/Project1Srv/accountsign/:id', function(req, res) {

	var id = req.params.id;
	console.log("Check username availability.");

	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT username FROM account WHERE username='"+ id+"'");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"accounts" : result.rows};
		client.end();
		res.json(response);
	});
});

app.get('/Project1Srv/login/:username/:password', function(req, res) {

	var username = req.params.username;
	var password = req.params.password;
	console.log("Username:"+ username+ " and password:"+password);
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("select * from account natural join (select address as shipping, addressid as shippingid "+ 
			"from account, address where account.shippingid = address.addressid) as s natural join " +
			"(select address as billing, b.addressid as billingid, cardnumber, cardtype, securitynumber, expdate " + 
			"from account, address as b, creditcard as c " +
			"where account.billingid = b.addressid and c.addressid = b.addressid) as b " + 
			"where account.username = '" + username + "' and account.isactive = 'TRUE'");

	query.on("row", function (row, result) {
		if(row.apassword == password){
			result.addRow(row);}
	});
	query.on("end", function (result) {
		var response = {"accountLogin" : result.rows};
		client.end();
		res.json(response);
	});
});


app.get('/Project1Srv/address', function(req, res) {
	console.log("GET");

	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * from address");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"address" : result.rows};
		client.end();
		res.json(response);
	});
});

app.get('/Project1Srv/rankers/:id', function(req, res) {

	var id = req.params.id;
	console.log("GET rankers:"+ id);
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("select buyerid, buyer.username, stars, rank.accountid " +
			"from rank, account as buyer " +
			"where buyer.accountid = rank.buyerid and rank.accountid =" + id);

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"rankers" : result.rows};
		client.end();
		res.json(response);
	});
});

app.get('/Project1Srv/profiles/:id', function(req, res) {

	var id = req.params.id;
	console.log("GET profile:"+ id);
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("select * from account, (select (C4.C4*100/Ct.Ct) as percent " +
			"from (select count(rankid) as C4 " +
			"from rank " +
			"where stars = 4 and accountid =" + id +") as C4, " +
			"(select count(rankid) as Ct " +
			"from rank " +
			"where accountid = " + id + ") as Ct) as prank " +
			"where account.accountid =" + id);

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"profile" : result.rows};
		client.end();
		res.json(response);
	});
});



app.get('/Project1Srv/sales/:id', function(req, res) {

	var id = req.params.id;
	console.log("GET sales of user:"+ id);
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT prodname, price, productid as id, imagelink as img FROM account natural join sale, product "+
			"WHERE product.isactive='t' AND account.accountid = sale.accountid AND product.productid = sale.prodid AND accountid="+id);

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"userSales" : result.rows};
		client.end();
		res.json(response);
	});
});

app.post('/Project1Srv/addsale', function(req, res) {

	console.log("INSERT sale ");
	console.log(req.param('name'));

	var client = new pg.Client(conString);
	client.connect();

	var query= client.query("INSERT INTO sale(accountid, prodid, starttime, endtime, price, totalquantity) "+
			"VALUES ("+req.param('account')+", "+req.param('productid')+", localtimestamp, '"+req.param('date')+" 00:00:00', "+req.param('price')+","+req.param('quantity')+") RETURNING *");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"addsale" : result.rows};
		client.end();
		res.json(response);
	});
});

app.get('/Project1Srv/auctions/:id', function(req, res) {

	var id = req.params.id;
	console.log("GET auctions of user:"+ id);
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT prodname, currentbid as price, productid as id, imagelink as img FROM account natural join auction, product "+
			"WHERE product.isactive='t' AND auction.prodid = product.productid AND auction.accountid = account.accountid AND accountid="+id);

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"userAuctions" : result.rows};
		client.end();
		res.json(response);
	});

});

app.get('/Project1Srv/auctionProd/:id/:lbid', function(req, res) {

	var id = req.params.id;
	var bid= req.params.lbid;
	console.log("GET auctionid of product:"+ id);
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT auctionid, currentbid FROM auction, product WHERE auction.prodid = product.productid AND auction.prodid ="+id+" AND '"+bid+"' > currentbid");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"auctionProd" : result.rows};
		client.end();
		res.json(response);
	});

});

app.post('/Project1Srv/addauction', function(req, res) {

	console.log("INSERT sale ");
	console.log(req.param('name'));

	var client = new pg.Client(conString);
	client.connect();

	var query= client.query("INSERT INTO auction(accountid, prodid, currentbid, startdate, enddate) "+
			"VALUES ("+req.param('account')+", "+req.param('productid')+","+req.param('price')+", localtimestamp, '"+req.param('date')+" 00:00:00') RETURNING *");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"addauction" : result.rows};
		client.end();
		res.json(response);
	});
});

app.post('/Project1Srv/addbid', function(req, res) {

	console.log("INSERT bid ");

	var client = new pg.Client(conString);
	client.connect();

	var query= client.query("INSERT INTO bid(accountid, bdate, bammmount, auctionid) "+
			"VALUES ("+req.param('account')+", localtimestamp, "+req.param('bid')+","+req.param('auctionid')+") RETURNING *");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"addbid" : result.rows};
		client.end();
		res.json(response);
	});
});

app.put('/Project1Srv/updateMaxbid', function(req, res) {

	console.log("UPDATE auction currentbid ");

	var client = new pg.Client(conString);
	client.connect();

	var query= client.query("UPDATE auction SET currentbid="+req.param('bid')+" WHERE auctionid="+req.param('auctionid')+" AND currentbid < '"+req.param('bid')+"' RETURNING *");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"updateMaxbid" : result.rows};
		client.end();
		res.json(response);
	});
});


app.get('/Project1Srv/bidsproducts/:id', function(req, res) {

	var id = req.params.id;
	console.log("GET bids on product:"+ id);
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT prodname, condition, bammmount as bid, productid as id, bid.accountid as bidder, account.username as bidder, bdate "+
			"FROM account, bid, auction, product WHERE auction.auctionid = bid.auctionid AND account.accountid= bid.accountid AND "+
			"product.productid = auction.prodid AND productid="+id);

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"bids" : result.rows};
		client.end();
		res.json(response);
	});

});

app.get('/Project1Srv/bidusers/:id', function(req, res) {

	var id = req.params.id;
	console.log("GET bids of user:"+ id);
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT prodname, max(bammmount) as bid, imagelink as img, max(bdate) as bdate, account.username as bidder, catid, productid as id "+
			"FROM account, bid, auction, product WHERE auction.auctionid = bid.auctionid AND account.accountid= bid.accountid AND product.productid = auction.prodid "+
			"AND account.accountid= "+id+" GROUP BY prodname, imagelink, account.username, catid, productid");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"biduser" : result.rows};
		client.end();
		res.json(response);
	});

});

app.get('/Project1Srv/purchaseusers/:id', function(req, res) {

	var id = req.params.id;
	console.log("GET purchases of user:"+ id);
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT prodname, product.productid as id, max(bammmount) as bid, imagelink as img, max(bdate) as bdate, account.username as bidder, catid "+
			"FROM account, bid, auction, product WHERE auction.auctionid = bid.auctionid AND account.accountid= bid.accountid AND product.productid = auction.prodid "+
			"AND account.accountid= "+id+" GROUP BY prodname, product.productid, imagelink, account.username, catid");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"purchaseuser" : result.rows};
		client.end();
		res.json(response);
	});

});

app.get('/Project1Srv/salesusers/:id', function(req, res) {

	var id = req.params.id;
	console.log("GET sales of user:"+ id);
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT catid, accountid, id, price, condition, img, prodname, isactive FROM "+
			"(SELECT catid, accountid, productid as id, price, condition, imagelink as img, prodname, product.isactive as isactive "+
			"FROM product natural join category, sale natural join account WHERE product.productid = sale.prodid "+
			"AND account.accountid = sale.accountid AND category.catid = product.catid UNION SELECT catid, accountid, productid as id, currentbid as price, condition, imagelink as img, prodname, product.isactive as isactive "+
			"FROM product natural join category, auction natural join account WHERE category.catid = product.catid AND auction.accountid = account.accountid "+
			"AND auction.prodid = product.productid) as pdt WHERE accountid="+id);

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"saleuser" : result.rows};
		client.end();
		res.json(response);
	});

});

app.get('/Project1Srv/sales-product/:id', function(req, res) {

	var id = req.params.id;
	console.log("GET product id of sale:"+ id);
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT prodid as id FROM sale WHERE sale.prodid="+id);

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"sale" : result.rows};
		client.end();
		res.json(response);
	});
});

app.put('/Project1Srv/updateDeactive', function(req, res) {

	console.log("UPDATE (delete) product from sale/auction");

	var client = new pg.Client(conString);
	client.connect();

	var query= client.query("UPDATE product SET isactive='f' WHERE productid="+req.param('id')+" RETURNING *");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"updateDeactive" : result.rows};
		client.end();
		res.json(response);
	});
});

app.put('/Project1Srv/updatepname', function(req, res) {

	console.log("UPDATE product name");

	var client = new pg.Client(conString);
	client.connect();

	var query= client.query("UPDATE product SET prodname='"+req.param('name')+"' WHERE productid="+req.param('id')+" RETURNING *");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"updatepname" : result.rows};
		client.end();
		res.json(response);
	});


});

app.put('/Project1Srv/updatepimage', function(req, res) {

	console.log("UPDATE product image");

	var client = new pg.Client(conString);
	client.connect();

	var query= client.query("UPDATE product SET imagelink='"+req.param('image')+"' WHERE productid="+req.param('id')+" RETURNING *");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"updatepimage" : result.rows};
		client.end();
		res.json(response);
	});


});

app.put('/Project1Srv/updateprice', function(req, res) {

	console.log("UPDATE product price");

	var client = new pg.Client(conString);
	client.connect();

	var query= client.query("UPDATE sale SET price="+req.param('price')+" WHERE prodid="+req.param('id')+" RETURNING *");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"updateprice" : result.rows};
		client.end();
		res.json(response);
	});


});

app.put('/Project1Srv/updatepcondition', function(req, res) {

	console.log("UPDATE product condition");

	var client = new pg.Client(conString);
	client.connect();

	var query= client.query("UPDATE product SET condition='"+req.param('condition')+"' WHERE productid="+req.param('id')+" RETURNING *");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"updatepcondition" : result.rows};
		client.end();
		res.json(response);
	});


});

app.put('/Project1Srv/updatepdescription', function(req, res) {

	console.log("UPDATE product description");

	var client = new pg.Client(conString);
	client.connect();

	var query= client.query("UPDATE product SET description='"+req.param('description')+"' WHERE productid="+req.param('id')+" RETURNING *");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"updatepdescription" : result.rows};
		client.end();
		res.json(response);
	});


});

app.get('/Project1Srv/histories', function(req, res) {
	console.log("GET");
	var response = {"histories" : historyList};
	res.json(response);
});

app.get('/Project1Srv/messages', function(req, res) {
	console.log("GET");

	var response = {"messages" : messageList};
	res.json(response);
});

app.get('/Project1Srv/shoppingcarts', function(req, res) {
	console.log("GET");

	var response = {"shoppingcarts" : shoppingcartList};
	res.json(response);
});

//////// Category

app.get('/Project1Srv/category', function(req, res){

	console.log("GET categories");
	var client = new pg.Client(conString);
	client.connect();
	var query = client.query("SELECT * FROM category WHERE parentid = 0");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"category" : result.rows};
		client.end();
		res.json(response);
	});
});

app.get('/Project1Srv/categories', function(req, res){

	console.log("GET categories");
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * FROM category ORDER BY catname");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"categories" : result.rows};
		client.end();
		res.json(response);
	});
});

app.get('/Project1Srv/subcategory/:id', function(req, res){

	var id = req.params.id;
	console.log("GET categories");
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT category.catid as catid, category.catname as catname, parent.catname as parentname, category.parentid FROM category, category as parent "+
			"WHERE parent.catid= category.parentid AND category.parentid=" + id);

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"subcategory" : result.rows};
		client.end();
		res.json(response);
	});
});

app.get('/Project1Srv/categoryAll/:id', function(req, res){

	var id = req.params.id;
	console.log("GET all products in category:"+ id);
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT prodname, id, max(price) as price, img, condition, description, img, catid, catname, isactive "+
			"FROM ( SELECT prodname, product.productid as id, price, condition, description, imagelink as img, parent.catid as catid, parent.catname as catname, product.isactive as isactive "+
			"FROM category as parent, category, product natural join sale WHERE category.parentId= parent.catid AND product.catid= category.catid AND product.productid = sale.prodid "+
			"UNION SELECT prodname, product.productid as id, currentbid as price, condition, description, imagelink as img, parent.catid as catid, parent.catname as catname, product.isactive as isactive "+
			"FROM category as parent, category, product natural join auction WHERE category.parentId= parent.catid AND product.catid= category.catid AND product.productid = auction.prodid ) as pdt "+
			"WHERE isactive='t' AND catid="+id+" GROUP BY prodname, id, img, condition, description, img, catid, catname, isactive ");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"allProducts" : result.rows};
		client.end();
		res.json(response);
	});
});

app.get('/Project1Srv/searchAll/:term', function(req, res){

	var term = req.params.term;
	var terms= term.split(/[ ,]+/);

	var msg= "";

	for(var i=0; i < terms.length; i++){
		if(i==0){
			msg+="prodname ilike '%"+terms[i]+"%' ";
		}
		else{
			msg+="or prodname ilike '%"+terms[i]+"%' ";
		}
	}

	console.log("GET products from search of terms: "+ term);

	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT prodname, id, price, condition, description, img, catid, catname, isactive "+
			"FROM ( SELECT prodname, productid as id, price, condition, description, imagelink as img, catid, catname, isactive "+
			"FROM account natural join sale natural join product natural join category WHERE account.accountid = sale.accountid AND product.productid = sale.prodid "+ 
			"AND category.catid= product.catid UNION SELECT prodname, productid as id, max(currentbid) as price, condition, description, imagelink as img, catid, catname, isactive "+
			"FROM account natural join auction natural join product natural join category WHERE auction.prodid = product.productid AND auction.accountid = account.accountid AND category.catid= product.catid "+
			"GROUP BY prodname, productid, condition, description, imagelink, catid, catname, isactive ) as pdt WHERE isactive='t' AND "+msg);

	query.on("row", function (row, result) {
		result.addRow(row);
	});

	query.on("end", function (result) {
		var response = {"searchresult" : result.rows};
		client.end();
		res.json(response);
	});        
});

app.get('/Project1Srv/searchSub/:term/:id', function(req, res){

	var id= req.params.id;
	var term = req.params.term;
	var terms= term.split(/[ ,]+/);

	var msg= "";

	for(var i=0; i < terms.length; i++){
		if(i==0){
			msg+="prodname ilike '%"+terms[i]+"%' ";
		}
		else{
			msg+="or prodname ilike '%"+terms[i]+"%' ";
		}
	}

	console.log("GET products from search in subcategory of terms: "+ term);

	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT prodname, id, max(price) as price, img, condition, description, img, catid, catname, isactive "+
			"FROM ( SELECT prodname, product.productid as id, price, condition, description, imagelink as img, parent.catid as catid, parent.catname as catname, isactive "+
			"FROM category as parent, category, product natural join sale WHERE category.parentId= parent.catid AND product.catid= category.catid AND product.productid = sale.prodid "+
			"UNION SELECT prodname, product.productid as id, currentbid as price, condition, description, imagelink as img, parent.catid as catid, parent.catname as catname, isactive "+
			"FROM category as parent, category, product natural join auction WHERE category.parentId= parent.catid AND product.catid= category.catid AND product.productid = auction.prodid ) as pdt "+
			"WHERE isactive='t' AND catid="+id+" AND ("+msg+") GROUP BY prodname, id, img, condition, description, img, catid, catname, isactive");

	query.on("row", function (row, result) {
		result.addRow(row);
	});

	query.on("end", function (result) {
		var response = {"searchresult" : result.rows};
		client.end();
		res.json(response);
	});        
});

app.get('/Project1Srv/categoryProducts/:id', function(req, res){

	var id = req.params.id;

	console.log("GET products in category:"+ id);

	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT prodname, id, price, condition, description, img, catid, catname, isactive "+
			"FROM ( SELECT prodname, productid as id, price, condition, description, imagelink as img, catid, catname, product.isactive as isactive "+
			"FROM account natural join sale, product natural join category WHERE account.accountid = sale.accountid AND product.productid = sale.prodid "+ 
			"AND category.catid= product.catid UNION SELECT prodname, productid as id, max(currentbid) as price, condition, description, imagelink as img, catid, catname, product.isactive as isactive "+
			"FROM account natural join auction, product natural join category WHERE auction.prodid = product.productid AND auction.accountid = account.accountid AND category.catid= product.catid "+
			"GROUP BY prodname, productid, condition, description, imagelink, catid, catname, product.isactive) as pdt WHERE isactive= 't' AND catid="+id);

	query.on("row", function (row, result) {
		result.addRow(row);
	});

	query.on("end", function (result) {
		var response = {"productsIncategory" : result.rows};
		client.end();
		res.json(response);
	});        
});

app.get('/Project1Srv/sortProducts/:id/:catid', function(req, res){

	var id = req.params.id;
	var catid= req.params.catid;

	console.log("Sort by:"+ id + " in category "+catid);

	var client = new pg.Client(conString);
	client.connect();

	if (id== "PriceLow"){
		var query = client.query("SELECT prodname, id, price, condition, description, img, catid, catname, isactive "+
				"FROM ( SELECT prodname, productid as id, price, condition, description, imagelink as img, catid, catname, product.isactive as isactive "+
				"FROM account natural join sale, product natural join category WHERE account.accountid = sale.accountid AND product.productid = sale.prodid "+ 
				"AND category.catid= product.catid UNION SELECT prodname, productid as id, max(currentbid) as price, condition, description, imagelink as img, catid, catname, product.isactive as isactive "+
				"FROM account natural join auction, product natural join category WHERE auction.prodid = product.productid AND auction.accountid = account.accountid AND category.catid= product.catid "+
				"GROUP BY prodname, productid, condition, description, imagelink, catid, catname, product.isactive ) as pdt WHERE isactive= 't' AND catid="+catid+" ORDER BY price");
	}

	else if (id== "PriceHigh"){
		var query = client.query("SELECT prodname, id, price, condition, description, img, catid, catname, isactive "+
				"FROM ( SELECT prodname, productid as id, price, condition, description, imagelink as img, catid, catname, product.isactive as isactive "+
				"FROM account natural join sale, product natural join category WHERE account.accountid = sale.accountid AND product.productid = sale.prodid "+ 
				"AND category.catid= product.catid UNION SELECT prodname, productid as id, max(currentbid) as price, condition, description, imagelink as img, catid, catname, product.isactive as isactive "+
				"FROM account natural join auction, product natural join category WHERE auction.prodid = product.productid AND auction.accountid = account.accountid AND category.catid= product.catid "+
				"GROUP BY prodname, productid, condition, description, imagelink, catid, catname, product.isactive ) as pdt WHERE isactive= 't' AND catid="+catid+" ORDER BY price desc");
	}

	else if(id=="Name"){
		var query = client.query("SELECT prodname, id, price, condition, description, img, catid, catname, isactive "+
				"FROM ( SELECT prodname, productid as id, price, condition, description, imagelink as img, catid, catname, product.isactive as isactive "+
				"FROM account natural join sale, product natural join category WHERE account.accountid = sale.accountid AND product.productid = sale.prodid "+ 
				"AND category.catid= product.catid UNION SELECT prodname, productid as id, max(currentbid) as price, condition, description, imagelink as img, catid, catname, product.isactive as isactive "+
				"FROM account natural join auction, product natural join category WHERE auction.prodid = product.productid AND auction.accountid = account.accountid AND category.catid= product.catid "+
				"GROUP BY prodname, productid, condition, description, imagelink, catid, catname, product.isactive ) as pdt WHERE isactive= 't' AND catid="+catid+" ORDER BY prodname");
	}

	query.on("row", function (row, result) {
		result.addRow(row);
	});

	query.on("end", function (result) {
		var response = {"productsIncategory" : result.rows};
		client.end();
		res.json(response);
	});        
});

app.get('/Project1Srv/sortAllProducts/:id/:patid', function(req, res){

	var id = req.params.id;
	var catid= req.params.patid;

	console.log("Sort all by:"+ id + " in category "+catid);

	var client = new pg.Client(conString);
	client.connect();

	if (id== "PriceLow"){
		var query = client.query("SELECT prodname, id, max(price) as price, img, condition, description, img, catid, catname, isactive "+
				"FROM ( SELECT prodname, product.productid as id, price, condition, description, imagelink as img, parent.catid as catid, parent.catname as catname, product.isactive as isactive "+
				"FROM category as parent, category, product natural join sale WHERE category.parentId= parent.catid AND product.catid= category.catid AND product.productid = sale.prodid "+
				"UNION SELECT prodname, product.productid as id, currentbid as price, condition, description, imagelink as img, parent.catid as catid, parent.catname as catname, product.isactive as isactive "+
				"FROM category as parent, category, product natural join auction WHERE category.parentId= parent.catid AND product.catid= category.catid AND product.productid = auction.prodid ) as pdt "+
				"WHERE isactive= 't' AND catid="+catid+" GROUP BY prodname, id, img, condition, description, img, catid, catname, isactive ORDER BY price");
	}

	else if (id== "PriceHigh"){
		var query = client.query("SELECT prodname, id, max(price) as price, img, condition, description, img, catid, catname, isactive "+
				"FROM ( SELECT prodname, product.productid as id, price, condition, description, imagelink as img, parent.catid as catid, parent.catname as catname, product.isactive as isactive "+
				"FROM category as parent, category, product natural join sale WHERE category.parentId= parent.catid AND product.catid= category.catid AND product.productid = sale.prodid "+
				"UNION SELECT prodname, product.productid as id, currentbid as price, condition, description, imagelink as img, parent.catid as catid, parent.catname as catname, product.isactive as isactive "+
				"FROM category as parent, category, product natural join auction WHERE category.parentId= parent.catid AND product.catid= category.catid AND product.productid = auction.prodid ) as pdt "+
				"WHERE isactive= 't' AND catid="+catid+" GROUP BY prodname, id, img, condition, description, img, catid, catname, isactive ORDER BY price desc");
	}

	else if(id=="Name"){
		var query = client.query("SELECT prodname, id, max(price) as price, img, condition, description, img, catid, catname, isactive "+
				"FROM ( SELECT prodname, product.productid as id, price, condition, description, imagelink as img, parent.catid as catid, parent.catname as catname, product.isactive as isactive "+
				"FROM category as parent, category, product natural join sale WHERE category.parentId= parent.catid AND product.catid= category.catid AND product.productid = sale.prodid "+
				"UNION SELECT prodname, product.productid as id, currentbid as price, condition, description, imagelink as img, parent.catid as catid, parent.catname as catname, product.isactive as isactive "+
				"FROM category as parent, category, product natural join auction WHERE category.parentId= parent.catid AND product.catid= category.catid AND product.productid = auction.prodid ) as pdt "+
				"WHERE isactive= 't' AND catid="+catid+" GROUP BY prodname, id, img, condition, description, img, catid, catname, isactive ORDER BY prodname");
	}

	query.on("row", function (row, result) {
		result.addRow(row);
	});

	query.on("end", function (result) {
		var response = {"productsIncategory" : result.rows};
		client.end();
		res.json(response);
	});        
});

app.put('/Project1Srv/categories/:id', function(req, res) {

});

app.post('/Project1Srv/categories/:id', function(req, res) {
	var id = req.params.id;
	console.log("DELETE category: "+ id);
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("UPDATE category SET isactive='FALSE' " +
			"WHERE catid= " + id);

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var len = result.rows.length;
		if (len == 0){
			res.statusCode = 404;
			res.send("Address not found.");
		}
		else {        
			var response = {"address" : result.rows[0]};
			client.end();
			res.json(response);
		}
	});
});

app.post('/Project1Srv/categories', function(req, res) {
	console.log("POST category: ");
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("INSERT INTO category (catname, parentid)" +
			"values ('" + req.param('name')+ "', " 
			+ req.param('parent')+ ")");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var len = result.rows.length;
		if (len == 0){
			res.statusCode = 404;
			res.send("Address not found.");
		}
		else {        
			var response = {"address" : result.rows[0]};
			client.end();
			res.json(response);
		}
	});
	//console.log(req.param('parent'));
});

////////// Product

app.get('/Project1Srv/products/:id', function(req, res){

	var id = req.params.id;
	console.log("GET product:"+ id);
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query(
			"SELECT seller, saleid, id, price, starttime, endtime, prodname, condition, description, img, aid, isactive " +
					"FROM ( SELECT username as seller, saleid, productid as id, price, starttime, endtime, prodname, condition, description, imagelink as img, accountid as aid, product.isactive as isactive "+
					"FROM account natural join sale, product WHERE account.accountid = sale.accountid AND product.productid = sale.prodid UNION "+
					"SELECT username as seller, auctionid, productid as id, currentbid as price, startdate as starttime, enddate as endtime, prodname, condition, description, imagelink as img, accountid as aid, product.isactive as isactive " + 
					"FROM account natural join auction, product WHERE auction.prodid = product.productid AND auction.accountid = account.accountid) as pdt WHERE id=" + id);

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"product" : result.rows};
		client.end();
		res.json(response);
	});
});

app.get('/Project1Srv/allProducts', function(req, res){

	console.log("GET all products");
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * FROM product natural join category WHERE isactive= 't'");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"products" : result.rows};
		client.end();
		res.json(response);
	});
});

app.get('/Project1Srv/sales', function(req, res){

	//var id = req.params.id;
	console.log("GET sales");
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * FROM sale, product " +
			"where productid = prodid AND product.isactive= 't'");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"sales" : result.rows};
		client.end();
		res.json(response);
	});
});

app.put('/Project1Srv/products/:id', function(req, res) {

});

app.del('/Project1Srv/products/:id', function(req, res) {

});

app.post('/Project1Srv/products', function(req, res) {

	console.log("INSERT product ");
	console.log(req.param('name'));

	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("INSERT INTO product(catid, prodname, condition, description, imagelink) "+
			"VALUES ("+ req.param('catid')+", '"+ req.param('name')+"' , '"+ req.param('condition')+"', '"+ req.param('description')+"', 'http://img856.imageshack.us/img856/4856/n2vc.jpg')  RETURNING *");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"productadd" : result.rows};
		client.end();
		res.json(response);
	});
});

//////////// History

app.get('/Project1Srv/purchasesusers/:id', function(req, res){
	var id = req.params.id;
	console.log("GET purchases:"+ id);
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("select * "  +
			"from invoice, checkout, sale, product " +
			"where invoice.invoiceid = checkout.invid and checkout.saleid = sale.saleid " +
			"and sale.prodid = product.productid and invoice.buyerid = " +id);

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"purchaseuser" : result.rows};
		client.end();
		res.json(response);
	});
});

app.get('/Project1Srv/salehistories/:id', function(req, res){
	var id = req.params.id;
	console.log("GET sales:"+ id);
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("select * "  +
			"from invoice, checkout, sale, product " +
			"where invoice.invoiceid = checkout.invid and checkout.saleid = sale.saleid " +
			"and sale.prodid = product.productid and sale.accountid=" +id);

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"salehistories" : result.rows};
		client.end();
		res.json(response);
	});
});

app.put('/Project1Srv/histories/:hid', function(req, res) {

});

app.del('/Project1Srv/histories/:hid', function(req, res) {

});

app.post('/Project1Srv/histories', function(req, res) {

});

/////////// Messages

app.get('/Project1Srv/messages/:mid', function(req, res) {
	var mid = req.params.mid;
	console.log("GET message: " + mid);
	if ((mid < 0)){ //|| (mid >= midNextId)){
		// not found
		res.statusCode = 404;
		res.send("Message not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < messageList.length; ++i){
			if (messageList[i].mid == mid){
				target = i;
				break;        
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Message not found.");
		}
		else {
			var response = {"message" : messageList[target]};
			res.json(response);        
		}        
	}
});

app.get('/Project1Srv/message-inbox/:id', function(req, res){

	var id = req.params.id;
	console.log("GET inbox:"+ id);
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT date, s.username, receiverid, messageid, subject FROM message, account as s, account as r WHERE s.accountid = message.senderid "+
			"AND r.accountid=message.receiverid AND message.isactive='t' AND receiverid=" +id);

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"message" : result.rows};
		client.end();
		res.json(response);
	});
});

app.get('/Project1Srv/message-sent/:id', function(req, res){

	var id = req.params.id;
	console.log("GET outbox:"+ id);
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT date, s.username as receiver, receiverid, messageid, subject FROM message, account as s, account as r WHERE s.accountid = message.senderid "+
			"AND r.accountid=message.receiverid AND message.isactive='t' AND senderid=" +id);

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"message" : result.rows};
		client.end();
		res.json(response);
	});
});

app.get('/Project1Srv/message-view/:id', function(req, res){

	var id = req.params.id;
	console.log("GET message:"+ id);
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT text, date, s.username as sender, r.username as receiver, subject "+
			"FROM message, account as s, account as r WHERE s.accountid = message.senderid AND r.accountid=message.receiverid AND messageid=" +id);

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"message" : result.rows};
		client.end();
		res.json(response);
	});
});

app.put('/Project1Srv/deletembox', function(req, res) {

	console.log("UPDATE (delete) message");

	var client = new pg.Client(conString);
	client.connect();

	var query= client.query("UPDATE message SET isactive='f' WHERE messageid="+req.param('messageid')+" RETURNING *");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"deletembox" : result.rows};
		client.end();
		res.json(response);
	});
});

app.post('/Project1Srv/addmessage', function(req, res) {

	console.log("Send message to: "+req.param('username'));

	var client = new pg.Client(conString);
	client.connect();

	var query= client.query("INSERT INTO message(senderid, text, date, receiverid, subject) VALUES ("+req.param('senderid')+",'"+req.param('text')+"', localtimestamp, "+
			req.param('receiverid')+",'"+req.param('subject')+"') RETURNING *");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"addmessage" : result.rows};
		client.end();
		res.json(response);
	});
});
////// Shopping Cart

app.get('/Project1Srv/shoppingcart/:id', function(req, res){

	var id = req.params.id;
	console.log("GET shopping cart:"+ id);
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT productid as id, imagelink as img, prodname, price FROM containsales natural join shoppingcart, sale natural join product "+
			"WHERE shoppingcart.sid = containsales.sid AND containsales.saleid= sale.saleid AND sale.prodid= product.productid AND shoppingcart.accountid=" + id);

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"shoppingcart" : result.rows};
		client.end();
		res.json(response);
	});


});

app.put('/Project1Srv/shoppingcarts/:scid', function(req, res) {

});

app.del('/Project1Srv/shoppingcarts/:scid', function(req, res) {

});

app.post('/Project1Srv/shoppingcarts', function(req, res) {

});

////// Account

// REST Operation - HTTP GET to read a car based on its id
app.get('/Project1Srv/accounts/:aid', function(req, res) {
	var aid = req.params.aid;
	console.log("GET account: " + aid);
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * from account where accountid = $1" + [aid]);

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var len = result.rows.length;
		if (len == 0){
			res.statusCode = 404;
			res.send("Account not found.");
		}
		else {        
			var response = {"account" : result.rows[0]};
			client.end();
			res.json(response);
		}
	});
});

app.get('/Project1Srv/accountid/:user', function(req, res) {
	var user = req.params.user;
	console.log("GET accountid of username: " + user);
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT accountid from account where username = '"+user+"'");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var len = result.rows.length;
		if (len == 0){
			res.statusCode = 404;
			res.send("Account not found.");
		}
		else {        
			var response = {"account" : result.rows[0]};
			client.end();
			res.json(response);
		}
	});
});

app.get('/Project1Srv/address/:addressid', function(req, res) {
	var addressid = req.params.addressid;
	console.log("GET address: " + addressid);
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * from address where addressid = $1", [addressid]);

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var len = result.rows.length;
		if (len == 0){
			res.statusCode = 404;
			res.send("Address not found.");
		}
		else {        
			var response = {"address" : result.rows[0]};
			client.end();
			res.json(response);
		}
	});
});


// REST Operation - HTTP PUT to updated an account based on its id
app.put('/Project1Srv/accounts/:aid', function(req, res) {

});

app.post('/Project1Srv/accountspassword/', function(req, res) {
	console.log("PUT account: " + req.param('username') + ", " + req.param('password'));
	var client = new pg.Client(conString);
	client.connect();
	// Hay que buscar el query correcto
	var query = client.query("UPDATE account SET apassword= '" + req.param('password') + "' " +
			"WHERE username= '" + req.param('username') + "'");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var len = result.rows.length;
		if (len == 0){
			res.statusCode = 404;
			res.send("Address not found.");
		}
		else {        
			var response = {"address" : result.rows[0]};
			client.end();
			res.json(response);
		}
	});
});


// REST Operation - HTTP DELETE to delete an account based on its id
app.post('/Project1Srv/accountsdeleted/', function(req, res) {
	console.log("DELETE account: " + req.param('username'));
	var client = new pg.Client(conString);
	client.connect();
	// Hay que buscar el query correcto
	var query = client.query("UPDATE account SET isactive='FALSE' " +
			"WHERE username= '" + req.param('username') + "'");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var len = result.rows.length;
		if (len == 0){
			res.statusCode = 404;
			res.send("Address not found.");
		}
		else {        
			var response = {"address" : result.rows[0]};
			client.end();
			res.json(response);
		}
	});
});

app.post('/Project1Srv/accountsdelete/:id', function(req, res) {
	var id = req.params.id;
	console.log("DELETE account: " + id);
	var client = new pg.Client(conString);
	client.connect();
	// Hay que buscar el query correcto
	var query = client.query("UPDATE account SET isactive='FALSE' " +
			"WHERE accountid= '" + id + "'");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var len = result.rows.length;
		if (len == 0){
			res.statusCode = 404;
			res.send("Address not found.");
		}
		else {        
			var response = {"address" : result.rows[0]};
			client.end();
			res.json(response);
		}
	});
});

// REST Operation - HTTP POST to add a new a account
app.post('/Project1Srv/accounts', function(req, res) {
	console.log("POST account: " + req.param('username'));
	var client = new pg.Client(conString);
	client.connect();
	// Hay que buscar el query correcto
	var query = client.query("insert into account (username, fname, lname, email, apassword, shippingid, billingid, depositid)" +
			"values ('jsmith', 'john', 'smith', 'jsmith@example.com', 1234, 2, 2, 2)");

	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		var len = result.rows.length;
		if (len == 0){
			res.statusCode = 404;
			res.send("Address not found.");
		}
		else {        
			var response = {"address" : result.rows[0]};
			client.end();
			res.json(response);
		}
	});
});


// Server starts running when listen is called.
app.listen(process.env.PORT || 3412);
console.log("server listening");