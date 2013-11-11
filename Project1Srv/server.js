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

//Account: 

var account = require("./account.js");
var Account = account.Account;

var address = require("./address.js");
var Address = address.address;

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
        new Product("Samsung Galaxy S4", "699.99", "12", "New", "California", "Standard", "Visa, Paypal", "White, (AT&T)", "http://img24.imageshack.us/img24/4017/6doj.jpg"),
        new Product("Motorola DROID MINI", "599.99", "2", "New", "Florida", "Standard", "Paypal", "Verizon Wireless", "http://img844.imageshack.us/img844/392/nrmr.jpg")
);

var camerasElecList= new Array(
        new Product("Nikon COOLPIX L820", "200.00", "12", "New", "California", "Standard", "Visa, Paypal", "Specs: 16 MP CMOS Digital Camera with 30x Zoom Lens and Full HD 1080P Video", "http://img571.imageshack.us/img571/3025/ipxs.jpg"),
        new Product("Canon PowerShot A2300", "99.00", "2", "New", "Florida", "Standard", "Paypal", "Specs: 16.0 MP Digital Camer with 5x Digital Image Stabilized Zoom 28mm Wide-Angle Lens with 720p HD Video Recording", "http://img692.imageshack.us/img692/2051/wum4.jpg")
);

var laptopCompList= new Array(
        new Product("Dell Inspiron 15 i15RV-6190BLK", "369.98", "12", "New", "California", "Standard", "Visa, Paypal", "15.6-Inch Laptop (Black Matte with Textured Finish)", "http://img545.imageshack.us/img545/5389/w3qm.jpg"),
        new Product("Samsung Chromebook", "248.00", "2", "New", "Florida", "Standard", "Paypal", "Wi-Fi, 11.6-Inch", "http://img593.imageshack.us/img593/2941/ym85.jpg")
);

var tabletsCompList= new Array(
        new Product("Google Nexus 7 Tablet", "229.00", "12", "New", "California", "Standard", "Visa, Paypal", "7-Inch, 16GB, Black by ASUS", "http://img545.imageshack.us/img545/7964/guud.jpg"),
        new Product("Acer Iconia A1-810- L416", "100.00", "2", "New", "Florida", "Standard", "Paypal", "7.9-Inch 16 GB Table (Pure White)", "http://img689.imageshack.us/img689/8669/k5sk.jpg")
);

var menShirtsList= new Array(
        new Product("Delhi Shirt", "32.00", "12", "New", "California", "Standard", "Visa, Paypal", "Blue", "http://img401.imageshack.us/img401/4610/o3xu.jpg"),
        new Product("Plus Long Sleeve Shirt", "64.00", "2", "New", "Florida", "Standard", "Paypal", "Black", "http://img580.imageshack.us/img580/3644/2ug0.jpg")
);

var menPantsList= new Array(
        new Product("Kenneth Cole Reaction Men's Sharkskin", "80.00", "12", "New", "California", "Standard", "Visa, Paypal", "Slim Fit Flat Front Pant", "http://img6.imageshack.us/img6/5410/a6ih.jpg"),
        new Product("Savane Men's Travel Intelligence", "62.00", "2", "New", "Florida", "Standard", "Paypal", "Gab-slim Fit Pant", "http://img27.imageshack.us/img27/3130/87k2.jpg")
);

var womenDressesList= new Array(
        new Product("Anne Klein Women's Dress", "89.98", "12", "New", "California", "Standard", "Visa, Paypal", "Jersey Swing Dress", "http://img46.imageshack.us/img46/6762/a3co.jpg"),
        new Product("Sandra Darren Dress", "63.00", "2", "New", "Florida", "Standard", "Paypal", "Women's Fit and Flare Lace and Mesh Dress", "http://img34.imageshack.us/img34/6810/7ugz.png")
);

var bicycleSportsList= new Array(
        new Product("GMC Denali Road Bike", "347.06", "12", "New", "California", "Standard", "Visa, Paypal", "21-speed road bike features", "http://img20.imageshack.us/img20/9927/u8vn.jpg"),
        new Product("Huffy Women's Deluxe Cruiser Bike", "139.99", "2", "New", "Florida", "Standard", "Paypal", "Mint Green, 26-Inch/Medium", "http://img266.imageshack.us/img266/65/sjau.jpg")
);

var kayakSportsList= new Array(
        new Product("Intex Challenger K1 Kayak", "76.47", "12", "New", "California", "Standard", "Visa, Paypal", "For lake or slow-moving river.", "http://img820.imageshack.us/img820/1607/a4gd.jpg"),
        new Product("Sevylor Fiji Travel Pack Kayak", "106.99", "2", "New", "Florida", "Standard", "Paypal", "Blue, 2-Person", "http://img853.imageshack.us/img853/6994/s5je.jpg")
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

//Shopping cart
var shoppingcart= require("./shoppingcart.js");
var ShoppingCart = shoppingcart.ShoppingCart;

var shoppingcartList= new Array(
        new ShoppingCart(0, [artsBooksList[0],menPantsList[1]])
);

var shoppingcartNextId = 0;

for (var i=0; i < shoppingcartList.length;++i){
        shoppingcartList[i].scid = shoppingcartNextId++;
}

// History
var history= require("./history.js");
var History= history.History;

var historyList= new Array(
        new History(0, [artsBooksList[0],kayakSportsList[1]], 0),
        new History(0, [artsBooksList[1],kayakSportsList[0]], 1)
);

var historyNextId = 0;
 
for (var i=0; i < historyList.length;++i){
        historyList[i].hid = historyNextId++;
}

//Message
var message = require("./message.js");
var Message = message.Message;

var messageList = new Array(
        new Message("0","1", "Luis", "Hola!!!"),
        new Message("1","0", "Heidi", "Hello")
        
);
var messageNextId = 0;
 
for (var i=0; i < messageList.length;++i){
        messageList[i].mid = messageNextId++;
}

// Database connection string: pg://<username>:<password>@host:port/dbname 

//var conString = "pg://cuitailwlenzuo:hg3c_iWgd_9NAKdADhq9H4eaXA@ec2-50-19-246-223.compute-1.amazonaws.com:5432/dfbtujmpbf387c";
var conString = "pg://postgres:course@localhost:5432/db2";

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
                        "(select address as billing, b.addressid as billingid, cardnumber " + 
                        "from account, address as b, creditcard as c " +
                        "where account.billingid = b.addressid and c.addressid = b.addressid) as b " + 
                        "where account.username = '" + username + "'");
        
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

         var query = client.query("SELECT prodname, price, productid as id, imagelink as img FROM account natural join sale natural join product "+
        "WHERE account.accountid = sale.accountid AND product.productid = sale.prodid AND accountid="+id);
        
        query.on("row", function (row, result) {
            result.addRow(row);
        });
        query.on("end", function (result) {
                var response = {"userSales" : result.rows};
                client.end();
                  res.json(response);
         });
});

app.get('/Project1Srv/auctions/:id', function(req, res) {
        
        var id = req.params.id;
        console.log("GET auctions of user:"+ id);
        var client = new pg.Client(conString);
        client.connect();

        var query = client.query("SELECT prodname, currentbid as price, productid as id, imagelink as img FROM account natural join auction natural join product "+
        "WHERE auction.prodid = product.productid AND auction.accountid = account.accountid AND accountid="+id);
        
        query.on("row", function (row, result) {
            result.addRow(row);
        });
        query.on("end", function (result) {
                var response = {"userAuctions" : result.rows};
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

        var query = client.query("SELECT prodname, max(bammmount) as bid, imagelink as img, max(bdate) as bdate, account.username as bidder, catid "+
                "FROM account, bid, auction, product WHERE auction.auctionid = bid.auctionid AND account.accountid= bid.accountid AND product.productid = auction.prodid "+
                "AND account.accountid= "+id+" GROUP BY prodname, imagelink, account.username, catid");
        
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

        var query = client.query("SELECT catid, accountid, id, price, condition, img, prodname FROM "+
        "(SELECT catid, accountid, productid as id, price, condition, imagelink as img, prodname "+
                "FROM sale natural join product natural join account natural join category WHERE product.productid = sale.prodid "+
                "AND account.accountid = sale.accountid AND category.catid = product.catid UNION SELECT catid, accountid, productid as id, currentbid as price, condition, imagelink as img, prodname "+
                "FROM product natural join account natural join category natural join auction WHERE category.catid = product.catid AND auction.accountid = account.accountid "+
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
        console.log("GET sales of user:"+ id);
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

        var query = client.query("SELECT * FROM category");
        
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

        var query = client.query("SELECT * FROM category WHERE parentid =" + id);
        
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
        console.log("GET category:"+ id);
        var client = new pg.Client(conString);
        client.connect();

        var query = client.query("SELECT prodname, id, max(price) as price, img, condition, description, img, catid, catname "+
                                        "FROM ( SELECT prodname, product.productid as id, price, condition, description, imagelink as img, parent.catid as catid, parent.catname as catname "+
                                        "FROM category as parent, category, product natural join sale WHERE category.parentId= parent.catid AND product.catid= category.catid AND product.productid = sale.prodid "+
                                        "UNION SELECT prodname, product.productid as id, currentbid as price, condition, description, imagelink as img, parent.catid as catid, parent.catname as catname "+
                                        "FROM category as parent, category, product natural join auction WHERE category.parentId= parent.catid AND product.catid= category.catid AND product.productid = auction.prodid ) as pdt "+
                                        "WHERE catid="+id+" GROUP BY prodname, id, img, condition, description, img, catid, catname");
        
        query.on("row", function (row, result) {
            result.addRow(row);
        });
        query.on("end", function (result) {
                var response = {"allProducts" : result.rows};
                client.end();
                  res.json(response);
         });
});

app.get('/Project1Srv/categoryProducts/:id', function(req, res){

        var id = req.params.id;
    
                 console.log("GET products in category:"+ id);
        
        var client = new pg.Client(conString);
        client.connect();

        var query = client.query("SELECT prodname, id, price, condition, description, img, catid, catname "+
                "FROM ( SELECT prodname, productid as id, price, condition, description, imagelink as img, catid, catname "+
                "FROM account natural join sale natural join product natural join category WHERE account.accountid = sale.accountid AND product.productid = sale.prodid "+ 
                "AND category.catid= product.catid UNION SELECT prodname, productid as id, max(currentbid) as price, condition, description, imagelink as img, catid, catname "+
                "FROM account natural join auction natural join product natural join category WHERE auction.prodid = product.productid AND auction.accountid = account.accountid AND category.catid= product.catid "+
                "GROUP BY prodname, productid, condition, description, imagelink, catid, catname ) as pdt WHERE catid="+id);
        
        console.log(query);
        
        query.on("row", function (row, result) {
            result.addRow(row);
        });
        
        query.on("end", function (result) {
                var response = {"productsIncategory" : result.rows};
                currentCategory= id;
                client.end();
                  res.json(response);
         });        
});

app.get('/Project1Srv/sortProducts/:id', function(req, res){

        var id = req.params.id;
    
    console.log("Sort by:"+ id);
        
        var client = new pg.Client(conString);
        client.connect();

        if (id== "PriceLow"){
                var query = client.query("SELECT * FROM belongsin, product, category WHERE belongsin.cid = category.catid AND product.productid = belongsin.pid AND category.catid='"+currentCategory+"' ORDER BY product.price");
        }
        
        else if (id== "PriceHigh"){
                var query = client.query("SELECT * FROM belongsin, product, category WHERE belongsin.cid = category.id AND product.id = belongsin.pid AND category.id='"+currentCategory+"' ORDER BY product.price desc");
        }
        
        else if(id=="Name"){
                var query = client.query("SELECT * FROM belongsin, product, category WHERE belongsin.cid = category.id AND product.id = belongsin.pid AND category.id='"+currentCategory+"' ORDER BY product.itemname");
        }
        console.log(query);
        
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

app.del('/Project1Srv/categories/:id', function(req, res) {

});

app.post('/Project1Srv/categories', function(req, res) {

});

////////// Product

app.get('/Project1Srv/products/:id', function(req, res){

        var id = req.params.id;
        console.log("GET product:"+ id);
        var client = new pg.Client(conString);
        client.connect();

        var query = client.query(
                "SELECT seller, id, price, starttime, endtime, prodname, condition, description, img, aid " +
                        "FROM ( SELECT username as seller, productid as id, price, starttime, endtime, prodname, condition, description, imagelink as img, accountid as aid "+
                        "FROM account natural join sale natural join product WHERE account.accountid = sale.accountid AND product.productid = sale.prodid UNION "+
                        "SELECT username as seller, productid as id, currentbid as price, startdate as starttime, enddate as endtime, prodname, condition, description, imagelink as img, accountid as aid " + 
                        "FROM account natural join auction natural join product WHERE auction.prodid = product.productid AND auction.accountid = account.accountid) as pdt WHERE id=" + id);
        
        query.on("row", function (row, result) {
            result.addRow(row);
        });
        query.on("end", function (result) {
                var response = {"product" : result.rows};
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
                        "where productid = prodid");
        
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

});

//////////// History

app.get('/Project1Srv/histories/:hid', function(req, res){
                
        var hid = req.params.hid;
        console.log("GET history: " + hid);
        var target = -1;
                for (var i=0; i < historyList.length; ++i){
                        if(historyList[i].hid == hid){
                                        target= i;
                                        break;
                                }
                }
                if (target == -1){
                        res.statusCode = 404;
                        res.send("Product not found.");
                }
                else {
                        var response = {"product" : historyList[i].productList[target]};
                          res.json(response);        
                  }                
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
        if ((mid < 0) || (mid >= midNextId)){
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

        var query = client.query("SELECT date, s.username, receiverid, messageid FROM message, account as s, account as r WHERE s.accountid = message.senderid "+
        "AND r.accountid=message.receiverid AND receiverid=" +id);
        
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

        var query = client.query("SELECT date, s.username, receiverid, messageid, r.username as receiver FROM message, account as s, account as r WHERE s.accountid = message.senderid "+
        "AND r.accountid=message.receiverid AND senderid=" +id);
        
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

        var query = client.query("SELECT text, date, s.username as sender, r.username as receiver "+
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

app.put('/Project1Srv/messages/:mid', function(req, res) {

});

app.del('/Project1Srv/messages/:mid', function(req, res) {

});

app.post('/Project1Srv/messages', function(req, res) {

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

// REST Operation - HTTP DELETE to delete an account based on its id
app.del('/Project1Srv/accounts/:aid', function(req, res) {

});

// REST Operation - HTTP POST to add a new a account
app.post('/Project1Srv/accounts', function(req, res) {

});


// Server starts running when listen is called.
app.listen(process.env.PORT || 3412);
console.log("server listening");