INSERT INTO users 
(username, password, authId, name, imageUrl, headerBkgdImgUrl, profileUrl)
VALUES 
($1, $2, $3, $4, $5, $6, $7)
RETURNING *;