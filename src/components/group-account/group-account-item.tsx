import { useNavigate } from 'react-router-dom';
import { AuthUser } from '../../context/AuthContext';
import { GroupAccountItem } from '../../types/components/group-account';
import NumPad from '../../util/Numpad';

interface GroupAccountItemProps {
	user: AuthUser;
	item: GroupAccountItem;
	numpadTarget?: string;
	toggleNumpad: (item: GroupAccountItem | null) => void;
	onUpdate: (item: GroupAccountItem) => void;
}

export default function GroupAccountCard({
	user,
	item,
	numpadTarget,
	toggleNumpad,
	onUpdate,
}: GroupAccountItemProps) {
	const navigate = useNavigate();
	const handleEnter = (inputValue: number) => {
		toggleNumpad(null);

		if (inputValue !== item.code) return;

		const updated: GroupAccountItem = {
			...item,
			users: [...item.users, user.uid],
		};

		onUpdate(updated);
		moveToDetail();
	};

	const handlePass = () => {
		if (item.users.includes(user.uid)) {
			moveToDetail();
		}
		!numpadTarget && toggleNumpad(item);
	};

	const moveToDetail = () =>
		navigate('/group-account/' + item.id, { state: item });

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
				<div className='text-sm flex gap-2'>
					<p>
						<span>참여인원 </span>
						<span className='text-brand/80 text-base font-semibold'>
							{item.userLength}
						</span>
					</p>
					{item.host === user.uid && (
						<p>
							<span>참여코드 </span>
							<span className='text-brand/80 text-base font-semibold'>
								{item.code}
							</span>
						</p>
					)}
				</div>
				<button
					onClick={handlePass}
					className='relative p-1 text-sm text-brand/70 font-semibold'
				>
					<span>입장하기</span>
					<div className='max-w-xs absolute right-0'>
						{numpadTarget === item.id && (
							<NumPad
								onCancel={() => toggleNumpad(null)}
								type='password'
								onSubmit={handleEnter}
							/>
						)}
					</div>
				</button>
			</section>
		</li>
	);
}
