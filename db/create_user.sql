INSERT INTO Users 
(username, password, auth_id, email, name, avatar, header_bkgd_img, profile_url)
VALUES 
($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;