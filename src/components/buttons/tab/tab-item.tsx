import { ScheduleProgress } from '../../../types/group-account/group-account';

interface TabItemProps {
	state: ScheduleProgress;
	onClick: (state: ScheduleProgress) => void;
	activeState: ScheduleProgress;
}

export default function ScheduleProgressStateBtn({
	onClick,
	state,
	activeState,
}: TabItemProps) {
	return (
		<section className='flex-1'>
			<button
				className={`pb-2 ${
					state === activeState ? 'text-brand' : ''
				} font-medium w-full`}
				onClick={() => onClick(state)}
			>
				{state === 'pending' ? '진행중' : '마감'}
			</button>
			<div
				className={`w-full h-0.5 ${state === activeState ? 'bg-brand' : ''}`}
			></div>
		</section>
	);
}
