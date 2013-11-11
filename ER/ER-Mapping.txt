1
create table category(
catId bigserial primary key, 
catName varchar(15) NOT NULL, 
parentID bigint)

2
create table address(
addressId bigserial primary key, 
address varchar(100))

3
create table depositaccount(
depositaccountId bigserial primary key,
bankaccountnumber varchar(17), 
bankrouting varchar(9))

4
create table account(
accountId bigserial primary key, 
username varchar(20) not null, 
fname varchar(20) not null, 
lname varchar(20) not null, 
email varchar(30) not null, 
apassword varchar(16) not null, 
rank int not null, 
shippingId bigint, 
billingId bigint, 
depositId bigint, 
isAdmin boolean, 
foreign key(shippingId) references address (addressId),
foreign key(billingId) references address (addressId),
foreign key(depositId) references depositaccount(depositaccountId))

5
create table creditcard(
creditId bigserial primary key, 
addressId bigint,
cardtype varchar(20) not null, 
cardnumber varchar(20) not null, 
securitynumber varchar(4) not null, 
expdate char(5) not null,
foreign key(addressID) references Address (addressId))

6
create table product(
productId bigserial primary key, 
catId bigint,
prodName varchar(80) not null, 
condition varchar(4) not null, 
description varchar(160) not null, 
imagelink varchar(255), 
foreign key(catId) references category (catId))

7
create table auction(
auctionId bigserial primary key, 
accountId bigint,
prodId bigint, 
startingBid money not null, 
startdate timestamp not null,
enddate timestamp not null, 
foreign key(accountId) references account (accountId),
foreign key(prodId) references product (productId))

8
create table bid(
bId bigserial primary key, 
accountId bigint,
auctionId bigint,
bdate timestamp not null, 
bammmount money not null,
foreign key(accountId) references account (accountId),
foreign key(auctionId) references auction (auctionId))

9
create table sale(
saleId bigserial primary key, 
accountId bigint,
prodId bigint, 
starttime timestamp not null, 
endtime timestamp not null, 
price money not null, 
totalquantity int not null,
Ended boolean not null default false,
foreign key(accountId) references account (accountId),
foreign key(prodId) references product (productId))

10
create table winningbid(
bId bigserial primary key, 
accountId bigint,
auctionId bigint, 
bidDate timestamp not null, 
bidammount money not null,
foreign key(accountId) references account (accountId),
foreign key(auctionId) references auction (auctionId))

11
create table message(
messageId bigserial primary key, 
senderId bigint,
receiverId bigint, 
subject charvar(50) default'(No Subject)', 
text varchar(150) not null,
date timestamp not null, 
foreign key(senderId) references account (accountId),
foreign key(receiverId) references account (accountId))

12
create table rank(
rankId bigserial primary key, 
accountId bigint, 
buyerId bigint,
stars int not null,
foreign key(accountId) references account (accountId),
foreign key(buyerId) references account (accountId))

13
CREATE TABLE checkout
(
  checkoutid bigserial NOT NULL PRIMARY KEY,
  creditid bigint NOT NULL,
  invid bigint NOT NULL,
  totalprice money NOT NULL,
  saleid bigint NOT NULL,
  quantity integer DEFAULT 1,
  FOREIGN KEY (creditid) REFERENCES creditcard (creditid)
  FOREIGN KEY (invid) REFERENCES invoice (invoiceid)
  FOREIGN KEY (saleid) REFERENCES sale (saleid)
)

14
CREATE TABLE invoice
(
  invoiceid bigserial NOT NULL PRIMARY KEY,
  buyerid bigint NOT NULL,
  date date NOT NULL,
  FOREIGN KEY (buyerid) REFERENCES account (accountid)
)
