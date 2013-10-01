function Account(customerName, accountNumber, mailingAddress, billingAddress, creditCard, rank){
	this.id = "";
	this.customerName = customerName;
	this.accountNumber = accountNumber;
	this.mailingAddress = mailingAddress;
	this.billingAddress = billingAddress;
	this.creditCard = creditCard;
	this.rank = rank;
	this.toJSON = toJSON;
}
