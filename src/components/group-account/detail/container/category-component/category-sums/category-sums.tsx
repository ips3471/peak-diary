import { memo } from 'react';

interface CategorySumsProps {
	sums: number;
}

function CategorySums({ sums }: CategorySumsProps) {
	console.log('render category-sums');

	return (
		<section className='flex justify-between py-2 text-sm text-brand'>
			<span>합계</span>
			<span>{sums.toLocaleString('ko')}</span>
		</section>
	);
}

export default memo(CategorySums);
