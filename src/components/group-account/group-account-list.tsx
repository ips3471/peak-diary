import { useNavigate } from 'react-router-dom';
import { GroupAccountItem } from '../../types/components/group-account';
import { UserProfile } from '../../types/components/profile';
import NumPad from '../../util/Numpad';
import { CiSquareRemove } from 'react-icons/ci';
import GroupAccountPresenter from '../../presenter/group-account/GroupAccountPresenter';
import { useEffect, useState } from 'react';

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
	const {
		code,
		date,
		id,
		isDone,
		title,
		userLength,
		users,
		host: histId,
	} = item;

	useEffect(() => {
		GroupAccountPresenter.users.findUserProfile(item.host).then(setHost);
	}, []);

	const handleEnter = (inputValue: number) => {
		toggleNumpad(null);

		if (inputValue !== code) return;
		if (userLength === users.length) {
			return alert('정원초과');
		}

		const updated: GroupAccountItem = {
			...item,
			users: item?.users ? [...users, user] : [user],
		};

		onUpdate(updated);
		moveToDetail();
	};

	const handlePass = () => {
		const uids = users?.map(user => user.uid) || [];
		if (uids.includes(user.uid)) {
			return moveToDetail();
		}
		if (isDone) {
			return alert('정산이 마감되어 참여가 제한됩니다');
		}
		!numpadTarget && toggleNumpad(item);
	};

	const handleRemoveList = () => {
		const confirmed = window.confirm(`${title} 일정을 삭제할까요?`);
		confirmed && onDelete(item);
	};

	const moveToDetail = () => navigate('/group-account/' + id, { state: item });

	return (
		<li className='flex flex-col p-2 w-full bg-pureWhite/20 shadow-sm py-1 h-28 mb-3 rounded-lg gap-1'>
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
					<span className='text-sm font-thin'>{date}</span>
					{user.uid === histId && (
						<button onClick={handleRemoveList} className='text-bodyAccent'>
							<CiSquareRemove />
						</button>
					)}
				</span>
			</section>
			<section className='flex-1 border-b text-sm'>{title}</section>
			<section className='flex justify-between items-center'>
				<div className='text-sm flex gap-2'>
					{!isDone && (
						<p>
							<span>참여인원 </span>
							<span className='text-brand/80 text-base font-semibold'>
								{users?.length || 0}/{userLength}
							</span>
						</p>
					)}
					{histId === user.uid && !isDone && (
						<p>
							<span>참여코드 </span>
							<span className='text-brand/80 text-base font-semibold'>
								{code}
							</span>
						</p>
					)}
				</div>
				<div
					onClick={handlePass}
					className={`relative p-1 text-sm ${
						isDone ? 'text-grey' : 'text-brand/70'
					} font-semibold`}
				>
					<button>입장하기</button>
					<div className='absolute right-0'>
						{numpadTarget === id && (
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
