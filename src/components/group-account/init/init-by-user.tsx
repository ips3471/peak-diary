import { useMemo, useState } from 'react';
import {
	ScheduleProgress,
	User,
} from '../../../types/group-account/group-account';
import controls from '../../../controls/controls';
import BodyContainer from '../../body/main-container';
import ScheduleProgressStateBtn from '../../buttons/tab/tab-item';
import ScheduleByProgress from '../schedule/init/init-by-progress';
import GroupAccountScheduleController from '../../../controller/group-account/group-account-schedule';

interface GroupAccountProps {
	user: User;
}

export default function InitGroupAccounts({ user }: GroupAccountProps) {
	const [selectedProgress, setSelectedProgress] =
		useState<ScheduleProgress>('pending');
	const [openDialog, setOpenDialog] = useState(false);
	console.log('render group-account app');

	const toggleDialog = () => {
		setOpenDialog(prev => !prev);
	};

	const ScheduleController = useMemo(() => {
		console.log('컨트롤러를 업데이트');

		return new GroupAccountScheduleController(user, selectedProgress);
	}, [selectedProgress]);

	return (
		<BodyContainer onBlur={openDialog}>
			<nav className='flex mb-1 justify-between text-center'>
				{controls.groupAccount.header.progressStates.map(state => (
					<ScheduleProgressStateBtn
						key={state}
						state={state}
						activeState={selectedProgress}
						onClick={setSelectedProgress}
					/>
				))}
			</nav>
			<main>
				<ScheduleByProgress
					openDialog={openDialog}
					controller={ScheduleController}
					onToggleDialog={toggleDialog}
				/>
			</main>
		</BodyContainer>
	);
}
