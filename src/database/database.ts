import { User } from 'firebase/auth';
import { getDatabase, onValue, get, child, ref } from 'firebase/database';
import { firebaseApp } from '../service/firebase/firebase';

/* 
set: replacing existing data
*/

const dbRef = ref(getDatabase(firebaseApp));

const database = {
	async isAdmin(user: User | null) {
		console.log(user);

		return get(child(dbRef, 'admins')) //
			.then(snapshot => {
				if (snapshot.exists()) {
					return snapshot.val().includes(user?.uid);
				} else {
					return false;
				}
			});
	},
};

export default database;
