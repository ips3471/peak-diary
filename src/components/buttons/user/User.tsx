import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import { selectedDelay } from '../../navbar/utils/utils';

interface UserProps {
	delay: number;
	href: string;
}

export default function User({ delay, href }: UserProps) {
	const { user } = useAuthContext();

	return (
		<div className={`w-full opacity-0 animate-appear ${selectedDelay(delay)}`}>
			<Link to={href}>
				<div
					className={`flex justify-end items-center animate-show-orderly ${selectedDelay(
						delay,
					)}`}
				>
					<div className='w-6'>
						{user?.photoURL && (
							<img
								src={user.photoURL}
								alt={user.name}
								className='rounded-full whitespace-nowrap'
							/>
						)}
					</div>
					<p className='whitespace-nowrap lg:block'>{user?.name || 'null'}</p>
				</div>
			</Link>
		</div>
	);
}
