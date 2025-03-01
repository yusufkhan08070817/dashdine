import React from 'react';
import { Routes, Route } from 'react-router-dom';
import QRScannerComponent from './QrScaner/QRScannerComponent ';
import HomePage from './HomePage/HomePage';
import CartList from './CartList/CartList';
import BillPage from './BillPage/BillPage';

const App: React.FC = () => {
 
  return (
    <div>
      <Routes>
      <Route path="/" element={<QRScannerComponent />} />
      <Route path="/Home" element={<HomePage  />} />
      <Route path="/cartlist" element={<CartList  />} />
      <Route path="/Bill" element={<BillPage  />} />
      </Routes>
    </div>
  );
};

export default App;
