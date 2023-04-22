import { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import {
	CategoryId,
	ReceiptItem,
	UserPayment,
} from '../../types/group-account/group-account';
import { UserProfile } from '../../types/components/profile';
import UserPaymentComponent from './user-payment-component';

interface UserPaymentContainerProps {
	categoriesMap: Map<CategoryId, ReceiptItem[]>;
	users: UserProfile[];
	host: UserProfile;
}
export type DisplayTarget = 'me' | 'all';

export default function UserPaymentContainer({
	categoriesMap,
	users,
	host,
}: UserPaymentContainerProps) {
	const [userPayments, setUserPayment] = useState<UserPayment[]>();
	const [displayTarget, setDisplayTaget] = useState<DisplayTarget>('me');
	const displayAll = displayTarget === 'all';
	const { user } = useAuthContext();
	useEffect(() => {
		categoriesMap && setUserPayment(initPayment(categoriesMap));
	}, []);

	function initPayment(categoriesMap: Map<CategoryId, ReceiptItem[]>) {
		const paymentContainer: UserPayment[] = users.map(user => ({
			uid: user.uid,
			name: user.name,
			toPay: 0,
			paid: 0,
			receipts: [],
		}));

		const categories = Object.fromEntries(categoriesMap);

		const accumulated = Object.values(categories).reduce((acc, curr) => {
			return acc.concat(curr);
		}, []);

		const calculated = accumulated.reduce((acc, curr) => {
			const { coordinator, paymentToEqual, total, usersToPay } = curr;
			return acc.map(userPayment => {
				let updated = { ...userPayment };
				updated =
					userPayment.uid === coordinator.uid
						? { ...updated, paid: updated.paid + total }
						: updated;

				return usersToPay.map(u => u.uid).includes(userPayment.uid)
					? {
							...updated,
							toPay: updated.toPay + paymentToEqual,
							receipts: [...updated.receipts, curr],
					  }
					: updated;
			});
		}, paymentContainer);

		return calculated;
	}

	return (
		<>
			<ul className=' overflow-y-scroll scrollbar-hide'>
				{userPayments?.map(userPayment => (
					<UserPaymentComponent
						isMe={userPayment.uid === user?.uid}
						displayTarget={displayTarget}
						key={userPayment.uid}
						userPayment={userPayment}
					/>
				))}
			</ul>
			<div className=' text-center'>
				{!displayAll && (
					<div className='flex justify-between text-sm text-grey'>
						<span>입금계좌</span>
						<span>{host.account}</span>
					</div>
				)}
				<button
					type='button'
					onClick={() => setDisplayTaget(displayAll ? 'me' : 'all')}
					className='text-brand mt-3 w-full p-4'
				>
					{displayAll ? '내 정산 보기' : '전체보기'}{' '}
				</button>
			</div>
		</>
	);
}
