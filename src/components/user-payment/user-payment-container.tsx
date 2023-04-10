import { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import ProfilePresenter from '../../presenter/profile/ProfilePresenter';
import {
	Category,
	ReceiptItem,
	UserPayment,
} from '../../types/components/group-account';
import { UserProfile } from '../../types/components/profile';
import UserPaymentComponent from './user-payment-component';

interface UserPaymentContainerProps {
	categoriesMap: Map<Category, ReceiptItem[]>;
	users: UserProfile[];
	host: string;
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
	const [account, setAccount] = useState<string | null>(null);
	useEffect(() => {
		categoriesMap && setUserPayment(initPayment(categoriesMap));
		ProfilePresenter.get(host).then(host => host && setAccount(host.account));
	}, []);

	function initPayment(categoriesMap?: Map<Category, ReceiptItem[]>) {
		if (!categoriesMap) return;

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
			const { coordinatorUid, paymentToEqual, total, usersToPay } = curr;
			return acc.map(userPayment => {
				let updated = { ...userPayment };
				updated =
					userPayment.uid === coordinatorUid
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
					<div className='flex justify-between text-grey'>
						<span>입금계좌</span>
						<span>{account}</span>
					</div>
				)}
				<button
					onClick={() => setDisplayTaget(displayAll ? 'me' : 'all')}
					className='text-brand mt-3 w-full p-4'
				>
					{displayAll ? '내 정산 보기' : '전체보기'}{' '}
				</button>
			</div>
		</>
	);
}
