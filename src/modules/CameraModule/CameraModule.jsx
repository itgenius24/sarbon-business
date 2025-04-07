"use client";
import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const [showCaptureBtn, setShowCaptureBtn] = useState(false);
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        alert("Kamerani ishga tushirib bo‘lmadi: " + err.message);
      }
    };

    startCamera();

    const interval = setInterval(() => {
      checkCardPosition();
    }, 500);

    return () => clearInterval(interval);
  }, [!picture]);

  const checkCardPosition = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const frame = frameRef.current;
    if (!video || !canvas || !frame) return;

    const ctx = canvas.getContext("2d");
    const { videoWidth, videoHeight } = video;
    if (!videoWidth || !videoHeight) return;

    canvas.width = videoWidth;
    canvas.height = videoHeight;
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

    const frameRect = frame.getBoundingClientRect();
    const videoRect = video.getBoundingClientRect();

    const x =
      (frameRect.left - videoRect.left) * (videoWidth / videoRect.width);
    const y =
      (frameRect.top - videoRect.top) * (videoHeight / videoRect.height);
    const width = frameRect.width * (videoWidth / videoRect.width);
    const height = frameRect.height * (videoHeight / videoRect.height);

    const imageData = ctx.getImageData(x, y, width, height);
    let avgLuminance = 0;
    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      avgLuminance += luminance;
    }
    avgLuminance /= imageData.data.length / 4;

    // Agar kartaga o‘xshash narsa ramkada bo‘lsa, tugmani ko‘rsatamiz
    setShowCaptureBtn(avgLuminance < 150);
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const frame = frameRef.current;
    const ctx = canvas.getContext('2d');
  
    const { videoWidth, videoHeight } = video;
    canvas.width = videoWidth;
    canvas.height = videoHeight;
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
  
    const frameRect = frame.getBoundingClientRect();
    const videoRect = video.getBoundingClientRect();
  
    const x = (frameRect.left - videoRect.left) * (videoWidth / videoRect.width);
    const y = (frameRect.top - videoRect.top) * (videoHeight / videoRect.height);
    const width = frameRect.width * (videoWidth / videoRect.width);
    const height = frameRect.height * (videoHeight / videoRect.height);
  
    // Faqat ramka ichidagi qismni alohida canvasga chizamiz
    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = width;
    cropCanvas.height = height;
    const cropCtx = cropCanvas.getContext('2d');
    cropCtx.drawImage(canvas, x, y, width, height, 0, 0, width, height);
  
    const croppedImage = cropCanvas.toDataURL('image/png');
    setPicture(croppedImage);
    console.log('Kesilgan rasm:', croppedImage);

  };
  
  return (
   <>
     <div
      style={{
        position: "relative",
        width: "100vw",
        height: "790px",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      {/* ID karta ramkasi */}
      <div
        ref={frameRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "80vw",
          maxWidth: "300px",
          aspectRatio: "1.6",
          border: "3px dashed lime",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
        }}
      ></div>

      {/* Canvas (yashirin) */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Rasmga olish tugmasi */}
      {showCaptureBtn && (
        <button
          onClick={handleCapture}
          style={{
            position: "absolute",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "15px 30px",
            fontSize: "18px",
            background: "limegreen",
            color: "white",
            border: "none",
            borderRadius: "10px",
            zIndex: 3,
          }}
        >
          📸 Rasmga olish
        </button>
      )}
     
    </div>
     {picture && (
      <Box>
        <img
          src={picture}
          alt="Captured"
          style={{
            width: "300px",
            height: "100%",
            borderRadius: "10px",
            zIndex: 3,
          }}
        />
        <Button onClick={() => setPicture(null)}>❌ Rasmni o‘chirish</Button>
      </Box>
    )}
   </>
  );
};

export default Camera;
