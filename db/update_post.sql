UPDATE Posts 
SET title = $2, text = $3, image_url = $4
WHERE id = $1 AND user_id = $5
RETURNING *;