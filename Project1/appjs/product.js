function Product(itemName, price, quantity, condition, location, shipping, payment, description, img){
	this.id="";
	this.itemName = itemName;
	this.price = price;
	this.quantity = quantity;
	this.condition = condition;
	this.shipping = shipping;
	this.payment = payment;
	this.description= description;
	this.img= img;
	this.toJSON = toJSON;
}
