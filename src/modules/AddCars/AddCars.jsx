"use client";
import React, { useEffect, useRef, useState } from "react";
import Tesseract from "tesseract.js";
import styles from "./style.module.scss";
import { Button } from "@chakra-ui/react";

const AddCars = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    startCamera();
  }, [!text]);

  // 📌 Kamerani ishga tushirish
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: "environment",
        }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Kameraga ruxsat yo'q:", err);
    }
  };

  const preprocessImage = (imageDataURL) => {
    return new Promise((resolve) => {
      let img = new Image();
      img.src = imageDataURL;
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
  
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
  
        // 📌 Rasmni grayscale (qora-oq) formatga o'tkazish
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let pixels = imageData.data;
        
        for (let i = 0; i < pixels.length; i += 4) {
          let avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3; // O'rtacha rang
          pixels[i] = avg;    // Red
          pixels[i + 1] = avg; // Green
          pixels[i + 2] = avg; // Blue
        }
  
        ctx.putImageData(imageData, 0, 0);
  
        // 📌 Binarizatsiya qilish (threshold = 128)
        let binaryData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let binaryPixels = binaryData.data;
  
        for (let i = 0; i < binaryPixels.length; i += 4) {
          let value = binaryPixels[i] > 128 ? 255 : 0; // Agar 128 dan yuqori bo'lsa oq, past bo'lsa qora
          binaryPixels[i] = value;
          binaryPixels[i + 1] = value;
          binaryPixels[i + 2] = value;
        }
  
        ctx.putImageData(binaryData, 0, 0);
  
        // 📌 Qayta ishlangan rasmni chiqarish
        resolve(canvas.toDataURL("image/png"));
      };
    });
  };
  

  // 📌 Rasmni olish va OCR qilish
  const captureImage = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 📌 To‘rtburchak o‘lchamlarini olish
    const rectWidth = 350;
    const rectHeight = 230;
    const x = (video.videoWidth - rectWidth) / 2;
    const y = (video.videoHeight - rectHeight) / 2;

    // 📌 Faqat to‘rtburchakni olish
    canvas.width = rectWidth;
    canvas.height = rectHeight;
    ctx.drawImage(
      video,
      x,
      y,
      rectWidth,
      rectHeight,
      0,
      0,
      rectWidth,
      rectHeight
    );

    const imageDataURL = canvas.toDataURL("image/png");
    const processedImage = await preprocessImage(imageDataURL);

    const {
      data: { text },
    } = await Tesseract.recognize(processedImage, "eng+uzb", {
      tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    });


    setText(text);
    setIsProcessing(false);
  };

  return (
    <>
      {!text && (
        <div className={styles.container}>
          {/* Kamera */}
          <video ref={videoRef} autoPlay playsInline className={styles.video} />

          {/* 📌 To‘rtburchakni markazga joylashtirish */}
          <div className={styles.overlay}>
            <div className={styles.box}></div>
          </div>

          {/* 📌 OCR tugmasi */}
          <button
            onClick={captureImage}
            disabled={isProcessing}
            className={styles.button}
          >
            {isProcessing ? "Matn ajratilyapti..." : "Rasmga olish"}
          </button>

          {/* 📌 OCR matn natijasi */}

          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      )}

      {text && (
        <div className={styles.result}>
          <h3>Ajratilgan matn:</h3>
          <p>{text}</p>
          <Button onClick={() => setText("")}>Qayta urunish</Button>
        </div>
      )}
    </>
  );
};

export default AddCars;
