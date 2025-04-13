import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { useParams } from 'react-router-dom';
import * as htmlToImage from "html-to-image"; // library to generate images from HTML elements 
import './QrCodeGenerator.css'
// https://dev.to/onlyoneerin/creating-dynamic-qr-codes-using-reactjs-a-step-by-step-tutorial-341a
function QrCodeGenerator({type, id}) {
    // const { id, type } = useParams(); // pulling the id from the url 
    const baseUrl = window.location.origin;
    console.log(baseUrl); 
    const [url] = useState(`${baseUrl}/${type}/portfolio/${id}`); // the qr code will be generater from this url 
    // const [url] = useState(`http://localhost:3000/professional/portfolio/67dc5ae843287a2e49ad613c`); // the qr code will be generater from this url 
    //https://frontend-8tzmv39qb-jenny-os-projects.vercel.app/professional/portfolio/67dc5ae843287a2e49ad613c

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

    // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_copy_clipboard
    const copy = () => {
      // copying the link to clip board
        navigator.clipboard.writeText(url)
            .then(() => {
                alert("Copied the link: " + url);
            })
            .catch((error) => {
                console.error("Error copying text:", error);
            });
    }

    return (
        <div className='main-container'>
            <div className="qrcode-container">
                <h1>Portfolio Qr Code</h1>
            </div>
            <hr />
            <div className="qr-code">
                {/* the qr code generated from the url */}
                <QRCode value={url} size={300} ref={qrCodeRef} /> 
            </div>
            <div className='qr-button'>
                <button onClick={downloadQRCode} className='download'>Download Qr Code</button>
            </div>
            <div className='link'>
                <button className='copy' onClick={copy}>Copy link</button>
            </div>
        </div>
    );
}
export default QrCodeGenerator;