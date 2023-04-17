import {
	getDatabase,
	get,
	ref,
	set,
	update,
	remove,
	Database,
} from 'firebase/database';
import { firebaseApp } from '../../service/firebase/firebase';
import {
	GroupAccountSchedule,
	ScheduleProgress,
} from '../../types/group-account/group-account';

class GroupAccountScheduleDatabase {
	private db: Database;
	ref: string;
	constructor(state: ScheduleProgress) {
		this.ref = 'groupAccounts/' + state;
		this.db = getDatabase(firebaseApp);
	}

	addSchedule(schedule: GroupAccountSchedule) {
		set(ref(this.db, `${this.ref}/${schedule.id}`), schedule);
		console.log('add schedule in db', schedule);
	}

	updateSchedule(schedule: GroupAccountSchedule) {
		update(ref(this.db, `${this.ref}/${schedule.id}`), schedule);
		console.log('schedule updated in db', schedule);
	}
	async getSchedules(): Promise<GroupAccountSchedule[]> {
		const snapshot = await get(ref(this.db, this.ref));
		if (snapshot.exists()) {
			return Object.values(snapshot.val());
		} else {
			return [];
		}
	}

	deleteSchedule(scheduleId: string) {
		remove(ref(this.db, `${this.ref}/${scheduleId}`));
		console.log('removed schedule', scheduleId);
	}
}

export default GroupAccountScheduleDatabase;
