import { useLocation } from 'react-router-dom';
import GroupAccountDetailController from '../../controller/group-account/group-account-detail';
import ProfilePresenter from '../../presenter/profile/ProfilePresenter';
import { UserProfile } from '../../types/components/profile';
import { ScheduleData } from '../../types/models/model';
import { useEffect, useState } from 'react';
import GroupAccountDetailPage from './detail/detail';
import { ScheduleProgress } from '../../types/group-account/group-account';

export default function ScheduleDetail() {
	const location = useLocation();
	const { item, user, isDone } = location.state as {
		item: ScheduleData;
		user: UserProfile;
		isDone: ScheduleProgress;
	};
	const [scheduleController, setScheduleController] =
		useState<GroupAccountDetailController>();

	useEffect(() => {
		Promise.all(item.users.map(ProfilePresenter.get)).then(data => {
			setScheduleController(
				new GroupAccountDetailController(item, user, data, isDone),
			);
		});
	}, []);

	return (
		<>
			{scheduleController && (
				<GroupAccountDetailPage controller={scheduleController} />
			)}
		</>
	);
}
