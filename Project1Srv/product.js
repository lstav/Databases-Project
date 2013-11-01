module.exports = {
	Product: function Product(itemname, price, quantity, condition, location, shipping, payment, description, img){
	this.id="";
	this.itemname = itemname;
	this.price = price;
	this.quantity = quantity;
	this.condition = condition;
	this.shipping = shipping;
	this.payment = payment;
	this.description= description;
	this.img= img;
	}
}