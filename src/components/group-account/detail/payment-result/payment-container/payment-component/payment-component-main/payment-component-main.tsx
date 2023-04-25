import { memo } from 'react';
import { ReceiptItem } from '../../../../../../../types/group-account/group-account';
import PaymentComponentHeader from './payment-component-header/payment-component-header';
import PaymentComponentItem from './payment-component-item/payment-component-item';

interface PaymentComponentMainProps {
	items: ReceiptItem[];
	userId: string;
}

function PaymentComponentMain({ items, userId }: PaymentComponentMainProps) {
	console.log('render');

	return (
		<>
			<PaymentComponentHeader />
			<ul className='border-y py-1 my-1'>
				{items.map(item => (
					<PaymentComponentItem item={item} userId={userId} key={item.id} />
				))}
			</ul>
		</>
	);
}

export default memo(PaymentComponentMain);
