DROP TABLE IF EXISTS Posters, GamePlatforms, BookSubjects, PosterCategories, Cart, Posts, Followers, PostComments, ProductCategories, Users CASCADE;


CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    authId TEXT,
    name TEXT,
    imageUrl TEXT,
    headerBkgdImgUrl TEXT,
);
-- INSERT INTO Users (username, password, authId, name, imageUrl, headerImageUrl, profileUrl) VALUES
-- ('a',      'b',        null, 'A',               null,                                                                                                                                 null),
-- ('Goku',   'dbz',      null, 'Son Goku',        'https://i.pinimg.com/736x/ed/1d/73/ed1d7355a9bb9460f4085b5ef695740f.jpg',                                                            'https://images5.alphacoders.com/677/677262.png'),
-- ('Ichigo', 'bleach',   null, 'Ichigo Kurosaki', 'https://pbs.twimg.com/profile_images/640284910326972416/IOChu2E1_400x400.jpg',                                                       'https://static.pexels.com/photos/572688/pexels-photo-572688.jpeg'),
-- ('Luffy',  'onepiece', null, 'Monkey D. Luffy', 'https://vignette.wikia.nocookie.net/manga/images/0/01/Monkey_D._Luffy_-_TPS15.png/revision/latest?cb=20150503204141&path-prefix=es', 'https://kids.nationalgeographic.com/content/dam/kids/photos/articles/Nature/H-P/Habitats/Ocean/wave.ngsversion.1500050062134.adapt.1900.1.jpg');



CREATE TABLE Posts (
    id SERIAL PRIMARY KEY,
    title TEXT,
    text TEXT,
    datePosted TEXT,
    userId INTEGER REFERENCES Users (id),
    imageUrl TEXT
);
-- INSERT INTO Posts (title, text, datePosted, userId, imageURL) VALUES
-- ('Leap of Faith',       'A grasshopper''s dream of finding the end a fence. My new best seller.', '1 / 17 / 2018', 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/American_Bird_Grasshopper.jpg/1200px-American_Bird_Grasshopper.jpg'),
-- ('Didn''t expect this', 'Just found a nickel. Though you guys should know. Pretty important.',    '1 / 17 / 2018', 1, ''),
-- ('Buster''s Todem',     'When cows seek vengance in the flatlands, Only one cow can stop it',     '1 / 17 / 2018', 1, 'https://media.mnn.com/assets/images/2017/01/cow-in-pasture.jpg.838x0_q80.jpg'),
-- ('Into the Dawn',       'A leopard goes a journey to find it''s wings.',                          '1 / 19 / 1018', 1, 'https://dncache-mauganscorp.netdna-ssl.com/thumbseg/75/75239-bigthumbnail.jpg');


CREATE TABLE Follows (
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES Users (id),
    followerId INTEGER REFERENCES Users (id)
);
-- INSERT INTO Follows (userId, followerId) VALUES
-- (2, 3),
-- (4, 3);


CREATE TABLE PostComments (
    id SERIAL PRIMARY KEY,
    text TEXT,
    datePosted TEXT,
    postId INTEGER REFERENCES Posts (id),
    userId INTEGER REFERENCES Users (id)
);



-- Search Categories will be the new table name ( Creators aren't products )
CREATE TABLE ProductCategories (
    id SERIAL PRIMARY KEY,
    productCategory TEXT
);
INSERT INTO ProductCategories (productCategory) VALUES
('Games'),
('Books'),
('Posters'),
('Creators');



CREATE TABLE GamePlatforms (
    id SERIAL PRIMARY KEY,
    gbId INTEGER,
    platform TEXT
);
INSERT INTO GamePlatforms (gbId, platform) VALUES
(null, 'All' ),
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
('All'),
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
('All'),
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
    imageUrl TEXT
);
-- INSERT INTO Posters (name, description, datePosted, price, posterCategoryId, productCategoryId, userId, imageURL) VALUES


-- CREATE TABLE Games (
--     id SERIAL PRIMARY KEY,
-- );



-- CREATE TABLE Books (
--     id SERIAL PRIMARY KEY,
-- );



CREATE TABLE Cart (
    id SERIAL PRIMARY KEY,
    productId INTEGER NOT NULL,
    name TEXT NOT NULL,
    price DECIMAL NOT NULL,
    productCategoryId INTEGER REFERENCES ProductCategories (id) NOT NULL,
    quantity INTEGER NOT NULL,
    customerId INTEGER REFERENCES Users (id) NOT NULL,
    imageUrl TEXT
);