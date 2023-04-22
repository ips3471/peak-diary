import { memo } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

interface AddReceiptBtnProps {
	onClick: () => void;
}

function AddReceiptBtn({ onClick }: AddReceiptBtnProps) {
	console.log('render add-receipt-btn');
	return (
		<button onClick={onClick} className={`flex items-center text-gray-500 p-1`}>
			<AiOutlinePlus />
			<span className={`text-brand text-xs font-medium `}>추가하기</span>
		</button>
	);
}

export default memo(AddReceiptBtn);
