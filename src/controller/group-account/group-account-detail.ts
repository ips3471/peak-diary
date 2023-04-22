import { v4 as uuid } from 'uuid';
import {
	CategoryId,
	ReceiptAddForm,
	ReceiptCategory,
	ReceiptItem,
	User,
} from '../../types/group-account/group-account';
import GroupAccountDetailDatabase from '../../database/group-account/group-account-detail';
import { ReceiptData, ScheduleData } from '../../types/models/model';
import { Dispatch } from 'react';
import ProfilePresenter from '../../presenter/profile/ProfilePresenter';
import { UserProfile } from '../../types/components/profile';
import controls from '../../controls/controls';

type SetReceipts = Dispatch<
	React.SetStateAction<Map<CategoryId, ReceiptItem[]>>
>;

class GroupAccountDetailController {
	db: GroupAccountDetailDatabase;
	user: User;
	item: ScheduleData;
	userProfiles: UserProfile[];
	constructor(item: ScheduleData, user: User, userProfiles: UserProfile[]) {
		this.db = new GroupAccountDetailDatabase(item);
		this.user = user;
		this.item = item;
		this.userProfiles = userProfiles;
	}

	async getUserProfile(uid: string) {
		const res = await ProfilePresenter.get(uid);
		if (!res) throw new Error('user profile not exist');
		return res;
	}

	async initReceipts(update: SetReceipts) {
		this.db.getReceipts().then(categories => {
			if (!categories) return;

			update(prev => {
				const updated = new Map(prev);

				for (let category of prev.keys()) {
					const foundTarget = categories[category];

					if (foundTarget) {
						const items = Object.values(foundTarget);

						const userProfileUpdated = items.map(item => ({
							...item,
							category: controls.receiptCategory.find(c => c.id === category)!,
							coordinator: this.userProfiles.find(
								u => u.uid === item.coordinator,
							)!,
							usersToPay: this.userProfiles.filter(pf =>
								item.usersToPay.includes(pf.uid),
							),
							exceptedUsers: this.userProfiles.filter(
								pf => !item.usersToPay.includes(pf.uid),
							),
						}));

						updated.set(category, userProfileUpdated);
					}
				}
				return updated;
			});
		});
	}

	async addReceipt(receiptForm: ReceiptAddForm, update: SetReceipts) {
		const { category, usersToPay, coordinator, description, total } =
			receiptForm;

		const element: ReceiptData = {
			category,
			coordinator,
			description,
			total: Number(total),
			id: uuid(),
			usersToPay,
			receiptURL: receiptForm.receiptURL || '',
			paymentToEqual: Math.floor(Number(total) / usersToPay.length),
		};
		this.db.addReceipt(element);

		const updated: ReceiptItem = {
			...element,
			coordinator: this.userProfiles.find(u => u.uid === coordinator)!,
			usersToPay: this.userProfiles.filter(pf =>
				element.usersToPay.includes(pf.uid),
			),
			exceptedUsers: this.userProfiles.filter(
				pf => !element.usersToPay.includes(pf.uid),
			),
		};
		update(prevMap => {
			const items = prevMap.get(updated.category.id);
			if (!items) throw new Error('receiptsMap has not been initialized');
			return prevMap.set(updated.category.id, [...items, updated]);
		});
	}

	async updateReceipt(
		id: string,
		receiptForm: ReceiptAddForm,
		update: SetReceipts,
	) {
		const { category, usersToPay, coordinator, description, total } =
			receiptForm;

		const element: ReceiptData = {
			category,
			coordinator,
			description,
			total: Number(total),
			id,
			usersToPay,
			receiptURL: receiptForm.receiptURL || '',
			paymentToEqual: Math.floor(Number(total) / usersToPay.length),
		};
		this.db.updateReceipt(element);

		const updated: ReceiptItem = {
			...element,
			coordinator: this.userProfiles.find(u => u.uid === coordinator)!,
			usersToPay: this.userProfiles.filter(pf =>
				element.usersToPay.includes(pf.uid),
			),
			exceptedUsers: this.userProfiles.filter(
				pf => !element.usersToPay.includes(pf.uid),
			),
		};
		update(prevMap => {
			const items = prevMap.get(updated.category.id);
			if (!items) throw new Error('receiptsMap has not been initialized');
			return prevMap.set(
				updated.category.id,
				items.map(i => (i.id === updated.id ? updated : i)),
			);
		});
		return element;
	}

	deleteReceipt(receipt: ReceiptItem, update: SetReceipts) {
		this.db.deleteReceipt(receipt);

		update(prevMap => {
			const receipts = prevMap && prevMap.get(receipt.category.id);
			if (!receipts) {
				throw new Error('receipts array not found');
			}
			return prevMap.set(
				receipt.category.id,
				receipts.filter(r => r.id !== receipt.id),
			);
		});
	}
}

export default GroupAccountDetailController;
