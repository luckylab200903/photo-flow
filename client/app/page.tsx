"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    console.log(e.target.value);
  };

  return (
    <div>
      <input type="file" onChange={handleFile} />
    </div>
  );
}
