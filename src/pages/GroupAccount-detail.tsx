import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useLocation, useParams } from 'react-router-dom';
import BodyContainer from '../components/body/container';
import FormContainer from '../components/form/form-container';
import Rounded from '../components/form/rounded';
import ReceiptsByCategory from '../components/group-account/receipt/category-component';
import { useAuthContext } from '../context/AuthContext';
import controls from '../controls/controls';
import {
	Category,
	GroupAccountItem,
	ReceiptCategory,
	ReceiptItem,
} from '../types/components/group-account';
import { UserProfile } from '../types/components/profile';
import database from '../database/database';

export default function GroupAccountDetail() {
	const param = useParams();
	const location = useLocation();
	const categories = controls.receiptCategory;
	const { user } = useAuthContext();
	const receiptsMap = new Map<Category, ReceiptItem[]>([]);
	const usersMap = new Map<string, UserProfile>();

	const [selectedCategory, setSelectedCategory] =
		useState<ReceiptCategory | null>(null);

	const { code, date, host, id, isDone, title, userLength, users, receipts } =
		location.state as GroupAccountItem;

	const usernames = users;

	useEffect(() => {
		receipts &&
			receipts.forEach(receipt => {
				const container = receiptsMap.get(receipt.category) || [];
				receiptsMap.set(receipt.category, [...container, receipt]);
			});
		console.log(users);

		users.forEach(user => {
			database.users.get(user).then(profile => {
				console.log(profile);

				profile && usersMap.set(user, profile);
			});
		});
	}, []);

	const setDialog = () => {
		// receipt 추가 dialog open
	};

	console.log(usersMap);

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
			<FormContainer
				title={selectedCategory?.name + '추가'}
				onCancel={() => setSelectedCategory(null)}
			>
				<>
					<Rounded isStretched={true} color='light'>
						<select>{}</select>
					</Rounded>
					<Rounded isStretched={true} color='light'>
						<input placeholder='사용처' />
					</Rounded>
					<Rounded isStretched={true} color='light'>
						<input placeholder='금액' />
					</Rounded>
				</>
			</FormContainer>
		</BodyContainer>
	);
}
