import React, { useState } from 'react';
import { useLocation,useNavigate } from "react-router-dom";
import './CartList.css';
import Cartitem from './Cartitem';

interface Product {
  id: number;
  name: string;
  price: number;
  offer: number;
  quantity: number;
  img: string;
  category: string;
}

const CartList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialState = (location.state as Product[]) || [];
  const [products, setProducts] = useState<Product[]>(initialState);
  const [orderList, setOrderList] = useState<Product[]>(initialState);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: newQuantity }
          : product
      )
    );

    setOrderList((prevOrderList) => {
      const updatedOrderList = prevOrderList.filter(
        (product) => product.id !== productId
      );

      if (newQuantity > 0) {
        const updatedProduct = products.find((product) => product.id === productId);
        if (updatedProduct) {
          updatedOrderList.push({ ...updatedProduct, quantity: newQuantity });
        }
      }

      return updatedOrderList;
    });
  };
  const billclickHandle = () => {
    navigate("/Bill", { state: orderList });
  };


  const handlePayment = () => {
    alert('Proceeding to payment...');
  };

  return (
    <div className='cartitemlistcontainer'>
      <div style={{display:"flex",width:"100vw",flexDirection:"column",justifyContent:"flex-start",position:"relative",left:"2%"}}>
        <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#ff9800",
          textShadow: "2px 2px 0px white, -2px -2px 0px white, -2px 2px 0px white, 2px -2px 0px white"
        }}
         > Restaurant Name</h2>
      </div>
      {products.length > 0 ? (
        products.map((item) => (
          <Cartitem key={item.id} product={item} onQuantityChange={handleQuantityChange} />
        ))
      ) : (
        <p>No items in the cart</p>
      )}
      <button className="paymentButton fixedbtn" onClick={billclickHandle}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default CartList;
