-- I don't need to specify the post_id because all comments have there own id
UPDATE PostComments
SET text = $2
WHERE id = $1 AND user_id = $3
RETURNING *;