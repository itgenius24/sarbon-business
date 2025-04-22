 "use client";
import React, { useRef, useState } from "react";
import styles from "./style.module.scss";

export default function CameraModule() {
  const fileInputRef = useRef();

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.container}>
      <input
        type="file"
        ref={fileInputRef}
        className={styles.hidden}
        onChange={(e) => console.log(e.target.files[0])}
      />
      <button className={styles.iconButton} onClick={handleFileClick}>
        📎
      </button>

      <input
        className={styles.input}
        placeholder="Write a message..."
        type="text"
      />

      <button className={styles.iconButton}>
        {/* <FaSmile /> */}s
      </button>

      <button className={styles.iconButton}>
        {/* <FaMicrophone /> */}🎤
      </button>
    </div>
  );
}
