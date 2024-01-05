
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- CREATE TABLE "user" (
--     "id" SERIAL PRIMARY KEY,
--     "username" VARCHAR (80) UNIQUE NOT NULL,
--     "password" VARCHAR (1000) NOT NULL
-- );

DROP TABLE IF EXISTS completed_levels;


--DROP TABLE IF EXISTS level_characters;


DROP TABLE IF EXISTS user_characters;


DROP TABLE IF EXISTS "user";


DROP TABLE IF EXISTS levels;


DROP TABLE IF EXISTS characters;


DROP TABLE IF EXISTS basic_attacks;



CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
	"coins" INT default 30
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
	"starter" BOOLEAN DEFAULT FALSE);
	
	
CREATE TABLE "basic_attacks" (
	"id" SERIAL PRIMARY KEY,
	"attack" VARCHAR(10),
	"damage" INT,
	"stamina" INT);
	
	
CREATE TABLE "levels" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(20),
	"enemy_id" INT NOT NULL REFERENCES "characters");
	
	
CREATE TABLE "completed_levels" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL REFERENCES "user",
	"level_id" INT NOT NULL REFERENCES "levels",
	"complete" BOOLEAN DEFAULT FALSE);
	
	
	

INSERT INTO "characters" 
	("name", "profile_pic", "hp", "stamina", "unique_attack", "unique_damage", "unique_stamina", "battle_pic")
	VALUES 
	('Goomba', 'images/Masthead_Goomba.png', 50, 25, 'charge', 10, 10, 'images/Masthead_Goomba.png'),
	('Koopa Troopa', 'images/KoopaTroopa_MP9.webp', 50, 20, 'shell smash', 30, 20, ''),
	('Dry Bones', 'images/Drybones.webp', 50, 50, 'bone swing', 35, 35, ''),
	('Sly Guy', 'images/ShyGuyProfilePic.webp', 75, 25, 'slap', '35', 15, ''),
	('Boo', 'images/BooProfilePic.webp', 75, 25, 'lick', 70, 20, 'images/BooProfilePic.webp'),
	('Hammer Bro', 'images/hammerBroProfilePic.webp', 45, 60, 'hammer bash', 30, 25, 'images/Hammer_BroBattlePic.webp'),
	('Chain Chomp', 'images/ChainChompProfilePic.webp', 20, 25, 'bite', 80, 20, 'images/ChainChompBatllePic.webp'),
	('Toad', '', 20, 0, 'headbutt', 10, 0, 'images/Toad_Portal.webp'),
	('Toadett', '', 30, 0, 'punch', 10, 0, 'images/ToadetteBattlePic.png'),
	('Yoshi', '', 50, 0, 'stomp', 20, 0, 'images/YoshiBattlePic.webp'),
	('Luigi', '', 75, 0, 'punch', 70, 0, 'images/LuigiBattlePic.png'),
	('Mario', '', 100, 0, 'upper cut', 70, 0, 'images/MarioBattlePic.png');


--	('Wario', '', 100, 0, 'belly flop', 70, 0, ''),



	
	
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