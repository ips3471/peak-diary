import { memo, useEffect, useState } from 'react';
import LoadingSpinner from '../../../../../../../../forms/loading-spinner';

interface PaymentComponentItemImageProps {
	isOpen: boolean;
	src: string;
}

function PaymentComponentItemImage({
	isOpen,
	src,
}: PaymentComponentItemImageProps) {
	console.log('render');
	const [imageBlob, setImageBlob] = useState<Blob>();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (imageBlob) return;
		setIsLoading(true);
		fetch(src)
			.then(async res => {
				if (!res.ok) {
					throw new Error('Network response was not OK');
				}
				setImageBlob(await res.blob());
			})
			.finally(() => setIsLoading(false));
	}, []);

	if (!isOpen) return null;

	return (
		<article className='m-2 max-h-64 overflow-y-scroll text-center'>
			<section className='px-3'>
				{isLoading && (
					<span className='flex justify-center'>
						<LoadingSpinner />
					</span>
				)}
				{imageBlob && <img src={URL.createObjectURL(imageBlob)} />}
			</section>
		</article>
	);
}

export default memo(PaymentComponentItemImage);
