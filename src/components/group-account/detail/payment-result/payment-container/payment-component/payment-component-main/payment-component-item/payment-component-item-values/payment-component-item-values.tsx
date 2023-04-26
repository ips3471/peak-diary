import { memo } from 'react';

interface PaymentComponentItemValuesProps {
	total: number;
	equalValue: number;
	isCoordinator: boolean;
}

function PaymentComponentItemValues({
	total,
	isCoordinator,
	equalValue,
}: PaymentComponentItemValuesProps) {
	console.log('render');

	return (
		<>
			<span
				className={`self-center inline-block basis-1/2 text-right ${
					isCoordinator ? 'text-bodyAccent' : ''
				}`}
			>
				{(isCoordinator ? total : 0).toLocaleString('ko')}
			</span>
			<span className='self-center inline-block text-right basis-1/2'>
				{equalValue.toLocaleString('ko')}
			</span>
		</>
	);
}
export default memo(PaymentComponentItemValues);
