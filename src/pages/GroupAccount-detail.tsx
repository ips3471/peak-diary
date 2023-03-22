import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiCalculator } from 'react-icons/bi';
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
import NumPad from '../util/Numpad';

export default function GroupAccountDetail() {
	const { user } = useAuthContext();
	const location = useLocation();
	const categories = controls.receiptCategory;
	const receiptsMap = new Map<Category, ReceiptItem[]>([]);
	const [selectedCategory, setSelectedCategory] =
		useState<ReceiptCategory | null>(null);
	const [formInputs, setFormInputs] = useState<
		Omit<ReceiptItem, 'id' | 'category'>
	>({
		coordinatorUid: user?.uid || '',
		description: '',
		exceptedUsers: [],
		receiptURL: '',
		total: '',
	});
	const [displayCalc, setDisplayCalc] = useState(false);

	useEffect(() => {
		selectedCategory == null &&
			setFormInputs({
				coordinatorUid: user?.uid || '',
				description: '',
				exceptedUsers: [],
				receiptURL: '',
				total: '',
			});
	}, [selectedCategory]);

	const { code, date, host, id, isDone, title, userLength, users, receipts } =
		location.state as GroupAccountItem;

	/* 
	mount - db로부터 receipts를 받아옴
	onchange - state update + db update
	*/

	useEffect(() => {
		receipts &&
			receipts.forEach(receipt => {
				const container = receiptsMap.get(receipt.category) || [];
				receiptsMap.set(receipt.category, [...container, receipt]);
			});
	}, []);

	const handleAdd = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!selectedCategory) {
			return;
		}
		const element: Omit<ReceiptItem, 'id'> = {
			...formInputs,
			category: selectedCategory.id,
		};
		console.log('tobe added', element);
		// db와 state에 업데이트
		setSelectedCategory(null);
	};

	const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();
		const { value } = e.currentTarget;
	};

	const handleInputChange = (name: keyof ReceiptItem, value: any) => {
		setFormInputs(formInputs => ({ ...formInputs, [name]: value }));
	};

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
									onClick={() => {
										setSelectedCategory(category);
										displayCalc && setDisplayCalc(false);
									}}
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
			{selectedCategory && (
				<FormContainer
					title={selectedCategory.name + ' 지출내역 추가'}
					onCancel={() => setSelectedCategory(null)}
				>
					<form onSubmit={handleAdd}>
						<section>
							<Rounded isStretched={true} color='light'>
								<label htmlFor='user-select'>결제한 사람</label>
								<select
									value={formInputs.coordinatorUid}
									onChange={e =>
										handleInputChange('coordinatorUid', e.currentTarget.value)
									}
									name='coordinatorUid'
									id='user-select'
								>
									{users.map(user => (
										<option key={user.uid} id={user.uid} value={user.uid}>
											{user.name}
										</option>
									))}
								</select>
							</Rounded>
							<Rounded isStretched={true} color='light'>
								<input
									required
									autoComplete='disable'
									name='description'
									placeholder='사용처'
									value={formInputs.description}
									onChange={e =>
										handleInputChange('description', e.currentTarget.value)
									}
								/>
							</Rounded>
							<Rounded isStretched={true} color='light'>
								<input
									required
									autoComplete='disable'
									name='total'
									placeholder='금액'
									value={formInputs.total}
									onChange={e =>
										handleInputChange('total', e.currentTarget.value)
									}
								/>
								<button
									type='button'
									onClick={() => setDisplayCalc(curr => !curr)}
									className='p-1'
								>
									<BiCalculator />
								</button>
							</Rounded>
							{displayCalc && (
								<div
									className={`relative ${
										displayCalc ? 'h-full opacity-100' : 'h-0 opacity-50'
									} transition-all`}
								>
									<NumPad
										title='금액 입력'
										onCancel={() => setDisplayCalc(false)}
										onSubmit={value => {
											setDisplayCalc(false);
											handleInputChange('total', value);
										}}
										type='currency'
									/>
								</div>
							)}
						</section>
						<section className='flex justify-between text-center mt-2'>
							<button
								className='flex-1 text-body bg-brand/70 rounded-2xl py-3 font-semibold'
								type='submit'
							>
								추가하기
							</button>
						</section>
					</form>
				</FormContainer>
			)}
		</BodyContainer>
	);
}
