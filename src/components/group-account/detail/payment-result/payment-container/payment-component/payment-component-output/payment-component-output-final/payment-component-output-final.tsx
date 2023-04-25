import { memo } from 'react';

interface PaymentComponentOutputFinalProps {
	isPayBackTarget: boolean;
	value: number;
}

function PaymentComponentOutputFinal({
	isPayBackTarget,
	value,
}: PaymentComponentOutputFinalProps) {
	console.log('render');

	return (
		<span
			className={`${isPayBackTarget ? 'text-brand' : 'text-bodyAccent'} mt-1`}
		>
			{isPayBackTarget ? '환급받을 금액' : '입금할 금액'}:
			<span className='ml-1'>
				{Math.abs(value).toLocaleString('ko', {
					style: 'currency',
					currency: 'krw',
				})}
			</span>
		</span>
	);
}
export default memo(PaymentComponentOutputFinal);
