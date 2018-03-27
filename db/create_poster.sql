INSERT INTO Posters
(name, description, date_posted, price, poster_category_id, product_category_id, image_url, likes, user_id)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *;