import { firebaseAccess } from './FirebaseAccess/firebaseConfig'

import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

export const firebaseConfig = {
    apiKey: firebaseAccess.apiKey,
    authDomain: firebaseAccess.authDomain,
    projectId: firebaseAccess.projectId,
    storageBucket: firebaseAccess.storageBucket,
    messagingSenderId: firebaseAccess.messagingSenderId,
    appId: firebaseAccess.appId,
    measurementId: firebaseAccess.measurementId
  };



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, 'gs://makeskills-ba953.appspot.com')

export default storage