DELETE FROM Posts WHERE user_id = $1;
-- DELETE FROM PostComments WHERE user_id = $1;
DELETE FROM Posters WHERE user_id = $1;
DELETE FROM Cart WHERE customer_id = $1;
DELETE FROM Follows WHERE follower_id = $1;
DELETE FROM Follows WHERE user_id = $1;
DELETE FROM Users WHERE id = $1;