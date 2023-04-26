import { memo, useCallback, useState } from 'react';
import { ReceiptItem } from '../../../../../../../types/group-account/group-account';
import PaymentComponentHeader from './payment-component-header/payment-component-header';
import PaymentComponentItem from './payment-component-item/payment-component-item';

interface PaymentComponentMainProps {
	items: ReceiptItem[];
	userId: string;
}
export type ReceiptItemId = string | null;

function PaymentComponentMain({ items, userId }: PaymentComponentMainProps) {
	console.log('render');
	const [openImage, setOpenImage] = useState<ReceiptItemId>(null);
	const handleOpenImage = useCallback(
		(id: string) => {
			if (openImage === id) {
				setOpenImage(null);
			} else {
				setOpenImage(id);
			}
		},
		[openImage],
	);

	return (
		<>
			<PaymentComponentHeader />
			<ul className='border-y py-1 my-1'>
				{items.map(item => (
					<PaymentComponentItem
						targetImage={openImage}
						onOpenImage={handleOpenImage}
						item={item}
						userId={userId}
						key={item.id}
					/>
				))}
			</ul>
		</>
	);
}

export default memo(PaymentComponentMain);
