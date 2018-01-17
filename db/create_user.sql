INSERT INTO users (username, password, auth_id, name, imageURL)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;