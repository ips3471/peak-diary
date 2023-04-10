import { Dispatch, SetStateAction } from 'react';
import { GroupAccountState } from '../../../types/components/group-account';

interface TabItemProps {
	state: GroupAccountState;
	active: GroupAccountState;
	setState: Dispatch<SetStateAction<GroupAccountState>>;
	text: string;
}

export default function TabItem({
	text,
	setState,
	state,
	active,
}: TabItemProps) {
	return (
		<section className='flex-1'>
			<button
				className='pb-2 text-brand font-medium w-full'
				onClick={() => setState(state)}
			>
				{text}
			</button>
			<div
				className={` ${
					state === active ? 'visible' : 'invisible'
				} w-full h-0.5 bg-brand`}
			></div>
		</section>
	);
}
