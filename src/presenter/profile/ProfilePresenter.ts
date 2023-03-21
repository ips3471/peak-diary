import { User } from 'firebase/auth';
import { Dispatch, SetStateAction } from 'react';
import { AuthUser } from '../../context/AuthContext';
import database from '../../database/database';
import { UserProfile } from '../../types/components/profile';

const ProfilePresenter = {
	init(user: User) {
		const element: UserProfile = {
			name: user.displayName || 'User',
			uid: user.uid,
		};
		database.users.update(user.uid, element);
		return element;
	},

	async get(uid: string) {
		return await database.users.get(uid);
	},

	update(profile: UserProfile, update: Dispatch<SetStateAction<UserProfile>>) {
		database.users.update(profile.uid, profile);
		update(profile);
	},
};

export function update(
	uid: string,
	profile: UserProfile,
	setState: Dispatch<SetStateAction<UserProfile>>,
) {
	database.users.update(uid, profile);
	setState(profile);
}

export async function get(uid: string) {
	return await database.users.get(uid);
}

export async function init(
	user: AuthUser,
	setState: Dispatch<SetStateAction<UserProfile>>,
) {
	database.users.get(user.uid).then(profile => {
		if (profile) {
			setState(profile);
		} else {
			setState({ uid: user.uid, name: user.displayName || 'null' });
		}
	});
}

export default ProfilePresenter;
