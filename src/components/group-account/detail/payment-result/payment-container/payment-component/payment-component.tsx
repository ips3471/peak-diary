import { UserPayment } from '../../../../../../types/group-account/group-account';
import { PaymentDisplayType } from '../payment-container';
import PaymentComponentTitle from './payment-component-title/payment-component-title';
import PaymentComponentMain from './payment-component-main/payment-component-main';
import PaymentComponentOutputFinal from './payment-component-output/payment-component-output-final/payment-component-output-final';
import PaymentComponentOutputDetail from './payment-component-output/payment-component-output-detail/payment-component-output-detail';
import { memo } from 'react';

interface UserPaymentProps {
	userPayment: UserPayment;
	isMe: boolean;
	displayTarget: PaymentDisplayType;
}

function PaymentComponent({
	userPayment,
	isMe,
	displayTarget,
}: UserPaymentProps) {
	console.log('render');

	const { user, paid, toPay, receipts } = userPayment;

	const display = displayTarget === 'all' ? true : isMe ? true : false;

	return (
		<li
			key={userPayment.user.uid}
			className={`flex flex-col mb-6 py-5  ${
				display ? 'visible' : 'hidden'
			} bg-pureWhite/10 shadow-sm rounded-lg p-1`}
		>
			<PaymentComponentTitle name={user.name} isMe={isMe} />
			<div className='my-1 '>
				<PaymentComponentMain items={receipts} userId={user.uid} />
			</div>

			<div className='flex flex-col p-1'>
				<PaymentComponentOutputDetail paid={paid} toPay={toPay} />
				<PaymentComponentOutputFinal
					isPayBackTarget={paid - toPay > 0}
					value={toPay - paid}
				/>
			</div>
		</li>
	);
}

export default memo(PaymentComponent);
