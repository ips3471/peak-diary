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
} from '../../types/group-account/group-account';
import { firebaseApp } from '../../service/firebase/firebase';
import { ReceiptData, ScheduleData } from '../../types/models/model';

type FirebaseCloudData = {
	[category in CategoryId]?: { [key: string]: ReceiptData };
};

class GroupAccountDetailDatabase {
	db: Database;
	ref: string;

	constructor(scheduleItem: ScheduleData) {
		this.ref = `groupAccounts/pending/${scheduleItem.id}/receipts`;
		this.db = getDatabase(firebaseApp);
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
			return snapshot.val();
		}
	}

	deleteReceipt(receipt: ReceiptItem) {
		remove(ref(this.db, `${this.ref}/${receipt.category.id}/${receipt.id}`));
		console.log('removed receipt', receipt.description);
	}
}

export default GroupAccountDetailDatabase;
