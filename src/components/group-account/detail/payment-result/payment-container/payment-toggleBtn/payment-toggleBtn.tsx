import { PaymentDisplayType } from '../payment-container';

interface PaymentToggleBtnProps {
	onToggle: () => void;
	displayType: PaymentDisplayType;
}

export default function PaymentToggleBtn({
	displayType,
	onToggle,
}: PaymentToggleBtnProps) {
	console.log('render');

	function selectText(displayType: PaymentDisplayType) {
		switch (displayType) {
			case 'all':
				return '내 정산 보기';
			case 'me':
				return '전체보기';
		}
	}

	return (
		<button
			type='button'
			onClick={onToggle}
			className='text-brand mt-3 w-full p-4'
		>
			{selectText(displayType)}
		</button>
	);
}
