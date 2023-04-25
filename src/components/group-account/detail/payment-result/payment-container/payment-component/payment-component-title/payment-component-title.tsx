import { memo } from 'react';

interface PaymentComponentTitleProps {
	name: string;
	isMe: boolean;
}

function PaymentComponentTitle({ name, isMe }: PaymentComponentTitleProps) {
	console.log('render');
	const text = isMe ? '나' : name;

	return (
		<h2 className='text-center text-lg mb-4 tracking-wider'>
			<span className='text-grey underline'>{text}</span>의 정산내역
		</h2>
	);
}

export default memo(PaymentComponentTitle);
