import { useNavigate } from 'react-router-dom';
import { GroupAccountItem } from '../../types/components/group-account';
import { UserProfile } from '../../types/components/profile';
import NumPad from '../../util/Numpad';
import { CiSquareRemove } from 'react-icons/ci';
import GroupAccountPresenter from '../../presenter/group-account/GroupAccountPresenter';
import { useEffect, useMemo, useState } from 'react';

interface GroupAccountItemProps {
	user: UserProfile;
	item: GroupAccountItem;
	numpadTarget?: string;
	toggleNumpad: (item: GroupAccountItem | null) => void;
	onUpdate: (item: GroupAccountItem) => void;
	onDelete: (item: GroupAccountItem) => void;
}

export default function GroupAccountList({
	user,
	item,
	numpadTarget,
	toggleNumpad,
	onUpdate,
	onDelete,
}: GroupAccountItemProps) {
	const [host, setHost] = useState<UserProfile>();
	const navigate = useNavigate();

	useEffect(() => {
		GroupAccountPresenter.users.findUserProfile(item.host).then(setHost);
	}, []);

	const handleEnter = (inputValue: number) => {
		toggleNumpad(null);

		if (inputValue !== item.code) return;

		const updated: GroupAccountItem = {
			...item,
			users: item?.users ? [...item.users, user] : [user],
		};

		GroupAccountPresenter.payments.add(item.id, user.uid);

		onUpdate(updated);
		moveToDetail();
	};

	const handlePass = () => {
		const uids = item.users?.map(user => user.uid) || [];
		if (uids.includes(user.uid)) {
			moveToDetail();
		}
		!numpadTarget && toggleNumpad(item);
	};

	const handleRemoveList = () => {
		const confirmed = window.confirm(`${item.title} 일정을 삭제할까요?`);
		confirmed && onDelete(item);
	};

	const moveToDetail = () =>
		navigate('/group-account/' + item.id, { state: item });

	return (
		<li className='flex flex-col p-2 w-full bg-pureWhite/50 py-1 h-28 mb-3 rounded-lg gap-1'>
			<section className='flex justify-between mb-1 items-center'>
				<span className='flex items-center gap-1'>
					<img
						className='w-7 rounded-full'
						src={host?.photoURL || process.env.PUBLIC_URL + 'logo192.png'}
						alt='host'
					/>
					<p className='text-sm'>{host?.name || ''}</p>
				</span>
				<span className='flex gap-2 items-center'>
					<span className='text-sm font-thin'>{item.date}</span>
					{user.uid === item.host && (
						<button onClick={handleRemoveList} className='text-bodyAccent'>
							<CiSquareRemove />
						</button>
					)}
				</span>
			</section>
			<section className='flex-1 border-b text-sm'>{item.title}</section>
			<section className='flex justify-between items-center'>
				<div className='text-sm flex gap-2'>
					<p>
						<span>참여인원 </span>
						<span className='text-brand/80 text-base font-semibold'>
							{item.users?.length || 0}/{item.userLength}
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
				<div
					onClick={handlePass}
					className='relative p-1 text-sm text-brand/70 font-semibold'
				>
					<button>입장하기</button>
					<div className='absolute right-0'>
						{numpadTarget === item.id && (
							<NumPad
								title='참여코드 입력'
								onCancel={() => toggleNumpad(null)}
								type='password'
								onSubmit={handleEnter}
							/>
						)}
					</div>
				</div>
			</section>
		</li>
	);
}
