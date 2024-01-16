
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- CREATE TABLE "user" (
--     "id" SERIAL PRIMARY KEY,
--     "username" VARCHAR (80) UNIQUE NOT NULL,
--     "password" VARCHAR (1000) NOT NULL
-- );

DROP TABLE IF EXISTS user_inventory;


DROP TABLE IF EXISTS user_characters;


DROP TABLE IF EXISTS "user";


DROP TABLE IF EXISTS levels;


DROP TABLE IF EXISTS items;


DROP TABLE IF EXISTS characters;


DROP TABLE IF EXISTS basic_attacks;



CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
	"coins" INT DEFAULT 30,
	"level_1_completed" BOOLEAN DEFAULT FALSE,
	"level_2_completed" BOOLEAN DEFAULT FALSE,
	"level_3_completed" BOOLEAN DEFAULT FALSE,
	"level_4_completed" BOOLEAN DEFAULT FALSE,
	"level_5_completed" BOOLEAN DEFAULT FALSE
);

	
CREATE TABLE "characters" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(20),
	"profile_pic" VARCHAR(100),
	"hp" INT,
	"stamina" INT,
	"unique_attack" VARCHAR(50),
	"unique_damage" INT,
	"unique_stamina" INT,
	"battle_pic" VARCHAR(100));
	
	
CREATE TABLE "user_characters" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL REFERENCES "user",
	"character_id" INT NOT NULL REFERENCES "characters",
	"starter_1" BOOLEAN DEFAULT FALSE,
	"starter_2" BOOLEAN DEFAULT FALSE,
	"new" BOOLEAN DEFAULT TRUE);
	
	
CREATE TABLE "basic_attacks" (
	"id" SERIAL PRIMARY KEY,
	"attack" VARCHAR(10),
	"damage" INT,
	"stamina" INT);
	
	
CREATE TABLE "levels" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(20),
	"enemy_id" INT NOT NULL REFERENCES "characters");
	

CREATE TABLE "items" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(100),
	"hp" INT,
	"stamina" INT, 
	"pic" VARCHAR(100));
	
	
CREATE TABLE "user_inventory" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL REFERENCES "user",
	"items_id" INT NOT NULL REFERENCES "items",
	"number" INT);
	
	
	

INSERT INTO "characters" 
	("name", "profile_pic", "hp", "stamina", "unique_attack", "unique_damage", "unique_stamina", "battle_pic")
	VALUES 
	('Goomba', 'images/Masthead_Goomba.png', 50, 25, 'charge', 10, 10, 'images/Masthead_Goomba.png'),
	('Koopa Troopa', 'images/koopaTroopaProfilePic.webp', 50, 20, 'shell smash', 30, 20, 'images/koopaTroopaBattlePic.webp'),
	('Dry Bones', 'images/Drybones.webp', 50, 50, 'bone swing', 35, 35, 'images/Drybones.webp'),
	('Shy Guy', 'images/ShyGuyProfilePic.webp', 75, 25, 'slap', '35', 15, 'images/shyGuyBattlePic.webp'),
	('Boo', 'images/BooProfilePic.webp', 75, 25, 'lick', 70, 20, 'images/BooProfilePic.webp'),
	('Hammer Bro', 'images/hammerBroProfilePic.webp', 45, 60, 'hammer bash', 30, 25, 'images/Hammer_BroBattlePic.webp'),
	('Chain Chomp', 'images/ChainChompProfilePic.webp', 20, 25, 'bite', 80, 20, 'images/chainChompBattlePic2.png'),
	('Toad', '', 20, 15, 'headbutt', 10, 10, 'images/Toad_Portal.webp'),
	('Toadett', '', 30, 50, 'punch', 10, 10, 'images/ToadetteBattlePic.png'),
	('Yoshi', '', 50, 50, 'stomp', 20, 10, 'images/YoshiBattlePic.webp'),
	('Luigi', '', 75, 50, 'punch', 70, 10, 'images/LuigiBattlePic.png'),
	('Mario', '', 100, 50, 'upper cut', 70, 10, 'images/MarioBattlePic.png');

	
	
INSERT INTO "basic_attacks" 
	("attack", "damage", "stamina")
	VALUES 
	('kick', 5, 5),
	('poke', 1, 1);
	
	
INSERT INTO "levels" 
	("name", "enemy_id")
	VALUES 
	('bowser lands', 8),
	('forest', 9),
	('clouds', 10),
	('grassy land', 11),
	('peach castle', 12);
	
	
INSERT INTO "items" 
	("name", "hp", "stamina", "pic")
	VALUES 
	('health pot', 25, 0, 'images/healthPotion.png'),
	('stamina pot', 0, 30, 'images/staminaPotion.png'),
	('max pot', 20, 25, 'images/maxPotion.png');
	


