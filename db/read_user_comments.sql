SELECT * FROM PostComments
WHERE post_id = $1 AND user_id = $2;