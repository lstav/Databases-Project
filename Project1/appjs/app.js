$(document).on('pagebeforeshow', '#login', function(){  
        
        $(document).on('click', '#submit', function() { 
        
        var username= $('#username').val();
        var password= $('#password').val();
        
        if(username.length > 0 && password.length > 0){
        	//alert(username+ password);
           AccountLogin(username, password);           
        } 
        
        else {
            alert('Please fill all fields');
        }           
            return false; 
        });    
});

$(document).on('pagebeforeshow', '#sign-up', function(){  
    
        $(document).on('click', '#submit', function() { 
        
        var username= $('#username').val();
        var password= $('#password').val();
        var first= $('#firstname').val();
        var last= $('#lastname').val();
        var email= $('#email').val();
        var address= $('#address').val();
        var creditcard=$('#creditcard').val();
        var billingaddress= $('#billingaddress').val();
        
        if(username.length > 0 && password.length > 0 && first.length > 0 && last.length > 0 && email.length > 0 && address.length > 0 && creditcard.length >0 && billingaddress.length > 0){
           
           alert("Account created");
           
        } 
        
        else {
            alert('Please fill all fields');
        }           
            
        });    
});


$(document).on('pagebeforeshow', '#homepage-account', function(){
		
	   var sessionId= GetSession();
	   if(loginAccount.username == undefined && sessionId[1] != undefined){
	   	
	   		loginAccount.username= sessionId[1];
	   		loginAccount.isadmin= sessionId[2];
	   		loginAccount.accountid= GetSession()[0];
	   }

       if(loginAccount.username!= undefined)	{
      
        $(document).on('click', '#profile-account', function() { 
        	  profile= loginAccount;
              $.mobile.changePage("account.html");
        });    
             
        var iname= $("#welcome");
        iname.empty();
        iname.append("<center><h3>hello "+loginAccount.username+"!</h3></center>");
        
         if(loginAccount.isadmin){
           var admin= $("#administrator-tools");
           var tool= '<br><a data-role= "button" data-mini= "true" href= "administrator.html"><center><h2>Tools</h2></center></a>';
           admin.empty();
           admin.append(tool).trigger('create');
          }
          
             var block1= $("#block1");
             var msg= '<a id= "profile-account" data-role="button" data-corners="false" data-ajax="false" data-history="true">My Profile</a>';
             block1.empty();
             block1.append(msg).trigger('create');
             
             var block2= $("#block2");
             var msg2= '<a href= "messageView.html" data-role="button" data-corners="false" data-theme="a">Messages</a>';
             block2.empty();
             block2.append(msg2).trigger('create'); 
             
             var block3= $("#block3");
             var msg3= '<a href= "login.html" data-rel= "external" data-role="button" data-corners="false">Log Out</a>';
             block3.empty();
             block3.append(msg3).trigger('create');
       }
       
		else{
			
      		//Guest
       		 var block1= $("#block1");
             var msg= '<a  href= "login.html" data-role="button" data-corners="false">Sign in</a>';
             block1.empty();
             block1.append(msg).trigger('create');
             
             var block2= $("#block2");
             var msg2= '<a href= "signup.html" data-role="button" data-corners="false" >Sign up</a>';
             block2.empty();
             block2.append(msg2).trigger('create');
             
             var block3= $("#block3");
             var msg3= '<a  href= "index.html" data-role="button" data-icon="home" data-corners="false" data-theme="a">Home</a>';
             block3.empty();
             block3.append(msg3).trigger('create');  
       	
       }
       
        $(document).on('click', '#sale-button', function() { 
        	
        	//alert(loginAccount.username);
              if(loginAccount.username!= undefined)
              {
              	 $.mobile.changePage("create-sale.html");
              }
              
              else{
              	 $.mobile.changePage("login.html");
              }
        });  
	       
});

 $(document).on('click', '#logout', function() { 
        	sessionStorage.clear();
            $.mobile.changePage("login.html");

 });  
        

$(document).on('pagebeforeshow', "#accounts", function( event, ui ) {
	
		 var sessionId= GetSession();
	  	 if(loginAccount.username == undefined && sessionId[1] != undefined){
	   		loginAccount.accountid= GetSession()[0];
	   		loginAccount.username= sessionId[1];
	   		loginAccount.isadmin= sessionId[2];	}

		 //alert(loginAccount.username);
		 if(loginAccount.username!= undefined){

		 $(document).on('click', '#edit-account', function() { 
            $.mobile.changePage("settings.html");
        });  
        var stars = "";
        
        for(var i=0; i<loginAccount.rank; i++) {
    	   	stars = stars + "*";
       }
        
          var list = $("#account-list");
          list.empty();
          var account = loginAccount;
          list.append("<li>" + account.fname + " " + account.lname + "</li>" + 
              "<li >Shipping Address: " + " " + account.shipping + "</li>" + 
              "<li>Billing Address: " + " " + account.billing + "</li>" +
              "<li>Credit Card: " + " " + account.cardnumber +"</li>" +
              "<li> Rank: " + stars + "</li>");        
                      
                        var iname= $("#username2");
                        var msg= '<a data-role= "button" data-mini= "true" data-corners="false" style= "color: DarkRed"><center><h2>'+account.username+'</h2></center></a>';
                        iname.empty();
                        iname.append(msg).trigger('create');
                        
                        var img= $("#user-image");
                        img.empty();
                        img.append("<p> <center> <img src='http://img707.imageshack.us/img707/9563/i5n.gif'/> </center> </p>");
                        list.listview("refresh");}
                        
           else{
           		$.mobile.changePage("login.html");
           }

});

$(document).on('pagebeforeshow', "#account-view", function( event, ui ) {
        // loginAccount has been set at this point
         var sessionId= GetSession();
        var len = loginAccount.apassword.length;
        var pass = "";
        for (var i=0; i < len; ++i){
                pass = pass + "*";
        }
        //alert(loginAccount.username);
        $('#upd-username').val(loginAccount.username); 
        $('#upd-fname').val(loginAccount.fname);
        $('#upd-lname').val(loginAccount.lname);
        $("#upd-shipping").val(loginAccount.shipping);
        $("#upd-billing").val(loginAccount.billing);
        $('#upd-creditCard').val("*****" + loginAccount.cardnumber.substr(5,6));
        $('#upd-email').val(loginAccount.email);
       	$('#upd-password').val(pass);
        
        $('#username').html("Username: " + loginAccount.username);
        $('#fname').html("First Name: " + loginAccount.fname);
        $('#lname').html("Last Name: " + loginAccount.lname);
        $("#shippingA").html("Shipping Address: " + loginAccount.shipping);
        $("#billingA").html("Billing Address: " + loginAccount.billing);
       	$('#cCard').html("Credit Card Number: *****" + loginAccount.cardnumber.substr(5,6));
        $('#email').html("Email: " + loginAccount.email);
       	$('#password').html("Password: " + pass); 
        
});

$(document).on('pagebeforeshow', "#profile-page", function( event, ui ) {
	 
	 	//alert(loginAccount.username);
        var list= $("#profile-info");
        list.empty();
        list.append("<li><a <h4>Name: "+profile.fname +" "+ profile.lname+"</h4></a> </li>");
        list.append("<li><a <h4>Rank: "+ profile.rank  +"</h4></a> </li>");
        //list.append("<li><a <h4>Location:"+profile.location  +"</h4></a> </li>");
        
        var uname= $("#username");
        var msg= '<a style= "color: DarkRed"><center><h2>'+profile.username+'</h2></center></a>';
        uname.empty();
        uname.append(msg).trigger('create');
        
        var img= $("#user-image");
        img.empty();
        img.append("<p> <center> <img src='http://img707.imageshack.us/img707/9563/i5n.gif'/> </center> </p>");
        list.listview("refresh");
        
        var pname= $("#name");
        pname.empty();
        pname.append("<center>"+profile.username+"</center>");

});

$(document).on('pagebeforeshow', "#uSalePage", function(event, ui) {
        
        		//alert(loginAccount.username);
                var productCat = currentSalesList;
                var len =productCat.length;
                
                //alert(profile.username + " "+ loginAccount.username);
                
                if(len==0){
                        var iname= $("#message");
                        var msg= '<br><a data-rel="back"><center><h2>No sales to display.</h2><br> <img src="http://img43.imageshack.us/img43/6572/4v4.gif" /></center></a> ';
                        iname.empty();
                        iname.append(msg).trigger('create');
                        
                        var order= $("#order-list");
                        order.empty();
                        
                       
                        if(profile.username== loginAccount.username){
                        var sell= $("#sell-button");
                        var msg2= '<br><a data-role= "button" data-mini= "true"><center><h2>Sell an item</h2></center></a>';
                        sell.empty();
                        sell.append(msg2).trigger('create');
                        }
                }
                else{
                var list = $("#sales-list");
                list.empty();
                var item;
                for (var i=0; i < len; ++i){
                item =productCat[i];
                list.append("<li><a onClick=GetProduct("+item.id+")> <img src='"+ item.img+ "'/>" + item.prodname + "<h4> Price:"+item.price+"<\h4></a></li>");
                }
                list.listview("refresh");}
});

$(document).on('pagebeforeshow', "#auctionPage", function(event, ui) {
	
			 	//alert(loginAccount.username);
                var productCat = currentAuctionList;
                var len =productCat.length;

                if(len==0){
                        var iname= $("#message");
                        var msg= '<br><a data-rel="back"><center><h2>No auctions to display.</h2><br> <img src="http://img43.imageshack.us/img43/6572/4v4.gif" /></center></a> ';
                        iname.empty();
                        iname.append(msg).trigger('create');
                        
                        var order= $("#order-list");
                        order.empty();
                        
                        if(profile.username== loginAccount.username){
                        var sell= $("#sell-button");
                        var msg2= '<br><a data-role= "button" data-mini= "true"><center><h2>Auction an item</h2></center></a>';
                        sell.empty();
                        sell.append(msg2).trigger('create');
                        }
                }
                else{
                var list = $("#auction-list");
                list.empty();
                var item;
                for (var i=0; i < len; ++i){
                item =productCat[i];
                var element='<a id="bid-icon" data-role="button" data-icon= "grid" data-mini="true" style="color: MidnightBlue " >Bid History</a>';
                list.append("<li><a onClick=GetProduct("+item.id+")> <img src='"+ item.img+ "'/>" + item.prodname + "<h4>Price:"+item.price+"</h4></a>"+ element+"</li>");
                }
                list.listview("refresh");
                
                      $(document).on('click', '#bid-icon', function() { 
						$.mobile.changePage("bids.html");
					 });    
                
                }

});

$(document).on('pagebeforeshow', "#bidPage", function(event, ui) {
        
        		//alert(loginAccount.username);
                var productbid = productBids;
                var len =productBids.length;
                
                
                if(len==0){
                        var iname= $("#message");
                        var msg= '<br><a data-rel="back"><center><h2>No bids to display.</h2><br> <img src="http://img43.imageshack.us/img43/6572/4v4.gif" /></center></a> ';
                        iname.empty();
                        iname.append(msg).trigger('create');}
                        
                else{
                var list = $("#bid-info");
                list.empty();
                var item;
                for (var i=0; i < len; ++i){
                item =productbid[i];
                list.append("<li><a>" + item.bidder + "<h4> Bid:"+item.bid+" on "+ item.bdate+"<\h4></a></li>");
                }
                list.listview("refresh");}
});

$(document).on('pagebeforeshow', '#create-auction', function(){  
	
	   //alert(loginAccount.username);
       $(document).on('click', '#submit-auction', function() { 
              alert("You have created an auction!");
        });    
});

$(document).on('pagebeforeshow', '#create-sale', function(){  

		//alert(loginAccount.username);
       $(document).on('click', '#submit-sale', function() { 
              alert("Your product is on sale!");
        });  
});


///// Category and product
$(document).on('click', '#search-button', function() { 
              GetCategories();
}); 


$(document).on('pagebeforeshow', "#catLayout", function(event, ui) {

				var category= currentCategories;
				var len= category.length;
				var list=$("#show-categories");
				list.empty();
				
				var cname;
                for (var i=0; i < len; ++i){
                cname =category[i].catname;
                cid= category[i].catid;
                list.append("<li onClick= GetSubCategory("+cid+")><a>"+ cname+ "</a></li>");
                }
                list.listview("refresh" );
				 
});

$(document).on('pagebeforeshow', "#subcatLayout", function(event, ui) {

				var category= subCategories;
				var len= category.length;
				var list=$("#show-subcategories");
				list.empty();
				
				if(len > 0){
                var pname=$("#pcat");
                pname.empty();
                pname.append(currentCategories[0].catname).trigger("create");
                }
				
                
                list.append("<li onClick= GetAllProducts("+category[0].parentid+")><a>All</a></li>");
				
				var sname;
                for (var i=0; i < len; ++i){
                sname =category[i].catname;
                sid= category[i].catid;
                list.append("<li onClick= GetCategoryProducts("+sid+")><a>"+ sname+ "</a></li>");
                }
                
                list.listview("refresh" );
                
                 
				 
});

$(document).on('pagebeforeshow', "#catProductView", function(event, ui) {
				//alert(loginAccount.username);
                var productCat = currentCategoryProducts;
                var len =productCat.length;
                var list = $("#product-list");
                list.empty();
                
                if(len > 0){
                var item;
                for (var i=0; i < len; ++i){
                item =productCat[i];
                list.append("<li><a onClick=GetProduct("+item.id+")> <img src='"+ item.img+ "'/>" + item.prodname + "<h4> Price: "+item.price+"<\h4></a></li>");
                }
                
                var iname= $("#catName2");
                iname.empty();
                iname.append("<center>"+productCat[0].catname+"</center>");}
                
                else{
                	
                var msg='<li><a data-rel=back data-role="button">No products</a></li>;';
                list.append(msg);                	
                }
                                
                list.listview("refresh");
});

$(document).on('pagebeforeshow', "#productPage", function(event, ui) {
		
        var list= $("#item-info");
        list.empty();
        list.append("<li><a> <strong>Price:</strong><kbd>"+currentProduct.price  +"</kbd></a> </li>");
        list.append("<li><a> <strong>Quantity:</strong><kbd> Unavailable </kbd></a> </li>");
        list.append("<li><a> <strong>Condition: </strong><kbd>"+currentProduct.condition  +"</kbd></a> </li>");
        list.append("<li><a> <strong>Location: </strong><kbd>Unavailable</kbd></a> </li>");
        list.append("<li><a><strong> Item ID: </strong><kbd>"+currentProduct.id+"</kbd></a> </li>");
        
        var sell= $("#seller-info");
        sell.empty();
        sell.append("<li><a  onClick= GoProfile('"+currentProduct.aid+"')>"+currentProduct.seller+"</a></li>");

        var idescription= $("#description");
        idescription.append("<p>"+currentProduct.description+"</p>");
        $('#item-image').prepend('<center><img id="theImg" src="' + currentProduct.img+'"/></center>');
        //table1.table("refresh"); 
        
        var payment= $("#payments");
        payment.append("<p>Payments</p>");
        
               
        var shipping= $("#shipping");
        shipping.append("<p>Unavailable/p>");
        
        var pname= $("#productName2");
        pname.empty();
        pname.append("<center>"+currentProduct.prodname+"</center>");
        
        list.listview("refresh");
        sell.listview("refresh");
        
        if(loginAccount.username == currentProduct.seller){
        	 var bid= $("#bid-name");
             var msg= '<input type="button" value= "List of Bids" onClick=GetBids('+currentProduct.id+') data-mini="true"/>';
             bid.empty();
             bid.append(msg).trigger('create');
             
             var submit= $("#bid-offer");
             var msg2= '<input type="submit" href="homepage.html" value="End Sale" onClick=EndSale() data-theme="a" data-mini="true"/>';
             submit.empty();
             submit.append(msg2).trigger('create');
             
             var buy= $("#buy-now");
             var msg3= '<input type="submit" href= "create-sale.html" id= "sale-other" value= "Sell another like this" data-mini="true"/>';
             buy.empty();
             buy.append(msg3).trigger('create');
        }
        else
        {
        	 var bid= $("#bid-name");
             var msg= '<input type="text" id="bid" value= "Make a bid" data-mini="true"/>';
             bid.empty();
             bid.append(msg).trigger('create');
             
             if(loginAccount.username != undefined){
             var submit= $("#bid-offer");
             var msg2= '<a><input type="submit" id= "submitBid" value="Submit" onClick= UpdateBid() data-theme="a" data-mini="true"/></a>';
             submit.empty();
             submit.append(msg2).trigger('create');
             
             var buy= $("#buy-now");
             var msg3= '<a><input type="submit" id= "purchase" value= "Buy it now" onClick= SaveOrder() data-mini="true"/></a>';
             buy.empty();
             buy.append(msg3).trigger('create');}
             
             else{
             	
             var submit= $("#bid-offer");
             var pop='<a id= "bid-offer" href="#popupLogin" data-rel="popup" data-position-to="window" data-inline="true">';
             var msg2='<input type= "submit" id= "submitBid" value="Submit" value= "Submit" data-mini="true"/></a>';
             submit.empty();
             submit.append(pop+msg2).trigger('create');
             
             var buy= $("#buy-now");
             var pop2= '<a href="#popupLogin" data-rel="popup" data-position-to="window" data-inline="true">';
             var msg3= '<input type= "submit" value= "Buy it now" data-theme="a"data-mini="true" /></a>';
            
             buy.empty();
             buy.append(pop2+msg3).trigger('create');
             	
             }
        }
        
        $(document).on('click', '#login-buy', function() { 
              alert("You have purchased this item!");
        });  
        
        $(document).on('click', '#sale-other', function() { 
              $.mobile.changePage("create-sale.html");
        });  
        
        

});

////////// Checkout

$(document).on('pagebeforeshow', "#checkoutItem", function(event, ui) {
        
        var info= $("#totalPurchase");
        info.empty();
        info.append("Total: $     "+ shoppingcartTotal);
        
});

////////// Shopping Cart

var shoppingcartTotal=0;

$(document).on('pagebeforeshow', "#shopCartView", function(event, ui) {
		//alert(loginAccount.username);
		var id= loginAccount.accountid();
		
        $.ajax({
                url : "http://localhost:3412/Project1Srv/shoppingcarts",
                contentType: "application/json",
                success : function(data, textStatus, jqXHR){
                        var shoppingcartList = data.shoppingcarts;
                        var len =shoppingcartList[0].productList.length;
                        var list = $("#shopping-list");
                        list.empty();
                        var shoppingcart;
                        shoppingcart = shoppingcartList[0];
                        shoppingcartTotal=0;
                        for (var i=0; i < len; ++i){
                                shoppingcartTotal+= parseFloat(shoppingcart.productList[i].price);
                                list.append("<li data-icon='delete' ><a onClick=DeleteShoppingCart(" + shoppingcart.productList[i].id + ")>"+ 
                                "<img src='"+ shoppingcart.productList[i].img+ "'/>" + shoppingcart.productList[i].prodname + 
                                        "<h4> Price: $"+shoppingcart.productList[i].price+"<\h4></a></li>");
                        }        
                        if (len < 1){
                                //list.append("<li data-icon='false'> <a No items in your shopping cart. </a> </li>");
                                var iname= $("#message");
                       			var msg= '<br><a data-rel="back"><center><h2>No auctions to display.</h2><br> <img src="http://img59.imageshack.us/img59/1723/oby.gif" /></center></a> ';
                       			iname.empty();
                        		iname.append(msg).trigger('create');
                        }
                        list.listview("refresh");
                },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        alert("Data not found!");
                }
        });
});

//////// History

$(document).on('pagebeforeshow', "#historyPage", function(event, ui) {
	
		var list=$("#myhistory-list");
		list.empty();
	
		var h1= '<li><a onClick=BidUser('+loginAccount.accountid+')>My Bids</a></li>';
		var h2= '<li><a onClick=PurchaseUser('+loginAccount.accountid+')>Purchased</a></li>';
		var h3= '<li><a onClick=SalesUser('+loginAccount.accountid+')>Sales</a></li>';
		list.append(h1+h2+h3);
		
		list.listview("refresh");
	
        
});

$(document).on('pagebeforeshow', "#historyList", function(event, ui){
	
                var userbid = userBids;
                var len =userBids.length;

               if(len==0){ 
                        var iname= $("#message");
                        var msg= '<br><a data-rel="back"><center><h2>No bids to display.</h2><br> <img src="http://img43.imageshack.us/img43/6572/4v4.gif" /></center></a> ';
                        iname.empty();
                        iname.append(msg).trigger('create');}
                        
                else{
                	
                var list = $("#mybids-list");
                list.empty();
                var item;
                for (var i=0; i < len; ++i){
                item =userbid[i];
                list.append("<li><a onClick= GetProduct("+item.id+")><img src='"+ item.img+ "'/>"+item.prodname + "<h4> Your bid:"+item.bid+"<\h4></a></li>");
                }
                list.listview("refresh");}
                
});

$(document).on('pagebeforeshow', "#purchaseList", function(event, ui){
	
                var usales = purchases;
                var len =usales.length;

               if(len==0){ 
                        var iname= $("#message");
                        var msg= '<br><a data-rel="back"><center><h2>No bids to display.</h2><br> <img src="http://img43.imageshack.us/img43/6572/4v4.gif" /></center></a> ';
                        iname.empty();
                        iname.append(msg).trigger('create');}
                        
                else{
                	
                var list = $("#mypurchase-list");
                list.empty();
                var item;
                for (var i=0; i < len; ++i){
                item =usales[i];
                list.append("<li><a onClick= GetProduct("+item.id+")><img src='"+ item.img+ "'/>"+item.prodname + "<h4> Your bid:"+item.bid+"<\h4></a></li>");
                }
                list.listview("refresh");}
                
});

$(document).on('pagebeforeshow', "#saleList", function(event, ui){
	
                var usales = sales;
                var len =usales.length;

               if(len==0){ 
                        var iname= $("#message");
                        var msg= '<br><a data-rel="back"><center><h2>No bids to display.</h2><br> <img src="http://img43.imageshack.us/img43/6572/4v4.gif" /></center></a> ';
                        iname.empty();
                        iname.append(msg).trigger('create');}
                        
                else{
                	
                var list = $("#mysale-list");
                list.empty();
                var item;
                for (var i=0; i < len; ++i){
                item =usales[i];
                list.append("<li><a onClick= GetProduct("+item.id+")><img src='"+ item.img+ "'/>"+item.prodname + "<h4> Condition:"+item.condition+" </h4> <h5> Sale:"+item.price+"</h5></a></li>");
                }
                list.listview("refresh");}  
});


////////// Message

$(document).on('pagebeforeshow', "#inbox", function(event, ui) {
        $.ajax({
                url : "http://localhost:3412/Project1Srv/messages",
                contentType: "application/json",
                success : function(data, textStatus, jqXHR){
                        var messageList = data.messages;
                        var len = messageList.length;
                        var list = $("#inbox-list");
                        list.empty();
                        var message;
                        message = messageList[0];
                        list.append("<li><h2>"+message.sName+ "</h2><p>" +message.mText+"</p></li>");
                        list.listview("refresh");
                },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        alert("Data not found!");
                }
        });
});
$(document).on('pagebeforeshow', "#sent", function(event, ui) {
        $.ajax({
                url : "http://localhost:3412/Project1Srv/messages",
                contentType: "application/json",
                success : function(data, textStatus, jqXHR){
                        var messageList = data.messages;
                        var len = messageList.length;
                        var list = $("#sentMessage-list");
                        list.empty();
                        var message;
                        message = messageList[1];
                        list.append("<li><h2>"+message.sName+ "</h2><p>" +message.mText+"</p></li>");
                        list.listview("refresh");
                },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        alert("Data not found!");
                }
        });
});

////////// Total Categories ////////////////

$(document).on('pagebeforeshow', "#Admin", function(event, ui) {
        $.ajax({
                url : "http://localhost:3412/Project1Srv/categories",
                contentType: "application/json",
                success : function(data, textStatus, jqXHR){
                        var categoriesList = data.categories;
                        var len =categoriesList.length;
                        var list = $("#categories-lists");
                        list.empty();
                        var categories;
                        categories = categoriesList[0];
                        for (var i=0; i < len; ++i){
                                list.append("<li data-icon='delete' ><a onClick=DeleteCategory(" + categoriesList[i].catid + ")>"+ 
                                categoriesList[i].catname + "</li>");
                        }        
                        list.listview("refresh");
                },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        alert("Data not found!");
                }
        });
});

///////////////////////////////
function ConverToJSON(formData){
        var result = {};
        $.each(formData, 
                function(i, o){
                        result[o.name] = o.value;
        });
        return result;
}

function SaveSession(account){

    	sessionStorage.setItem("fname", account.fname);
    	sessionStorage.setItem("lname", account.lname);
    	//sessionStorage.setItem("aaccountnumber", account.aaccountnumber);
    	sessionStorage.setItem("email", account.email);
        sessionStorage.setItem("username", account.username);
        sessionStorage.setItem("accountid", account.accountid);
        sessionStorage.setItem("isadmin", account.isadmin);
}

function GetSession(){
		var session= new Array(sessionStorage.getItem("accountid"), sessionStorage.getItem("username"));
        return session; 
}

function SaveAccount(){
        alert("Account Created!");
}

var currentAddress = {};

function GetAddress(addressid){
        $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/Project1Srv/address/" + addressid,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        currentAddress = data.address;
                        $.mobile.loading("hide");
                },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("Address not found.");
                        }
                        else {
                                alert("Internal Server Error.");
                        }
                }
        });
}

function UpdateAccount(){
        alert("Account Saved!");
}

function DeleteAccount(){
        var decision = confirm("Delete Account?");
        if(decision == true) {
                alert("Account Deleted");
        }
}

function aconvert(dbModel){
        var aliModel = {};
        
        aliModel.aid = dbModel.accountid;
        aliModel.afName = dbModel.fname;
        aliModel.alName = dbModel.lname;
        aliModel.aEmail = dbModel.email;
        aliModel.aUsername = dbModel.username;
        aliModel.aPassword = dbModel.apassword;
       	aliModel.aShipping = dbModel.shipping;
        aliModel.aBilling = dbModel.billing;
        aliModel.rank = dbModel.rank;
        
        return aliModel;
}

var loginAccount={};
function AccountLogin(username, password){
        
        console.log("confirming login information");
        $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/Project1Srv/login/"+username+"/"+password,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        
                        var login= data.accountLogin;
                        var len= login.length;
                        $.mobile.loading("hide");
                        if(len !=0){        
                                loginAccount= data.accountLogin[0];
                                SaveSession(loginAccount);
                                $.mobile.changePage("homepage.html");
                        }
                        else{
                                alert("Invalid login information. Try again.");
                        }
                                
                        },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("Login error.");
                        }
                        else {
                                alert("Internal Server Error. Page: Login");
                        }
                }
        });        
}

var profile={};
function GoProfile(id){
	    console.log("getting profile");
        $.mobile.loading("show");
        
		if(loginAccount.accountid == id){
			 $.mobile.loading("hide");
             $.mobile.changePage("account.html");
		}
     
     	else{
        $.ajax({
                url : "http://localhost:3412/Project1Srv/profiles/"+id,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        profile= data.profile[0];
                        $.mobile.loading("hide");
                        $.mobile.changePage("profile.html");
                        },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("Profile loading error.");
                        }
                        else {
                                alert("Internal Server Error.");
                        }
                }
        });}    
}

function GoAccount(){
        
         if(loginAccount.username!= undefined){
         	
         	   $.mobile.changePage("account.html");

		   }
                        
           else{
           		$.mobile.changePage("login.html");
           }
}
////// Product

var currentProduct= {};
function GetProduct(id){
        $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/Project1Srv/products/"+ id,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        currentProduct= data.product[0];
                        $.mobile.loading("hide");        
                        $.mobile.changePage("item.html");
                        },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("Product error.");
                        }
                        else {
                                alert("Internal Server Error.");
                        }
                }
        });}
        
//////// Shopping Cart

var currentShoppingCart = {};
function GetShoppingCart(scid){
        $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/Project1Srv/shoppingcarts/"+ scid,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        currentShoppingCart= data.shoppingcart;
                        $.mobile.loading("hide");
                        $.mobile.changePage("shopping.html");
                },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("Shopping Cart error.");
                        }
                        else {
                                alert("Internal Server Error.");
                        }
                }
        });
}
       
/* function Sortby(id){

        $.ajax({
                url : "http://localhost:3412/Project1Srv/sortProducts/"+ id,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        currentCategoryProducts= data.productsIncategory;
                        $.mobile.navigate("#catProductView");                
                        //window.location.reload(true);
                },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("Product loading error.");
                        }
                        else {
                                alert("Internal Server Error.");
                        }
                }
        });
        
}*/

function UpdateShoppingCart(){
        alert("Account Saved!");
}

function DeleteShoppingCart(id){
        var decision = confirm("Delete Product?");
                if(decision == true) {
                        alert("Product Deleted");                
                }
}

//Bids
var productBids={};
function GetBids(id){
	
        $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/Project1Srv/bidsproducts/"+id,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                			productBids= data.bids;
                        	$.mobile.changePage("bids.html");
                        },                        
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("List of bids not available.");
                        }
                        else {
                                alert("Internal Server Error.");
                        }
                }

        });
}

var userBids={};
function BidUser(id){
	
        $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/Project1Srv/bidusers/"+id,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                			userBids= data.biduser;
                			$.mobile.loading("hide");
                        	$.mobile.changePage("biduser.html");
                        },                        
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("List of bids not available.");
                        }
                        else {
                                alert("Internal Server Error.");
                        }
                }

        });
}

var purchases={};
function PurchaseUser(id){
	
        $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/Project1Srv/purchaseusers/"+id,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                			purchases= data.purchaseuser;
                			$.mobile.loading("hide");
                        	$.mobile.changePage("purchaseuser.html");
                        },                        
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("List of bids not available.");
                        }
                        else {
                                alert("Internal Server Error.");
                        }
                }

        });
}

var sales={};
function SalesUser(id){
	
        $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/Project1Srv/salesusers/"+id,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                			sales= data.saleuser;
                			$.mobile.loading("hide");
                        	$.mobile.changePage("saleuser.html");
                        },                        
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("List of bids not available.");
                        }
                        else {
                                alert("Internal Server Error.");
                        }
                }

        });
}


function EndSale(){
        alert("Sale ended!");
}

//////// Category
var currentCategoryProducts = {};

function GetAllProducts(id){
 
        $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/Project1Srv/categoryAll/"+ id,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        currentCategoryProducts= data.allProducts;
                        $.mobile.loading("hide");
                        $.mobile.changePage("productview.html", {
                                info: id,
                        });},                        
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("Category Empty!");
                        }
                        else {
                                alert("Internal Server Error.");
                        }
                }

        });
}

function GetCategoryProducts(id){
      
        $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/Project1Srv/categoryProducts/"+ id,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        currentCategoryProducts= data.productsIncategory;
                        $.mobile.loading("hide");
                        $.mobile.changePage("productview.html", {
                                info: id,
                        });},                        
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("Category Empty!");
                        }
                        else {
                                alert("Internal Server Error.");
                        }
                }

        });
}

var currentCategories= {};
function GetCategories(){
     
        $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/Project1Srv/category",
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        currentCategories= data.categories;
                        $.mobile.loading("hide");
                        $.mobile.changePage("Categories.html");
                        
                       },                        
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("Category Empty!");
                        }
                        else {
                                alert("Internal Server Error.");
                        }
                }

        });
}

var subCategories= {};
function GetSubCategory(id){
     
        $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/Project1Srv/subcategory/"+id,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        subCategories= data.subcategory;
                        $.mobile.loading("hide");
                        $.mobile.navigate("subcategories.html");
                        
                       },                        
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("Category Empty!");
                        }
                        else {
                                alert("Internal Server Error.");
                        }
                }

        });
}


var currentAuctionList = {};
function GetAuctions(){
        id= profile.accountid;
        $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/Project1Srv/auctions/"+ id,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        currentAuctionList= data.userAuctions;
                        $.mobile.loading("hide");
                        $.mobile.changePage("uauctions.html", {
                                info: id,
                        });},                        
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("Sales Empty!");
                        }
                        else {
                                alert("Internal Server Error.");
                        }
                }

        });
}

var currentSalesList = {};
function GetSales(){
        id= profile.accountid;
        //alert(profile.accountid);
        $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/Project1Srv/sales/"+ id,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        currentSalesList= data.userSales;
                        $.mobile.loading("hide");
                        $.mobile.changePage("usales.html", {
                                info: id,
                        });},                        
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("Sales Error!");
                        }
                        else {
                                alert("Internal Server Error.");
                        }
                }

        });
}

////// Check out

function checkOut(scid){
        $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/Project1Srv/shoppingcarts/"+scid,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        currentShoppingCart= data.shoppingcart;
                        $.mobile.loading("hide");
                        $.mobile.navigate("check.html");
                        },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("Check out error.");
                        }
                        else {
                                alert("Internal Server Error.");
                        }
                }
        });        
}

/////////// History

var currentHistory = {};
function GetHistory(hid){
        $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/Project1Srv/histories/"+ hid,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        currentHistory= data.history;
                        $.mobile.loading("hide");
                        $.mobile.navigate("#history", {
                                info: hid,
                        });},
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("History error.");
                        }
                        else {
                                alert("Internal Server Error.");
                        }
                }
        });
}

/////////// Message

var currentMessage = {};
function GetMessage(mid){
        $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/Project1Srv/messages/" + mid,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        currentMessage = data.message;
                        $.mobile.loading("hide");
                        if(mid==0)
                        $.mobile.navigate("inbox.html");
                        else
                        $.mobile.navigate("sentMessages.html");
                },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("Message not found.");
                        }
                        else {
                                alert("Internal Server Error.");
                        }
                }
        });
}

function submitMessage(){
        alert("Message have been sent");
        location.href="message.html";
}

////// Order

function SaveOrder(){
        alert("Added to shopping cart!");
}

///// Bid

function UpdateBid(){
        alert("Bid submitted!");
}