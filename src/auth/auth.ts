import {
	signInWithPopup,
	getAuth,
	GoogleAuthProvider,
	signOut,
	onAuthStateChanged,
	User,
	NextOrObserver,
	FacebookAuthProvider,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { firebaseApp } from '../service/firebase/firebase';
import { FailState, LoginState, SuccessState } from '../types/sign-in/signIn';

type Provider = 'google' | 'facebook';

const authRef = getAuth(firebaseApp);
const providers = {
	google: new GoogleAuthProvider(),
	facebook: new FacebookAuthProvider(),
};

const auth = {
	loginByProvider(provider: Provider) {
		signInWithPopup(authRef, providers[provider]).catch(console.error);
	},

	async loginByEmail(email: string, password: string): Promise<LoginState> {
		return await signInWithEmailAndPassword(authRef, email, password)
			.then(userCredential => {
				const user = userCredential.user;
				// ...
				const state: SuccessState = {
					state: 'success',
					uid: user.uid,
				};
				return state;
			})
			.catch(err => {
				console.error(err.code, err.message);
				const state: FailState = {
					state: 'fail',
					error: {
						code: err.code,
						message: err.message,
					},
				};
				return state;
			});
	},

	logout() {
		signOut(authRef).catch(console.error);
	},

	onUserStateChanged(onAuthChanged: NextOrObserver<User>) {
		return onAuthStateChanged(authRef, onAuthChanged);
	},
};

export default auth;
