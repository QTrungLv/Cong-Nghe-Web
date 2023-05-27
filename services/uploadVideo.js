require("dotenv").config()

const firebase = require("firebase/app")

const firebaseConfig = process.env.FIREBASE_CONFIG;

firebase.initializeApp(firebaseConfig, {})

const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');



exports.uploadImageToFirebase = (req) => {
    const storage = getStorage()
    console.log(1)
    if (!req.file) {
        throw new Error('No video found!');
    }
    console.log(2)
    const StorageRef = ref(storage, req.file.originalname)
    console.log(3)
    uploadBytes(StorageRef, req.file.buffer, { contentType: 'video/mp4' })
        .then(() => {
            getDownloadURL(StorageRef)
                .then((url) => {
                    console.log(url)
                    return url;
                })
                .catch(err => {
                    throw new Error(err.mesaage);
                })
        })
}