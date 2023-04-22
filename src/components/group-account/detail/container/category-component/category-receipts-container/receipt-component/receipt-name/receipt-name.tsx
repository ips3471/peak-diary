interface ReceiptNameProps {
	name: string;
}

export default function ReceiptName({
	name: coordinatorName,
}: ReceiptNameProps) {
	return (
		<span className='w-1/5 relative overflow-x-hidden'>
			<p className='whitespace-nowrap'>{coordinatorName}</p>
		</span>
	);
}
