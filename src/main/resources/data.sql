-- role
insert into role(id, name) values (1, 'ADMIN');
insert into role(id, name) values (2, 'VISITOR');


-- permisson
insert into permission(id, name) values (1, 'permission1');


-- role_permission
insert into role_permission(id_role, id_permission) values (1, 1);
insert into role_permission(id_role, id_permission) values (2, 1);


-- book
insert into book(id, author, description, price, publisher, publishing_year, title, id_shopping_cart)
values(1, 'Antoan De Sent Egziperi', 'An amazing story about a boyfriend who befriended a rose.', 849, 'MagicBook publishing', 2010, 'The little prince', null);
insert into book(id, author, description, price, publisher, publishing_year, title, id_shopping_cart)
values(2, 'Ivo Andric', 'The writer discharges the current mood, seeing an occurrence, personality, impression from the path or thought that preoccupies him.', 489, 'Delfi publishing', 2017, 'Road signs', null);
insert into book(id, author, description, price, publisher, publishing_year, title, id_shopping_cart)
values(3, 'Henrih Sjenkjevic', 'An adventure novel that follows the perilous journey of two young men through the wild African deserts and rainforests.', 1475, 'Code publishing', 2009, 'Through the desert and the rainforest', null);


-- shopping_cart
insert into shopping_cart(id) values(1);
insert into shopping_cart(id) values(2);
insert into shopping_cart(id) values(3);
insert into shopping_cart(id) values(4);


-- myUser
-- admin@email.com; lozinka@L123
insert into my_user(id, activated_account, address, email, name, password, phone, surname, user_type, id_role, id_shopping_cart) 
values (1, 1, 'Safarikova 17b', 'qlTICniImOpK2yb+6KMioA==', 'Admin', '$2a$10$5AYDJF/7JuhrYDoluKeDxejdk0qccGp5UwtnTwTnKvVeQzO0oQnd.', '0602498385', 'Admin', 'ADMIN', 1, 1);
-- markomarkovic@email.com; marko@M123
insert into my_user(id, activated_account, address, email, name, password, phone, surname, user_type, id_role, id_shopping_cart) 
values (2, 1, 'Hilton avenue 3708', 'sScEtadQfv70RoVzlEQrRN+mgPwaIE4C/Y8kl+Zf6vk=', 'Marko', '$2a$10$y47ErAahzPLbi8G5Fs12UeGIV/MJK0LSrNhe3OlamxVusSBLGGtrm', '0630321587', 'Markovic', 'VISITOR', 2, 2);
-- petarpetrovic@email.com; petar@P123
insert into my_user(id, activated_account, address, email, name, password, phone, surname, user_type, id_role, id_shopping_cart) 
values (3, 1, 'First Street 53792', 'fNPQ72cDsRGrD0/Ll7ca9lACsAbjY/pe+FiCoSH+Qtg=', 'Petar', '$2a$10$wi2eHxEK6jMNdxkx1701R.33bpbkgBknTq1ah4jORj3mKcQe7wIMK', '0640751193', 'Petrovic', 'VISITOR', 2, 3);
-- nikolanikolic@email.com; nikola@N123
insert into my_user(id, activated_account, address, email, name, password, phone, surname, user_type, id_role, id_shopping_cart) 
values (4, 1, 'Park Maddison Square 13626', 'vJ95rkPEqJKWRyJJZAViivPz3cLGgcK1CQlxVrH5wj4=', 'Nikola', '$2a$10$Qc4bo7aV6Pl1Gr.B3uyHn.bSWuiGGZUSig3KevfbyM3ABqZ/xkID2', '0659072815', 'Nikolic', 'VISITOR', 2, 4);


-- message