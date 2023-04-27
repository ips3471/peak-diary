import { useState } from 'react';
import { UserProfile } from '../../../../../types/components/profile';

interface FormSelectUserItemProps {
	user: UserProfile;
	defaultValue: boolean;
}

export default function FormSelectUserItem({
	user,
	defaultValue,
}: FormSelectUserItemProps) {
	const [check, setCheck] = useState(defaultValue);

	return (
		<li
			className={`border overflow-hidden rounded-lg ${
				check ? 'bg-brand/90 text-pureWhite' : 'text-button_disabled'
			} `}
		>
			<input className='w-0' checked={check} type='checkbox' name={user.uid} />

			<button
				className='p-2 text-sm'
				type='button'
				onClick={() => setCheck(prev => !prev)}
			>
				{user.name}
			</button>
		</li>
	);
}
