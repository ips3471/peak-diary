import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
};

export const firebaseApp = initializeApp(firebaseConfig);
