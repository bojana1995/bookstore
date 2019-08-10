-- role
insert into role(id, name) values (1, 'admin');
insert into role(id, name) values (2, 'visitor');


-- permisson
insert into permission(id, name) values (1, 'permission1');


-- role_permission
insert into role_permission(id_role, id_permission) values (1, 1);
insert into role_permission(id_role, id_permission) values (2, 1);


-- book
insert into book(id, author, description, price, publisher, publishing_year, title, id_shopping_cart)
values(1, 'Antoan De Sent Egziperi', 'Neverovatna prica o decaku koji se sprijateljio sa ruzom.', 849.99, 'Vulkan izdavastvo', 2010, 'Mali princ', null);


-- shopping_cart
insert into shopping_cart(id) values (1);


-- myUser
-- email: admin@email.com; lozinka: lozinka@L123
-- trenutno: a, a :D
insert into my_user(id, activated_account, address, email, name, password, phone, surname, user_type, id_role, id_shopping_cart) 
values (1, 1, 'Safarikova 17b', 'qlTICniImOpK2yb+6KMioA==', 'Adminko', '$2a$10$5AYDJF/7JuhrYDoluKeDxejdk0qccGp5UwtnTwTnKvVeQzO0oQnd.', '0602498385', 'Adminic', 'ADMIN', 1, 1);