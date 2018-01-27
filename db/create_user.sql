INSERT INTO users 
(username, password, authId, name, imageURL)
VALUES 
($1, $2, $3, $4, $5)
RETURNING *;