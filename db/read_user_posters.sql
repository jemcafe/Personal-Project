SELECT Posters.id, Posters.name, description, dateposted, price, posterCategoryId, productCategoryId, productCategory, userId, Posters.imageURL, username FROM Posters
JOIN ProductCategories ON Posters.productCategoryId = ProductCategories.id
JOIN Users ON Posters.userId = Users.id
WHERE userId = $1
ORDER BY Posters.id DESC;