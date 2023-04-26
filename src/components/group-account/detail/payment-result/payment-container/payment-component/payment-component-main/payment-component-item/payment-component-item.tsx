import { memo, useCallback } from 'react';
import { ReceiptItem } from '../../../../../../../../types/group-account/group-account';
import PaymentComponentItemDescription from './payment-component-item-description/payment.component.item.description';
import PaymentComponentItemValues from './payment-component-item-values/payment-component-item-values';
import { ReceiptItemId } from '../payment-component-main';
import PaymentComponentItemImage from './payment-component-item-image/payment-component-item-image';

interface PaymentComponentItemProps {
	item: ReceiptItem;
	userId: string;
	onOpenImage: (id: string) => void;
	targetImage: ReceiptItemId;
}

function PaymentComponentItem({
	item,
	userId,
	onOpenImage,
	targetImage,
}: PaymentComponentItemProps) {
	console.log('render');
	const { coordinator, description, total, usersToPay, receiptURL, id } = item;
	const isOpen = id === targetImage;

	const handleOpenImage = useCallback(
		(id: string) => {
			onOpenImage(id);
		},
		[isOpen],
	);

	return (
		<li>
			<div className='flex justify-between'>
				<p className='w-2/6 '>
					<PaymentComponentItemDescription
						id={id}
						onOpenImage={handleOpenImage}
						description={description}
						url={receiptURL}
					/>
				</p>
				<div className='w-4/6 flex justify-end'>
					<PaymentComponentItemValues
						total={total}
						equalValue={total / usersToPay.length}
						isCoordinator={userId === coordinator.uid}
					/>
				</div>
			</div>
			{receiptURL && (
				<PaymentComponentItemImage isOpen={isOpen} src={receiptURL} />
			)}
		</li>
	);
}

export default memo(PaymentComponentItem);
