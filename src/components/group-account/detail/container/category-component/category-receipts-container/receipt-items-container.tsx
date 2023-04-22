import { memo } from 'react';
import { ReceiptItem } from '../../../../../../types/group-account/group-account';
import ReceiptComponent from './receipt-component/receipt-component';

interface ReceiptItemsContainerProps {
	items: ReceiptItem[];
	onEdit: (receipt: ReceiptItem) => void;
}

function ReceiptItemsContainer({ items, onEdit }: ReceiptItemsContainerProps) {
	console.log('render receipt-items-container', items.length);

	return (
		<ul>
			{items.map(receipt => (
				<ReceiptComponent
					key={receipt.id}
					onSetAddForm={onEdit}
					receipt={receipt}
				/>
			))}
		</ul>
	);
}

export default memo(ReceiptItemsContainer);
