module.exports =  { 
	Account : function (afName, alName, aAccountNumber, aEmail, aPassword, aUsername, aMailing, aBilling, acCard, rank){
		this.aid = "";
		this.afName = afName;
		this.alName = alName;
		this.aAccountNumber = aAccountNumber;
		this.aEmail = aEmail;
		this.aUsername = aUsername;
		this.aPassword = aPassword;
		this.aMailing = aMailing;
		this.aBilling = aBilling;
		this.acCard = acCard;
		this.rank = rank;
	}
}
