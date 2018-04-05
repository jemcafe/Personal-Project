INSERT INTO PostComments
(text, date_posted, post_id, user_id)
VALUES
($1, $2, $3, $4)
RETURNING *;