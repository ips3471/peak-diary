import { memo } from 'react';
import { AiFillMinusCircle } from 'react-icons/ai';

interface PaymentComponentOutputDetailProps {
	toPay: number;
	paid: number;
}

type PaymentOutputType = '총 지불한 금액' | '총 내야할 금액';
type StyleAndValue = {
	style: string;
	value: number;
};

function PaymentComponentOutputDetail({
	toPay,
	paid,
}: PaymentComponentOutputDetailProps) {
	console.log('render');

	const paymentDetailTypes: PaymentOutputType[] = [
		'총 지불한 금액',
		'총 내야할 금액',
	];
	function outputPicker(type: PaymentOutputType): StyleAndValue {
		switch (type) {
			case '총 내야할 금액':
				return {
					style: 'text-bodyAccent/80',
					value: toPay,
				};
			case '총 지불한 금액':
				return {
					style: 'text-brand/90',
					value: paid,
				};
		}
	}

	return (
		<>
			{paymentDetailTypes.map((type, index) => (
				<span key={index} className='flex items-center gap-1'>
					<AiFillMinusCircle className={`${outputPicker(type).style}`} />
					<p>
						{type}: {outputPicker(type).value.toLocaleString('ko')}
					</p>
				</span>
			))}
		</>
	);
}

export default memo(PaymentComponentOutputDetail);
