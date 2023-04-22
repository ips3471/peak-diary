import { useEffect, useReducer } from 'react';
import GroupAccountScheduleController from '../../../../controller/group-account/group-account-schedule';
import { GroupAccountReducer } from '../../../../types/group-account/group-account';
import groupAccountReducer from '../../../../reducer/group-account/groupAccount';
import { AiOutlinePlus } from 'react-icons/ai';
import { createPortal } from 'react-dom';
import ScheduleForm, { FormInputs } from '../../dialog/form';
import GroupAccountList from '../../group-account-list';
import { useNavigate } from 'react-router-dom';
import { ScheduleData } from '../../../../types/models/model';

interface ScheduleByProgressProps {
	controller: GroupAccountScheduleController;
	onToggleDialog: () => void;
	openDialog: boolean;
}

export default function ScheduleByProgress({
	controller,
	onToggleDialog,
	openDialog,
}: ScheduleByProgressProps) {
	const [schedules, dispatch] = useReducer<GroupAccountReducer<ScheduleData>>(
		groupAccountReducer,
		[],
	);
	const navigate = useNavigate();

	useEffect(() => {
		controller.initSchedules(dispatch);
	}, [controller]);

	const handleSubmit = (data: FormInputs) => {
		controller.addSchedule(data, dispatch);
	};

	const moveToDetail = (item: ScheduleData) => {
		navigate('/group-account/' + item.id, {
			state: {
				item,
				user: controller.user,
			},
		});
	};

	return (
		<div>
			<header className='flex justify-end mb-3'>
				<button
					onClick={onToggleDialog}
					className={`flex items-center text-gray-500 border rounded-3xl p-1 ${
						controller.state === 'pending' ? 'visible' : 'invisible'
					}`}
				>
					<AiOutlinePlus />
					<span className={`text-zinc-900 text-xs font-medium `}>만들기</span>
				</button>
			</header>
			<ul>
				{schedules.map(s => (
					<GroupAccountList
						item={s}
						onDelete={() => controller.deleteSchedule(s, dispatch)}
						onPass={(item: ScheduleData) => {
							controller.updateSchedule(item, dispatch);
						}}
						user={controller.user}
						onMove={moveToDetail}
					/>
				))}
			</ul>
			{openDialog &&
				createPortal(
					<ScheduleForm onCancel={onToggleDialog} onSubmit={handleSubmit} />,
					document.body,
				)}
		</div>
	);
}
