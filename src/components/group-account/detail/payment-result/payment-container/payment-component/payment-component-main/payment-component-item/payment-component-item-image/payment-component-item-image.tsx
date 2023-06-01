import { memo } from 'react';
import LoadingSpinner from '../../../../../../../../forms/loading-spinner';
import { useImage } from '../../../../../../../../../hooks/useImage';

interface PaymentComponentItemImageProps {
	isOpen: boolean;
	src: string;
}

function PaymentComponentItemImage({
	isOpen,
	src,
}: PaymentComponentItemImageProps) {
	console.log('render');

	const picture = useImage(src);

	if (!isOpen) return null;

	return (
		<article className='m-2 max-h-64 overflow-y-scroll text-center'>
			<section className='px-3'>
				{picture ? (
					<img src={picture} />
				) : (
					<span className='flex justify-center'>
						<LoadingSpinner />
					</span>
				)}
			</section>
		</article>
	);
}

export default memo(PaymentComponentItemImage);
