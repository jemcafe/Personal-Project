DELETE FROM Posts WHERE userId = $1;
DELETE FROM Posters WHERE userId = $1;
DELETE FROM Cart WHERE customerId = $1;
DELETE FROM Follows WHERE userId = $1;
DELETE FROM Users WHERE id = $1;