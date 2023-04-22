export default function ReceiptValue({ total }: { total: number }) {
	return <span className='ml-2'>{total.toLocaleString('ko') || 0}</span>;
}
