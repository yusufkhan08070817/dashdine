import React, { useEffect, useState } from "react";
import { Scanner, IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";
import "./Qr.css";

const QRScannerComponent: React.FC = () => {
  const navigate = useNavigate();
  const [cameraAccess, setCameraAccess] = useState<boolean | null>(null);

  const checkCameraPermission = async () => {
    try {
      const permissionStatus = await navigator.permissions.query({ name: "camera" as PermissionName });

      if (permissionStatus.state === "granted") {
        setCameraAccess(true);
      } else if (permissionStatus.state === "denied") {
        setCameraAccess(false);
      } else {
        requestCameraPermission(); // If "prompt", request permission
      }

      permissionStatus.onchange = () => {
        setCameraAccess(permissionStatus.state === "granted");
      };
    } catch (error) {
      console.error("Permission API error:", error);
      setCameraAccess(false);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraAccess(true);
      stream.getTracks().forEach(track => track.stop()); // Stop the camera stream after checking
    } catch (error) {
      console.error("Camera access denied:", error);
      setCameraAccess(false);
    }
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const handleScan = (codes: IDetectedBarcode[]) => 
    {
    if (codes.length > 0) {
      let scannedUrl = codes[0].rawValue;
      console.log("Scanned URL:", scannedUrl);
  
      // Check if `?` is missing and fix it
      if (!scannedUrl.includes("?") && scannedUrl.includes("storeId=")) {
        scannedUrl = scannedUrl.replace("storeId=", "?storeId=");
      }
  
      console.log("Fixed URL:", scannedUrl);
  
      // Extract query parameters correctly
      const urlObj = new URL(scannedUrl, window.location.origin);
      const params = new URLSearchParams(urlObj.search);
  
      const storeId = params.get("storeId");
      const table = params.get("table");
  
      console.log("Extracted storeId:", storeId);
      console.log("Extracted table:", table);
      if (storeId && table) {
        navigate(`/Home?storeId=${storeId}&table=${table}`);
      }
    }
  };
  
  const handleError = (error: unknown) => {
    console.error("QR Scan Error:", error);
  };

  return (
    <div className="qrcontainer">
      {cameraAccess === null && <p>Checking camera permission...</p>}
      {cameraAccess === false && (
        <button onClick={requestCameraPermission}>Request Camera Access</button>
      )}
      {cameraAccess === true && (
        <div style={{ width: "300px" }}> {/* Wrapper div for width control */}
          <Scanner onScan={handleScan} onError={handleError} />
        </div>
      )}
    </div>
  );
};

export default QRScannerComponent;
