CREATE TABLE accounts
(
  aid bigserial,
  aUsername varchar(30) NOT NULL,
  afName varchar(30) NOT NULL,
  alName varchar(30) NOT NULL,
  aEmail varchar(60) NOT NULL,
  aPassword varchar(100) NOT NULL,
  rank varchar(4),
  aShippingid bigint NOT NULL,
  aBillingid bigint NOT NULL,
  aDepositid bigint NOT NULL,
  acCard varchar(20) NOT NULL,
  isadmin boolean NOT NULL,
  PRIMARY KEY (aid)
)