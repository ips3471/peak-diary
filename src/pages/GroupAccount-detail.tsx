import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useLocation, useParams } from 'react-router-dom';
import BodyContainer from '../components/body/container';
import FormContainer from '../components/form/form-container';
import ReceiptsByCategory from '../components/group-account/receipt/category-component';
import { useAuthContext } from '../context/AuthContext';
import controls from '../controls/controls';
import {
	Category,
	GroupAccountItem,
	ReceiptItem,
} from '../types/components/group-account';

export default function GroupAccountDetail() {
	const param = useParams();
	const location = useLocation();
	const categories = controls.receiptCategory;
	const { user } = useAuthContext();
	const receiptsMap = new Map<Category, ReceiptItem[]>([]);

	const { code, date, host, id, isDone, title, userLength, users, receipts } =
		location.state as GroupAccountItem;

	useEffect(() => {
		receipts &&
			receipts.forEach(receipt => {
				const container = receiptsMap.get(receipt.category) || [];
				receiptsMap.set(receipt.category, [...container, receipt]);
			});
	}, []);

	const setDialog = () => {
		// receipt 추가 dialog open
	};

	console.log(receiptsMap.keys());

	return (
		<BodyContainer>
			<div className='h-full overflow-y-scroll scrollbar-hide'>
				<h1 className='font-bold mb-2'>{title}</h1>
				<ul>
					{categories.map(category => (
						<li className='mb-6 bg-pureWhite/50 p-2 rounded-md'>
							<div className='flex justify-between'>
								<h1 className=' text-brand font-medium mb-1'>
									{category.name}
								</h1>
								<button
									// onClick={() => setDialog(true)}
									className={`flex items-center text-gray-500 p-1`}
								>
									<AiOutlinePlus />
									<span className={`text-brand text-xs font-medium `}>
										추가하기
									</span>
								</button>
							</div>
							<ReceiptsByCategory
								key={category.id}
								receipts={receiptsMap.get(category.id) || []}
							/>
							<hr className='mt-5' />
						</li>
					))}
				</ul>
			</div>
		</BodyContainer>
	);
}
