import React from 'react';
import './cartitem.css';
interface Product {
    id: number;
    name: string;
    price: number;
    offer: number;
    quantity: number;
    img: string;
    category: string;
  }
  interface CartitemProps {
    product: Product;
    onQuantityChange: (productId: number, newQuantity: number) => void;
  }
  
  
const Cartitem: React.FC<CartitemProps> = ({ product, onQuantityChange }) => {
  



  return (
    <div className="cartContainer">
     
        <div className="cartItemCard" >
          <div className="cartItemImage">
            <img src={product.img} alt={product.name} />
          </div>
          <div className="cartItemDetails">
            <h3>{product.name}</h3>
            
            <h4>₹{product.price}</h4>
          </div>
          <div className="cartItemController">
            <button className="quantityBtn" onClick={() =>
                onQuantityChange(product.id, product.quantity + 1)
            }>+</button>
            <span className="quantity">{product.quantity}</span>
            <button className="quantityBtn"   onClick={() =>
           onQuantityChange(
            product.id,
            product.quantity > 0 ? product.quantity - 1 : 0
          )
            }>-</button>
          </div>
        </div>
      
      
    </div>
  );
};


export default Cartitem;
