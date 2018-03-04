SELECT Users.id, followerId, username, imageUrl, profileUrl FROM Follows
JOIN Users ON Follows.followerId = Users.id
WHERE userId = $1
ORDER BY Follows.id DESC;