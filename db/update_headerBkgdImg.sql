UPDATE Users
SET headerBkgdimg = $1
WHERE id = $2
RETURNING *;