SELECT Posters.id, Posters.name, description, datePosted, price, PosterCategories.category, ProductCategories.productCategory, userId, username, Posters.imageURL  FROM Posters
JOIN PosterCategories ON Posters.posterCategoryId = PosterCategories.id
JOIN ProductCategories ON Posters.productCategoryId = ProductCategories.id
JOIN Users ON Posters.userId = Users.id;