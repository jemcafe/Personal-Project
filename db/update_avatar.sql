UPDATE Users
SET avatar = $1
WHERE id = $2
RETURNING *;