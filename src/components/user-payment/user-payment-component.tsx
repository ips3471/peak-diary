import { UserPayment } from '../../types/group-account/group-account';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { DisplayTarget } from './user-payment-container';

interface UserPaymentProps {
	userPayment: UserPayment;
	isMe: boolean;
	displayTarget: DisplayTarget;
}

export default function UserPaymentComponent({
	userPayment,
	isMe,
	displayTarget,
}: UserPaymentProps) {
	const { name, paid, toPay, uid, receipts } = userPayment;

	const display = displayTarget === 'all' ? true : isMe ? true : false;

	return (
		<li
			key={userPayment.uid}
			className={`flex flex-col mb-6 py-5 ${
				display ? 'visible' : 'hidden'
			} bg-pureWhite/10 shadow-sm rounded-lg p-1`}
		>
			<h2 className='text-center text-lg mb-4'> {name}의 정산내역</h2>
			<div className='my-1 '>
				<header className='flex justify-between font-semibold'>
					<div className='w-2/6'>사용처</div>
					<div className='w-4/6 flex justify-end'>
						<span className='inline-block basis-1/2 text-right'>
							지불한 금액
						</span>
						<span className='inline-block basis-1/2 text-right'>
							내야할 금액
						</span>
					</div>
				</header>
				<ul className='border-y py-1 my-1'>
					{receipts.map(r => (
						<li key={r.id} className=''>
							<div className='flex justify-between'>
								<div className='w-2/6'>{r.description}</div>
								<div className='w-4/6 flex justify-end'>
									{r.coordinator.uid === uid && (
										<span className='self-center inline-block basis-1/2 text-right text-bodyAccent'>
											{r.total.toLocaleString('ko')}
										</span>
									)}
									<span className='self-center inline-block text-right basis-1/2'>
										{r.paymentToEqual.toLocaleString('ko')}
									</span>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
			<div className='flex flex-col p-1'>
				<span className='flex items-center gap-1'>
					<AiFillPlusCircle className='text-brand/90' /> 총 지불한 금액:{' '}
					{paid.toLocaleString('ko')}
				</span>
				<span className='flex items-center gap-1'>
					<AiFillMinusCircle className='text-bodyAccent/80' />총 내야할 금액:{' '}
					{toPay.toLocaleString('ko')}
				</span>
				<span
					className={`${toPay - paid > 0 ? 'text-accent' : 'text-brand'} mt-1`}
				>
					{paid - toPay > 0 ? '환급받을 금액' : '입금할 금액'}:
					<span className='ml-1'>
						{Math.abs(toPay - paid).toLocaleString('ko', {
							style: 'currency',
							currency: 'krw',
						})}
					</span>
				</span>
			</div>
		</li>
	);
}
