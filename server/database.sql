create table shoppingItems (
    itemID serial PRIMARY KEY,
    item varchar(255) NOT NULL,
    amount varchar(255) DEFAULT '1',
    created date DEFAULT current_date
);

insert into shoppingItems (item) values ('test_item0');
insert into shoppingItems (item) values ('test_item1');
insert into shoppingItems (item) values ('test_item2');
