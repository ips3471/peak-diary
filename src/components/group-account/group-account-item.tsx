import React from 'react';
import { AuthUser } from '../../context/AuthContext';
import { GroupAccountItem } from '../../types/components/group-account';

interface GroupAccountItemProps {
	user: AuthUser;
	item: GroupAccountItem;
}

export default function GroupAccountCard({
	user,
	item,
}: GroupAccountItemProps) {
	return (
		<li className='flex flex-col p-2 w-full bg-pureWhite/50 py-1 h-28 mb-3 rounded-lg gap-1'>
			<section className='flex justify-between mb-1 items-center'>
				<span className='flex items-center gap-1'>
					<img
						className='w-7 rounded-full'
						src={user?.photoURL || process.env.PUBLIC_URL + 'logo192.png'}
						alt='host'
					/>
					<p className='text-sm'>{user?.name || 'null'}</p>
				</span>
				<span className='text-sm font-thin'>{item.date}</span>
			</section>
			<section className='flex-1 border-b text-sm'>{item.title}</section>
			<section className='flex justify-between items-center'>
				<p className='text-sm'>
					참여인원{' '}
					<span className='text-brand/80 text-base font-semibold'>
						{item.userLength}
					</span>
				</p>
				<button className='p-1 text-sm text-brand/70 font-semibold'>
					입장하기
				</button>
			</section>
		</li>
	);
}
