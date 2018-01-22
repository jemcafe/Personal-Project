SELECT Cart.productId, Cart.name, Cart.price, category, customerId FROM Cart
JOIN ProductCategories ON Cart.productCategory = ProductCategories.id
JOIN Users ON Cart.customerId = Users.id
WHERE customerId = $1;

    id SERIAL PRIMARY KEY,
    productId,
    name TEXT,
    price DECIMAL,
    productCategory INTEGER REFERENCES ProductCategories (id),
    customerId INTEGER REFERENCES Users (id),
    quantity INTEGER,
    imageURL TEXT