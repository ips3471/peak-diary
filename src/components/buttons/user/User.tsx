import React from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { selectedDelay } from '../../navbar/utils/utils';

interface UserProps {
	delay: number;
}

export default function User({ delay }: UserProps) {
	const { user } = useAuthContext();

	console.log('user', delay);

	return (
		<button
			className={`w-full opacity-0 animate-appear ${selectedDelay(delay)}`}
		>
			<div
				className={`flex justify-end items-center animate-show-orderly ${selectedDelay(
					delay,
				)}`}
			>
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
