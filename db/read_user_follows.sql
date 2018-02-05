SELECT Follows.id, username, imageUrl, profileUrl FROM Follows
JOIN Users ON Follows.userId = Users.id
WHERE followerId = $1
ORDER BY Follows.id DESC;