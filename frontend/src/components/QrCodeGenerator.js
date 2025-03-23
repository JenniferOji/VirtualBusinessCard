import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { BASE_URL } from '../config';
import { useParams } from 'react-router-dom';

// https://dev.to/onlyoneerin/creating-dynamic-qr-codes-using-reactjs-a-step-by-step-tutorial-341a
function QrCodeGenerator() {
    const { id } = useParams(); // pulling the id from the url 
    const [url] = useState(`${BASE_URL}/professional/portfolio/${id}`); // the qr code will be generater from this url 
    const qrCodeRef = useRef(null);

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
            </div>
        </div>
    );
  }
  export default QrCodeGenerator;