import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";

const fireBaseConfig = initializeApp({
  apiKey: "AIzaSyARW-e-HL1JNsaHtDUR3s4KxS4WoBTbhBM",
  authDomain: "cinema-lib.firebaseapp.com",
  projectId: "cinema-lib",
  storageBucket: "cinema-lib.appspot.com",
  messagingSenderId: "276802519397",
  appId: "1:276802519397:web:d7fea0a427bb5e996c218c",
});

const projectStorage = getStorage();
export { projectStorage };

export const useStorage = (file: File | null) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (file === null) return;
    const storageRef = ref(projectStorage, file.name);
    uploadBytes(storageRef, file).then(async () => {
      const url = await getDownloadURL(storageRef);
      setUrl(url);
    });
  }, [file]);

  return { url };
};
