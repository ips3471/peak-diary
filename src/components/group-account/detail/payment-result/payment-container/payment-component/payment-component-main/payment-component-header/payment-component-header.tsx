import { memo } from 'react';

interface PaymentComponentHeaderProps {}

function PaymentComponentHeader({}: PaymentComponentHeaderProps) {
	console.log('render');

	return (
		<>
			<header className='flex justify-between font-semibold'>
				<div className='w-2/6'>사용처</div>
				<div className='w-4/6 flex justify-end'>
					{['지불한 금액', '내야할 금액'].map(payType => (
						<span className='inline-block basis-1/2 text-right'>{payType}</span>
					))}
				</div>
			</header>
		</>
	);
}

export default memo(PaymentComponentHeader);
