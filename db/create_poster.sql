INSERT INTO Posters
(name, description, datePosted, price, posterCategoryId, productCategoryId, userId, imageURL)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;