import React from "react";
import "./ProductBox.css";

interface Product {
  id: number;
  name: string;
  price: number;
  offer?: number;
  quantity: number;
  img: string;
}

interface ProductBoxProps {
  product: Product;
  onQuantityChange: (productId: number, newQuantity: number) => void;
}

const ProductBox: React.FC<ProductBoxProps> = ({ product, onQuantityChange }) => {
  return (
    <div className="product-box">
      <div className="image-container">
        <img src={product.img} alt={product.name} className="product-image" />
        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={() =>
              onQuantityChange(
                product.id,
                product.quantity > 0 ? product.quantity - 1 : 0
              )
            }
          >
            -
          </button>
          <span className="quantity">{product.quantity}</span>
          <button
            className="quantity-btn"
            onClick={() =>
              onQuantityChange(product.id, product.quantity + 1)
            }
          >
            +
          </button>
        </div>
      </div>
      <div className="product-footer">
        <span className="product-name">{product.name}</span>
        <div className="product-price-section">
          {product.offer ? (
            <>
              <span className="offer">{product.offer}% OFF</span>
              <span className="price">₹{product.price}</span>
            </>
          ) : (
            <span className="price no-offer">₹{product.price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductBox;
