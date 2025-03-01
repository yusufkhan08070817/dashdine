import React from "react";
import { Scanner, IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";
import  "./Qr.css"
const QRScannerComponent: React.FC = () => {
  const navigate = useNavigate();

  const handleScan = (codes: IDetectedBarcode[]) => {
    if (codes.length > 0) {
      const scannedUrl = codes[0].rawValue;
      if (scannedUrl) {
        window.location.href = scannedUrl; // Redirect to the scanned URL
      }
    }
  };

  const handleError = (error: unknown) => {
    console.error("QR Scan Error:", error);
  };

  return (
    <div className="qrcontainer">
      <div style={{ width: "300px" }}> {/* Wrapper div for width control */}
        <Scanner
          onScan={handleScan}
          onError={handleError}
        />
      </div>
    </div>
  );
};

export default QRScannerComponent;
