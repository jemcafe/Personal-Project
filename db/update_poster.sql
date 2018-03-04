UPDATE Posters
SET name = $2, description = $3, price = $4, posterCategoryId = $5, imageUrl = $7
WHERE id = $1 AND userId = $6
RETURNING *;

-- SELECT name, description, price, PosterCategories.category, imageurl FROM Posters
-- JOIN PosterCategories ON Posters.posterCategoryId = PosterCategories.id
-- WHERE Posters.id = $1 AND userId = $6;