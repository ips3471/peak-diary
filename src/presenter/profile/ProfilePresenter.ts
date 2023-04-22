import { Dispatch, SetStateAction } from 'react';
import database from '../../database/database';
import { UserProfile } from '../../types/components/profile';

const ProfilePresenter = {
	async get(uid: string): Promise<UserProfile> {
		const found = await database.users.get(uid);
		if (!found) throw new Error('user not found');
		return found;
	},

	update(
		profile: UserProfile,
		update: Dispatch<SetStateAction<UserProfile | null>>,
	) {
		database.users.update(profile.uid, profile);
		update(profile);
		console.log('profile updated', profile);
	},
};

export default ProfilePresenter;
