import { useState } from 'react';
import { useAuthContext } from '../../../../../context/AuthContext';
import { UserPayment } from '../../../../../types/group-account/group-account';
import { UserProfile } from '../../../../../types/components/profile';
import PaymentComponent from './payment-component/payment-component';
import PaymentToggleBtn from './payment-toggleBtn/payment-toggleBtn';
import PaymentAccount from './payment-account/payment-account';

interface UserPaymentContainerProps {
	host: UserProfile;
	userPayments: UserPayment[];
}
export type PaymentDisplayType = 'me' | 'all';

export default function UserPaymentContainer({
	host,
	userPayments,
}: UserPaymentContainerProps) {
	console.log('render');

	const [displayToggleType, setDisplayToggleType] =
		useState<PaymentDisplayType>('me');
	const { user } = useAuthContext();

	const handleToggle = () => {
		if (displayToggleType === 'all') {
			return setDisplayToggleType('me');
		}
		if (displayToggleType === 'me') {
			return setDisplayToggleType('all');
		}
	};

	const isHost = host.uid === user?.uid;
	const account = host.account;

	return (
		<>
			<ul className=' overflow-y-scroll scrollbar-hide'>
				{userPayments.length > 0 &&
					userPayments.map(userPayment => (
						<PaymentComponent
							isMe={userPayment.user.uid === user?.uid}
							displayTarget={displayToggleType}
							key={userPayment.user.uid}
							userPayment={userPayment}
						/>
					))}
			</ul>
			<div className='text-center'>
				{displayToggleType === 'me' && (
					<PaymentAccount account={account} isHost={isHost} />
				)}
				<PaymentToggleBtn
					displayType={displayToggleType}
					onToggle={handleToggle}
				/>
			</div>
		</>
	);
}
