DROP TABLE IF EXISTS Posters;
DROP TABLE IF EXISTS GamePlatforms;
DROP TABLE IF EXISTS BookSubjects;
DROP TABLE IF EXISTS PosterCategories;
DROP TABLE IF EXISTS Cart;
DROP TABLE IF EXISTS Posts;
-- DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS ProductCategories;
DROP TABLE IF EXISTS Users;



CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    authId TEXT,
    name TEXT,
    imageURL TEXT
    -- profileURL TEXT
);
-- INSERT INTO Users (username, password, authId, name, imageURL) VALUES
-- ('a',      'b',        null, 'A',               null),
-- ('b',      'c',        null, 'Carry',           ''),
-- ('Goku',   'dbz',      null, 'Son Goku',        'https://i.pinimg.com/736x/ed/1d/73/ed1d7355a9bb9460f4085b5ef695740f.jpg'),
-- ('Ichigo', 'bleach',   null, 'Ichigo Kurosaki', 'https://pbs.twimg.com/profile_images/640284910326972416/IOChu2E1_400x400.jpg'),
-- ('Luffy',  'onepiece', null, 'Monkey D. Luffy', 'https://vignette.wikia.nocookie.net/onepiece/images/6/61/Estatua_de_cera_de_Luffy.png/revision/latest?cb=20121231203632&path-prefix=es');



CREATE TABLE Posts (
    id SERIAL PRIMARY KEY,
    title TEXT,
    text TEXT,
    datePosted TEXT,
    userId INTEGER REFERENCES Users (id),
    imageURL TEXT
);
INSERT INTO Posts (title, text, datePosted, userId, imageURL) VALUES
('Leap of Faith',       'A grasshopper''s dream of finding the end a fence. My new best seller.', '1 / 17 / 2018', 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/American_Bird_Grasshopper.jpg/1200px-American_Bird_Grasshopper.jpg'),
('Didn''t expect this', 'Just found a nickel. Though you guys should know. Pretty important.',    '1 / 17 / 2018', 1, ''),
('Buster''s Todem',     'When cows seek vengance in the flatlands, Only one cow can stop it',     '1 / 17 / 2018', 1, 'https://media.mnn.com/assets/images/2017/01/cow-in-pasture.jpg.838x0_q80.jpg'),
('Into the Dawn',       'A leopard goes a journey to find it''s wings.',                          '1 / 19 / 1018', 1, 'https://dncache-mauganscorp.netdna-ssl.com/thumbseg/75/75239-bigthumbnail.jpg');



-- CREATE TABLE Comments (
--     id SERIAL PRIMARY KEY,
--     text TEXT,
--     date_posted TEXT,
--     post_id INTEGER REFERENCES Posts (id),
--     user_id INTEGER REFERENCES Users (id)
-- );



CREATE TABLE ProductCategories (
    id SERIAL PRIMARY KEY,
    productCategory TEXT
);
INSERT INTO ProductCategories (productCategory) VALUES
('Games'),
('Books'),
('Posters');



CREATE TABLE GamePlatforms (
    id SERIAL PRIMARY KEY,
    gbId INTEGER,
    platform TEXT
);
INSERT INTO GamePlatforms (gbId, platform) VALUES
(117, 'Nintendo 3Ds'),
(157, 'Nintendo Switch'),
(94,  'PC'),
(22,  'Playstation'),
(19,  'Playstation 2'),
(35,  'Playstation 3'),
(146, 'Playstation 4'),
(129, 'Playstation Vita'),
(36,  'Wii'),
(139, 'Wii U'),
(32,  'Xbox'),
(20,  'Xbox 360'),
(145, 'Xbox One');



CREATE TABLE BookSubjects (
    id SERIAL PRIMARY KEY,
    subject TEXT
);
INSERT INTO BookSubjects (subject) VALUES
('Art'),
('Anthropomorphism'),
('Biography & Autobiography'),
('Body, Mind & Spirit'),
('Business & Economics'),
('Botany'),
('British'),
('Computers'),
('Cosmic physics'),
('Education'),
('Family & Relationships'),
('Fiction'),
('Foreign Language Study'),
('Gardening'),
('History'),
('Inventions'),
('Juvenile Nonfiction'),
('Language Arts & Disciplines'),
('Law'),
('Literary Criticism'),
('Love'),
('Mathematics'),
('Medical'),
('Nature'),
('Philosophy'),
('Political Science'),
('Religion'),
('Science'),
('Social Science'),
('Technology & Engineering'),
('Young Adult Fiction');



CREATE TABLE PosterCategories (
    id SERIAL PRIMARY KEY,
    category TEXT
);
INSERT INTO PosterCategories (category) VALUES
('Digital Art'),
('Traditional Art'),
('Photography');



CREATE TABLE Posters (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    datePosted TEXT,
    price DECIMAL,
    posterCategoryId INTEGER REFERENCES PosterCategories (id),
    productCategoryId INTEGER REFERENCES ProductCategories (id),
    userId INTEGER REFERENCES Users (id),
    imageURL TEXT
);
INSERT INTO Posters (name, description, datePosted, price, posterCategoryId, productCategoryId, userId, imageURL) VALUES
('Ulquiorra Cifer',             'Fanart of Ulquiorra Cifer.',  '1 / 19 / 2018', 49.99, 1, 3, 4, 'https://cdnb.artstation.com/p/assets/images/images/007/624/631/large/jem-brown-ulquiorra-screenshot-6-700x700.jpg?1507427752'),
('Kisame Hoshigaki',            'Fanart of Kisame Hoshigaki.', '1 / 19 / 2018', 49.99, 1, 3, 4, 'https://cdnb.artstation.com/p/assets/images/images/007/889/865/large/jem-brown-kisame-01-screenshot-smla.jpg?1509157762'),
('Zabuza Momochi',              'Fanart of Zabuza Momochi.',   '1 / 19 / 2018', 49.99, 1, 3, 4, 'https://cdnb.artstation.com/p/assets/images/images/006/050/959/large/jem-brown-zabuza-screenshot-02-sml.jpg?1495666567'),
('Garra of the Sand',           'Fanart of Garra.',            '1 / 19 / 2018', 49.99, 1, 3, 4, 'https://cdna.artstation.com/p/assets/images/images/007/290/560/large/jem-brown-garra-screenshot-02-700x700-2.jpg?1505327332'),
('Garra of the Sand (Neutral)', 'Fanart of Garra (neutral)',   '1 / 19 / 2018', 44.99, 1, 3, 4, 'https://cdna.artstation.com/p/assets/images/images/007/291/402/large/jem-brown-garra-screenshot-03b-700x700.jpg?1505110523'),
('Ieyasu Tokugawa',             'Fanart of Ieyasu Tokugawa',   '1 / 22 / 2018', 49.99, 1, 3, 4, 'https://cdnb.artstation.com/p/assets/images/images/005/352/385/large/jem-brown-ieyasu-screenshot-5c.jpg?1506238580'),
('Scar (Fullmetal Alchemist)',  'Fanart of Scar',              '1 / 22 / 2018', 49.99, 1, 3, 4, 'https://cdnb.artstation.com/p/assets/images/images/005/728/353/large/jem-brown-scar-screenshot-01e.jpg?1493320471'),
('Jin Saotome Typhoon',         'Fanart of Jin Saotome.',      '1 / 18 / 2018', 39.99, 1, 3, 4, 'https://cdnb.artstation.com/p/assets/images/images/004/752/517/large/jem-brown-jinsaotome-screenshot-04c-sml.jpg?1488844564'),
('Jin Saotome',                 'Fanart of Jin Saotome.',      '1 / 18 / 2018', 39.99, 1, 3, 4, 'https://cdna.artstation.com/p/assets/images/images/004/056/362/large/jem-brown-jinsaotome-screenshot-03c-sml-copy.jpg?1479897947');



-- CREATE TABLE Games (
--     id SERIAL PRIMARY KEY,
-- );



-- CREATE TABLE Books (
--     id SERIAL PRIMARY KEY,
-- );



CREATE TABLE Cart (
    id SERIAL PRIMARY KEY,
    productId INTEGER,
    name TEXT,
    price DECIMAL,
    productCategoryId INTEGER REFERENCES ProductCategories (id),
    quantity INTEGER,
    customerId INTEGER REFERENCES Users (id),
    imageURL TEXT
);