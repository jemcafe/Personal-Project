UPDATE Posters
SET name = $2, description = $3, price = $4, poster_category_id = $5, image_url = $6
WHERE id = $1 AND user_id = $7
RETURNING *;