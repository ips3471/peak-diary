import React from 'react';
import { useAuthContext } from '../../../context/AuthContext';

interface UserProps {}

export default function User({}: UserProps) {
	const { user } = useAuthContext();

	return (
		<button className={'overflow-x-scroll scrollbar-hide'}>
			<div className='flex items-center '>
				<div className='w-6'>
					{user?.photoURL && (
						<img
							src={user.photoURL}
							alt={user.displayName || ''}
							className='rounded-full whitespace-nowrap'
						/>
					)}
				</div>
				<p className='whitespace-nowrap lg:block'>{user?.displayName}</p>
			</div>
		</button>
	);
}
