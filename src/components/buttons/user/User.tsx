import React from 'react';
import { useAuthContext } from '../../../context/AuthContext';

export default function User() {
	const { user } = useAuthContext();

	return (
		<button className='flex items-center'>
			<div className='w-6'>
				{user?.photoURL && (
					<img
						src={user.photoURL}
						alt={user.displayName || 'profile'}
						className='rounded-full'
					/>
				)}
			</div>
			<p className='hidden whitespace-nowrap lg:block'>{user?.displayName}</p>
		</button>
	);
}
