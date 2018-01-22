SELECT Posters.id, Posters.name, description, dateposted, price, posterCategoryId, productCategoryId, userId, Posters.imageURL, username FROM Posters
JOIN Users ON Posters.userId = Users.id
WHERE userId = $1;