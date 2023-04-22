import { useLocation } from 'react-router-dom';
import GroupAccountDetailController from '../../controller/group-account/group-account-detail';
import { UserProfile } from '../../types/components/profile';
import GroupAccountDetail from '../../components/group-account/detail/detail';
import { ScheduleData } from '../../types/models/model';
import { useEffect, useState } from 'react';
import ProfilePresenter from '../../presenter/profile/ProfilePresenter';

export default function ScheduleDetail() {
	const location = useLocation();
	const { item, user } = location.state as {
		item: ScheduleData;
		user: UserProfile;
	};
	const [scheduleController, setScheduleController] =
		useState<GroupAccountDetailController>();

	useEffect(() => {
		Promise.all(item.users.map(ProfilePresenter.get)).then(data => {
			setScheduleController(new GroupAccountDetailController(item, user, data));
		});
	}, []);

	return (
		<>
			{scheduleController && (
				<GroupAccountDetail controller={scheduleController} />
			)}
		</>
	);
}
