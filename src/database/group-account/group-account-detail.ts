import {
	get,
	ref,
	set,
	update,
	remove,
	Database,
	getDatabase,
} from 'firebase/database';
import {
	CategoryId,
	ReceiptItem,
	ScheduleProgress,
} from '../../types/group-account/group-account';
import { firebaseApp } from '../../service/firebase/firebase';
import { ReceiptData, ScheduleData } from '../../types/models/model';

type FirebaseCloudData = {
	[category in CategoryId]?: { [key: string]: ReceiptData };
};

class GroupAccountDetailDatabase {
	db: Database;
	ref: string;

	constructor(scheduleItem: ScheduleData, state: ScheduleProgress) {
		this.ref = `groupAccounts/${state}/${scheduleItem.id}/receipts`;
		this.db = getDatabase(firebaseApp);
	}

	finishSchedule(item: ScheduleData) {
		remove(ref(this.db, `groupAccounts/pending/${item.id}`));
		set(ref(this.db, `groupAccounts/done/${item.id}`), item);
		console.log('finish schedule in db', item);
	}

	addReceipt(receipt: ReceiptData) {
		set(
			ref(this.db, `${this.ref}/${receipt.category.id}/${receipt.id}`),
			receipt,
		);
		console.log('add receipt in db', receipt);
	}

	updateReceipt(receipt: ReceiptData) {
		update(
			ref(this.db, `${this.ref}/${receipt.category.id}/${receipt.id}`),
			receipt,
		);
		console.log('receipt updated in db', receipt);
	}
	async getReceipts(): Promise<FirebaseCloudData | undefined> {
		const snapshot = await get(ref(this.db, `${this.ref}`));
		if (snapshot.exists()) {
			console.log('get schedules from db', snapshot.val());

			return snapshot.val();
		}
	}

	deleteReceipt(receipt: ReceiptItem) {
		remove(ref(this.db, `${this.ref}/${receipt.category.id}/${receipt.id}`));
		console.log('removed receipt', receipt.description);
	}
}

export default GroupAccountDetailDatabase;
