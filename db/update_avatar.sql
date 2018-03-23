UPDATE Users
SET imageUrl = $1
WHERE id = $2
RETURNING *;