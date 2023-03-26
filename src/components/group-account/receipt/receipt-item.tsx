import React from 'react';
import { MdArrowRightAlt } from 'react-icons/md';
import { RiErrorWarningLine } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import {
	GroupAccountItem,
	ReceiptItem,
} from '../../../types/components/group-account';

interface ReceiptProps {
	receipt: ReceiptItem;
}

export default function Receipt({ receipt }: ReceiptProps) {
	const location = useLocation();
	const { user } = useAuthContext();
	const { code, date, host, id, isDone, title, userLength, users } =
		location.state as GroupAccountItem;

	return (
		<li key={receipt.id}>
			<div className='flex justify-between text-sm text-dark/90'>
				<div className='flex flex-1 gap-2'>
					<div className='basis-20 relative'>
						<span className='whitespace-nowrap'>{user?.name}</span>
					</div>
					<div className=''>{receipt.description}</div>
				</div>
				<div className='ml-2'>
					{Number(receipt.total)?.toLocaleString('ko') || 0}
				</div>
			</div>
			{receipt && receipt.exceptedUsers?.length > 0 && (
				<div className='text-orange-700 text-xs flex gap-1 ml-2 items-center'>
					<RiErrorWarningLine />
					{receipt.exceptedUsers
						.map(uid => users?.find(u => u.uid === uid)?.name)
						.join(', ')}{' '}
					<MdArrowRightAlt /> 정산에서 제외
				</div>
			)}
		</li>
	);
}
