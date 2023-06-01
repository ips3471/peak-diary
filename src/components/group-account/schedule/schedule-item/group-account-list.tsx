import { UserProfile } from '../../../../types/components/profile';
import NumPad from '../../../../util/Numpad';
import { CiSquareRemove } from 'react-icons/ci';
import GroupAccountPresenter from '../../../../presenter/group-account/GroupAccountPresenter';
import { useEffect, useState } from 'react';
import { ScheduleData } from '../../../../types/models/model';
import ProfileImage from './schedule-item-component/profile-image';

interface GroupAccountItemProps {
	user: UserProfile;
	item: ScheduleData;
	onPass: (item: ScheduleData) => void;
	onDelete: (item: ScheduleData) => void;
	onMove: (item: ScheduleData) => void;
}

export default function GroupAccountList({
	user,
	item,
	onPass,
	onDelete,
	onMove,
}: GroupAccountItemProps) {
	const [host, setHost] = useState<UserProfile>();
	const [openCalc, setOpenCalc] = useState(false);
	const {
		code,
		date,
		id,
		isDone,
		title,
		userLength,
		users,
		host: hostId,
	} = item;

	useEffect(() => {
		GroupAccountPresenter.users.findUserProfile(item.host).then(setHost);
	}, []);

	const handleEnter = (inputValue: number) => {
		console.log('handle enter');

		setOpenCalc(false);

		if (inputValue !== code) return;
		if (userLength === users?.length) {
			return alert('정원초과');
		}

		onPass(item);
		onMove(item);
	};

	const handlePass = () => {
		console.log('handle pass');

		if (users?.includes(user.uid)) {
			return onMove(item);
		}
		if (isDone) {
			return alert('정산이 마감되어 참여가 제한됩니다');
		}
		toggleCalc();
	};

	const toggleCalc = () => {
		console.log('toggle calc');

		setOpenCalc(prev => !prev);
	};

	const handleRemoveList = () => {
		const confirmed = window.confirm(`"${title}" 일정을 삭제할까요?`);
		confirmed && onDelete(item);
	};

	return (
		<li className='flex flex-col p-2 w-full bg-pureWhite/20 shadow-sm py-1 h-28 mb-3 rounded-lg gap-1'>
			<section className='flex justify-between mb-1 items-center'>
				<div className='flex items-center gap-1'>
					<span className='w-6 rounded-full overflow-hidden'>
						<ProfileImage url={host?.photoURL} />
					</span>
					<p className='text-sm'>{host?.name || ''}</p>
				</div>
				<div className='flex gap-2 items-center'>
					<span className='text-sm font-thin'>{date}</span>
					<span>
						{user.uid === hostId && (
							<button onClick={handleRemoveList} className='text-bodyAccent'>
								<CiSquareRemove />
							</button>
						)}
					</span>
				</div>
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
					{hostId === user.uid && !isDone && (
						<p>
							<span>참여코드 </span>
							<span className='text-brand/80 text-base font-semibold'>
								{code}
							</span>
						</p>
					)}
				</div>
				<div
					className={`relative p-1 text-sm ${
						isDone ? 'text-grey' : 'text-brand/70'
					} font-semibold`}
				>
					<button onClick={handlePass}>입장하기</button>
					<div className='absolute right-0'>
						{openCalc && (
							<NumPad
								title='참여코드 입력'
								onCancel={toggleCalc}
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
