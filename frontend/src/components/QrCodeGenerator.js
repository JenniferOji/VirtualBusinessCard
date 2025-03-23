import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { BASE_URL } from '../config';
import { useParams } from 'react-router-dom';
import * as htmlToImage from "html-to-image"; // library to generate images from HTML elements 

// https://dev.to/onlyoneerin/creating-dynamic-qr-codes-using-reactjs-a-step-by-step-tutorial-341a
function QrCodeGenerator() {
    const { id } = useParams(); // pulling the id from the url 
    const [url] = useState(`${BASE_URL}/professional/portfolio/${id}`); // the qr code will be generater from this url 
    const qrCodeRef = useRef(null);

    // function to download the QR code 
    const downloadQRCode = () => {
        htmlToImage
            .toPng(qrCodeRef.current) // converting the QR code to a png image 
            .then(function (dataUrl) { // creating a download link 
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = "QR Code.png"; // the name of the download 
                link.click();
            })
            .catch(function (error) {
                console.error("Error generating the QR code:", error);
            });
    };

    return (
      <div className="qrcode_container">
        <h1>Generate QR Code</h1>
        <div className="qrcode_container_parent">
          </div>
            <div className="qrcode_download">
              <div>
                {/* the qr code generated from the url */}
                <QRCode value={url} size={300} ref={qrCodeRef} /> 
              </div>
              <button onClick={downloadQRCode}>Download Qr Code</button>
            </div>
        </div>
    );
  }
  export default QrCodeGenerator;