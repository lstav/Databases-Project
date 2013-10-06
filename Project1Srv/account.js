module.exports =  { 
	Account : function (cfName, clName, cAccountNumber, cEmail, cPassword, cUsername, cMailing, cBilling, ccCard, rank){
		this.cid = "";
		this.cfName = cfName;
		this.clName = clName;
		this.cAccountNumber = cAccountNumber;
		this.cEmail = cEmail;
		this.cUsername = cUsername;
		this.cPassword = cPassword;
		this.cMailing = cMailing;
		this.cBilling = cBilling;
		this.ccCard = ccCard;
		this.rank = rank;
	}
}
