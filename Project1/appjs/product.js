function Product(price, quantity, condition, location, shipping, payment, description){
	this.id = "";
	this.price = price;
	this.quantity = quantity;
	this.condition = condition;
	this.shipping = shipping;
	this.payment = payment;
	this.description= description;
	this.toJSON = toJSON;
}