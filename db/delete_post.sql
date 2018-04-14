DELETE FROM Posts 
WHERE id = $1 AND user_id = $2;

DELETE FROM PostComments 
WHERE post_id = $1;