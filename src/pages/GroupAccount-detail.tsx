import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useLocation, useParams } from 'react-router-dom';
import BodyContainer from '../components/body/container';
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

	const { code, date, host, id, isDone, title, userLength, users } =
		location.state as GroupAccountItem;

	const receipts: ReceiptItem[] = [
		{
			category: 'booking',
			coordinatorUid: user?.uid ? user.uid : '',
			description: '숙소예약',
			id: '1',
			total: 10000,
			url: '',
			exceptedUsers: [],
		},
		{
			category: 'driving',
			coordinatorUid: user?.uid ? user.uid : '',
			description: '카풀',
			id: '2',
			total: 50000,
			url: '',
			exceptedUsers: [],
		},
		{
			category: 'eating',
			coordinatorUid: user?.uid ? user.uid : '',
			description: '식당',
			id: '3',
			total: 10000,
			url: '',
			exceptedUsers: ['test4'],
		},
		{
			category: 'eating',
			coordinatorUid: user?.uid ? user.uid : '',
			description: '식당',
			id: '3',
			total: 10000,
			url: '',
			exceptedUsers: ['test4'],
		},
		{
			category: 'eating',
			coordinatorUid: user?.uid ? user.uid : '',
			description: '식당',
			id: '3',
			total: 10000,
			url: '',
			exceptedUsers: ['test4'],
		},
		{
			category: 'eating',
			coordinatorUid: user?.uid ? user.uid : '',
			description: '식당',
			id: '3',
			total: 10000,
			url: '',
			exceptedUsers: ['test4'],
		},
		{
			category: 'eating',
			coordinatorUid: user?.uid ? user.uid : '',
			description: '꽈배기',
			id: '4',
			total: 20000,
			url: '',
			exceptedUsers: ['test2', 'test3', 'test4'],
		},
	];

	const setDialog = () => {
		// receipt 추가 dialog open
	};

	const receiptsMap = new Map<Category, ReceiptItem[]>([]);
	receipts.forEach(receipt => {
		const container = receiptsMap.get(receipt.category) || [];
		receiptsMap.set(receipt.category, [...container, receipt]);
	});

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
