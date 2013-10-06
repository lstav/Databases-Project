function Account(afName, alName, aAccountNumber, aEmail, aPassword, aUsername, aShipping, aBilling, acCard, rank){
	this.aid = "";
	this.afName = afName;
	this.alName = alName;
	this.aAccountNumber = aAccountNumber;
	this.aEmail = aEmail;
	this.aPassword = aPassword;
	this.aUsername = aUsername;
	this.aShipping = aShipping;
	this.aBilling = aBilling;
	this.acCard = acCard;
	this.rank = rank;
	this.toJSON = toJSON;
}
