import { UserProfile } from '../../types/components/profile';
import {
	CategoryItems,
	ReceiptItem,
	UserPayment,
} from '../../types/group-account/group-account';
import { concatItems } from '../global/global-apis';

const mapUserPaymentContainer = (user: UserProfile): UserPayment => ({
	user,
	toPay: 0,
	paid: 0,
	receipts: [],
});

const accumulateItems = (categoryItems: CategoryItems) => {
	const itemsByCategory = Object.values(categoryItems);
	return itemsByCategory.reduce(concatItems<ReceiptItem>, []);
};

function sumForMatched(
	userPayment: UserPayment,
	isMatched: boolean,
	key: keyof Pick<UserPayment, 'paid' | 'toPay'>,
	value: number,
): UserPayment {
	return isMatched
		? { ...userPayment, [key]: userPayment[key] + value }
		: userPayment;
}

function concatForMatched(
	userPayment: UserPayment,
	isMatched: boolean,
	key: keyof Pick<UserPayment, 'receipts'>,
	item: ReceiptItem,
): UserPayment {
	return isMatched
		? { ...userPayment, [key]: [...userPayment.receipts, item] }
		: userPayment;
}

const sumUserPayment = (userPayment: UserPayment, item: ReceiptItem) => {
	const { coordinator, paymentToEqual, total, usersToPay } = item;

	userPayment = sumForMatched(
		userPayment,
		userPayment.user.uid === coordinator.uid,
		'paid',
		total,
	);
	userPayment = sumForMatched(
		userPayment,
		usersToPay.includes(userPayment.user),
		'toPay',
		paymentToEqual,
	);

	return userPayment;
};

const collectUserReceipts = (userPayment: UserPayment, item: ReceiptItem) =>
	concatForMatched(
		userPayment,
		item.usersToPay.includes(userPayment.user),
		'receipts',
		item,
	);

type MapUserPayment = (
	userPayment: UserPayment,
	item: ReceiptItem,
) => UserPayment;

const mapUserPayments = (
	userPayments: UserPayment[],
	curr: ReceiptItem,
	mapFn: MapUserPayment,
) => userPayments.map(userPayment => mapFn(userPayment, curr));

export function calculateUserPayment(
	users: UserProfile[],
	categoryItems: CategoryItems,
) {
	console.log('calculating payments...');

	const accumulated = accumulateItems(categoryItems);
	const paymentContainer: UserPayment[] = users.map(mapUserPaymentContainer);

	const hasSumed = accumulated.reduce(
		(userPayments: UserPayment[], curr: ReceiptItem) =>
			mapUserPayments(userPayments, curr, sumUserPayment),
		paymentContainer,
	);
	const receiptsAdded = accumulated.reduce(
		(userPayments: UserPayment[], curr: ReceiptItem) =>
			mapUserPayments(userPayments, curr, collectUserReceipts),
		hasSumed,
	);

	return receiptsAdded;
}
