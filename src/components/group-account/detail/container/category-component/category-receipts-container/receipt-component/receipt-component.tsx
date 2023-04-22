import { useAuthContext } from '../../../../../../../context/AuthContext';
import { ReceiptItem } from '../../../../../../../types/group-account/group-account';
import ReceiptValue from './receipt-value/receipt-value';
import ReceiptDescription from './receipt-description/receipt-description';
import ReceiptName from './receipt-name/receipt-name';
import ReceiptExceptedUsers from './receipt-addon/receipt-excepted-users';
import { memo } from 'react';

interface ReceiptProps {
	receipt: ReceiptItem;
	onSetAddForm: (receipt: ReceiptItem) => void;
}

function ReceiptComponent({ receipt, onSetAddForm }: ReceiptProps) {
	const { user } = useAuthContext();
	if (!user) return null;

	return (
		<li className='py-1'>
			<div className='flex justify-between text-sm text-dark/90'>
				<div className='flex flex-1 gap-2'>
					<ReceiptName name={receipt.coordinator.name} />
					<ReceiptDescription
						receipt={receipt}
						onEdit={onSetAddForm}
						isAuthorized={
							!!(user.uid === receipt.coordinator.uid || user.isAdmin)
						}
					/>
				</div>
				<ReceiptValue total={receipt.total} />
			</div>
			{receipt.exceptedUsers.length > 0 && (
				<ReceiptExceptedUsers exceptedUsers={receipt.exceptedUsers} />
			)}
		</li>
	);
}

export default memo(ReceiptComponent);
