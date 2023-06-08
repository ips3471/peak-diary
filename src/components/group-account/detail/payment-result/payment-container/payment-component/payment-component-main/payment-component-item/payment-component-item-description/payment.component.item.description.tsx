import { memo } from 'react';

interface PaymentComponentItemDescriptionProps {
	description: string;
	url?: string;
	id: string;
	onOpenImage: (id: string) => void;
}

function PaymentComponentItemDescription({
	description,
	url,
	id,
	onOpenImage,
}: PaymentComponentItemDescriptionProps) {
	console.log('render', description);
	const handleClick = () => {
		if (url) {
			onOpenImage(id);
		}
	};
	return (
		<>
			<p
				onClick={handleClick}
				className={`line-clamp-1 ${
					url ? 'underline text-brand/80' : ''
				} cursor-pointer`}
			>
				{description}
			</p>
		</>
	);
}
export default memo(PaymentComponentItemDescription);
