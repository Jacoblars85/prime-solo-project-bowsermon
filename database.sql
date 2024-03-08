DROP TABLE IF EXISTS user_inventory;

DROP TABLE IF EXISTS user_characters;

DROP TABLE IF EXISTS "user";

DROP TABLE IF EXISTS levels;

DROP TABLE IF EXISTS items;

DROP TABLE IF EXISTS characters;

DROP TABLE IF EXISTS basic_attacks;



CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (16) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
	"coins" INT DEFAULT 30,
	"level_1_completed" BOOLEAN DEFAULT FALSE,
	"level_2_completed" BOOLEAN DEFAULT FALSE,
	"level_3_completed" BOOLEAN DEFAULT FALSE,
	"level_4_completed" BOOLEAN DEFAULT FALSE,
	"level_5_completed" BOOLEAN DEFAULT FALSE,
	"level_6_completed" BOOLEAN DEFAULT FALSE,
	"level_7_completed" BOOLEAN DEFAULT FALSE,
	"level_8_completed" BOOLEAN DEFAULT FALSE,
	"level_9_completed" BOOLEAN DEFAULT FALSE,
	"level_10_completed" BOOLEAN DEFAULT FALSE,
	"credit_video_completed" BOOLEAN DEFAULT FALSE,
	"secret_level_1_completed" BOOLEAN DEFAULT FALSE,
	"secret_level_2_completed" BOOLEAN DEFAULT FALSE
);

	
CREATE TABLE "characters" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(20),
	"profile_pic" VARCHAR(100),
	"hp" INT,
	"stamina" INT,
	"speed" INT,
	"unique_attack" VARCHAR(50),
	"unique_damage" INT,
	"unique_stamina" INT,
	"battle_pic" VARCHAR(100));
	
CREATE TABLE "items" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(100),
	"type" VARCHAR(100),
	"hp" INT,
	"stamina" INT, 
	"speed" INT,
	"attack" INT,
	"pic" VARCHAR(100),
	"cost" INT,
	"color" VARCHAR(25));
	
	
CREATE TABLE "user_characters" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL REFERENCES "user",
	"character_id" INT NOT NULL REFERENCES "characters",
	"starter_1" BOOLEAN DEFAULT FALSE,
	"starter_2" BOOLEAN DEFAULT FALSE,
	"starter_3" BOOLEAN DEFAULT FALSE,
	"new" BOOLEAN DEFAULT TRUE,
	"item" INT DEFAULT NULL REFERENCES "items");
	
	
CREATE TABLE "basic_attacks" (
	"id" SERIAL PRIMARY KEY,
	"attack" VARCHAR(10),
	"damage" INT,
	"stamina" INT);
	
	
CREATE TABLE "levels" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(20),
	"enemy_id" INT NOT NULL REFERENCES "characters");
	
	
CREATE TABLE "user_inventory" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL REFERENCES "user",
	"items_id" INT NOT NULL REFERENCES "items",
	"number" INT);
	
	
	

INSERT INTO "characters" 
	("name", "profile_pic", "hp", "stamina", "speed", "unique_attack", "unique_damage", "unique_stamina", "battle_pic")
	VALUES 
	('Goomba', 'images/Masthead_Goomba.png', 30, 50, 80, 'charge', 40, 10, 'images/Masthead_Goomba.png'),
	('Koopa Troopa', 'images/koopaTroopaProfilePic.webp', 60, 50, 55, 'shell smash', 35, 20, 'images/koopaTroopaBattlePic.webp'),
	('Dry Bones', 'images/Drybones.webp', 50, 50, 50, 'bone swing', 50, 20, 'images/Drybones.webp'),
	('Shy Guy', 'images/ShyGuyProfilePic.webp', 85, 20, 10, 'slap', 55, 15, 'images/shyGuyBattlePic.webp'),
	('Boo', 'images/BooProfilePic.webp', 40, 60, 60, 'lick', 50, 20, 'images/BooProfilePic.webp'),
	('Hammer Bro', 'images/hammerBroProfilePic.webp', 55, 60, 50, 'hammer bash', 45, 25, 'images/Hammer_BroBattlePic.webp'),
	('Chain Chomp', 'images/ChainChompProfilePic.webp', 20, 25, 65, 'bite', 65, 25, 'images/chainChompBattlePic2.png'),
	('Roy', 'images/RoyProfilePic.webp', 55, 25, 20, 'large pipe', 75, 15, 'images/RoyBattlePic.webp'),
	('Morton', 'images/MortonProfilePic.webp', 100, 25, 5, 'body slam', 45, 20, 'images/MortonBattlePic.webp'),
	('Toad', '', 100, 55, 70, 'headbutt', 12, 10, 'images/Toad_Portal.webp'),
	('Toadett', '', 160, 50, 60, 'slap', 15, 10, 'images/ToadetteBattlePic.png'),
	('Toadsworth', '', 180, 40, 30, 'cane wack', 17, 15, 'images/ToadsworthBattlePic.webp'),
	('Diddy Kong', '', 170, 50, 85, 'banana shot', 55, 10, 'images/diddyKongBattleKong.webp'),
	('Rosalina', '', 190, 40, 60, 'ice blast', 32, 10, 'images/RosalinaBattlePic.webp'),
	('Daisy', '', 210, 50, 50, 'arm bar', 50, 10, 'images/daisyBattlePic.png'),
	('Yoshi', '', 220, 60, 75, 'stomp', 20, 10, 'images/YoshiBattlePic.webp'),
	('Donkey Kong', '', 270, 50, 10, 'giant punch', 35, 20, 'images/donkeyKongBattlePic.webp'),
	('Luigi', '', 160, 100, 80, 'punch', 50, 25, 'images/LuigiBattlePic.png'),
	('Mario', '', 250, 150, 50, 'upper cut', 32, 25, 'images/MarioBattlePic.png'),
	('Waluigi', '', 180, 100, 100, 'stab', 35, 10, 'images/waluigiBattlePic.webp'),
	('Wario', '', 280, 55, 10, 'belly flop', 35, 10, 'images/warioBattlePic.png'); 
	
INSERT INTO "basic_attacks" 
	("attack", "damage", "stamina")
	VALUES 
	('kick', 5, 5),
	('poke', 1, 1);
	
	
INSERT INTO "levels" 
	("name", "enemy_id")
	VALUES 
	('bowser lands', 10),
	('bowser lands', 11),
	('outside forest', 12),
	('forest', 13),
	('mountain', 14),
	('bridge', 15),
	('mountain', 16),
	('lake', 17),
	('lake', 18),
	('peach castle', 19),
	('wario berg', 20),
	('wario skull', 21);
	
	
INSERT INTO "items" 
	("name", "type", "hp", "stamina", "speed", "attack", "pic", "cost", "color")
	VALUES 
	('healing mushroom', 'consumable', 25, 0, 0, 0, 'images/redMushroomPic.webp', 10, '#FF0100'),
	('stamina mushroom', 'consumable', 0, 30, 0, 0, 'images/greenMushroomPic.webp', 10, '#00D400'),
	('max mushroom', 'consumable', 20, 25, 0, 0, 'images/megaMushroomPic.webp', 40, '#FFD42A'),
	('mega healing mushroom', 'consumable', 80, 0, 0, 0, 'images/bigRedMushroomPic.webp', 75, '#FF0100'),
	('super star', 'consumable', 50, 50, 0, 0, 'images/starPic.webp', 100, '#FEF202'),
	('shield', 'held', 20, 0, 0, 0, 'images/linkShieldPic.png', 150, '#000000'),
	('boots', 'held', 0, 0, 10, 0, 'images/bootsPic.webp', 100, '#000000'),
	('hammer', 'held', 0, 0, 0, 10, 'images/hammerPic.png', 150, '#000000'),
	('boomarang', 'held', 0, 0, 0, 5, 'images/boomarangPic.webp', 100, '#000000');








