SELECT Posters.id, Posters.name, description, datePosted, price, PosterCategories.category, productCategoryId, ProductCategories.productCategory, userId, username, Posters.imageUrl  FROM Posters
JOIN PosterCategories ON Posters.posterCategoryId = PosterCategories.id
JOIN ProductCategories ON Posters.productCategoryId = ProductCategories.id
JOIN Users ON Posters.userId = Users.id
ORDER BY Posters.id DESC;