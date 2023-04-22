import { v4 as uuid } from 'uuid';
import {
	ScheduleProgress,
	UpdateReducer,
	User,
} from '../../types/group-account/group-account';
import GroupAccountScheduleDatabase from '../../database/group-account/group-account-schedule';
import { FormInputs } from '../../components/group-account/dialog/form';
import { ScheduleData } from '../../types/models/model';

class GroupAccountScheduleController {
	db: GroupAccountScheduleDatabase;
	user: User;
	state: ScheduleProgress;
	constructor(user: User, state: ScheduleProgress) {
		this.db = new GroupAccountScheduleDatabase(state);
		this.state = state;
		this.user = user;
	}

	initSchedules(dispatch: UpdateReducer<ScheduleData>) {
		this.db
			.getSchedules()
			.then(data => dispatch({ type: 'init', payload: data }));
	}

	addSchedule(form: FormInputs, dispatch: UpdateReducer<ScheduleData>) {
		const { date, title, userLength } = form;
		const element: ScheduleData = {
			id: uuid(),
			date: date.toString(),
			host: this.user.uid,
			isDone: false,
			title: title.toString(),
			userLength: Number(userLength),
			users: [this.user.uid],
			code: Math.floor(Math.random() * 9999),
		};
		this.db.addSchedule(element);
		dispatch({ type: 'add', payload: element });
		return element;
	}

	updateSchedule(item: ScheduleData, dispatch: UpdateReducer<ScheduleData>) {
		const updated: ScheduleData = {
			...item,
			users:
				item?.users?.length > 0
					? [...item.users, this.user.uid]
					: [this.user.uid],
		};
		this.db.updateSchedule(updated);
		dispatch({ type: 'update', payload: updated });
		return updated;
	}

	deleteSchedule(
		schedule: ScheduleData,
		dispatch: UpdateReducer<ScheduleData>,
	) {
		this.db.deleteSchedule(schedule.id);
		dispatch({ type: 'delete', payload: schedule.id });
	}
}

export default GroupAccountScheduleController;
