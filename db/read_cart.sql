SELECT Cart.id, productId, Cart.name, price, productCategory, quantity, customerId, Cart.imageURL FROM Cart
JOIN ProductCategories ON Cart.productCategoryId = ProductCategories.id
JOIN Users ON Cart.customerId = Users.id
WHERE customerId = $1
ORDER BY Cart.id;