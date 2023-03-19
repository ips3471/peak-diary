import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import BodyContainer from '../components/body/container';
import { useAuthContext } from '../context/AuthContext';
import { MdOutlinePhotoCameraFront } from 'react-icons/md';
import Rounded from '../components/form/rounded';
import { UserProfile } from '../types/components/profile';
import { update, init } from '../presenter/profile/ProfilePresenter';

export default function Profile() {
	const { user, login, logout } = useAuthContext();
	const [profile, setProfile] = useState<UserProfile>({ name: '' });

	useEffect(() => {
		user && init(user, setProfile);
	}, []);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.currentTarget;
		setProfile(prev => ({ ...prev, [id]: value }));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!user?.uid) {
			throw new Error(`Not Found User: ${user}`);
		}
		if (profile.name !== user?.name) {
			update(user?.uid, profile, setProfile);
		}
	};

	return (
		<BodyContainer>
			<form className='flex flex-col' onSubmit={handleSubmit}>
				<section className='text-right'>
					<button type='submit'>저장</button>
				</section>
				<section className='relative w-16 mb-3'>
					<img
						className='rounded-full'
						src={user?.photoURL || process.env.PUBLIC_URL + 'logo192.png'}
					/>
					<span className='absolute right-0 bottom-0 text-base border rounded-full bg-brand border-brand text-pureWhite p-1'>
						<MdOutlinePhotoCameraFront />
					</span>
				</section>
				<Rounded isStretched={false} color='light'>
					<input
						autoComplete='disable'
						required
						spellCheck='false'
						id='name'
						type='text'
						value={profile?.name}
						onChange={handleChange}
					/>
				</Rounded>
			</form>
		</BodyContainer>
	);
}
