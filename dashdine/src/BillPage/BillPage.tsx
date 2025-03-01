import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./BillPage.css";
import { useLocation } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  offer: number;
  quantity: number;
  img: string;
  category: string;
}

const BillPage = () => {
  const [isPaid, setIsPaid] = useState(false);
  const billRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const products = (location.state as Product[]) || [];
  const GST_RATE = 0.18;
  const BILL_NUMBER = Math.floor(100000 + Math.random() * 900000);
  const DATE = new Date().toLocaleDateString();

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      const discountedPrice = product.price - (product.price * product.offer) / 100;
      return total + discountedPrice * product.quantity;
    }, 0);
  };

  const total = calculateTotal();
  const gstAmount = total * GST_RATE;
  const grandTotal = total + gstAmount;

  const downloadPDF = async () => {
    if (!billRef.current) return;

    const canvas = await html2canvas(billRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save(`Bill_${BILL_NUMBER}.pdf`);
  };

  return (
    <div className="container">
      <div ref={billRef} className={`bill ${isPaid ? "paid" : ""}`}>
        {isPaid && <div className="watermark">PAID</div>}

        <div className="bill-header">
          <div className="company-info">
            <h2>XYZ Store</h2>
            <p>123 Market Street, City, Country</p>
            <p>Email: support@xyzstore.com | Phone: +123-456-7890</p>
          </div>
          <div className="bill-details">
            <p>Bill No: <strong>{BILL_NUMBER}</strong></p>
            <p>Date: <strong>{DATE}</strong></p>
            <p>Status: <strong>{isPaid ? "Paid" : "Unpaid"}</strong></p>
          </div>
        </div>

        <hr />

    

        <table className="bill-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>₹{(product.price - (product.price * product.offer) / 100).toFixed(2)}</td>
                <td>{product.quantity}</td>
                <td>₹{((product.price - (product.price * product.offer) / 100) * product.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="totals">
          <p>Subtotal: ₹{total.toFixed(2)}</p>
          <p>GST (18%): ₹{gstAmount.toFixed(2)}</p>
          <p className="grand-total">Grand Total: ₹{grandTotal.toFixed(2)}</p>
        </div>
      </div>

      <div className="buttons">
        <button onClick={downloadPDF} className="btn download">Download PDF</button>
       
      </div>
    </div>
  );
};

export default BillPage;
