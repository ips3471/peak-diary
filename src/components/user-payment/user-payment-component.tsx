import React, { useState } from 'react';
import { UserPayment } from '../../types/components/group-account';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { useAuthContext } from '../../context/AuthContext';
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
			<h2 className='text-center text-xl'>{name}</h2>
			<div className='my-2 '>
				<ul>
					{receipts.map(r => (
						<li key={r.id} className=''>
							<div className='flex justify-between'>
								<div className=''>{r.description}</div>
								<div className=''>
									{r.coordinatorUid === uid && (
										<span className='inline-block text-bodyAccent mr-2'>
											-{r.total.toLocaleString('ko')}
										</span>
									)}
									<span className='inline-block w-16 text-right'>
										{r.paymentToEqual.toLocaleString('ko')}
									</span>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
			<div className='flex flex-col p-2'>
				<span className='flex items-center gap-1'>
					<AiFillPlusCircle className='text-brand/90' /> 총 지불한 금액:{' '}
					{paid.toLocaleString('ko')}
				</span>
				<span className='flex items-center gap-1'>
					<AiFillMinusCircle className='text-bodyAccent/80' />총 내야할 금액:{' '}
					{toPay.toLocaleString('ko')}
				</span>
				<span className='mt-1'>
					총 정산 금액:{' '}
					<span
						className={`${toPay - paid > 0 ? 'text-accent' : 'text-brand'}`}
					>
						{Math.abs(toPay - paid).toLocaleString('ko') +
							`${paid - toPay > 0 ? '(환급)' : ''}`}
					</span>
				</span>
			</div>
		</li>
	);
}
