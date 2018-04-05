DROP TABLE IF EXISTS 
Posters, 
GamePlatforms, 
BookSubjects, 
PosterCategories, 
Cart, 
Posts, 
Follows, 
PostComments, 
ProductCategories, 
Users, 
UserAccountsMade CASCADE;

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    auth_id TEXT,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    avatar TEXT,
    header_bkgd_img TEXT,
    profile_url TEXT
);

CREATE TABLE UserAccountsMade (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    auth_id TEXT,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    avatar TEXT,
    header_bkgd_img TEXT,
    profile_url TEXT
);

CREATE TABLE Posts (
    id SERIAL PRIMARY KEY,
    title TEXT,
    text TEXT,
    image_url TEXT,
    date_posted TEXT,
    user_id INTEGER REFERENCES Users (id)
);

CREATE TABLE Follows (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users (id),
    follower_id INTEGER REFERENCES Users (id)
);

CREATE TABLE PostComments (
    id SERIAL PRIMARY KEY,
    text TEXT,
    date_posted TEXT,
    post_id INTEGER REFERENCES Posts (id),
    user_id INTEGER REFERENCES Users (id)
);



CREATE TABLE ProductCategories (
    id SERIAL PRIMARY KEY,
    product_category TEXT
);
INSERT INTO ProductCategories (product_category) VALUES
('Games'),
('Books'),
('Posters');

CREATE TABLE GamePlatforms (
    id SERIAL PRIMARY KEY,
    gb_id INTEGER,
    platform TEXT
);
INSERT INTO GamePlatforms (gb_id, platform) VALUES
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
    name TEXT NOT NULL,
    description TEXT,
    date_posted TEXT NOT NULL,
    price DECIMAL NOT NULL,
    poster_category_id INTEGER REFERENCES PosterCategories (id),
    product_category_id INTEGER REFERENCES ProductCategories (id),
    image_url TEXT NOT NULL,
    likes INTEGER NOT NULL,
    user_id INTEGER REFERENCES Users (id)
);

CREATE TABLE Cart (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(50) NOT NULL,
    name TEXT NOT NULL,
    price DECIMAL NOT NULL,
    product_category_id INTEGER REFERENCES ProductCategories (id) NOT NULL,
    quantity INTEGER NOT NULL,
    image_url TEXT,
    customer_id INTEGER REFERENCES Users (id) NOT NULL
);


SELECT * FROM Users;
SELECT * FROM UserAccountsMade;
SELECT * FROM Posts;
SELECT * FROM PostComments;
SELECT * FROM Posters;
SELECT * FROM Cart;
SELECT * FROM Follows;

SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Goku
-- https://i.pinimg.com/236x/ed/1d/73/ed1d7355a9bb9460f4085b5ef695740f.jpg
-- https://images5.alphacoders.com/677/677262.png
-- Ichigo
-- https://pbs.twimg.com/profile_images/640284910326972416/IOChu2E1_400x400.jpg
-- https://static.pexels.com/photos/572688/pexels-photo-572688.jpeg
-- Luffy
-- https://jovemnerd.com.br/wp-content/uploads/2017/12/one-piece-mangas-mais-vendidos-de-2017.jpg
-- http://www.myfreetextures.com/wp-content/uploads/2014/11/blue-ocean-waves.jpg
-- Eddy
-- https://eng.tekkenpedia.com/images/3/3b/TK7_prof_%2810%29.png
-- https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Brazilian_amazon_rainforest.jpg/1200px-Brazilian_amazon_rainforest.jpg