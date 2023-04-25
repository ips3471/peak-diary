import { useMemo } from 'react';
import { calculateUserPayment } from '../../../../api/group-account/calculate-user-payment';
import { UserProfile } from '../../../../types/components/profile';
import { CategoryItems } from '../../../../types/group-account/group-account';
import FormContainer from '../../../forms/form-container';
import UserPaymentContainer from '../../detail/payment-result/payment-container/payment-container';

interface UserPaymentSummaryProps {
	onClose: () => void;
	userProfiles: UserProfile[];
	items: CategoryItems;
	host: UserProfile;
}

export default function UserPaymentSummary({
	onClose,
	userProfiles,
	host,
	items,
}: UserPaymentSummaryProps) {
	console.log('render');

	const userPayments = useMemo(
		() => calculateUserPayment(userProfiles, items),
		[items],
	);

	console.log(userPayments);

	return (
		<FormContainer
			submitName='확인'
			onSubmit={onClose}
			onCancel={onClose}
			title='그룹정산 명세서'
		>
			{userPayments && (
				<UserPaymentContainer userPayments={userPayments} host={host} />
			)}
		</FormContainer>
	);
}
