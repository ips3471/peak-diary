import { UserProfile } from '../../../../types/components/profile';
import {
	CategoryId,
	ReceiptItem,
} from '../../../../types/group-account/group-account';
import FormContainer from '../../../forms/form-container';
import UserPaymentContainer from '../../../user-payment/user-payment-container';

interface UserPaymentSummaryProps {
	onClose: () => void;
	categoriesMap: Map<CategoryId, ReceiptItem[]>;
	allUsers: UserProfile[];
	host: UserProfile;
}

export default function UserPaymentSummary({
	onClose,
	categoriesMap,
	allUsers,
	host,
}: UserPaymentSummaryProps) {
	return (
		<FormContainer
			submitName='확인'
			onSubmit={onClose}
			onCancel={onClose}
			title='그룹정산 명세서'
		>
			{categoriesMap && (
				<UserPaymentContainer
					categoriesMap={categoriesMap}
					users={allUsers}
					host={host}
				/>
			)}
		</FormContainer>
	);
}
