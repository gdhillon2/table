create table shoppingItems (
    itemID serial PRIMARY KEY,
    item varchar(255) NOT NULL,
    amount varchar(255) DEFAULT '1',
    created date DEFAULT current_date
);

create table users (
  username varchar(255) primary key,
  hashed_password varchar(255)
);

insert into shoppingItems (item) values ('test_item0');
insert into shoppingItems (item) values ('test_item1');
insert into shoppingItems (item) values ('test_item2');
insert into users (username, hashed_password) values ('test_user', 'test_pass');
