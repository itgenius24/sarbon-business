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
  const [cameraError, setCameraError] = useState(null);


  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true, 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setCameraError(err.message);
      }
    };

    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        let tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [!text]);

  // 📌 Rasmni olish va OCR qilish
  const captureImage = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 📌 To‘rtburchak o‘lchamlarini olish
    const rectWidth = 350;
    const rectHeight = 210;
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

    // 📌 OCR ishlatish
    const {
      data: { text },
    } = await Tesseract.recognize(imageDataURL, "eng+uzb", {
      logger: (m) => console.log(m),
    });

    setText(text);
    setIsProcessing(false);
  };

  return (
    <>
    {
      !text &&  <div className={styles.container}>
     
        {/* Kamera */}
        <video ref={videoRef} autoPlay playsInline className={styles.video} />

        {/* 📌 To‘rtburchakni markazga joylashtirish */}
        <div className={styles.overlay}>
          <div className={styles.box}>  <p style={{color:`white`}}>{cameraError}</p></div>
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
    }

     

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
