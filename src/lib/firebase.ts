import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
apiKey: 'AIzaSyCg8mEsWE65hewby-eFUYiaAc3QTSs31Hs',
authDomain: 'expert-consultants.firebaseapp.com',
projectId: 'expert-consultants',
storageBucket: 'expert-consultants.firebasestorage.app',
messagingSenderId: '854576593873',
appId: '1:854576593873:web:5f45a7ded76db34f583ef0',
measurementId: 'G-F2BNNE45M7',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);