$(document).on('pagebeforeshow', '#login', function(){  
        
        $(document).on('click', '#submit', function() { 
        
        var username= $('#username').val();
        var password= $('#password').val();
        
        if(username.length > 0 && password.length > 0){
           
           AccountLogin(username, password);
           
        } 
        
        else {
            alert('Please fill all fields');
        }           
            return false; 
        });    
});

function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1)
  	{
  		c_start = c_value.indexOf(c_name + "=");
  	}
	if (c_start == -1)
  	{
  		c_value = undefined;
  	}
	else
  	{
	  	c_start = c_value.indexOf("=", c_start) + 1;
  		var c_end = c_value.indexOf(";", c_start);
  		if (c_end == -1)
	  {
		c_end = c_value.length;
	}
	c_value = unescape(c_value.substring(c_start,c_end));
	}
	return c_value;
}

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
		loginAccount.username = getCookie("username");	
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
             var msg2= '<a href= "#" data-role="button" data-corners="false">Watch List</a>';
             block2.empty();
             block2.append(msg2).trigger('create');
             
             var block3= $("#block3");
             var msg3= '<a href= "messageView.html" data-role="button" data-corners="false" data-theme="a">Messages</a>';
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
       
        $(document).on('click', '#sell-button', function() { 
              if(loginAccount.ausername!= undefined)
              {
              	 $.mobile.changePage("create-sale.html");
              }
              
              else{
              	 $.mobile.changePage("login.html");
              }
        });  
	       
});

$(document).on('pagebeforeshow', "#accounts", function( event, ui ) {
		 //alert(loginAccount.ausername);
		 loginAccount.ausername = getCookie("username");
		 if(loginAccount.ausername!= undefined){

		 $(document).on('click', '#edit-account', function() { 
         $.mobile.changePage("settings.html");
    	   });  
        
          var list = $("#account-list");
          list.empty();
          var account = loginAccount;
               
          list.append("<li>" + account.afname + " " +        account.alname + "</li>" + 
              //"<li GetAddress(" + account.shippingid +")>Shipping Address: </li>" + 
              //"<li>Billing Address: " + account.fname + "</li>" +
              //"<li>Credit Card: *****" + account.accard.substr(5,6) + "</li>" +
              "<li> Rank: " + account.rank + "</li>");        
                      
                        var iname= $("#username2");
                        var msg= '<a data-role= "button" data-mini= "true" data-corners="false" style= "color: DarkRed"><center><h2>'+account.ausername+'</h2></center></a>';
                        iname.empty();
                        iname.append(msg).trigger('create');
                        
                        var img= $("#user-image");
                        img.empty();
                        img.append("<p> <center> <img src='http://img707.imageshack.us/img707/9563/i5n.gif'/> </center> </p>");
                        list.listview("refresh");
               }
         else{
          		$.mobile.changePage("login.html");
           }
});

$(document).on('pagebeforeshow', "#account-view", function( event, ui ) {
        // loginAccount has been set at this point
        /* var len = loginAccount.apassword.length;
        var pass = "";
        for (var i=0; i < len; ++i){
                pass = pass + "*";
        }*/
        //alert(loginAccount.ausername);
        $('#upd-username').val(loginAccount.ausername); 
        $('#upd-fname').val(loginAccount.afname);
        $('#upd-lname').val(loginAccount.alname);
        //$("#upd-shipping").val(loginAccount.ashipping);
        //$("#upd-billing").val(loginAccount.abilling);
        $('#upd-creditCard').val("*****" + loginAccount.accard.substr(5,6));
        $('#upd-email').val(loginAccount.aemail);
        //$('#upd-password').val(pass);
        
        $('#username').html("Username: " + loginAccount.ausername);
        $('#fname').html("First Name: " + loginAccount.afname);
        $('#lname').html("Last Name: " + loginAccount.alname);
        //$("#shippingA").html("Shipping Address: " + loginAccount.ashipping);
        //$("#billingA").html("Billing Address: " + loginAccount.abilling);
        $('#cCard').html("Credit Card Number: *****" + loginAccount.accard.substr(5,6));
        $('#email').html("Email: " + loginAccount.aemail);
        //$('#password').html("Password: " + pass); 
        
});

$(document).on('pagebeforeshow', "#profile-page", function( event, ui ) {
	 
	 	//alert(loginAccount.ausername);
        var list= $("#profile-info");
        list.empty();
        list.append("<li><a <h4>Name: "+profile.afname +" "+ profile.alname+"</h4></a> </li>");
        list.append("<li><a <h4>Rank: "+ profile.rank  +"</h4></a> </li>");
        //list.append("<li><a <h4>Location:"+profile.location  +"</h4></a> </li>");
        
        var uname= $("#username");
        var msg= '<a style= "color: DarkRed"><center><h2>'+profile.ausername+'</h2></center></a>';
        uname.empty();
        uname.append(msg).trigger('create');
        
        var img= $("#user-image");
        img.empty();
        img.append("<p> <center> <img src='http://img707.imageshack.us/img707/9563/i5n.gif'/> </center> </p>");
        list.listview("refresh");
        
        var pname= $("#name");
        pname.empty();
        pname.append("<center>"+profile.ausername+"</center>");

});

$(document).on('pagebeforeshow', "#uSalePage", function(event, ui) {
        
        		//alert(loginAccount.ausername);
                var productCat = currentSalesList;
                var len =productCat.length;
                
                //alert(profile.ausername + " "+ loginAccount.ausername);
                
                if(len==0){
                        var iname= $("#message");
                        var msg= '<br><a data-rel="back"><center><h2>No sales to display.</h2><br> <img src="http://img43.imageshack.us/img43/6572/4v4.gif" /></center></a> ';
                        iname.empty();
                        iname.append(msg).trigger('create');
                        
                        var order= $("#order-list");
                        order.empty();
                        
                       
                        if(profile.ausername== loginAccount.ausername){
                        var sell= $("#sell-button");
                        var msg2= '<br><a data-role= "button" data-mini= "true" href= "sales.html"><center><h2>Sale an item</h2></center></a>';
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
                list.append("<li><a onClick=GetProduct("+item.pid+")> <img src='"+ item.img+ "'/>" + item.itemname + "<h4> Price: $"+item.price+"<\h4></a></li>");
                }
                list.listview("refresh");}
});

$(document).on('pagebeforeshow', "#auctionPage", function(event, ui) {
	
			 	//alert(loginAccount.ausername);
                var productCat = currentAuctionList;
                var len =productCat.length;

                if(len==0){
                        var iname= $("#message");
                        var msg= '<br><a data-rel="back"><center><h2>No auctions to display.</h2><br> <img src="http://img43.imageshack.us/img43/6572/4v4.gif" /></center></a> ';
                        iname.empty();
                        iname.append(msg).trigger('create');
                        
                        var order= $("#order-list");
                        order.empty();
                        
                        if(profile.ausername== loginAccount.ausername){
                        var sell= $("#sell-button");
                        var msg2= '<br><a data-role= "button" data-mini= "true" href= "auctions.html"><center><h2>Auction an item</h2></center></a>';
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
                list.append("<li><a onClick=GetProduct("+item.pid+")> <img src='"+ item.img+ "'/>" + item.itemname + "<h4>Price: $"+item.price+"</h4></a>"+ element+"</li>");
                }
                list.listview("refresh");
                
                      $(document).on('click', '#bid-icon', function() { 
						$.mobile.changePage("bids.html");
					 });    
                
                }

});

$(document).on('pagebeforeshow', '#create-auction', function(){  
	
	   //alert(loginAccount.ausername);
       $(document).on('click', '#submit-auction', function() { 
              alert("You have created an auction!");
        });    
});

$(document).on('pagebeforeshow', '#create-sale', function(){  

		//alert(loginAccount.ausername);
       $(document).on('click', '#submit-sale', function() { 
              alert("Your product is on sale!");
        });  
});


///// Category and product

$(document).on('pagebeforeshow', "#catProductView", function(event, ui) {
				//alert(loginAccount.ausername);        
});

$(document).on('pagebeforeshow', "#catProductView", function(event, ui) {
				//alert(loginAccount.ausername);
                var productCat = currentCategoryProducts;
                var len =productCat.length;
                var list = $("#product-list");
                list.empty();
                var item;
                for (var i=0; i < len; ++i){
                item =productCat[i];
                list.append("<li><a onClick=GetProduct("+item.pid+")> <img src='"+ item.img+ "'/>" + item.itemname + "<h4> Price: $"+item.price+"<\h4></a></li>");
                }
                list.listview("refresh");
                
                var iname= $("#catName2");
                iname.empty();
                iname.append("<center>"+currentCategory+"</center>");
        
});

$(document).on('pagebeforeshow', "#productPage", function(event, ui) {
        //alert(loginAccount.ausername);
        //var table1= $("#my-table");
        //table1.append("<td><b class=&quot;ui-table-cell-label&quot;>Price:        </b> $"+currentProduct.price  +"</td>");
        //table1.append("<td><b class=&quot;ui-table-cell-label&quot;>Quantity:        </b> "+currentProduct.quantity  +"</td>");
        //table1.append("<td><b class=&quot;ui-table-cell-label&quot;>Condition:        </b> "+currentProduct.condition  +"</td>");
        //table1.append("<td><b class=&quot;ui-table-cell-label&quot;>Shipping:        </b> "+currentProduct.shipping  +"</td>");
   		//table1.append("<td><b class=&quot;ui-table-cell-label&quot;>Payments:        </b> "+currentProduct.payment  +"</td>");
        
        var list= $("#item-info");
        list.empty();
        list.append("<li><a> <strong>Price:</strong><kbd> $"+currentProduct.price  +"</kbd></a> </li>");
        list.append("<li><a> <strong>Quantity:</strong><kbd> "+currentProduct.quantity  +"</kbd></a> </li>");
        list.append("<li><a> <strong>Condition: </strong><kbd>"+currentProduct.condition  +"</kbd></a> </li>");
        list.append("<li><a> <strong>Location: </strong><kbd>"+currentProduct.location  +"</kbd></a> </li>");
        list.append("<li><a><strong> Item ID: </strong><kbd>"+currentProduct.id+"</kbd></a> </li>");
        
        var sell= $("#seller-info");
        sell.empty();
        sell.append("<li><a  onClick= GoProfile('"+currentProduct.seller+"')>"+currentProduct.seller+"</a></li>");

        var idescription= $("#description");
        idescription.append("<p>"+currentProduct.description+"</p>");
        $('#item-image').prepend('<center><img id="theImg" src="' + currentProduct.img+'"/></center>');
        //table1.table("refresh"); 
        
        var payment= $("#payments");
        payment.append("<p>Payments</p>");
        
               
        var shipping= $("#shipping");
        shipping.append("<p>"+currentProduct.shipping+"</p>");
        
        var pname= $("#productName2");
        pname.empty();
        pname.append("<center>"+currentProduct.itemname+"</center>");
        
        list.listview("refresh");
        sell.listview("refresh");
        
        if(loginAccount.ausername == currentProduct.seller){
        	 var bid= $("#bid-name");
             var msg= '<input type="button" value= "List of Bids" onClick=GetBids()" data-mini="true"/>';
             bid.empty();
             bid.append(msg).trigger('create');
             
             var submit= $("#bid-offer");
             var msg2= '<input type="submit" value="End Sale" onClick=EndSale() data-theme="a" data-mini="true"/>';
             submit.empty();
             submit.append(msg2).trigger('create');
             
             var buy= $("#buy-now");
             var msg3= '<input type="submit" id= "sale-other" value= "Sell another like this" data-mini="true"/>';
             buy.empty();
             buy.append(msg3).trigger('create');
        }
        else
        {
        	 var bid= $("#bid-name");
             var msg= '<input type="text" id="bid" value= "Make a bid" data-mini="true"/>';
             bid.empty();
             bid.append(msg).trigger('create');
             
             var submit= $("#bid-offer");
             var msg2= '<input type="submit" id= "submitBid" onClick=UpdateBid() value="Submit" data-theme="a" data-mini="true"/>';
             submit.empty();
             submit.append(msg2).trigger('create');
             
             var buy= $("#buy-now");
             var msg3= '<input type="submit" id= "purchase" value= "Buy it now" onClick= GetShoppingCart(0) data-mini="true"/>';
             buy.empty();
             buy.append(msg3).trigger('create');
        }
        
        $(document).on('click', '#purchase', function() { 
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
		//alert(loginAccount.ausername);
		var id= loginAccount.aid();
		
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
                                "<img src='"+ shoppingcart.productList[i].img+ "'/>" + shoppingcart.productList[i].itemName + 
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

$(document).on('pagebeforeshow', "#history", function(event, ui) {
        $.ajax({
                url : "http://localhost:3412/Project1Srv/histories",
                contentType: "application/json",
                success : function(data, textStatus, jqXHR){
                        var historyList = data.histories;
                        var hlen = historyList.length;
                        for (var j=0; j<hlen; j++) {
                                if (historyList[j].purchased == 0) {                
                                        var len = historyList[j].productList.length;
                                        var list = $("#purchase-list");
                                        list.empty();
                                        var history;
                                        history = historyList[j];
                                        for(var i=0; i<len; i++) {
                                                list.append("<li><a onclick=GetProduct(" + history.productList[i].id + ")>" +
                                                        "<h2>" + history.productList[i].itemName + "</h2>" + 
                                                        "<p><strong> Payment: " + history.productList[i].payment + "</strong></p>" + 
                                                        "<p>" + history.productList[i].description + "</p>" +
                                                        "<p class=\"ui-li-aside\">$" + history.productList[i].price + "</p>" +
                                                        "</a></li>");
                                        }
                                        list.listview("refresh");
                                } else if (historyList[j].purchased == 1) {
                                        var len = historyList[j].productList.length;
                                        var list = $("#sale-list");
                                        list.empty();
                                        var history;
                                        history = historyList[j];
                                        for(var i=0; i<len; i++) {
                                                list.append("<li><a onclick=GetProduct(" + history.productList[i].id + ")>" +
                                                        "<h2>" + history.productList[i].itemName + "</h2>" + 
                                                        "<p><strong> Payment: " + history.productList[i].payment + "</strong></p>" + 
                                                        "<p>" + history.productList[i].description + "</p>" +
                                                        "<p class=\"ui-li-aside\">$" + history.productList[i].price + "</p>" +
                                                        "</a></li>");
                                        }
                                        list.listview("refresh");
                                }
                        }
                },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        alert("Data not found!");
                }
        });
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
                        var len =categoriesList[0].categoriesList.length;
                        var list = $("#categories-list");
                        list.empty();
                        var categories;
                        categories = categoriesList[0];
                        for (var i=0; i < len; ++i){
                                list.append("<li data-icon='delete' ><a onClick=DeleteCategory(" + categoriesList[i].id + ")>"+ 
                                categoriesList[i].name + "</li>");
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

function aconvert(dbModel){
        var aliModel = {};
        
        aliModel.aid = dbModel.accountid;
        aliModel.afName = dbModel.fname;
        aliModel.alName = dbModel.lname;
        aliModel.aEmail = dbModel.email;
        aliModel.aUsername = dbModel.username;
        aliModel.aPassword = dbModel.apassword;
        aliModel.aShipping = dbModel.shippingid;
        aliModel.aBilling = dbModel.billingid;
        aliModel.rank = dbModel.rank;
        
        return aliModel;
}

function SaveAccount(){
        alert("Account Created!");
}
/*
function GetAccount(aid){
        $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/Project1Srv/accounts/" + aid,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        currentAccount = data.account;
                        profile= data.account;
                        $.mobile.loading("hide");
                        //window.location.href="account.html";
                        $.mobile.changePage("account.html");

                },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("Account not found.");
                        }
                        else {
                                alert("Internal Server Error.");
                        }
                }
        });
}
*/
function adconvert(dbModel){
        var adliModel = {};
        
        adliModel.addressid = dbModel.addressid;
        adliModel.address = dbModel.address;
        
        return adliModel;
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
                        currentAddress = adconvert(data.address);
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
                        
                        var login= aconvert(data.accountLogin);
                        var len= login.length;
                        
                        $.mobile.loading("hide");
                        if(len !=0){        
                                loginAccount= data.accountLogin[0];
                                $.mobile.changePage("homepage.html");
                                setCookie("username",username,14);
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
                                alert("Internal Server Error.");
                        }
                }
        });        
        
}

var profile={};
function GoProfile(id){
        console.log("getting profile");
        $.mobile.loading("show");
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
        });        
}

function GoAccount(){
        
         if(loginAccount.ausername!= undefined){
         	
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
        
function Sortby(id){

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
        
}

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
function GetBids(){
	
		$.mobile.changePage("bids.html");
       /* $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/Project1Srv/accounts,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        
                        },                        
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("Category does not exist!");
                        }
                        else {
                                alert("Internal Server Error.");
                        }
                }

        });*/
}


function EndSale(){
        alert("Sale ended!");
}

//////// Category

var currentCategory= {};
function GetCategory(id){
        $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/Project1Srv/category/"+ id,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        currentCategory= data.categoryName[0].name;},                        
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("Category does not exist!");
                        }
                        else {
                                alert("Internal Server Error.");
                        }
                }

        });
}

var currentCategoryProducts = {};
function GetCategoryProducts(id){
        GetCategory(id);
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

var currentAuctionList = {};
function GetAuctions(){
        id= profile.ausername;
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
        id= profile.ausername;
        alert(profile.ausername);
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
        alert("Order Processed!");
}

///// Bid

function UpdateBid(){
        alert("Bid submitted!");
}