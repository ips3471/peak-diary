import {
	ReceiptCategory,
	ReceiptItem,
} from '../../../../../types/group-account/group-account';
import { UserProfile } from '../../../../../types/components/profile';
import ReceiptItemsContainer from './category-receipts-container/receipt-items-container';
import CategorySums from './category-sums/category-sums';
import CategoryHeader from './category-header/category-header';
import { memo, useCallback, useMemo } from 'react';

interface ReceiptItemProps {
	category: ReceiptCategory;
	onChangeDialogTarget: (target: ReceiptItem) => void;
	items: ReceiptItem[];
	users: UserProfile[];
	user: UserProfile;
}

function ReceiptsByCategory({
	category,
	onChangeDialogTarget,
	items,
	user,
	users,
}: ReceiptItemProps) {
	console.log('render', category.name);

	const defaultForm: ReceiptItem = useMemo(() => {
		return {
			category,
			coordinator: user,
			description: '',
			exceptedUsers: [],
			paymentToEqual: 0,
			receiptURL: '',
			total: 0,
			usersToPay: users,
			id: '',
		};
	}, [users, user, category]);

	const sums = items.reduce((sum, curr) => sum + (curr.total || 0), 0);

	const handleChangeDialog = useCallback(() => {
		onChangeDialogTarget(defaultForm);
	}, [defaultForm]);

	return (
		<li className={`mb-6 shadow-sm p-2 rounded-md `}>
			<CategoryHeader onAdd={handleChangeDialog} headerName={category.name} />
			<ReceiptItemsContainer items={items} onEdit={onChangeDialogTarget} />
			<CategorySums sums={sums} />
		</li>
	);
}

export default memo(ReceiptsByCategory);
