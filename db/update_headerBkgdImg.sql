UPDATE Users
SET header_bkgd_img = $1
WHERE id = $2
RETURNING *;