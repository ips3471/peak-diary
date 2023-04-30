import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import BodyContainer from '../components/body/main-container';
import { useAuthContext } from '../context/AuthContext';
import { MdOutlinePhotoCameraFront } from 'react-icons/md';
import Rounded from '../components/forms/rounded';
import { UserProfile } from '../types/components/profile';

type ProfileInputs = {
	name: string;
	account: string | null;
};

export default function Profile() {
	const { user, update } = useAuthContext();
	const [input, setInput] = useState<ProfileInputs>();

	useEffect(() => {
		user &&
			setInput({
				name: user.name,
				account: user.account,
			});
	}, []);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.currentTarget;
		setInput(prev => ({ ...(prev || { name: '', account: '' }), [id]: value }));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		if (!user) throw new Error(`User Not Found`);
		if (!input?.name) return;
		e.preventDefault();
		const updated: UserProfile = {
			...user,
			name: input.name,
			account: input?.account,
		};
		update(updated);
	};

	return (
		<BodyContainer title='회원정보'>
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
						value={input?.name}
						onChange={handleChange}
					/>
				</Rounded>
				<Rounded isStretched={false} color='light'>
					<input
						autoComplete='disable'
						required
						placeholder='계좌번호'
						spellCheck='false'
						id='account'
						type='text'
						value={input?.account || ''}
						onChange={handleChange}
					/>
				</Rounded>
			</form>
		</BodyContainer>
	);
}
