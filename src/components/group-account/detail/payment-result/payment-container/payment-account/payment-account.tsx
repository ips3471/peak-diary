import { memo } from 'react';

interface PaymentAccountProps {
	account: string | null;
	isHost: boolean;
}

function PaymentAccount({ account, isHost }: PaymentAccountProps) {
	console.log('render');

	return (
		<div className='flex justify-between text-sm text-grey'>
			<span>입금계좌</span>
			{account ? (
				<span>{account}</span>
			) : isHost ? (
				<button>계좌번호 등록하기</button>
			) : (
				<span>입력된 계좌번호가 없습니다</span>
			)}
		</div>
	);
}

export default memo(PaymentAccount);
