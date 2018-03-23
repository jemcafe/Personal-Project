UPDATE Users
SET headerBkgdImgUrl = $1
WHERE id = $2
RETURNING *;