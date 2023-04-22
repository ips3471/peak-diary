import { memo } from 'react';
import AddReceiptBtn from '../../../../receipt/button/add-receipt-btn';

interface CategoryHeaderProps {
	onAdd: () => void;
	headerName: string;
}

function CategoryHeader({ onAdd, headerName }: CategoryHeaderProps) {
	console.log('render');

	return (
		<section className='flex justify-between mb-1'>
			<h1 className=' text-brand font-medium mb-1'>{headerName}</h1>
			<AddReceiptBtn onClick={onAdd} />
		</section>
	);
}

export default memo(CategoryHeader);
