import { Dispatch, SetStateAction } from 'react';
import { AuthUser } from '../../context/AuthContext';
import database from '../../database/database';
import { UserProfile } from '../../types/components/profile';

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
			setState({ name: user.displayName || 'null' });
		}
	});
}
