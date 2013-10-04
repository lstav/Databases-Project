module.exports = {
	Product: function Product(itemName, price, quantity, condition, location, shipping, payment, description, itemPage){
	this.id="";
	this.itemName = itemName;
	this.price = price;
	this.quantity = quantity;
	this.condition = condition;
	this.shipping = shipping;
	this.payment = payment;
	this.description= description;
	this.itemPage= itemPage;
	}
}