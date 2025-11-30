// src/services/storage.js
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../firebase/config"; // assumes you export app from config

const storage = getStorage(app);

/**
 * Upload many image Files to: `products/{productId}/images/{timestamp}_{originalName}`
 * Returns array of download URLs in same order as files.
 * @param {string} productId
 * @param {FileList|File[]} files
 * @param {(progress:number)=>void} onProgress optional progress callback (0-100)
 * @returns {Promise<string[]>}
 */
export async function uploadProductImages(productId, files, onProgress) {
  if (!files || files.length === 0) return [];

  const fileArray = Array.from(files);
  const uploads = fileArray.map((file, idx) => {
    const fileName = `${Date.now()}_${idx}_${file.name.replace(/\s+/g, "_")}`;
    const storageRef = ref(storage, `products/${productId}/images/${fileName}`);
    return new Promise((resolve, reject) => {
      const task = uploadBytesResumable(storageRef, file);
      task.on(
        "state_changed",
        (snapshot) => {
          if (onProgress) {
            // compute overall progress approximating equal-weighted files
            const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            const overall = Math.round(((idx + percent / 100) / fileArray.length) * 100);
            onProgress(overall);
          }
        },
        (err) => reject(err),
        async () => {
          try {
            const url = await getDownloadURL(task.snapshot.ref);
            resolve(url);
          } catch (e) {
            reject(e);
          }
        }
      );
    });
  });

  return Promise.all(uploads); // resolves to array of URLs
}
