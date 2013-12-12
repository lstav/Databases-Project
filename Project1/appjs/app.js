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
		c_value = null;
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
var notifyMessages=[];
var interval = setInterval(function(){notifyMessages();},60000);

function notifyMessages(){
	var client = new pg.Client(conString);
	client.connect();
	
	var query = client.query("SELECT COUNT(*)FROM message WHERE isRead = FALSE AND receiverid = 1)"); 
	if(query > 0){
		
	}
	client.end();
}

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
		var first= $('#fname').val();
		var last= $('#lname').val();
		var email= $('#email').val();
		var address= $('#shipping').val();
		var creditcard=$('#creditnumber').val();
		var billingaddress= $('#billing').val();

		if(username.length > 0 && password.length > 0 && first.length > 0 && last.length > 0 && email.length > 0 && address.length > 0 && creditcard.length >0 && billingaddress.length > 0){

			alert("Account created");

		} 

		else {
			alert('Please fill all fields');
		}           

	});    
});

$(document).on('pagebeforeshow', '#homepage-account', function(){
	
	$(document).on('click', '#cart-button', function() {
		AllSales(); 
	});

	if (sessionStorage.getItem("account") != null) {
		var txt = sessionStorage.getItem("account");
		var obj = eval('(' + txt + ')');
		if(loginAccount.username == undefined && obj.username != undefined){
			loginAccount = obj;
		}
	}
	if(loginAccount.username!= undefined)        {
		$(document).on('click', '#profile-account', function() { 
			profile= loginAccount;
			$.mobile.changePage("account.html", {transition: "none"});
		});

		var id= loginAccount.accountid;
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
		var msg2= '<a href= "message.html" data-role="button" data-corners="false" data-theme="a">Messages</a>';
		block2.empty();
		block2.append(msg2).trigger('create'); 

		var block3= $("#block3");
		var msg3= '<a id="logout" data-rel= "external" data-role="button" data-corners="false">Log Out</a>';
		block3.empty();
		block3.append(msg3).trigger('create');
	}

	else{
		
		if (getCookie("guest") == undefined) {
			setCookie("guest", JSON.stringify('[]'));
        }	

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
	$(document).on('click', '#logout', function() { 
		loginAccount = {};
		sessionStorage.removeItem("account");
		sessionStorage.clear();
		
		$.mobile.changePage("login.html", {transition: "none"});

	});  
	$(document).on('click', '#sale-button', function() { 

		//alert(loginAccount.username);
		if(loginAccount.username!= undefined)
		{
			$.mobile.changePage("create-sale.html", {transition: "none"});
		}

		else{
			$.mobile.changePage("login.html", {transition: "none"});
		}
	});  

});

$(document).on('click', '#logout', function() {
	loginAccount = {}; 
	sessionStorage.clear();
	sessionStorage.removeItem("account");
	$.mobile.changePage("login.html", {transition: "none"});

});

$(document).on('pagebeforeshow', "#accounts", function( event, ui ) {

	var txt = sessionStorage.getItem("account");
	var obj = eval('(' + txt + ')');
	if(loginAccount.username == undefined && obj.username != undefined){
		loginAccount = obj;
	}
	//alert(loginAccount.username);
	if(loginAccount.username!= undefined){

		$(document).on('click', '#edit-account', function() { 
			$.mobile.changePage("settings.html", {transition: "none"});
		});
		$(document).on('click', '#rankersaccount-button', function() { 
			GetRankers(loginAccount.accountid);

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
		img.append("<p> <center> <img src='http://img404.imageshack.us/img404/4849/blt.gif'/> </center> </p>");
		list.listview("refresh");}

	else{
		$.mobile.changePage("login.html", {transition: "none"});
	}

});

$(document).on('click', '#account-update', function() { 
	
	
	$('#upd-username').val(loginAccount.username); 
	$('#upd-fname').val(loginAccount.fname);
	$('#upd-lname').val(loginAccount.lname);
	$("#upd-shipping").val(loginAccount.shipping);
	$("#upd-billing").val(loginAccount.billing);
	$('#upd-creditCard').val("*****" + loginAccount.cardnumber.substr(5,6));
	$('#upd-cardType').val(loginAccount.cardtype);
	$('#upd-security').val(loginAccount.securitynumber);
	$('#upd-expDate').val(loginAccount.expdate);
	$('#upd-email').val(loginAccount.email);
	$('#upd-password').val(pass);

	$('#username').html("Username: " + loginAccount.username);
	$('#fname').html("First Name: " + loginAccount.fname);
	$('#lname').html("Last Name: " + loginAccount.lname);
	$("#shippingA").html("Shipping Address: " + loginAccount.shipping);
	$("#billingA").html("Billing Address: " + loginAccount.billing);
	$('#cCard').html("Credit Card Number: *****" + loginAccount.cardnumber.substr(5,6));
	$('#cCardType').html("Credit Card Type: " + loginAccount.cardtype);
	$('#security').html("Security Number: " + loginAccount.securitynumber);
	$('#expDate').html("Expiration Date: " + loginAccount.expdate);
	$('#email').html("Email: " + loginAccount.email);
	$('#password').html("Password: " + pass); 
	

});  

$(document).on('pagebeforeshow', "#account-view", function( event, ui ) {
	// loginAccount has been set at this point
	var txt = sessionStorage.getItem("account");
	var obj = eval('(' + txt + ')');
	if(loginAccount.username == undefined && obj.username != undefined){
		loginAccount = obj;
	}
	//alert(loginAccount.username);
	if(loginAccount.username!= undefined){

		$(document).on('click', '#edit-account', function() { 
			$.mobile.changePage("settings.html", {transition: "none"});
		});
		$(document).on('click', '#rankers-button', function() { 
			GetRankers(loginAccount.accountid);

		});  
		var stars = "";

		for(var i=0; i<loginAccount.rank; i++) {
			stars = stars + "*";
		}

		var list = $("#account-settings");
		list.empty();
		var account = loginAccount;
		        
		list.append('<li><a data-icon="false">Username: '+loginAccount.username+'</a></li>' +
					'<li><a>First Name: '+loginAccount.fname+'<a href="#popupFName" data-rel="popup" data-position-to="window" data-icon="gear">Change</a></a></li>' +
					'<li><a>Last Name: '+loginAccount.lname+'<a href="#popupLName" data-rel="popup" data-position-to="window" data-icon="gear">Change</a></a></li>' +
					'<li><a>Shipping Address: '+loginAccount.shipping+'<a href="#popupShipping" data-rel="popup" data-position-to="window" data-icon="gear">Change</a></a></li>' +
					'<li><a>Billing Address: '+loginAccount.billing+'<a href="#popupBilling" data-rel="popup" data-position-to="window" data-icon="gear">Change</a></a></li>' +
					'<li><a>Credit Card Number: '+loginAccount.cardnumber+'<a href="#popupCardNumber" data-rel="popup" data-position-to="window" data-icon="gear">Change</a></a></li>' +
					'<li><a>Credit Card Type: '+loginAccount.cardtype+'<a href="#popupCardType" data-rel="popup" data-position-to="window" data-icon="gear">Change</a></a></li>' +
					'<li><a>Security Number: '+loginAccount.securitynumber+'<a href="#popupSecurity" data-rel="popup" data-position-to="window" data-icon="gear">Change</a></a></li>' +
					'<li><a>Expiration Date: '+loginAccount.expdate+'<a href="#popupExpDate" data-rel="popup" data-position-to="window" data-icon="gear">Change</a></a></li>' +
					'<li><a>Email: '+ loginAccount.email +'<a href="#popupEmail" data-rel="popup" data-position-to="window" data-icon="gear">Change</a></a></li>' +
					'<li><a>Bank Account: '+ loginAccount.bank +'<a href="#popupBank" data-rel="popup" data-position-to="window" data-icon="gear">Change</a></a></li>'+
					'<li><a>Password: ******** <a href="#popupPassword" data-rel="popup" data-position-to="window" data-icon="gear">Change</a></a></li>');

		list.listview("refresh");}

	else{
		$.mobile.changePage("login.html", {transition: "none"});
	}
	/*
	//alert(loginAccount.username);
	$('#upd-username').val(loginAccount.username); 
	$('#upd-fname').val(loginAccount.fname);
	$('#upd-lname').val(loginAccount.lname);
	$("#upd-shipping").val(loginAccount.shipping);
	$("#upd-billing").val(loginAccount.billing);
	$('#upd-creditCard').val("*****" + loginAccount.cardnumber.substr(5,6));
	$('#upd-cardType').val(loginAccount.cardtype);
	$('#upd-security').val(loginAccount.securitynumber);
	$('#upd-expDate').val(loginAccount.expdate);
	$('#upd-email').val(loginAccount.email);
	$('#upd-password').val(pass);

	$('#username').html("Username: " + loginAccount.username);
	$('#fname').html("First Name: " + loginAccount.fname);
	$('#lname').html("Last Name: " + loginAccount.lname);
	$("#shippingA").html("Shipping Address: " + loginAccount.shipping);
	$("#billingA").html("Billing Address: " + loginAccount.billing);
	$('#cCard').html("Credit Card Number: *****" + loginAccount.cardnumber.substr(5,6));
	$('#cCardType').html("Credit Card Type: " + loginAccount.cardtype);
	$('#security').html("Security Number: " + loginAccount.securitynumber);
	$('#expDate').html("Expiration Date: " + loginAccount.expdate);
	$('#email').html("Email: " + loginAccount.email);
	$('#password').html("Password: " + pass); 
	*/
	
	$(document).on('click', '#account-updatefname', function() { 
		var pass= $("#upd-fname").val();
		var formData = {username: loginAccount.username, password: pass};
		//alert(formData.username);
		ChangeFName(formData);
	}); 
	
	$(document).on('click', '#account-updatelname', function() { 
		var pass= $("#upd-lname").val();
		var formData = {username: loginAccount.username, password: pass};
		//alert(formData.username);
		ChangeLName(formData);
	}); 
	
	$(document).on('click', '#account-updateshipping', function() { 
		var pass= $("#upd-shipping").val();
		var formData = {username: loginAccount.username, password: pass};
		//alert(formData.username);
		ChangeShipping(formData);
	}); 
	
	$(document).on('click', '#account-updatebilling', function() { 
		var pass= $("#upd-billing").val();
		var formData = {username: loginAccount.username, password: pass};
		//alert(formData.username);
		ChangeBilling(formData);
	}); 
	
	$(document).on('click', '#account-updatecardnumber', function() { 
		var pass= $("#upd-cardnumber").val();
		var formData = {username: loginAccount.username, password: pass};
		//alert(formData.username);
		ChangeCardNumber(formData);
	}); 
	
	$(document).on('click', '#account-updatetype', function() { 
		var pass= $("#upd-cardtype").val();
		var formData = {username: loginAccount.username, password: pass};
		//alert(formData.username);
		ChangeCardType(formData);
	}); 
	
	$(document).on('click', '#account-updatesecurity', function() { 
		var pass= $("#upd-security").val();
		var formData = {username: loginAccount.username, password: pass};
		//alert(formData.username);
		ChangeSecurity(formData);
	}); 
	
	$(document).on('click', '#account-updateexpdate', function() { 
		var pass= $("#upd-expdate").val();
		var formData = {username: loginAccount.username, password: pass};
		//alert(formData.username);
		ChangeExpDate(formData);
	}); 
	
	$(document).on('click', '#account-updateemail', function() { 
		var pass= $("#upd-email").val();
		var formData = {username: loginAccount.username, password: pass};
		//alert(formData.username);
		ChangeEmail(formData);
	}); 
	
	$(document).on('click', '#account-updatebank', function() { 
		var pass= $("#upd-bank").val();
		var formData = {username: loginAccount.username, password: pass};
		//alert(formData.username);
		ChangeBank(formData);
	}); 
	
	$(document).on('click', '#account-updatepassword', function() { 
		var pass= $("#upd-password").val();
		var formData = {username: loginAccount.username, password: pass};
		//alert(formData.username);
		ChangePassword(formData);
	}); 
	
	$(document).on('click', '#deleteaccount', function() { 
		DeleteAccounts(loginAccount.accountid);
	}); 

});

$(document).on('click', '#admaccount', function() {
		var user= $("#admchangeusername").val();
		var pass= $("#admchangepassword").val();
		var formData = {username: user, password: pass};
		//alert(formData.username);
		//alert(formData.password);
		ChangePassword(formData); 
}); 
	
$(document).on('pagebeforeshow', "#profile-page", function( event, ui ) {

	var txt = sessionStorage.getItem("profile");
	var obj = eval('(' + txt + ')');
	if(profile.username == undefined && obj.username != undefined){
		profile = obj;
	}
	$(document).on('click', '#rankers-button', function() { 
		GetRankers(profile.accountid);

	});

	var stars = "";

	for(var i=0; i<profile.rank; i++) {
		stars = stars + "*";
	}

	//alert(loginAccount.username);
	var list= $("#profile-info");
	list.empty();
	list.append("<li><h4>Name: "+profile.fname +" "+ profile.lname+"</h4></li>");
	list.append("<li><h4>Rank: "+ stars +"</h4></li>");
	list.append("<li><h4>4 Star %: " + profile.percent + "%</h4></li>");        
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

$(document).on('pagebeforeshow', "#ranks-page", function( event, ui ) {
	var list= $("#rank-list");
	list.empty();
	var len = currentRankers.length;
	for(var i=0; i<len; i++) {
		star = "";

		for(var j=0; j<currentRankers[i].stars; j++) {
			star = star + "*";
		}
		list.append("<li><h4>" + currentRankers[i].username+ ": " + star + "</h4></li>");
		//list.append("Hello");
	}
	list.listview("refresh");
	//list.append("<li><a <h4>Location:"+profile.location  +"</h4></a> </li>");

	var pname= $("#name");
	pname.empty();
	pname.append("<center>"+profile.username+"</center>");

});

$(document).on('pagebeforeshow', "#userrank-page", function( event, ui ) {
	var txt = sessionStorage.getItem("profile");
	var obj = eval('(' + txt + ')');
	if(profile.username == undefined && obj.username != undefined){
		profile = obj;
	}
	
	var txt2 = sessionStorage.getItem("accounts");
	var obj2 = eval('(' + txt2 + ')');
	if(loginAccount.username == undefined && obj2.username != undefined){
		loginAccount = obj2;
	}
	/*$('#star').raty({
  score: function() {
    return $(this).attr('data-score');
  }
});
	$('#rank').raty({
		starOn: 'appjs/star-on-big.png',
  		starOff: 'appjs/star-off-big.png',
  		number: 4
	});*/
	
	$(document).on('click', '#submitrank', function() {
		var rank= $("#rank").val();
		var formData = {user: loginAccount.accountid, seller: profile.accountid, ranking: rank};
		//alert(formData.ranking);
		RankUser(formData);
	});

	var pname= $("#urname");
	pname.empty();
	pname.append("<center>"+profile.username+"</center>");
});

$(document).on('pagebeforeshow', '#create-sale', function(){  

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
		var catparents= [];
		var catnames= [];

		for(var i=0; i < len; ++i){
			if(categoriesList[i].parentid== 0){
				catparents.push(categoriesList[i].catid);
				catnames.push(categoriesList[i].catname);
			}
		}

		for(var j=0; j< catparents.length; j++){

			var opt = '<optgroup label="'+ catnames[j]+'">';
			list.append(opt).trigger('create');

			for (var i=0; i < len; ++i){	
				if(categoriesList[i].parentid == catparents[j]){
					var option= '<option value='+ categoriesList[i].catid+'>' + categoriesList[i].catname + '</option>';
					list.append(option).trigger('create');
				}
			}        
			var opt2= '</optgroup>';
			list.append(opt2).trigger('create');

		}
	},
	error: function(data, textStatus, jqXHR){
		console.log("textStatus: " + textStatus);
		alert("categories not found!");
	}
	}); 

});

$(document).on('pagebeforeshow', '#create-auction', function(){  

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
		var catparents= [];
		var catnames= [];

		for(var i=0; i < len; ++i){
			if(categoriesList[i].parentid== 0){
				catparents.push(categoriesList[i].catid);
				catnames.push(categoriesList[i].catname);
			}
		}

		for(var j=0; j< catparents.length; j++){

			var opt = '<optgroup label="'+ catnames[j]+'">';
			list.append(opt).trigger('create');

			for (var i=0; i < len; ++i){	
				if(categoriesList[i].parentid == catparents[j]){
					var option= '<option value='+ categoriesList[i].catid+'>' + categoriesList[i].catname + '</option>';
					list.append(option).trigger('create');
				}
			}        
			var opt2= '</optgroup>';
			list.append(opt2).trigger('create');

		}
	},
	error: function(data, textStatus, jqXHR){
		console.log("textStatus: " + textStatus);
		alert("categories not found!");
	}
	}); 

});

$(document).on('click', '#submit-sale', function() { 

	var pname= $('#product-name').val();
	var pprice= $('#pprice').val();
	var cond= $('#condition').val();
	var shippingto= $('#shipping-to').val();
	var enddate= $('#enddate').val();
	var image= $('#image').val();
	var visa= $('#checkbox1').is(':checked');
	var paypal= $('#checkbox2').is(':checked');
	var cat= $('#categories-lists').val();
	var dcription= $('#ptext').val();
	var qty= $('#pqty').val();

	if(pname.length > 0 && pprice.length> 0 && enddate.length > 0 && cat > 0 && (visa||paypal)){

		var formData = {account: loginAccount.accountid, name: pname, price:pprice, condition:cond, catid:cat, pmethod1: visa, pmethod2:paypal, link:image, date:enddate, description:dcription, quantity: qty};
		var product= {};
		$.ajax({
			url : "http://localhost:3412/Project1Srv/products",
			type: 'post',
			dataType: 'json',
			data : formData,
			success : function(data){
			var product= data.productadd[0].productid;
			formData.productid= product;
			$.ajax({
				url : "http://localhost:3412/Project1Srv/addsale",
				type: 'post',
				data : formData,
				success : function() {
				console.log('sale added');
				GetSales();
			},
			error: function(data, textStatus, jqXHR){
				console.log("textStatus: " + textStatus);
				alert("sale not added!");}          	
			});
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("product not added!");
		}
		}); 
	} 

	else {
		alert("Please provide all information.");

	}           
	return false; 
});

$(document).on('click', '#submit-auction', function() { 

	var pname= $('#product-name').val();
	var pprice= $('#pprice').val();
	var cond= $('#condition').val();
	var shippingto= $('#shipping-to').val();
	var enddate= $('#enddate').val();
	var image= $('#image').val();
	var visa= $('#checkbox1').is(':checked');
	var paypal= $('#checkbox2').is(':checked');
	var cat= $('#categories-lists').val();
	var dcription= $('#ptext').val();

	if(pname.length > 0 && pprice.length> 0 && enddate.length > 0 && cat > 0 && (visa||paypal)){

		var formData = {account: loginAccount.accountid, name: pname, price:pprice, condition:cond, catid:cat, pmethod1: visa, pmethod2:paypal, link:image, date:enddate, description:dcription};
		var product= {};
		$.ajax({
			url : "http://localhost:3412/Project1Srv/products",
			type: 'post',
			dataType: 'json',
			data : formData,
			success : function(data){
			var product= data.productadd[0].productid;
			formData.productid= product;
			$.ajax({
				url : "http://localhost:3412/Project1Srv/addauction",
				type: 'post',
				data : formData,
				success : function() {
				console.log('auction added');
				GetAuctions();
			},
			error: function(data, textStatus, jqXHR){
				console.log("textStatus: " + textStatus);
				alert("auction not added!");}          	
			});
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("product not added!");
		}
		}); 
	} 

	else {
		alert("Please provide all information.");

	}           
	return false; 
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
			$.mobile.changePage("bids.html", {transition: "none"});
		});    

	}

		var alist = $("#await-list");
		alist.empty();
		var item;
		for (var i=0; i < currentWinningList.length; ++i){
			item =currentWinningList[i];			
			var element='<a onClick=Acceptbid("'+item.auctionid+'") data-role="button" data-icon= "grid" data-mini="true">Accept bid</a>';
			alist.append("<li><a> <img src='"+ item.imagelink+ "'/>" + item.prodname + "<h4>Price:"+item.price+"</h4></a>"+ element+"</li>");
		}
		alist.listview("refresh");

});

var winauctionid={};
function Acceptbid(auctionid){
	winauctionid=auctionid;
	$.mobile.changePage("acceptbid.html");
}	

$(document).on('click', '#active-winning', function() { 
		
		var formData={auctionid: winauctionid};
		$.ajax({
			url : "http://localhost:3412/Project1Srv/updatewinningbid",
			type: 'put',
			data : formData,
			success : function(data) {
				formData.senderid=5;
				formData.receiverid= data.updatewinningbid[0].accountid;
				formData.subject="Auction: "+formData.auctionid; 
				formData.text="You won an auction! Please check your pending payments. Have a good day!";
					$.ajax({
						url : "http://localhost:3412/Project1Srv/addmessage",
						type: 'post',
						data:formData,
						success : function(data) {
							$.mobile.changePage("account.html");			
						},
	
					error: function(data, textStatus, jqXHR){
					console.log("textStatus: " + textStatus);
					alert("sending message to owner of auction unsuccessfull");}          	
					});	
			},

		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("winningbid not updated!");}          	
		});
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
			list.append("<li><a>" + item.bidder + "<h4> Bid:"+item.bid+" on "+ item.bdate.substring(0, 10)+"<\h4></a></li>");
		}
		list.listview("refresh");}
});

$(document).on('pagebeforeshow','#create-page', function(){
	$(document).on('click', '#auction-button', function() {
		$.mobile.changePage("auctions.html", {transition: "none"});
	});

	$(document).on('click', '#sale-button', function() {
		$.mobile.changePage("sales.html", {transition: "none"});
	});
});

///// Category and product
$(document).on('click', '#search-button', function() { 
	GetCategories();
}); 

$(document).on('click', '#submit-signup', function() { 

	var username=$('#username').val();                        
	var password=$('#password').val();
	var firstname=$('#fname').val();
	var lastname=$('#lname').val();
	var email= $('#email').val();
	var street=$('#street').val();
	var city=$('#city').val();
	var state= $('#state').val(); 
	var zipcode=$('#zipcode').val();
	var country= $('#country').val(); 

	if(username.length > 0 && password.length > 0 && firstname.length > 0 && lastname.length > 0 && email.length > 0 && street.length > 0 && city.length > 0 && state.length > 0
			&& zipcode.length > 0 && country.length > 0){

		SignUp(username); 

	}

	else{
		alert("Please fill all fields.");
	}


}); 
/*
$(document).on('click', '#cart-button', function() { 
              //GetShoppingCart(loginAccount.accountid);
              AllSales();
}); 
 */

$(document).on('click', '#inbox-button', function() { 
	GetInbox(loginAccount.accountid);
}); 

$(document).on('click', '#sent-button', function() { 
	GetSent(loginAccount.accountid);
}); 

$(document).on('click', '#submit-search-all', function() { 
	var term= $('#search-term').val();
	GetSearch(term);
});

$(document).on('click', '#submit-search-all2', function() { 
	var term= $('#search-term2').val();
	GetSearch(term);
});


$(document).on('pagebeforeshow', "#catLayout", function(event, ui) {

	if(sessionStorage.getItem("account") != null) {
		var txt = sessionStorage.getItem("account");
		var obj = eval('(' + txt + ')');
		if(loginAccount != obj){
			loginAccount = obj;
		}
	}

	var txt = sessionStorage.getItem("categories");
	var obj = eval('(' + txt + ')');
	if(currentCategories != obj){
		currentCategories = obj;
	}

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

	if(sessionStorage.getItem("account") != null) {
		var txt = sessionStorage.getItem("account");
		var obj = eval('(' + txt + ')');
		if(loginAccount != obj){
			loginAccount = obj;
		}
	}

	var txt = sessionStorage.getItem("subcategories");
	var obj = eval('(' + txt + ')');
	if(subCategories != obj){
		subCategories = obj;
	}

	var category= subCategories;
	var len= category.length;
	var list=$("#show-subcategories");
	list.empty();

	if(len > 0){
		var pname=$("#pcat");
		pname.empty();
		pname.append(category[0].parentname).trigger("create");

		var sname=$("#subCatName");
		sname.empty();
		var inputName='<input type="text" name="search-all" id="search-term-sub" placeholder="Search in '+category[0].parentname+'" value=""/>';
		sname.append(inputName).trigger("create");
	}


	list.append("<li onClick= GetAllProducts("+category[0].parentid+")><a>All</a></li>");

	var sname;
	for (var i=0; i < len; ++i){
		sname =category[i].catname;
		sid= category[i].catid;
		list.append("<li onClick= GetCategoryProducts("+sid+")><a>"+ sname+ "</a></li>");
	}

	list.listview("refresh" );

	$(document).on('click', '#submit-search-sub', function() { 
		var term= $('#search-term-sub').val();
		GetSearchSub(term, category[0].parentid);
	}); 



});


$(document).on('pagebeforeshow', "#catProductView", function(event, ui) {
	//alert(loginAccount.username);
	$.expr[":"].contains = $.expr.createPseudo(function(arg) {
		return function( elem ) {
			return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
		};
	});

	$("#search-basic").keyup(function(){

		var term = $(this).val();

		if(term != ""){
			$("li").hide();
			$("li:contains('" + term + "')").show();
		}
		else{$("li").show();}

	}); 
	
	if(sessionStorage.getItem("account") != null) {
		var txt = sessionStorage.getItem("account");
		var obj = eval('(' + txt + ')');
		if(loginAccount != obj){
			loginAccount = obj;
		}
	}

	var allproduct=sessionStorage.getItem("allproductboolean");
	
	if(allproduct != undefined){

	if(allproduct == "true"){	
		var txt = sessionStorage.getItem("allproducts");
		var obj = eval('(' + txt + ')');
		if(currentCategoryProducts != obj){
		currentCategoryProducts = obj;
	  }
	}	
	else{
		var txt = sessionStorage.getItem("products");
		var obj = eval('(' + txt + ')');
		if(currentCategoryProducts != obj){
		currentCategoryProducts = obj;
		}
	}
	
	}

	var productCat = currentCategoryProducts;
	var len =productCat.length;
	var list = $("#product-list");
	list.empty();

	if(len > 0){
		var item;
		for (var i=0; i < len; ++i){
			item =productCat[i];
			list.append("<li><a onClick=GetProduct("+item.id+")> <img src='"+ item.img+ "'/> " + item.prodname + "<h4>"+item.price+"<\h4></a></li>");
		}

		var iname= $("#catName2");
		iname.empty();
		iname.append("<center>"+productCat[0].catname+"</center>");}

	else{

		var msg='<li><a data-rel=back data-role="button">No products</a></li>';
		list.append(msg);                        
	}

	list.listview("refresh");
});

var buyItem= false;

$(document).on('pagebeforeshow', "#productPage", function(event, ui) {

	if(sessionStorage.getItem("account") != null) {
		var txt = sessionStorage.getItem("account");
		var obj = eval('(' + txt + ')');
		if(loginAccount != obj){
			loginAccount = obj;
		}
	}

	var txt = sessionStorage.getItem("product");
	var obj = eval('(' + txt + ')');
	if(currentProduct != obj){
		currentProduct = obj;
	}

	if(!isSale){
		isSale = currentProduct.isSale;
	}
	var list= $("#item-info");
	list.empty();
	if(isSale){
		list.append("<li><a> <strong>Price:</strong><kbd>"+currentProduct.price  +"</kbd></a> </li>");}
	else{
		list.append("<li><a> <strong>Current bid:</strong><kbd>"+currentProduct.price  +"</kbd></a> </li>");
	}
	list.append("<li><a> <strong>Condition: </strong><kbd>"+currentProduct.condition  +"</kbd></a> </li>");
	list.append("<li><a><strong> Item ID: </strong><kbd>"+currentProduct.id+"</kbd></a> </li>");
	list.append("<li><a> <strong>Listing ends: </strong><kbd>"+currentProduct.endtime.substring(0, 10)+" at "+currentProduct.endtime.substring(12, 20)+"</kbd></a> </li>");
	if(isSale){
		list.append("<li><a><strong> Qty Available: </strong><kbd>"+currentProduct.quantity+"</kbd></a> </li>");
	}

	var sell= $("#seller-info");
	sell.empty();
	sell.append("<li><a  onClick= GoProfile("+currentProduct.aid+")>"+currentProduct.seller+"</a></li>");

	var idescription= $("#description");
	idescription.empty();
	idescription.append("<p>"+currentProduct.description+"</p>");
	var image= $('#item-image');
	image.empty();
	image.prepend('<center><img id="theImg" src="' + currentProduct.img+'"/></center>');
	//table1.table("refresh"); 
	var cqty= $("#chooseqty");
	cqty.empty();
	var pname= $("#productName2");
	pname.empty();
	pname.append("<center>"+currentProduct.prodname+"</center>").trigger('create');

	list.listview("refresh");
	sell.listview("refresh");

	if(currentProduct.isactive){

		if(loginAccount.username == currentProduct.seller){
			var bid= $("#bid-name");
			var submit= $("#bid-offer");
			var update= $("#update-product");
			bid.empty();
			submit.empty();
			update.empty();

			if(!isSale){
				var msg= '<input type="button" value= "List of Bids" onClick=GetBids('+currentProduct.id+') data-mini="true"/>';
				bid.append(msg).trigger('create');      

				var msg2= '<input type="submit" value="End Sale" onClick=EndSale('+currentProduct.id+') data-theme="a" data-mini="true"/>';
				submit.append(msg2).trigger('create');

				var updt= '<input type="submit" value="Update" onClick=UpdateProductForm('+currentProduct.id+') data-theme="a" data-mini="true"/>';
				update.append(updt).trigger('create');  
			}

			if(isSale){
				var msg= '<input type="submit" id= "sale-other" value= "Sell another" data-mini="true"/>';
				bid.append(msg).trigger('create');

				var msg2= '<input type="submit" value="End Sale" onClick=EndSale('+currentProduct.id+') data-theme="a" data-mini="true"/>';
				submit.append(msg2).trigger('create');

				var updt= '<input type="submit" value="Update" onClick=UpdateProductForm('+currentProduct.id+') data-theme="a" data-mini="true"/>';
				update.append(updt).trigger('create');  
			}

			var shop= $("#shop-now");
			shop.empty();

			var buy= $("#buy-now");
			buy.empty();

		}
		else
		{
			var bid= $("#bid-name");
			bid.empty();

			if(!isSale){
				var msg= '<input type="text" id="bid-product" value= "" placeholder="Make a bid" data-mini="true"/>';         
				bid.append(msg).trigger('create');}

			if(loginAccount.username != undefined){
				var submit= $("#bid-offer");	
				submit.empty();

				if(!isSale){
					var msg2= '<a><input type="submit" id= "submitBid1" value="Submit" data-theme="a" data-mini="true"/></a>';
					submit.append(msg2).trigger('create');}

				var shop= $("#shop-now");
				shop.empty();

				var buy= $("#buy-now");
				buy.empty();

				if(isSale){
					//alert(currentProduct.saleid);
					var msg3= '<a><input type="submit" id= "submitCart" value= "Add to Cart" onClick= SaveOrder(' + currentProduct.saleid + ') data-mini="true"/></a>';
					shop.append(msg3).trigger('create');

					var msg4= '<a><input type="submit" id= "purchase" value= "Buy it now" onClick= SaveOrder(' + currentProduct.saleid + ') data-mini="true"/></a>';
					buy.append(msg4).trigger('create');

					var msg5='<input name="Qty" id="pquantity" placeholder="Quantity" value="" type="text">';
					cqty.append(msg5).trigger('create');
				}

			}

			else{

				var submit= $("#bid-offer");
				submit.empty();

				if(!isSale){
					var pop='<a id= "bid-offer" href= "#popupLogin" data-rel="popup" data-position-to="window" data-inline="true" style="text-decoration: none">';
					var msg2='<input type= "submit" id= "submitBid2" value= "Submit" data-mini="true"/></a>';            
					submit.append(pop+msg2).trigger('create');}

				var shop= $("#shop-now");
				shop.empty();

				var buy= $("#buy-now");
				buy.empty();

				if(isSale){
					var pop2= '<a href="#popupLogin" data-rel="popup" data-position-to="window" data-inline="true" style="text-decoration: none">';
					var msg3= '<input type= "submit" id= "submitCart" value= "Add to cart" onClick= SaveOrder(' + currentProduct.saleid + ') data-theme="a"data-mini="true" /></a>';
					var msg4= '<input type= "submit" value= "Buy it now" data-theme="a"data-mini="true" /></a>';
					var msg5='<input name="Qty" id="pquantity" placeholder="Quantity" value="" type="text">';
					cqty.append(msg5).trigger('create');
					shop.append(msg3).trigger('create');
					buy.append(pop2+msg4).trigger('create'); }

			}
		}}

	$(document).on('click', '#login-buy', function() { 
		var username= $('#un').val();
		var password= $('#pw').val();
		if(username.length > 0 && password.length > 0){
			buyItem= true;
			AccountLogin(username, password);                 
		} 

		else {
			alert('Please fill all fields');
		}           
		return false; 
	});  

	$(document).on('click', '#sale-other', function() { 
		$.mobile.changePage("create-sale.html", {transition: "none"});
	});   

});

$(document).on('click', '#shopcart', function() { 
		$.mobile.changePage("shopping.html", {transition: "none"});
});

var lbid= {};
$(document).on('click', '#submitBid1', function() { 
	lbid= $('#bid-product').val();
	if(lbid > 0){
		$.mobile.changePage("bidconfirm.html", {transition: "none"});}
	else{
		alert("Insert a valid ammount.");
	}
});  

$(document).on('click', '#submitBid2', function() { 
	lbid= $('#bid-product').val();
}); 

$(document).on('pagebeforeshow', "#confirmbid", function(event, ui){

	var info = $("#info-bid");
	info.empty();
	var msg= 'You have placed a bid of $ '+lbid+' on '+currentProduct.prodname+'.';
	info.append(msg).trigger('create');

});

var lbid= {};

$(document).on('pagebeforeshow', "#confirmcart", function(event, ui){

	var info = $("#info-itemcart");
	info.empty();
	var msg= currentProduct.prodname;
	info.append(msg).trigger('create');

});

$(document).on('click', '#auction-bid', function() { 
	InsertBid(currentProduct.id, lbid);
});

$(document).on('pagebeforeshow', "#productUpdatePage", function(event, ui) {

	var upoprice='href= "#popupUpdatePrice" data-rel="popup" data-position-to="window" data-inline="true" style="text-decoration: none" ';
	var upopcondition='href= "#popupUpdateCondition" data-rel="popup" data-position-to="window" data-inline="true" style="text-decoration: none" ';
	var upopend='href= "#popupUpdateEnd" data-rel="popup" data-position-to="window" data-inline="true" style="text-decoration: none" ';

	var icon='data-icon="gear"';
	var list= $("#item-uinfo");
	list.empty();
	if(isSale){
		list.append("<li "+icon+"><a "+upoprice+" ><strong>Price:</strong><kbd>"+currentProduct.price  +"</kbd></a> </li>");}
	else{
		list.append("<li "+icon+"><a "+upoprice+"><strong>Current bid:</strong><kbd>"+currentProduct.price  +"</kbd></a> </li>");
	}
	list.append("<li "+icon+"><a "+upopcondition+"> <strong>Condition: </strong><kbd>"+currentProduct.condition  +"</kbd></a> </li>");
	list.append("<li><a> <strong>Listing ends: </strong><kbd>"+currentProduct.endtime.substring(0, 10)+" at "+currentProduct.endtime.substring(12, 20)+"</kbd></a> </li>");
	list.append("<li><a><strong> Item ID: </strong><kbd>"+currentProduct.id+"</kbd></a> </li>");

	var idescription= $("#udescription");
	idescription.empty();
	idescription.append("<p>"+currentProduct.description+"</p>");

	var image= $('#item-uimage');
	image.empty();
	image.prepend('<center><img id="theImg" src="' + currentProduct.img+'"/></center>');

	var pname= $("#productName");
	pname.empty();
	pname.append("<center>"+currentProduct.prodname+"</center>").trigger('create');

	list.listview("refresh");     

});  

$(document).on('click', "#submit-name", function(event, ui) {

	var uname= $('#upname').val();
	if(uname.length > 0){
		$( "#popupUpdateName").popup( "close" );

		var formData = {name:uname, id: currentProduct.id};
		$.ajax({
			url : "http://localhost:3412/Project1Srv/updatepname",
			type: 'put',
			data : formData,
			success : function(data) {
			console.log("name updated");
			currentProduct.prodname= data.updatepname[0].prodname;
			var pname= $("#productName");
			pname.empty();
			pname.append("<center>"+currentProduct.prodname+"</center>");
		},

		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("name not updated!");}          	
		});
	}
	else{
		alert("Please provide a name.");
	}

});

$(document).on('click', "#submit-image", function(event, ui) {

	var uimage= $('#upimage').val();

	if(uimage.length > 0){
		$( "#popupUpdateImage").popup( "close" );

		var formData = {image:uimage, id: currentProduct.id};
		$.ajax({
			url : "http://localhost:3412/Project1Srv/updatepimage",
			type: 'put',
			data : formData,
			success : function(data) {
			console.log("image updated");
			currentProduct.img= data.updatepimage[0].imagelink;
			var image= $('#item-uimage');
			image.empty();
			image.prepend('<center><img id="theImg" src="' + currentProduct.img+'"/></center>');
		},

		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("image not updated!");}          	
		});

	}
	else{
		alert("Please provide a valid image.");
	}

});

$(document).on('click', "#submit-price", function(event, ui) {

	var uprice= $('#uprice').val();
	if(uprice > 0){
		$( "#popupUpdatePrice").popup( "close" );
		var formData = {price:uprice, id: currentProduct.id};
		$.ajax({
			url : "http://localhost:3412/Project1Srv/updateprice",
			type: 'put',
			data : formData,
			success : function(data) {
			console.log("price updated");
			currentProduct.price= data.updateprice[0].price;
			var upoprice='href= "#popupUpdatePrice" data-rel="popup" data-position-to="window" data-inline="true" style="text-decoration: none" ';
			var upopcondition='href= "#popupUpdateCondition" data-rel="popup" data-position-to="window" data-inline="true" style="text-decoration: none" ';
			var upopend='href= "#popupUpdateEnd" data-rel="popup" data-position-to="window" data-inline="true" style="text-decoration: none" ';

			var icon='data-icon="gear"';
			var list= $("#item-uinfo");
			list.empty();
			if(isSale){
				list.append("<li "+icon+"><a "+upoprice+" ><strong>Price:</strong><kbd>"+currentProduct.price  +"</kbd></a> </li>");}

			else{
				list.append("<li "+icon+"><a "+upoprice+"><strong>Current bid:</strong><kbd>"+currentProduct.price  +"</kbd></a> </li>");
			}

			list.append("<li "+icon+"><a "+upopcondition+"> <strong>Condition: </strong><kbd>"+currentProduct.condition  +"</kbd></a> </li>");
			list.append("<li><a> <strong>Listing ends: </strong><kbd>"+currentProduct.endtime.substring(0, 10)+" at "+currentProduct.endtime.substring(12, 20)+"</kbd></a> </li>");
			list.append("<li><a><strong> Item ID: </strong><kbd>"+currentProduct.id+"</kbd></a> </li>");

			list.listview("refresh");   

		},

		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("price not updated!");}          	
		});

	}
	else{
		alert("Please provide a valid image.");
	}

});

$(document).on('click', "#submit-condition", function(event, ui) {

	var ucondition= $('#upcondition').val();

	if(ucondition.length > 0){
		$( "#popupUpdateCondition").popup( "close" );
		var formData = {condition:ucondition, id: currentProduct.id};
		$.ajax({
			url : "http://localhost:3412/Project1Srv/updatepcondition",
			type: 'put',
			data : formData,
			success : function(data) {
			console.log("condition updated");
			currentProduct.condition= data.updatepcondition[0].condition;
			var upoprice='href= "#popupUpdatePrice" data-rel="popup" data-position-to="window" data-inline="true" style="text-decoration: none" ';
			var upopcondition='href= "#popupUpdateCondition" data-rel="popup" data-position-to="window" data-inline="true" style="text-decoration: none" ';
			var upopend='href= "#popupUpdateEnd" data-rel="popup" data-position-to="window" data-inline="true" style="text-decoration: none" ';

			var icon='data-icon="gear"';
			var list= $("#item-uinfo");
			list.empty();
			if(isSale){
				list.append("<li "+icon+"><a "+upoprice+" ><strong>Price:</strong><kbd>"+currentProduct.price  +"</kbd></a> </li>");}

			else{
				list.append("<li "+icon+"><a "+upoprice+"><strong>Current bid:</strong><kbd>"+currentProduct.price  +"</kbd></a> </li>");
			}

			list.append("<li "+icon+"><a "+upopcondition+"> <strong>Condition: </strong><kbd>"+currentProduct.condition  +"</kbd></a> </li>");
			list.append("<li><a> <strong>Listing ends: </strong><kbd>"+currentProduct.endtime.substring(0, 10)+" at "+currentProduct.endtime.substring(12, 20)+"</kbd></a> </li>");
			list.append("<li><a><strong> Item ID: </strong><kbd>"+currentProduct.id+"</kbd></a> </li>");

			list.listview("refresh");  


		},

		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("condition not updated!");}          	
		});
	}
	else{
		alert("Please choose a product condition.");
	}

});

$(document).on('click', "#submit-description", function(event, ui) {

	var udescription= $('#updescription').val();
	if(udescription.length > 0){
		$( "#popupUpdateDescription").popup( "close" );
		var formData = {description:udescription, id: currentProduct.id};
		$.ajax({
			url : "http://localhost:3412/Project1Srv/updatepdescription",
			type: 'put',
			data : formData,
			success : function(data) {
			console.log("description updated");
			currentProduct.description= data.updatepdescription[0].description;

			var idescription= $("#udescription");
			idescription.empty();
			idescription.append("<p>"+currentProduct.description+"</p>"); 

		},

		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("description not updated!");}          	
		});
	}
	else{
		alert("Please provide a description.");
	}

});
////////// Checkout

var productscheckout=[];

$(document).on('pagebeforeshow', "#checkoutItem", function(event, ui) { 

	productscheckout=[];
	var ucart={};
	if(sessionStorage.getItem("account")) {
		var txt = sessionStorage.getItem("account");
		var obj = eval('(' + txt + ')');
		if(loginAccount.username == undefined && obj.username != undefined){
			loginAccount = obj;
		}
	}
	var txt = sessionStorage.getItem("sales");
	var obj = eval('(' + txt + ')');
	
	if(saleList != obj){
		saleList = obj;
	}
	
	if(loginAccount.accountid != undefined){
		ucart= loginAccount.accountid;
	}
	
	else{
		ucart= "guest";
		if(getCookie(ucart) == undefined){
			setCookie(ucart, JSON.stringify('[]'));
		}
	}
	
	var txt = $.parseJSON(getCookie(ucart));
	var obj = eval('(' + txt + ')');
	
	if(getCookie("guest")!=undefined){
			var txt2 = $.parseJSON(getCookie("guest"));
			var obj2 = eval('(' + txt2 + ')');
		
			for(var j=0; j < obj2.length; j++){
				var sh = ('{"shoppingcart":"' + obj2[j].shoppingcart + '"}');
				var obj3= eval('(' + sh + ')');
				obj.push(obj3);
			}
	}
	var sales={};
	
	if(saleList != undefined){
		sales = saleList;
	}

	var list = $("#myshoppinglist");
	list.empty();

	var len = obj.length;
	var totalPrice=0.00;

	if(len != 0 && saleList != undefined){
		var len2 = sales.length;
		shoppingcartTotal=0;

		for(var i=0; i<len; i++) {

			var prod= obj[i].shoppingcart;
			j = 0;
			while((prod != sales[j].prodid) && j < len2) {
				j++;
			}

			var count =0;
			var fposition=i;

			for(var n=0; n< len; n++){
				if(prod == obj[n].shoppingcart){
					count++;

					if(n < fposition){
						fposition= n;
					}

				}
			}

			var item;			
			item =sales[j];

			if(fposition == i){

				list.append("<li data-icon= 'false' ><a> <img src='"+ item.imagelink+ "' style='margin: 0 0 0 20px; top: 20%'/>"+
						"<h3>"+item.prodname+"</h3><h2> Price: "+item.price + "</h2><h2> Qty: "+count+"</h2></a></li>");

			var splitPrice= item.price.split("$");
			var price= splitPrice[1];
			var productPrice= parseFloat(price);
			totalPrice += count * productPrice;
			productscheckout.push({"id": item.prodid, "totalprice": totalPrice, "count":count, "prodname": item.prodname, "cost": item.price, "saleid": item.saleid});		
			}	
		}
	} 

	list.listview("refresh"); 
	
	var date = $("#infocheck");
	date.empty();
	date.append("<li>" + new Date() + "</li>");
	date.append("<li> Total price: $" + totalPrice + "</li>");
	date.listview("refresh");

	var ship = $("#shipping-list");
	ship.empty();
	var gearstyle= '<a href="#popupShipping" data-icon="gear" data-rel="popup" data-position-to="window"></a>';
	ship.append("<li>Name: " + loginAccount.fname + " " + loginAccount.lname+"</li>");
	ship.append("<li><a>"+loginAccount.shipping +gearstyle+"</a></li>");
	ship.listview("refresh");
	
	$('#nameshipping').val(loginAccount.fname+" "+ loginAccount.lname); 
	$('#addressshipping').val(loginAccount.shipping);
	
	$(document).on('click', '#changeshippingaddress', function() {
		
		$( "#popupShipping").popup( "close" );
		name= $("#nameshipping").val();
		address=$("#addressshipping").val();
		
		if(name == undefined){
			name= loginAccount.fname+ " "+ loginAccount.lname;
		}
		if(address== undefined){
			address= loginAccount.shipping;
		}
		var ship = $("#shipping-list");
		ship.empty();
		var gearstyle= '<a href="#popupShipping" data-icon="gear" data-rel="popup" data-position-to="window"></a>';
		ship.append("<li>Name: " + name +"</li>");
		ship.append("<li><a>"+address+gearstyle+"</a></li>");
		ship.listview("refresh");
	});
	
	var payment = $("#payment-list");
	payment.empty();
	payment.append("<li>Name: " + loginAccount.fname + " " + loginAccount.lname+"</li>");
	payment.append("<li> Billing Address: <br> "+ loginAccount.billing);
	payment.append("<li>Credit Card: "+loginAccount.cardtype+"</li>");
	payment.append("<li>Card number:"+loginAccount.cardnumber.substr(5,6)+"</li>");	
	payment.listview("refresh");
});

var formBuyer={};
$(document).on('click', '#submitcheckout-button', function() {
	var ucart={};
	if(sessionStorage.getItem("account")) {
		var txt = sessionStorage.getItem("account");
		var obj = eval('(' + txt + ')');
		if(loginAccount.username == undefined && obj.username != undefined){
			loginAccount = obj;
		}
	}
	
	if(loginAccount.accountid != undefined){
		ucart= loginAccount.accountid;
	}
	
	else{
		ucart= "guest";
		if(getCookie(ucart) == undefined){
			setCookie(ucart, JSON.stringify('[]'));
		}
	}

	
	formBuyer= {buyerid:loginAccount.accountid, totalprice:0};
	$.ajax({
	url : "http://localhost:3412/Project1Srv/insertinvoice",
	type: 'post',
	data : formBuyer,
	success : function(data) {
		formBuyer.invoiceid=data.insertinvoice[0].invoiceid;
		formBuyer.date=data.insertinvoice[0].date;
	for(var i=0; i < productscheckout.length; i++){

		var formData = {id:productscheckout[i].id, count: productscheckout[i].count, totalprice: productscheckout[i].totalprice,
			invoiceid: data.insertinvoice[0].invoiceid, saleid: productscheckout[i].saleid};
			
		formBuyer.totalprice= formBuyer.totalprice+ formData.totalprice;
			
		var id= loginAccount.accountid;
		$.ajax({
			url : "http://localhost:3412/Project1Srv/creditinfo/"+id,
			type: 'get',
			success : function(data) {
					formData.creditid= data.creditinfo[0].creditid;				
					$.ajax({
						url : "http://localhost:3412/Project1Srv/insertcheckout",
						type: 'post',
						data:formData,
						success : function(data) {
							
						$.ajax({
						url : "http://localhost:3412/Project1Srv/updateSale",
						type: 'put',
						data : formData,
						success : function(data) {
				
						setCookie(loginAccount.accountid, JSON.stringify('[]'));
						setCookie("guest", JSON.stringify('[]'));
						invoiceID= formBuyer.invoiceid;
						$.mobile.changePage("thx.html");
						},

						error: function(data, textStatus, jqXHR){
						console.log("textStatus: " + textStatus);
						alert("sale not ended!");}          	
		
					});},
	
					error: function(data, textStatus, jqXHR){
					console.log("textStatus: " + textStatus);
					alert("checkout not successfull");}          	
					});						
				},
		error: function(data, textStatus, jqXHR){
		console.log("textStatus: " + textStatus);
		alert("credit not successfull");}          	
		});	
			
	}
	
	},
	
	error: function(data, textStatus, jqXHR){
	console.log("textStatus: " + textStatus);
	alert("invoice not created");}          	
	});	
		
});

$(document).on('click', '#openinvoice', function(){ 
		GetInvoice(invoiceID);
});   


var invoiceID={};
function GetInvoice(aid){
	invoiceID= aid;
	$.mobile.changePage("invoice.html");
}
$(document).on('pagebeforeshow', "#invoice-show", function(event, ui) {
		var id= invoiceID;
		$.ajax({
		url : "http://localhost:3412/Project1Srv/invoice/"+id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){

		var productscheckout= data.invoiceuser;
		var number = $("#invoicenumber");
		var date = $("#date");
		var payment = $("#due");
		var balance = $("#balance-due");
		var total = $("#total");
		var paid = $("#amountpaid");
		var products = $("#show-itemrow");
		var name = $("#customer");
		var address = $("#address");

		name.empty();
		address.empty();
		number.empty();
		date.empty();
		payment.empty();
		balance.empty();
		total.empty();
		paid.empty();
		products.empty;
		var bigtotal=0;
		
		products.append('<tr>'+
		      '<th>Item</th>'+
		      '<th>Unit Cost</th>'+
		      '<th>Quantity</th>'+
		      '<th>Price</th>'+
		 	  '</tr>');
	
		for(var i=0; i< productscheckout.length; i++){
		
		products.append('<tr><td class="item-name"><center><p>'+productscheckout[i].prodname+'</p></center></td>'+
		      '<td><center><p class="cost">'+productscheckout[i].price+'</p></center></td>'+
		      '<td><center><p class="qty">'+productscheckout[i].quantity+'</p></center></td>'+
		      '<td><center><p>'+productscheckout[i].totalprice+'</p></center></td></tr>');
		      var splitPrice= productscheckout[i].totalprice.split("$");
			  var price= splitPrice[1];
			  var productPrice= parseFloat(price);
			  bigtotal += productPrice;	
		}

		name.append(loginAccount.fname +" "+ loginAccount.lname).trigger('create');
		address.append(loginAccount.billing).trigger('create');
		number.append(" # "+invoiceID).trigger('create');
		date.append(productscheckout[0].date).trigger('create');
		payment.append(" $ "+bigtotal.toFixed(2)).trigger('create');
		balance.append(" $0.00").trigger('create');
		total.append(" $ "+bigtotal.toFixed(2)).trigger('create');
		paid.append(" $ "+bigtotal.toFixed(2)).trigger('create');
		products.trigger('create');
		
		
		},                        
		error: function(data, textStatus, jqXHR){
		console.log("textStatus: " + textStatus);
		alert("Error");
	}
	});
	
});



////////// Shopping Cart

var shoppingcartTotal=0;

$(document).on('pagebeforeshow', "#shopCartView", function(event, ui) {
	//alert(loginAccount.username);
	var ucart={};

	if(sessionStorage.getItem("account")) {
		var txt = sessionStorage.getItem("account");
		var obj = eval('(' + txt + ')');
		if(loginAccount.username == undefined && obj.username != undefined){
			loginAccount = obj;
		}
	}
	var txt = sessionStorage.getItem("sales");
	var obj = eval('(' + txt + ')');
	if(saleList != obj){
		saleList = obj;
	}
	if(loginAccount.accountid != undefined){
		ucart= loginAccount.accountid;
	}
	else{
		ucart= "guest";
		if(getCookie(ucart) == undefined){
			setCookie(ucart, JSON.stringify('[]'));
		}
	}

	var txt = $.parseJSON(getCookie(ucart));
	var obj = eval('(' + txt + ')');
	//alert(JSON.stringify(obj));
	//alert(obj[0].shoppingcart);
	var sales={};
	if(saleList != undefined){
		sales = saleList;
	}

	//alert(obj.length);
	var list = $("#myshopping-list");
	list.empty();
	
	var total = $("#total-shopping");
	total.empty();

	var len = obj.length;
	var totalPrice=0.00;
	if(len != 0 && saleList != undefined){

		var len2 = sales.length;
		shoppingcartTotal=0;

		for(var i=0; i<len; i++) {

			var prod= obj[i].shoppingcart;
			//GetProduct(obj.shoppingcart[i].prodid);
			j = 0;
			while((prod != sales[j].prodid) && j < len2) {
				j++;
			}

			var count =0;
			var fposition=i;

			for(var n=0; n< len; n++){
				if(prod == obj[n].shoppingcart){
					count++;

					if(n < fposition){
						fposition= n;
					}

				}
			}

			var item;			
			item =sales[j];

			if(fposition == i){

				list.append("<li ><a onClick= GetProduct("+item.prodid+") > <img src='"+ item.imagelink+ "' style='margin: 0 0 0 20px; top: 20%'/>"+
						"<h3>"+item.prodname+"</h3><h2> Price: "+item.price + "</h2><h2> Qty: "+count+"</h2><a data-icon='delete' onClick=DeleteShoppingCart('"+i+"')>Delete</a></a></li>");

			var splitPrice= item.price.split("$");
			var price= splitPrice[1];
			var productPrice= parseFloat(price);
			totalPrice += count * productPrice;
			
			}	
		}
		
		total.append("<li><h3>$"+ totalPrice+"</h3></li>");
		
		} 
	else{

		var msg='<li><a data-rel=back data-role="button">No products</a></li>';
		total.append("<li><h3> $ "+ totalPrice +"</h3></li>");
		list.append(msg);     
	}

	list.listview("refresh"); 
	total.listview("refresh");
});

$(document).on('click', '#checkout-button', function() {
	var ucart={};

	if(sessionStorage.getItem("account")) {
		var txt = sessionStorage.getItem("account");
		var obj = eval('(' + txt + ')');
		if(loginAccount.username == undefined && obj.username != undefined){
			loginAccount = obj;
		}
	}

	if(loginAccount.accountid != undefined){
		ucart= loginAccount.accountid;
		var txt = $.parseJSON(getCookie(ucart));
		var obj = eval('(' + txt + ')');
		
		if(obj.length > 0){
			$.mobile.changePage("check.html", {transition: "none"});
		}
		else{
			alert("You do not have items in your cart.");
		}	
	}
	else{
		ucart= "guest";
		var txt = $.parseJSON(getCookie(ucart));
		var obj = eval('(' + txt + ')');
		
		if(obj.length > 0){
			$.mobile.changePage("shoplogin.html", {transition: "none"});
		}
		else{
			alert("You do not have items in your cart.");
		}	
	}

});
	
var goToCheckout= false;
$(document).on('click', '#login-shop', function() { 
		var username= $('#un').val();
		var password= $('#pw').val();
		if(username.length > 0 && password.length > 0){
			goToCheckout= true;
			AccountLogin(username, password);                 
		} 

		else {
			alert('Please fill all fields');
		}           
		return false; 
});   

//////// History

$(document).on('pagebeforeshow', "#historyPage", function(event, ui) {

	var list=$("#myhistory-list");
	list.empty();

	var h1= '<li><a onClick=BidUser('+loginAccount.accountid+')>My Bids</a></li>';
	var h2= '<li><a onClick=SalesUser('+loginAccount.accountid+')>My Sales</a></li>';
	var h3= '<li><a onClick=PurchaseUser('+loginAccount.accountid+')>My Purchases</a></li>';

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

var creditid={};
$(document).on('pagebeforeshow', "#purchaseList", function(event, ui){

	var usales = purchases;
	var len =usales.length;


		var list = $("#mypurchase-list");
		list.empty();
		var item;
		for (var i=0; i < len; ++i){
			item =usales[i];
						
			list.append("<li><a data-icon='star' onClick= GetInvoice("+item.invoice+")><img src='"+ item.img+ "'/>"+
				item.prodname + "<h4> Qty: "+item.quantity+"<br>Total price:"+
				item.price+"<\h4><a onClick = GoProfile("+ item.sellerid +") data-position-to='window' data-icon='gear'>Rank</a></a></li>");
		}
				
		var ulist = $("#unpaid-list");
		ulist.empty();
		var item;
		for (var i=0; i < winningBids.length; ++i){
			item =winningBids[i];
			if(!item.ispayed){
			creditid=item.creditid;
			ulist.append("<li data-icon='star' onClick= BidCheck("+item.auctionid+")><a><img src='"+ item.img+ "'/>"+item.prodname + "<h4> Price:"+item.price+"<\h4></a></li>");
			}
			else{
				list.append("<li data-icon='star' onClick=GetAuctionInvoice("+item.auctionid+")><a><img src='"+ item.img+ "'/> <h4>"+item.prodname + 
				"</h4><h4>Qty: 1 <br> "+"Total price:"+item.price+"<\h4></a></li>");
			}						
		}
		list.listview("refresh");
		ulist.listview("refresh");

});

var auctionBid={};
function BidCheck(auctionid){
	auctionBid= auctionid;
	$.mobile.changePage("bidcheck.html");
}

$(document).on('pagebeforeshow', "#bidcheckpage", function(event, ui){
	
	var id= auctionBid;
	$.ajax({
		url : "http://localhost:3412/Project1Srv/auction/"+id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
		var auction= data.auction[0];
		
		var date = $("#bidinfocheck");
		date.empty();
		date.append("<li>" + new Date() + "</li>");
		date.append("<li> Total price: " + auction.price + "</li>");
		date.listview("refresh");
		
		var prod = $("#bidmyshoppinglist");
		prod.empty();
		prod.append("<li>Name: " + auction.prodname + "</li>");
		prod.listview("refresh");

		var ship = $("#bidshipping-list");
		ship.empty();
		var gearstyle= '<a href="#popupShippingBid" data-icon="gear" data-rel="popup" data-position-to="window"></a>';
		ship.append("<li>Name: " + loginAccount.fname + " " + loginAccount.lname+"</li>");
		ship.append("<li><a>"+loginAccount.shipping +gearstyle+"</a></li>");
		ship.listview("refresh");
	
		$('#bidnameshipping').val(loginAccount.fname+" "+ loginAccount.lname); 
		$('#bidaddressshipping').val(loginAccount.shipping);
	
		$(document).on('click', '#changeshippingaddressauction', function() {
		
		$( "#popupShippingBid").popup( "close" );
		name= $("#bidnameshipping").val();
		address=$("#bidaddressshipping").val();
		
		if(name == undefined){
			name= loginAccount.fname+ " "+ loginAccount.lname;
		}
		if(address== undefined){
			address= loginAccount.shipping;
		}
		var ship = $("#bidshipping-list");
		ship.empty();
		var gearstyle= '<a href="#popupShippingBid" data-icon="gear" data-rel="popup" data-position-to="window"></a>';
		ship.append("<li>Name: " + name +"</li>");
		ship.append("<li><a>"+address+gearstyle+"</a></li>");
		ship.listview("refresh");
	});
	
	var payment = $("#bidpayment-list");
	payment.empty();
	payment.append("<li>Name: " + loginAccount.fname + " " + loginAccount.lname+"</li>");
	payment.append("<li> Billing Address: <br> "+ loginAccount.billing);
	payment.append("<li>Credit Card: "+loginAccount.cardtype+"</li>");
	payment.append("<li>Card number:"+loginAccount.cardnumber.substr(5,6)+"</li>");	
	payment.listview("refresh");

	},                        
	error: function(data, textStatus, jqXHR){
		console.log("textStatus: " + textStatus);
		alert("Error");
	}

	});
	
});

$(document).on('click', '#bidsubmitcheckout-button', function(){
		var formData={auctionid: auctionBid};
		$.ajax({
		url : "http://localhost:3412/Project1Srv/updatepaymentwinningbid",
		type : 'put',
		data : formData,
		dataType:"json",
		success: function(data, textStatus, jqXHR){
    		GetAuctionInvoice(formData.auctionid);
  		},
  		error: function(errorThrown, textStatus, jqXHR){
    		alert("Error 444: No response");
    		console.log(errorThrown + " " + textStatus + " " + jqXHR);
    		$.mobile.loading("hide");
  		}
		});
	
	
	
});

function GetAuctionInvoice(aid){
		auctionBid= aid;
	    $.mobile.changePage("auctioninvoice.html");
}

$(document).on('pagebeforeshow', '#auctioninvoice-show', function(event, ui){
	
	var id= auctionBid;	
	$.ajax({
		url : "http://localhost:3412/Project1Srv/auction/"+id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
		var auction= data.auction[0];
		
		var date = $("#adate");
		var payment = $("#adue");
		var balance = $("#abalance-due");
		var total = $("#atotal");
		var paid = $("#aamountpaid");
		var products = $("#ashow-itemrow");
		var name = $("#acustomer");
		var address = $("#aaddress");

		name.empty();
		address.empty();
		date.empty();
		payment.empty();
		balance.empty();
		total.empty();
		paid.empty();
		products.empty;
		
		products.append('<tr>'+
		      '<th>Item</th>'+
		      '<th>Unit Cost</th>'+
		      '<th>Quantity</th>'+
		      '<th>Price</th>'+
		 	  '</tr>');
		
		products.append('<tr><td class="item-name"><center><p>'+auction.prodname+'</p></center></td>'+
		      '<td><center><p class="cost">'+auction.price+'</p></center></td>'+
		      '<td><center><p class="qty"> 1 </p></center></td>'+
		      '<td><center><p>'+auction.price+'</p></center></td></tr>');	

		name.append(loginAccount.fname +" "+ loginAccount.lname).trigger('create');
		address.append(loginAccount.billing).trigger('create');
		date.append(new Date()).trigger('create');
		payment.append(auction.price).trigger('create');
		balance.append(" $0.00").trigger('create');
		total.append(auction.price).trigger('create');
		paid.append(auction.price).trigger('create');
		products.trigger('create');

		},                        
		error: function(data, textStatus, jqXHR){
		console.log("textStatus: " + textStatus);
		alert("Error");
	}

	});
	
});

$(document).on('pagebeforeshow', "#saleList", function(event, ui){

	var usales = sales;
	var len =usales.length;

	if(len==0){ 
		var iname= $("#message");
		var msg= '<br><a data-rel="back"><center><h2>No sales to display.</h2><br> <img src="http://img43.imageshack.us/img43/6572/4v4.gif" /></center></a> ';
		iname.empty();
		iname.append(msg).trigger('create');}

	else{

		var list = $("#mysale-list");
		list.empty();
		var item;
		for (var i=0; i < len; ++i){
			item =usales[i];
			var stat= "Open";
			if(!item.isactive){
				stat= "Closed";
			}
			list.append("<li><a onClick= GetProduct("+item.id+")><img src='"+ item.img+ "'/>"+item.prodname + "<h4> Status:"+stat+" </h4> <h5> Sale:"+item.price+"</h5></a></li>");
		}
		list.listview("refresh");}  
});


////////// Message

var reply= false;
$(document).on('click', "#reply", function(event, ui) {

	reply= true;
	$.mobile.changePage("newMessage.html", {transition: "none"});

});

$(document).on('pagebeforeshow', "#newMessage", function(event, ui) {

	if (sessionStorage.getItem("account") != null) {
		var txt = sessionStorage.getItem("account");
		var obj = eval('(' + txt + ')');
		if(loginAccount.username == undefined && obj.username != undefined){
			loginAccount = obj;
		}
	}
	if(reply){
		reply= false;
		var message = $("#messageTo");
		message.empty();
		var to= '<input type="text" value="'+messageFrom+'" name="userName">';
		message.append(to).trigger('create');
		messageFrom={};

	}
});

var messageFrom= {};
var inboxToDelete=[];

function CheckMessage(mid){

	var count= $.inArray(mid, inboxToDelete);
	if(count == -1){
		inboxToDelete.push(mid);}
	else{
		inboxToDelete.splice(count,1); 
	} 
}

$(document).on('pagebeforeshow', "#inbox", function(event, ui) {
	inboxToDelete.length=0;
	var message = inboxMessage;
	var len =message.length;

	if(len==0){ 
		var list = $("#inbox-list");
		list.empty();
		var del = $("#deleteinbox");
		del.empty();
		var iname= $("#message");
		var msg= '<br><a data-rel="back"><center><h2>No messages to display.</h2><br> <img src="http://img43.imageshack.us/img43/6572/4v4.gif" /></center></a> ';
		iname.empty();
		iname.append(msg).trigger('create');}

	else{                 
		var list = $("#inbox-list");
		list.empty();
		var item;
		var style='style="position:absolute; top:40%; left: 15px"';
		for (var i=0; i < len; ++i){
			item =message[i];
			var checkbox='<div '+style+'><input type="checkbox" onClick=CheckMessage("'+item.messageid+'") /></div>';
			list.append("<li>"+checkbox+"<a onClick= GetMessage("+item.messageid+") style='margin: 0 0 0 30px;'> From: "+item.username + "<h4>Subject: "+ item.subject+"</h4><p> Date:"+item.date+" </p></a></li>");
		}
		list.listview("refresh");} 

	$(document).on('click', '#deleteinbox', function(event, ui) {
		if(inboxToDelete.length > 0){
			DeleteMessageI();
		}
		else{
			alert("Check messages to delete.");
		}

	}); 
});

var outboxToDelete=[];

function CheckMessageO(mid){

	var count= $.inArray(mid, outboxToDelete);
	if(count == -1){
		outboxToDelete.push(mid);}
	else{
		outboxToDelete.splice(count,1); 
	} 
}

$(document).on('pagebeforeshow', "#sent", function(event, ui) {
	outboxToDelete.length=0;
	var message = sentMessage;
	var len =message.length;

	if(len==0){ 
		var iname= $("#message");
		var list = $("#sentMessage-list");
		list.empty();
		var del = $("#deleteoutbox");
		del.empty();
		var msg= '<br><a data-rel="back"><center><h2>No messages to display.</h2><br> <img src="http://img43.imageshack.us/img43/6572/4v4.gif" /></center></a> ';
		iname.empty();
		iname.append(msg).trigger('create');}

	else{                 
		var list = $("#sentMessage-list");
		list.empty();
		var item;
		var style='style="position:absolute; top:40%; left: 15px"';            
		for (var i=0; i < len; ++i){
			item =message[i];
			var checkbox='<div '+style+'><input type="checkbox" onClick=CheckMessageO("'+item.messageid+'") id="checkbox-0"/></div>';          
			list.append("<li>"+checkbox+"<a onClick= GetMessage("+item.messageid+") style='margin: 0 0 0 30px;'> To: "+item.receiver + "<h4>Subject:"+item.subject+"</h4><p> Date:"+item.date+" </p></a></li>");
		}
		list.listview("refresh");}  

	$(document).on('click', '#deleteoutbox', function(event, ui) {
		if(outboxToDelete.length > 0){
			DeleteMessageS();
		}
		else{
			alert("Check messages to delete.");
		}

	}); 
});

$(document).on('pagebeforeshow', "#message-view", function(event, ui) {
	var message = viewMessage;
	var len =message.length;

	if(len==0){ 
		var iname= $("#message");
		var msg= '<br><a data-rel="back"><center><h2>No messages to display.</h2><br> <img src="http://img43.imageshack.us/img43/6572/4v4.gif" /></center></a> ';
		iname.empty();
		iname.append(msg).trigger('create');}

	else{                 
		var list = $("#message-show");
		list.empty();
		var item;
		for (var i=0; i < len; ++i){
			item =message[i];
			var sender= '<input type="text" value= "From:'+ item.sender + '" data-mini="true"readonly="readonly"/><br>';
			var receiver= '<input type="text" value= "To: '+ item.receiver + '" data-mini="true" readonly="readonly"/><br>';
			var date= '<input type="text" value= "Date:'+ item.date + '" data-mini="true" readonly="readonly"/><br>';
			var subject= '<input type="text" value= "Subject:'+item.subject+'" data-mini="true" readonly="readonly"/><br> ';
			var message= '<textarea cols="40" rows="8" readonly="readonly">'+item.text+'</textarea><br>';

			if(loginAccount.username == item.sender){messageFrom= item.receiver;}
			else{messageFrom=item.sender;}
			list.append(sender+receiver+date+subject+message).trigger('create');       
		}}



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
					categoriesList[i].catname + "</a></li>");
		}        
		list.listview("refresh");
		
		
	},
	error: function(data, textStatus, jqXHR){
		console.log("textStatus: " + textStatus);
		alert("Data not found!");
		//$.mobile.changePage("index.html", {transition: "none"});
	}
	});
	
	$.ajax({
		url : "http://localhost:3412/Project1Srv/todaysales",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
		var todayList = data.todaysales;
		var len =todayList.length;
		var list = $("#today-lists");
		list.empty();
		var today;
		today = todayList[0];
		for (var i=0; i < len; ++i){
			list.append("<li><a><h3>" + todayList[i].name + "</h3><h4> Quantity: " + todayList[i].quantity + " </h4><h4>" + todayList[i].total + "</h4></a></li>");
		}        
		list.listview("refresh");
	},
	error: function(data, textStatus, jqXHR){
		console.log("textStatus: " + textStatus);
		alert("Data not found Today!");
		//$.mobile.changePage("index.html", {transition: "none"});
	}
	});
	
	$.ajax({
		url : "http://localhost:3412/Project1Srv/weeksales",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
		var weekList = data.weeksales;
		var len =weekList.length;
		var list = $("#week-lists");
		list.empty();
		var week;
		week = weekList[0];
		for (var i=0; i < len; ++i){
			list.append("<li><a><h3>" + weekList[i].name + "</h3><h4> Quantity: " + weekList[i].quantity + " </h4><h4>" + weekList[i].total + "</h4></a></li>");
		}        
		list.listview("refresh");
	},
	error: function(data, textStatus, jqXHR){
		console.log("textStatus: " + textStatus);
		alert("Data not found this Week!");
		//$.mobile.changePage("index.html", {transition: "none"});
	}
	});
	
	$.ajax({
		url : "http://localhost:3412/Project1Srv/monthsales",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
		var monthList = data.monthsales;
		var len =monthList.length;
		var list = $("#month-lists");
		list.empty();
		var month;
		month = monthList[0];
		for (var i=0; i < len; ++i){
			list.append("<li><a><h3>" + monthList[i].name + "</h3><h4> Quantity: " + monthList[i].quantity + " </h4><h4>" + monthList[i].total + "</h4></a></li>");
		}        
		list.listview("refresh");
	},
	error: function(data, textStatus, jqXHR){
		console.log("textStatus: " + textStatus);
		alert("Data not found this Month!");
		//$.mobile.changePage("index.html", {transition: "none"});
	}
	});
	
	$(document).on('click', '#admindelete', function() {
		var user = $("#username").val();
		var formData = {username: user};
		DeleteAccount(formData);
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

var currentRankers= {};

function GetRankers(id){

	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/rankers/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
		currentRankers = data.rankers;
		$.mobile.loading("hide");
		$.mobile.changePage("reviews.html", {transition: "none"});
	},
	error: function(data, textStatus, jqXHR){
		console.log("textStatus: " + textStatus);
		$.mobile.loading("hide");
		if (data.status == 404){
			alert("Rankers not found.");
		}
		else {
			alert("Internal Server Error.");
		}
	}
	});
}


function SaveAccount(){
	$.mobile.loading("show");
	var form = $("#accountpass-form");
	var formData = form.serializeArray();
	$.ajax({
		url : "http://localhost:3412/Project1Srv/accounts/",
		type : 'post',
		data : formData,
		//contentType: "application/json",
		dataType:"json",
		success: function(data, textStatus, jqXHR){
    		alert('Password Changed');
			$.mobile.loading("hide");
			$.mobile.changePage("index.html", {transition: "none"});
  		},
  		error: function(errorThrown, textStatus, jqXHR){
    		//alert("Error 444: No response");
    		alert(errorThrown + " " + textStatus + " " + jqXHR);
    		$.mobile.loading("hide");
			$.mobile.changePage("index.html", {transition: "none"});
  		}
	});
}

function DeleteAccounts(id){
	var decision = confirm("Delete Account?");
	if(decision == true) {
		$.mobile.loading("show");
		$.ajax({
			url : "http://localhost:3412/Project1Srv/accountsdelete/" + id,
			method: 'put',
			contentType: "application/json",
			dataType:"json",
			success : function(data, textStatus, jqXHR) {
				$.mobile.loading("hide");
				loginAccount = {};
				sessionStorage.removeItem("account");
				sessionStorage.clear();
				$.mobile.changePage("login.html", {transition: "none"});
			},
  			error: function(errorThrown, textStatus, jqXHR){
	    		alert("Error 444: No response");
    			alert(errorThrown + " " + textStatus + " " + jqXHR);
    			$.mobile.loading("hide");
				$.mobile.changePage("index.html", {transition: "none"});
  			}
		});
	}
}

function DeleteCategory(id){
	var decision = confirm("Delete Category?");
	if(decision == true) {
		$.mobile.loading("show");
		$.ajax({
			url : "http://localhost:3412/Project1Srv/categories/" + id,
			type: 'post',
			contentType: "application/json",
			dataType:"json",
			success : function(data, textStatus, jqXHR) {
				alert("Error 444: No response");
    			$.mobile.loading("hide");
				$.mobile.changePage("index.html", {transition: "none"});
		},
  			error: function(errorThrown, textStatus, jqXHR){
  				alert('Categoty Deleted');
				$.mobile.loading("hide");
				$.mobile.changePage("index.html", {transition: "none"});
	    		
  			}
		
		});
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
			sessionStorage.setItem("account", JSON.stringify(loginAccount));
			if (getCookie(loginAccount.accountid) == undefined) {
				  setCookie(loginAccount.accountid, JSON.stringify('[]'));
			}

			if(!buyItem && !goToCheckout){
				$.mobile.changePage("index.html", {transition: "none"});
			}
			
			else if(!buyItem && goToCheckout){
				$( "#popupLoginShop").popup( "close" );
				goToCheckout= false;
				$.mobile.changePage("check.html", {transition: "none"});
			}
		
			else{
				buyItem=false;
				$( "#popupLogin").popup( "close" );
				if(loginAccount.username == currentProduct.seller){
					var bid= $("#bid-name");
					var submit= $("#bid-offer");
					var update= $("#update-product");		
					bid.empty();
					submit.empty();
					update.empty();

					if(!isSale){
						var msg= '<input type="button" value= "List of Bids" onClick=GetBids('+currentProduct.id+') data-mini="true"/>';
						bid.append(msg).trigger('create');      

						var msg2= '<input type="submit" value="End Sale" onClick=EndSale('+currentProduct.id+') data-theme="a" data-mini="true"/>';
						submit.append(msg2).trigger('create');

						var updt= '<input type="submit" value="Update" onClick=UpdateProductForm('+currentProduct.id+') data-theme="a" data-mini="true"/>';
						update.append(updt).trigger('create');}

					if(isSale){
						var msg= '<input type="submit" id= "sale-other" value= "Sell another" data-mini="true"/>';
						bid.append(msg).trigger('create');

						var msg2= '<input type="submit" value="End Sale" onClick=EndSale('+currentProduct.id+') data-theme="a" data-mini="true"/>';
						submit.append(msg2).trigger('create');

						var updt= '<input type="submit" value="Update" onClick=UpdateProductForm('+currentProduct.id+') data-theme="a" data-mini="true"/>';
						update.append(updt).trigger('create');}									

					var shop= $("#shop-now");
					shop.empty();

					var buy= $("#buy-now");
					buy.empty();}
				else
				{
					var bid= $("#bid-name");
					bid.empty();

					if(!isSale){
						var msg= '<input type="text" id="bid-product" value= "'+lbid+'" placeholder="Make a bid" data-mini="true"/>';         
						bid.append(msg).trigger('create');}

					if(loginAccount.username != undefined){
						var submit= $("#bid-offer");	
						submit.empty();

						if(!isSale){
							var msg2= '<a><input type="submit" id= "submitBid1" value="Submit" data-theme="a" data-mini="true"/></a>';
							submit.append(msg2).trigger('create');}

						var shop= $("#shop-now");
						shop.empty();

						var buy= $("#buy-now");
						buy.empty();

						if(isSale){
							var msg3= '<a><input type="submit" id= "submitCart" value= "Add to Cart" onClick= SaveOrder(' + currentProduct.saleid + ') data-mini="true"/></a>';
							shop.append(msg3).trigger('create');

							var msg4= '<a><input type="submit" id= "purchase" value= "Buy it now" onClick= SaveOrder(' + currentProduct.saleid + ') data-mini="true"/></a>';
							buy.append(msg4).trigger('create');}

					}
				}
			}
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
		$.mobile.changePage("account.html", {transition: "none"});
	}

	else{
		$.ajax({
			url : "http://localhost:3412/Project1Srv/profiles/"+id,
			method: 'get',
			contentType: "application/json",
			dataType:"json",
			success : function(data, textStatus, jqXHR){
			profile= data.profile[0];
			sessionStorage.setItem("profile", JSON.stringify(profile));
			$.mobile.loading("hide");
			$.mobile.changePage("profile.html", {transition: "none"});
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

function SignUp(id){
	$.ajax({
		url : "http://localhost:3412/Project1Srv/accountsign/"+id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){

		if(data.accounts.length == 0){
			alert("Valid username. Account created.");}

		else{
			alert("Username in use. Try another one. ");
		}
	},
	error: function(data, textStatus, jqXHR){
		console.log("textStatus: " + textStatus);
		$.mobile.loading("hide");
		if (data.status == 404){
			alert("Sign up loading error.");
		}
		else {
			alert("Internal Server Error.");
		}
	}
	});
}

function GoAccount(){

	if(loginAccount.username!= undefined){

		$.mobile.changePage("account.html", {transition: "none"});

	}

	else{
		$.mobile.changePage("login.html", {transition: "none"});
	}
}

function GoMessages(){

	if(loginAccount.username!= undefined){

		$.mobile.changePage("message.html", {transition: "none"});

	}

	else{
		$.mobile.changePage("login.html", {transition: "none"});
	}
}
////// Product

var currentProduct= {};
var isSale= false;
function GetProduct(id){
	console.log("getting product");
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/products/"+ id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){

		currentProduct= data.product[0];

		//if (getCookie(currentProduct.id) == undefined) {
		//     setCookie(currentProduct.id, JSON.stringify('[]'));
		//}

		$.ajax({
			url : "http://localhost:3412/Project1Srv/sales-product/"+ id,
			method: 'get',
			contentType: "application/json",
			dataType:"json",
			success : function(data, textStatus, jqXHR){

			var result= data.sale;
			if(result.length != 0){
				isSale= true;
				currentProduct.quantity=result[0].quantity;
				currentProduct.isSale= true;
			}
			else{isSale=false; currentProduct.isSale=false;}
			sessionStorage.setItem("product", JSON.stringify(currentProduct));
			$.mobile.loading("hide");     
			$.mobile.changePage("item.html", {transition: "none"});
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
		});                                            
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


function Sortby(id){
	
	$( "#orderpop").popup( "close" );
	var sort= sessionStorage.getItem("search");
		
	if(sort == "true"){
		var term= sessionStorage.getItem("term");
		var all= allSearch;
	$.ajax({
		url : "http://localhost:3412/Project1Srv/sortbyterms/"+id+"/"+term+"/"+all,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
					currentCategoryProducts= data.productsortsearch;
					var productCat = currentCategoryProducts;
					var len =productCat.length;
					var list = $("#product-list");
					list.empty();

					if(len > 0){
						var item;
						for (var i=0; i < len; ++i){
							item =productCat[i];
							list.append("<li><a onClick=GetProduct("+item.id+")> <img src='"+ item.img+ "'/> " + item.prodname + "<h4>"+item.price+"<\h4></a></li>");
						}
					}

					else{

						var msg='<li><a data-rel=back data-role="button">No products</a></li>';
						list.append(msg);                        
					}

					list.listview("refresh");
		},                        
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Error sorting you terms.");
			}
			else {
				alert("Internal Server Error.");
			}
		}

		});
	}
	
	else{
	var catid= currentCategoryProducts[0].catid;
	var isParent= false;
	if(catid != undefined){

		$.ajax({
			url : "http://localhost:3412/Project1Srv/allProducts",
			method: 'get',
			contentType: "application/json",
			dataType:"json",
			success : function(data, textStatus, jqXHR){
			var products= data.products;

			for(var i=0; i < products.length; i++){
				if(products[i].parentid == catid){
					isParent= true;
				}
			}

			if(isParent){
				isParent= false;
				AllSortby(id);
			}

			else{
				$.ajax({
					url : "http://localhost:3412/Project1Srv/sortProducts/"+ id+"/"+catid,
					method: 'get',
					contentType: "application/json",
					dataType:"json",

					success : function(data, textStatus, jqXHR){
					currentCategoryProducts= data.productsIncategory;
					var productCat = currentCategoryProducts;
					var len =productCat.length;
					var list = $("#product-list");
					list.empty();

					if(len > 0){
						var item;
						for (var i=0; i < len; ++i){
							item =productCat[i];
							list.append("<li><a onClick=GetProduct("+item.id+")> <img src='"+ item.img+ "'/> " + item.prodname + "<h4>"+item.price+"<\h4></a></li>");
						}
					}

					else{

						var msg='<li><a data-rel=back data-role="button">No products</a></li>';
						list.append(msg);                        
					}

					list.listview("refresh");
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
				});}

		},                        
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("products not available.");
			}
			else {
				alert("Internal Server Error.");
			}
		}

		});}

	}
}

function AllSortby(id){

	var patid= currentCategoryProducts[0].catid;

	if(patid != undefined){
		$.ajax({
			url : "http://localhost:3412/Project1Srv/sortAllProducts/"+ id+"/"+patid,
			method: 'get',
			contentType: "application/json",
			dataType:"json",
			success : function(data, textStatus, jqXHR){
			currentCategoryProducts= data.productsIncategory;
			var productCat = currentCategoryProducts;
			var len =productCat.length;
			var list = $("#product-list");
			list.empty();

			if(len > 0){
				var item;
				for (var i=0; i < len; ++i){
					item =productCat[i];
					list.append("<li><a onClick=GetProduct("+item.id+")> <img src='"+ item.img+ "'/> " + item.prodname + "<h4>"+item.price+"<\h4></a></li>");
				}
			}

			else{

				var msg='<li><a data-rel=back data-role="button">No products</a></li>';
				list.append(msg);                        
			}

			list.listview("refresh");
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
		});}

}

//////// Shopping Cart

function UpdateShoppingCart(){
	alert("Account Saved!");
}

function DeleteShoppingCart(id){
	
		var decision = confirm("Delete Product?");
        if(decision == true) {

		/*$( "#popupShopDel").popup( "open" );
	
		$(document).on('click', '#deletecart', function() {

		var count= $( "#qtyproductcart").val();

		$( "#popupShopDel").popup( "close" );
		*/
		var ucar= {};
		if(loginAccount.accountid != undefined){
			ucart= loginAccount.accountid;
		}
		else{
			ucart= "guest";
			if(getCookie(ucart) == undefined){
				setCookie(ucart, JSON.stringify('[]'));
			}
		}

		var aid= ucart;
		var txt = $.parseJSON(getCookie(aid));
		var obj = eval('(' + txt + ')');

		var pid= obj[id].shoppingcart;
		var pos=[];

		for (var i=0; i< obj.length; i++){
			if(pid == obj[i].shoppingcart){
				pos.push(i);
			}
		}
		

			obj.splice(pos[0],1);
		
			var nextitem=JSON.stringify(obj);

			setCookie(ucart,JSON.stringify(nextitem));

			var txt = $.parseJSON(getCookie(ucart));
			var obj = eval('(' + txt + ')');

			if(saleList != undefined){
				var sales = saleList;
			}

			//alert(obj.length);
			var list = $("#myshopping-list");
			list.empty();

			var total = $("#total-shopping");
			total.empty();
	
			var len = obj.length;
			var totalPrice= 0.00;

			if(len != 0 && saleList != undefined){

				var len2 = sales.length;
				shoppingcartTotal=0;

				for(var i=0; i<len; i++) {

					var prod= obj[i].shoppingcart;
					//GetProduct(obj.shoppingcart[i].prodid);
					j = 0;
					while((prod != sales[j].prodid) && j < len2) {
						j++;
					}

					var count =0;
					var fposition=i;

					for(var n=0; n< len; n++){
						if(prod == obj[n].shoppingcart){
							count++;

							if(n < fposition){
								fposition= n;
							}

						}
					}

					var item;			
					item =sales[j];

					if(fposition == i){

						list.append("<li ><a onClick= GetProduct("+item.prodid+") > <img src='"+ item.imagelink+ "' style='margin: 0 0 0 20px; top: 20%'/>"+
								"<h3>"+item.prodname+"</h3><h2> Price: "+item.price + "</h2><h2> Qty: "+count+"</h2><a data-icon='delete' onClick=DeleteShoppingCart('"+i+"')>Delete</a></a></li>");

						var splitPrice= item.price.split("$");
						var price= splitPrice[1];
						var productPrice= parseFloat(price);
						totalPrice += count * productPrice;
			
					}
				}
						total.append("<li><h3>$"+ totalPrice+"</h3></li>");

			} 
			else{

				var msg='<li><a data-rel=back data-role="button">No products</a></li>';
				total.append("<li><h3> $ "+ totalPrice +"</h3></li>");
				list.append(msg);     
			}

			list.listview("refresh"); 
			total.listview("refresh");
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
		$.mobile.changePage("bids.html", {transition: "none"});
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

var shoppinglist= {};
function GetShoppingCart(id){

	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/shoppingcart/"+id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
		shoppinglist= data.shoppingcart;
		$.mobile.changePage("shopping.html", {transition: "none"});
	},                        
	error: function(data, textStatus, jqXHR){
		console.log("textStatus: " + textStatus);
		$.mobile.loading("hide");
		if (data.status == 404){
			alert("Shopping cart not available.");
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
		$.mobile.changePage("biduser.html", {transition: "none"});
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
var winningBids={};
function PurchaseUser(id){

	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/purchaseusers/"+id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
		purchases= data.purchaseuser;
		$.ajax({
		url : "http://localhost:3412/Project1Srv/winningbid/"+id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
		winningBids= data.winningbid;
		$.mobile.loading("hide");
		$.mobile.changePage("purchaseuser.html", {transition: "none"});
	},                        
	error: function(data, textStatus, jqXHR){
		console.log("textStatus: " + textStatus);
		$.mobile.loading("hide");
		alert("Internal Server Error.");
	}

	});
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
		$.mobile.changePage("saleuser.html", {transition: "none"});
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

function EndSale(pid){
	var formData = {id:pid};
	$.ajax({
		url : "http://localhost:3412/Project1Srv/updateDeactive",
		type: 'put',
		data : formData,
		success : function(data) {
		if(!isSale){
		var formData={auctionid: currentProduct.saleid, accountid: loginAccount.accountid, bidammmount: currentProduct.price};
		
		$.ajax({
			url : "http://localhost:3412/Project1Srv/choosewinning",
			type: 'get',
			data:formData,
			success : function(data) { 
				
				if(data.choosewinning.length != 0){
				formData.bid= data.choosewinning[0].bid;
				formData.bidder= data.choosewinning[0].bidder;				
				formData.receiverid= data.choosewinning[0].owner; 
				formData.senderid= 5;
				var id= formData.bidder;
				$.ajax({
					url:"http://localhost:3412/Project1Srv/creditinfo/"+id,
					type:'get',
					success: function(data){
						formData.creditid= data.creditinfo[0].creditid;
						$.ajax({
						url:"http://localhost:3412/Project1Srv/insertwinningbid",
						type:'post',
						data:formData,
						success: function(data){
						formData.subject="Auction: "+formData.auctionid; 
						formData.text="The winning bid of your auction on: "+ currentProduct.prodname+" has been placed with a total of: "+ formData.bidammmount+"." +
						"To accept this bid, check your auction status at Items bidding in your profile page. Have a good day!";
					$.ajax({
						url : "http://localhost:3412/Project1Srv/addmessage",
						type: 'post',
						data:formData,
						success : function(data) {
							if(loginAccount.accountid == formData.receiverid){
								currentProduct.choosewinningbid= true;
								sessionStorage.setItem("product", JSON.stringify(currentProduct));
								$.mobile.changePage("index.html");
							}
							

						},
	
					error: function(data, textStatus, jqXHR){
					console.log("textStatus: " + textStatus);
					alert("sending message to owner of auction unsuccessfull");}          	
					});	},
					
					error: function(data, textStatus, jqXHR){
					console.log("textStatus: " + textStatus);
					alert("insert winning bid unsuccessfull");}          	
					}); 
						
					},
					
					error: function(data, textStatus, jqXHR){
					console.log("textStatus: " + textStatus);
					alert("choosing credit info not successfull");}
				});
				}
					
				},
	
			error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("choosing winning bid not successfull");}          	
			});
		}
	},

	error: function(data, textStatus, jqXHR){
		console.log("textStatus: " + textStatus);
		alert("sale not ended!");}          	
	});
}

function UpdateProductForm(pid){
	$.mobile.changePage("uproduct.html", {transition: "none"});
}

//////// Category
var currentCategoryProducts = {};

function GetAllProducts(id){
	
	sessionStorage.setItem("search", false);
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/categoryAll/"+ id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
		currentCategoryProducts= data.allProducts;
		sessionStorage.setItem("allproducts", JSON.stringify(currentCategoryProducts));
		sessionStorage.setItem("allproductboolean", true);

		$.mobile.loading("hide");
		$.mobile.changePage("productview.html", {transition: "none"}, {
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
	
	sessionStorage.setItem("search", false);
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/categoryProducts/"+ id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
		currentCategoryProducts= data.productsIncategory;
		sessionStorage.setItem("products", JSON.stringify(currentCategoryProducts));
		sessionStorage.setItem("allproductboolean", false);

		$.mobile.loading("hide");
		$.mobile.changePage("productview.html", {transition: "none"}, {
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
		currentCategories= data.category;
		sessionStorage.setItem("categories", JSON.stringify(currentCategories));
		$.mobile.loading("hide");
		$.mobile.changePage("Categories.html", {transition: "none"});

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

function RankUser(info){
	$.mobile.loading("show");
	var formData = info;
	$.ajax({
		url : "http://localhost:3412/Project1Srv/rankuser/",
		type : 'post',
		dataType: 'json',
		data : formData,
		success: function(errorThrown, textStatus, jqXHR){
    		alert('Rank Submitted');
    		//AccountLogin(loginAccount.username, formDate.password);
    		sessionStorage.removeItem("profile");
    		GoProfile(formData.seller);
			$.mobile.changePage("profile.html", {transition: "none"});
  		},
  		error: function(jqXHR, textStatus, errorThrownn){
    		alert("Error 444: No response");
    		//alert(errorThrown + " " + textStatus + " " + jqXHR);
			$.mobile.changePage("index.html", {transition: "none"});
  		}
	});
	//$.mobile.changePage("userrank.html", {transition: "none"});                                     
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
		sessionStorage.setItem("subcategories", JSON.stringify(subCategories));
		$.mobile.loading("hide");
		$.mobile.changePage("subcategories.html", {transition: "none"});

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
var currentWinningList={};

function GetAuctions(){
	id= profile.accountid;
	if(id == undefined){
		id= loginAccount.accountid;
	}
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/auctions/"+ id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			
		currentAuctionList= data.userAuctions;		
		var id= loginAccount.accountid;
		$.ajax({
		url : "http://localhost:3412/Project1Srv/getwinningbids/"+id,
		type: 'get',
	    success : function(data) {

				currentWinningList= data.getwinningbids;
				$.mobile.loading("hide");
				$.mobile.changePage("uauctions.html");
				},
	
	    error: function(data, textStatus, jqXHR){
		console.log("textStatus: " + textStatus);
		alert("get winning bid unsuccessfull");}          	
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
	if(id == undefined){
		id= loginAccount.accountid;
	}
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
		$.mobile.changePage("usales.html", {transition: "none"}, {
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

var saleList = {};
function AllSales(){
	//id= profile.accountid;
	//alert(profile.accountid);
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/sales/",
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
		saleList= data.sales;
		sessionStorage.setItem("sales", JSON.stringify(saleList));
		$.mobile.loading("hide");
		var ucart={};
	
		if(loginAccount != undefined){
		ucart= loginAccount.accountid;
		$.mobile.changePage("shopping.html", {transition: "none"});
		}
	
		else{
			ucart= "guest";
			if(getCookie(ucart) == undefined){
          	  setCookie(ucart, JSON.stringify('[]'));
          	  $.mobile.changePage("shopping.html", {transition: "none"});
			}
		}
	},                        
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
		$.mobile.changePage("#history", {transition: "none"}, {
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

var inboxMessage = {};
function GetInbox(id){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/message-inbox/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
		inboxMessage = data.message;
		$.mobile.loading("hide");
		$.mobile.changePage("inbox.html", {transition: "none"});

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

var sentMessage = {};
function GetSent(id){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/message-sent/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
		sentMessage = data.message;
		$.mobile.loading("hide");
		$.mobile.changePage("sentMessages.html", {transition: "none"});

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

var viewMessage = {};
function GetMessage(id){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/message-view/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
		viewMessage = data.message;
		$.mobile.loading("hide");
		$.mobile.changePage("messageView.html", {transition: "none"});

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
	var user= $('#messageTo').val();
	var sub=$('#subject').val();
	var msg= $('#message').val();
	var formData = {username: user, subject: sub, text: msg, senderid: loginAccount.accountid};
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/accountid/" + user,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
		$.mobile.loading("hide");
		formData.receiverid = data.account.accountid;
		$.ajax({
			url : "http://localhost:3412/Project1Srv/addmessage",
			type: 'post',
			data : formData,
			success : function(data) {
			console.log("message sent");
			$.mobile.loading("hide");
			$.mobile.changePage("#sentMessages");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("message not sent!");}          	
		});

	},
	error: function(data, textStatus, jqXHR){
		console.log("textStatus: " + textStatus);
		$.mobile.loading("hide");
		if (data.status == 404){
			alert("username not found.");
		}
		else {
			alert("Internal Server Error.");
		}
	}
	});
	$.mobile.changePage("#sentMessages");
}

function DeleteMessageI(){

	for(var i=0; i< inboxToDelete.length; i++){

		var formData = {messageid: inboxToDelete[i], position:i};
		$.ajax({
			url : "http://localhost:3412/Project1Srv/deletembox",
			type: 'put',
			data : formData,
			success : function() {   
			console.log('message deleted');
			if(formData.position == (inboxToDelete.length-1)){
				var id= loginAccount.accountid;
				$.ajax({
					url : "http://localhost:3412/Project1Srv/message-inbox/" + id,
					method: 'get',
					contentType: "application/json",
					dataType:"json",
					success : function(data, textStatus, jqXHR){

					inboxMessage = data.message;
					var message = inboxMessage;
					var len =message.length;

					if(len==0){ 
						var list = $("#inbox-list");
						list.empty();
						var del = $("#deleteinbox");
						del.empty();
						var iname= $("#message");
						var msg= '<br><a data-rel="back"><center><h2>No messages to display.</h2><br> <img src="http://img43.imageshack.us/img43/6572/4v4.gif" /></center></a> ';
						iname.empty();
						iname.append(msg).trigger('create');}

					else{                 
						var list = $("#inbox-list");
						list.empty();
						var item;
						var style='style="position:absolute; top:40%; left: 15px"';
						for (var i=0; i < len; ++i){
							item =message[i];
							var checkbox='<div '+style+'><input type="checkbox" onClick=CheckMessage("'+item.messageid+'") /></div>';
							list.append("<li>"+checkbox+"<a onClick= GetMessage("+item.messageid+") style='margin: 0 0 0 30px;'> From: "+item.username + "<h4>Subject: "+ item.subject+"</h4><p> Date:"+item.date+" </p></a></li>");
						}
						list.listview("refresh");}               
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
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("message not deleted!");}          	
		});		
	}

}

function DeleteMessageS(){

	for(var i=0; i< outboxToDelete.length; i++){

		var formData = {messageid: outboxToDelete[i], position:i};
		$.ajax({
			url : "http://localhost:3412/Project1Srv/deletembox",
			type: 'put',
			data : formData,
			success : function() {   
			console.log('message deleted');
			if(formData.position == (outboxToDelete.length-1)){
				var id= loginAccount.accountid;
				$.ajax({
					url : "http://localhost:3412/Project1Srv/message-sent/" + id,
					method: 'get',
					contentType: "application/json",
					dataType:"json",
					success : function(data, textStatus, jqXHR){
					sentMessage = data.message;
					var message = sentMessage;
					var len =message.length;
					if(len==0){ 
						var iname= $("#message");
						var list = $("#sentMessage-list");
						list.empty();
						var del = $("#deleteoutbox");
						del.empty();
						var msg= '<br><a data-rel="back"><center><h2>No messages to display.</h2><br> <img src="http://img43.imageshack.us/img43/6572/4v4.gif" /></center></a> ';
						iname.empty();
						iname.append(msg).trigger('create');}

					else{                 
						var list = $("#sentMessage-list");
						list.empty();
						var item;
						var style='style="position:absolute; top:40%; left: 15px"';            
						for (var i=0; i < len; ++i){
							item =message[i];
							var checkbox='<div '+style+'><input type="checkbox" onClick=CheckMessageO("'+item.messageid+'") id="checkbox-0"/></div>';          
							list.append("<li>"+checkbox+"<a onClick= GetMessage("+item.messageid+") style='margin: 0 0 0 30px;'> To: "+item.receiver + "<h4>Subject:"+item.subject+"</h4><p> Date:"+item.date+" </p></a></li>");
						}
						list.listview("refresh");}  
				},
				error: function(data, textStatus, jqXHR){
					console.log("textStatus: " + textStatus);
					$.mobile.loading("hide");
					if (data.status == 404){
						alert("404 Message not found.");
					}
					else {
						alert("Internal Server Error.");
					}
				}
				});
			}
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("message not deleted!");}          	
		});		
	}
}

////// Order

function SaveOrder(id){

	var ucart={};

	if(loginAccount.accountid != undefined){
		ucart= loginAccount.accountid;
	}
	else{
		ucart= "guest";
		if(getCookie(ucart) == undefined){
			setCookie(ucart, JSON.stringify('[]'));
		}
	}

	var quantity= $('#pquantity').val();
	
	if(quantity == 0){
		alert("Please provide quantity.");
	}

	else if(quantity <= currentProduct.quantity && quantity != 0){
		var txt = $.parseJSON(getCookie(ucart));
		var obj = eval('(' + txt + ')');
		//alert(JSON.stringify(obj));
		//alert(obj[0].shoppingcart);
		var count=0;

		for(var i=0; i < obj.length; i++){
			if(obj[i].shoppingcart == currentProduct.id){
				count++;
			}
		}
		var total= parseInt(count)+parseInt(quantity);

		if(total <= currentProduct.quantity ){

			for(var j=0; j < quantity; j++){

				var sh = ('{"shoppingcart":"' + currentProduct.id + '"}');
				//alert(sh);
				var obj2= eval('(' + sh + ')');
				obj.push(obj2);
				//alert(JSON.stringify(obj));
				//alert(obj[1].shoppingcart);

				var nextitem=JSON.stringify(obj);
				//alert(nextitem);
				setCookie(ucart,JSON.stringify(nextitem));

			}

			//var txt2 = $.parseJSON(getCookie(loginAccount.accountid));
			//var obj2 = eval('(' + txt2 + ')');
			//alert(JSON.stringify(obj2));
			//$.mobile.navigate("shopping.html");
			$.mobile.changePage("addshopconfirm.html", {transition: "none"});

		}

		else{
			alert("Product already in shopping cart.");

		}
	}
	else{
		alert("Provide a valid quantity.");
	}
}

//////// Administrator

function AddCategory(){
	$.mobile.loading("show");
	var form = $("#category-form");
	var formData = form.serializeArray();
	$.ajax({
		url : "http://localhost:3412/Project1Srv/categories/",
		type: 'post',
		data : formData,
		success: function(data, textStatus, jqXHR){
    		alert("failure");
    		$.mobile.changePage("index.html", {transition: "none"});
  		},
  		error: function(jqXHR, textStatus, errorThrown){
  			alert('POST Completed');
			$.mobile.loading("hide");
			$.mobile.changePage("index.html", {transition: "none"});
    		
  		}
	});
}

function AddAccount(){
	$.mobile.loading("show");
	var form = $("#account-form");
	var formData = form.serializeArray();
	$.ajax({
		url : "http://localhost:3412/Project1Srv/accountscreated/",
		type: 'post',
		data : formData,
		success: function(errorThrown, textStatus, jqXHR){
    		alert('Account Created');
			$.mobile.loading("hide");
			$.mobile.changePage("login.html", {transition: "none"});
  		},
  		error: function(jqXHR, textStatus, data){
    		alert("Error 444: No response");
    		$.mobile.loading("hide");
			$.mobile.changePage("index.html", {transition: "none"});
  		}
	});
}

/*
function ChangePassword(){
	var form = $("#accountpass-form");
	var formData = form.serializeArray();
	//var pass= $("#upd-password").val();
	//var formData = {username: loginAccount.username, password: pass};
	//alert(formData.password);
*/

function ChangeFName(info){

	var formData = info;
	$.ajax({
		url : "http://localhost:3412/Project1Srv/accountfname/",
		method : 'put',
		dataType: 'json',
		data : formData,
		success: function(data){
    		alert('First Name Changed');
    		//alert(loginAccount.username);
    		//alert(loginAccount.apassword);
    		AccountLogin(loginAccount.username, loginAccount.apassword);
			$.mobile.changePage("index.html", {transition: "none"});
  		},
  		error: function(jqXHR, textStatus, errorThrownn){
    		alert("Error 444: No response");
    		//alert(errorThrown + " " + textStatus + " " + jqXHR);
			$.mobile.changePage("index.html", {transition: "none"});
  		}
	});
}

function ChangeLName(info){

	var formData = info;
	$.ajax({
		url : "http://localhost:3412/Project1Srv/accountlname/",
		method : 'put',
		dataType: 'json',
		data : formData,
		success: function(data){
    		alert('Last Name Changed');
    		AccountLogin(loginAccount.username, loginAccount.apassword);
			$.mobile.changePage("index.html", {transition: "none"});
  		},
  		error: function(jqXHR, textStatus, errorThrownn){
    		alert("Error 444: No response");
    		//alert(errorThrown + " " + textStatus + " " + jqXHR);
			$.mobile.changePage("index.html", {transition: "none"});
  		}
	});
}

function ChangeShipping(info){

	var formData = info;
	$.ajax({
		url : "http://localhost:3412/Project1Srv/accountshipping/",
		method : 'put',
		dataType: 'json',
		data : formData,
		success: function(data){
    		alert('Shipping Address Changed');
    		AccountLogin(loginAccount.username, loginAccount.apassword);
			$.mobile.changePage("index.html", {transition: "none"});
  		},
  		error: function(jqXHR, textStatus, errorThrownn){
    		alert("Error 444: No response");
    		//alert(errorThrown + " " + textStatus + " " + jqXHR);
			$.mobile.changePage("index.html", {transition: "none"});
  		}
	});
}

function ChangeBilling(info){

	var formData = info;
	$.ajax({
		url : "http://localhost:3412/Project1Srv/accountbilling/",
		method : 'put',
		dataType: 'json',
		data : formData,
		success: function(data){
    		alert('Billing Address Changed');
    		AccountLogin(loginAccount.username, loginAccount.apassword);
			$.mobile.changePage("index.html", {transition: "none"});
  		},
  		error: function(jqXHR, textStatus, errorThrownn){
    		alert("Error 444: No response");
    		//alert(errorThrown + " " + textStatus + " " + jqXHR);
			$.mobile.changePage("index.html", {transition: "none"});
  		}
	});
}

function ChangeCardNumber(info){

	var formData = info;
	$.ajax({
		url : "http://localhost:3412/Project1Srv/accountcardnumber/",
		method : 'put',
		dataType: 'json',
		data : formData,
		success: function(data){
    		alert('Card Number Changed');
    		AccountLogin(loginAccount.username, loginAccount.apassword);
			$.mobile.changePage("index.html", {transition: "none"});
  		},
  		error: function(jqXHR, textStatus, errorThrownn){
    		alert("Error 444: No response");
    		//alert(errorThrown + " " + textStatus + " " + jqXHR);
			$.mobile.changePage("index.html", {transition: "none"});
  		}
	});
}

function ChangeCardType(info){

	var formData = info;
	$.ajax({
		url : "http://localhost:3412/Project1Srv/accountcardtype/",
		method : 'put',
		dataType: 'json',
		data : formData,
		success: function(data){
    		alert('Card Type Changed');
    		AccountLogin(loginAccount.username, loginAccount.apassword);
			$.mobile.changePage("index.html", {transition: "none"});
  		},
  		error: function(jqXHR, textStatus, errorThrownn){
    		alert("Error 444: No response");
    		//alert(errorThrown + " " + textStatus + " " + jqXHR);
			$.mobile.changePage("index.html", {transition: "none"});
  		}
	});
}

function ChangeSecurity(info){

	var formData = info;
	$.ajax({
		url : "http://localhost:3412/Project1Srv/accountsecurity/",
		method : 'put',
		dataType: 'json',
		data : formData,
		success: function(data){
    		alert('Security Number Changed');
    		AccountLogin(loginAccount.username, loginAccount.apassword);
			$.mobile.changePage("index.html", {transition: "none"});
  		},
  		error: function(jqXHR, textStatus, errorThrownn){
    		alert("Error 444: No response");
    		//alert(errorThrown + " " + textStatus + " " + jqXHR);
			$.mobile.changePage("index.html", {transition: "none"});
  		}
	});
}

function ChangeExpDate(info){

	var formData = info;
	$.ajax({
		url : "http://localhost:3412/Project1Srv/accountexpdate/",
		method : 'put',
		dataType: 'json',
		data : formData,
		success: function(data){
    		alert('Expiration Date Changed');
    		AccountLogin(loginAccount.username, loginAccount.apassword);
			$.mobile.changePage("index.html", {transition: "none"});
  		},
  		error: function(jqXHR, textStatus, errorThrownn){
    		alert("Error 444: No response");
    		//alert(errorThrown + " " + textStatus + " " + jqXHR);
			$.mobile.changePage("index.html", {transition: "none"});
  		}
	});
}

function ChangeEmail(info){

	var formData = info;
	$.ajax({
		url : "http://localhost:3412/Project1Srv/accountemail/",
		method : 'put',
		dataType: 'json',
		data : formData,
		success: function(data){
    		alert('Email Changed');
    		AccountLogin(loginAccount.username, loginAccount.apassword);
			$.mobile.changePage("index.html", {transition: "none"});
  		},
  		error: function(jqXHR, textStatus, errorThrownn){
    		alert("Error 444: No response");
    		//alert(errorThrown + " " + textStatus + " " + jqXHR);
			$.mobile.changePage("index.html", {transition: "none"});
  		}
	});
}

function ChangeBank(info){

	var formData = info;
	$.ajax({
		url : "http://localhost:3412/Project1Srv/accountbank/",
		method : 'put',
		dataType: 'json',
		data : formData,
		success: function(data){
    		alert('Bank Account Changed');
    		AccountLogin(loginAccount.username, loginAccount.apassword);
			$.mobile.changePage("index.html", {transition: "none"});
  		},
  		error: function(jqXHR, textStatus, errorThrownn){
    		alert("Error 444: No response");
    		//alert(errorThrown + " " + textStatus + " " + jqXHR);
			$.mobile.changePage("index.html", {transition: "none"});
  		}
	});
}

function ChangePassword(info){

	var formData = info;
	$.ajax({
		url : "http://localhost:3412/Project1Srv/accountspassword/",
		method : 'put',
		dataType: 'json',
		data : formData,
		success: function(data){
    		alert('Password Changed');
    		//AccountLogin(loginAccount.username, formDate.password);
			$.mobile.changePage("index.html", {transition: "none"});
  		},
  		error: function(jqXHR, textStatus, errorThrownn){
    		alert("Error 444: No response");
    		//alert(errorThrown + " " + textStatus + " " + jqXHR);
			$.mobile.changePage("index.html", {transition: "none"});
  		}
	});
}

function DeleteAccount(info){

	var formData = info;
	$.ajax({
		url : "http://localhost:3412/Project1Srv/accountsdeleted/",
		method : 'put',
		dataType:"json",
		data : formData,
		success : function(data, textStatus, jqXHR) {
			$.mobile.loading("hide");
			$.mobile.changePage("index.html", {transition: "none"});
		},
		error: function(errorThrown, textStatus, jqXHR){
    		alert("Error 444: No response");
    		//alert(errorThrown + " " + textStatus + " " + jqXHR);
    		$.mobile.loading("hide");
			$.mobile.changePage("index.html", {transition: "none"});
  		}
	});
}
///// Bid

function InsertBid(id, ibid){

	var lbid= ibid;
	var aid= {};
	var cbid={};
	if(lbid > 0){

		$.mobile.loading("show");
		$.ajax({
			url : "http://localhost:3412/Project1Srv/auctionProd/" + id +"/"+lbid,
			method: 'get',
			contentType: "application/json",
			dataType:"json",
			success : function(data, textStatus, jqXHR){
			var result= data.auctionProd;
			if(result.length > 0){

				aid = data.auctionProd[0].auctionid;
				cbid= data.auctionProd[0].currentbid;

				var formData = {account: loginAccount.accountid, bid: lbid, auctionid: aid, currentbid:cbid};                           
				$.ajax({
					url : "http://localhost:3412/Project1Srv/addbid",
					type: 'post',
					dataType: 'json',
					data : formData,
					success : function(data){
					var bidid= data.addbid[0].bid;
					formData.ibid= bidid; //id of bid
					$.ajax({
						url : "http://localhost:3412/Project1Srv/updateMaxbid",
						type: 'put',
						data : formData,
						success : function(data) {
						currentProduct.price= data.updateMaxbid[0].currentbid;
						$.mobile.loading("hide");
						console.log("auction successfully submitted");
						BidUser(formData.account);
					},
					error: function(data, textStatus, jqXHR){
						console.log("textStatus: " + textStatus);
						alert("auction not submitted!");}          	
					});
				},
				error: function(data, textStatus, jqXHR){
					console.log("textStatus: " + textStatus);
					$.mobile.loading("hide");
					alert("bid not submitted!");
				}
				});}

			else{
				$.mobile.loading("hide");
				alert("Make an offer greater than the current bid!");
			}                  

		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Auction not found.");
			}
			else {
				alert("Internal Server Error.");
			}
		}
		});

	} 

	else {
		alert("Not a valid offer.");

	}           
	return false; 
}

//Search
var AllSearch=true;
function GetSearch(term){
	sessionStorage.setItem("search", true);
	sessionStorage.setItem("term", term);
	allSearch=true;
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/searchAll/"+ term,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
		currentCategoryProducts= data.searchresult;
		sessionStorage.setItem("products", JSON.stringify(currentCategoryProducts));
		sessionStorage.setItem("allproductboolean", false);
		$.mobile.loading("hide");
		$.mobile.changePage("productview.html", {transition: "none"}, {
			info: term,
		});},                        
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Error searching you terms.");
			}
			else {
				alert("Internal Server Error.");
			}
		}

	});
}

function GetSearchSub(term, id){
	sessionStorage.setItem("search", false);
	sessionStorage.setItem("term", term);
	allSearch= false;
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Project1Srv/searchSub/"+ term+"/"+id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
		currentCategoryProducts= data.searchresult;
		sessionStorage.setItem("products", JSON.stringify(currentCategoryProducts));
		sessionStorage.setItem("allproductboolean", false);
		$.mobile.loading("hide");
		$.mobile.changePage("productview.html", {transition: "none"}, {
			info: term,
		});},                        
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Error searching you terms.");
			}
			else {
				alert("Internal Server Error.");
			}
		}

	});
}
