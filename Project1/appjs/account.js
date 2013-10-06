function Account(cfName, clName, cAccountNumber, cEmail, cPassword, cUsername, cMailing, cBilling, ccCard, rank){
	this.cid = "";
	this.cfName = cfName;
	this.clName = clName;
	this.cAccountNumber = cAccountNumber;
	this.cEmail = cEmail;
	this.cPassword = cPassword;
	this.cUsername = cUsername;
	this.cMailing = cMailing;
	this.cBilling = cBilling;
	this.ccCard = ccCard;
	this.rank = rank;
	this.toJSON = toJSON;
}
