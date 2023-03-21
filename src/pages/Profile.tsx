import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import BodyContainer from '../components/body/container';
import { useAuthContext } from '../context/AuthContext';
import { MdOutlinePhotoCameraFront } from 'react-icons/md';
import Rounded from '../components/form/rounded';
import { UserProfile } from '../types/components/profile';

export default function Profile() {
	const { user, update } = useAuthContext();
	const [input, setInput] = useState<string>('');

	useEffect(() => {
		user && setInput(user.name);
	}, []);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		setInput(value);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		if (!user) throw new Error(`User Not Found`);
		e.preventDefault();
		const updated: UserProfile = { ...user, name: input };
		update(updated);
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
						value={input}
						onChange={handleChange}
					/>
				</Rounded>
			</form>
		</BodyContainer>
	);
}
