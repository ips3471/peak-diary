import { BsFillPencilFill } from 'react-icons/bs';
import { ReceiptItem } from '../../../../../../../../types/group-account/group-account';

interface ReceiptDescriptionProps {
	isAuthorized: boolean;
	receipt: ReceiptItem;
	onEdit: (item: ReceiptItem) => void;
}

export default function ReceiptDescription({
	isAuthorized,
	receipt,
	onEdit,
}: ReceiptDescriptionProps) {
	return (
		<span className='flex items-center gap-2'>
			<p>{receipt.description}</p>
			{isAuthorized && (
				<button onClick={() => onEdit(receipt)}>
					<BsFillPencilFill />
				</button>
			)}
		</span>
	);
}
