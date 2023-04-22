import Rounded from '../../../forms/rounded';

interface ReceiptDetailButton {
	color?: 'light' | 'dark';
	isStretched?: boolean;
	onClick: () => void;
	title: string;
}

export default function ReceiptDetailButton({
	color = 'light',
	isStretched = true,
	onClick,
	title,
}: ReceiptDetailButton) {
	return (
		<Rounded color={color} isStretched={isStretched}>
			<button onClick={onClick} className='w-full text-sm'>
				{title}
			</button>
		</Rounded>
	);
}
