import React, { use, useEffect, useState } from "react";
import "./HomePage.css";
import ProductBox from "../ContainerBox/ProductBox";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useNavigate ,useLocation } from "react-router-dom";
import { prisma } from "../lib/prismaClint";

interface Product {
  id: number;
  name: string;
  price: number;
  offer: number;
  quantity: number;
  img: string;
  category: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const storeId = params.get("storeId");
  const table = params.get("table");
  console.log(storeId,table);
  
  const initialProducts: Product[] = [
    {
      id: 1,
      name: "Burger",
      price: 20,
      offer: 50,
      quantity: 0,
      img: "https://static.vecteezy.com/system/resources/previews/019/023/604/non_2x/front-view-tasty-meat-burger-with-cheese-and-salad-free-photo.jpg",
      category: "Burgers"
    },
    {
      id: 2,
      name: "Pizza",
      price: 25,
      offer: 20,
      quantity: 0,
      img: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Pizzas"
    },
    {
      id: 3,
      name: "Fries",
      price: 15,
      offer: 0,
      quantity: 0,
      img: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Fries"
    }
  ];

  const categories: string[] = ["All", "Burgers", "Pizzas", "Fries"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [carouselIndex, setCarouselIndex] = useState(0);

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orderList, setOrderList] = useState<Product[]>([]);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
const [Categories,setCategories]=useState<any>()
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const carouselImages = [
    "https://img.freepik.com/free-photo/chicken-skewers-with-slices-apples-chili-top-view_2829-19996.jpg",
    "https://img.freepik.com/free-photo/chicken-fajita-chicken-fillet-fried-with-bell-pepper-lavash-with-bread-slices-white-plate_114579-174.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Function to handle quantity change
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
  const cartclickHandle = () => {
    navigate("/cartlist", { state: orderList });
  };
  useEffect(() => {
    fetch(`http://localhost:5000/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data)
        console.log(data);
        
      })
      .catch((err) => console.error(err));

      console.log(Categories);
      
  }, []);
  // Update total quantity whenever the order list changes
  useEffect(() => {
    const total = orderList.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
    setTotalQuantity(total);
  }, [orderList]);

  return (
    <div className="home-page">
      <header className="header">
        <h1 className="shop-name">Foodies Hub</h1>
        <div className="cart-container"  onClick={cartclickHandle}>
          <FaShoppingCart className="cart-icon" />
          <span className="cart-quantity">{totalQuantity}</span>
        </div>
      </header>

      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button className="search-btn">
          <FaSearch />
        </button>
      </div>

      <div className="carousel">
        <img src={carouselImages[carouselIndex]} alt="Carousel" />
      </div>

      <h2 className="section-title">Categories</h2>
      <div className="horizontal-list">
        {categories.map((category, index) => (
          <div
            className={`horizontal-item category category-button ${
              selectedCategory === category ? "active" : ""
            }`}
            key={index}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductBox
            key={product.id}
            product={product}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>

      
    </div>
  );
};

export default HomePage;
/*
<h2 className="section-title">Order List</h2>
      <div className="order-list">
        {orderList.length === 0 ? (
          <p>No items in the order list.</p>
        ) : (
          orderList.map((item) => (
            <div key={item.id} className="order-item">
              <img src={item.img} alt={item.name} className="order-item-img" />
              <div className="order-item-details">
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))
        )}
      </div>
*/