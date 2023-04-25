import { memo } from 'react';
import { ReceiptItem } from '../../../../../../../../types/group-account/group-account';
import PaymentComponentItemDescription from './payment-component-item-description/payment.component.item.description';
import PaymentComponentItemValues from './payment-component-item-values/payment-component-item-values';

interface PaymentComponentItemProps {
	item: ReceiptItem;
	userId: string;
}

function PaymentComponentItem({ item, userId }: PaymentComponentItemProps) {
	console.log('render');

	const { coordinator, description, total, usersToPay } = item;
	return (
		<li>
			<div className='flex justify-between'>
				<p className='w-2/6 line-clamp-1'>
					<PaymentComponentItemDescription description={description} />
				</p>
				<div className='w-4/6 flex justify-end'>
					<PaymentComponentItemValues
						total={total}
						equalValue={total / usersToPay.length}
						isCoordinator={userId === coordinator.uid}
					/>
				</div>
			</div>
		</li>
	);
}

export default memo(PaymentComponentItem);
