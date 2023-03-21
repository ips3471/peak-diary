import React from 'react';
import { ReceiptItem } from '../../../types/components/group-account';
import { RiErrorWarningLine } from 'react-icons/ri';
import { MdArrowRightAlt } from 'react-icons/md';

interface ReceiptItemProps {
	receipts: ReceiptItem[];
}

export default function ReceiptsByCategory({ receipts }: ReceiptItemProps) {
	return (
		<ul className=''>
			{receipts.map(receipt => (
				<>
					<li className='flex justify-between text-sm'>
						<div className='flex flex-1 gap-2'>
							<div className='basis-20 relative'>
								<span className='whitespace-nowrap'>한대승</span>
							</div>
							<div className=''>{receipt.description}</div>
						</div>
						<div className='ml-2'>{receipt.total.toLocaleString('ko')}</div>
					</li>
					{receipt.exceptedUsers.length !== 0 && (
						<div className='text-orange-700 text-xs flex gap-1 ml-2 items-center'>
							<RiErrorWarningLine />
							{receipt.exceptedUsers.toString()} <MdArrowRightAlt /> 정산에서
							제외
						</div>
					)}
				</>
			))}
		</ul>
	);
}
