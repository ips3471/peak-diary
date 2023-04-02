import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BodyContainer from '../components/body/container';
import ReceiptsByCategory from '../components/group-account/receipt/category-component';
import controls from '../controls/controls';
import {
	Category,
	GroupAccountItem,
	ReceiptItem,
} from '../types/components/group-account';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import GroupAccountPresenter from '../presenter/group-account/GroupAccountPresenter';
import UserPaymentContainer from '../components/user-payment/user-payment-container';
import Rounded from '../components/form/rounded';
import FormContainer from '../components/form/form-container';
import { useBlurContext } from '../context/BlurContext';

export default function GroupAccountDetail() {
	const location = useLocation();
	const categories = controls.receiptCategory;
	const [dialogTarget, setDialogTarget] = useState<ReceiptItem | null>(null);
	const { isBlured, handleBlur } = useBlurContext();
	const {
		code,
		date,
		host,
		id: listId,
		isDone,
		title,
		userLength,
		users,
	} = location.state as GroupAccountItem;
	const { update, init, remove } = GroupAccountPresenter.receipts;

	const [categoriesMap, setCategoriesMap] =
		useState<Map<Category, ReceiptItem[]>>();

	const [displayResult, setDisplayResult] = useState(false);

	const handleDisplayDialog = (target: ReceiptItem | null) => {
		setDialogTarget(target);
	};

	const handleUpdate = (form: ReceiptItem) => {
		update(listId, form, setCategoriesMap);
	};

	const handleDelete = (receipt: ReceiptItem) => {
		remove(listId, receipt, setCategoriesMap);
	};

	useEffect(() => {
		init(listId, setCategoriesMap);
	}, []);

	return (
		<>
			<BodyContainer onBlur={isBlured}>
				{categoriesMap && (
					<div className='h-full rounded-lg overflow-y-scroll scrollbar-hide'>
						<div
							className={`p-1 font-bold mb-2 flex items-center ${
								dialogTarget ? 'blur-sm select-none' : ''
							}`}
						>
							<Link className='p-2' to={'/group-account'}>
								<BiArrowBack />
							</Link>
							<h1 className={` `}>{title}</h1>
						</div>
						<ul>
							{categories.map(receiptCategory => (
								<ReceiptsByCategory
									key={receiptCategory.id}
									onSetDialog={handleDisplayDialog}
									dialogTarget={dialogTarget}
									category={receiptCategory}
									isDialogOpen={!!dialogTarget}
									items={categoriesMap.get(receiptCategory.id) || []}
									onUpdate={handleUpdate}
									onDelete={handleDelete}
								/>
							))}
						</ul>
						<Rounded color='light' isStretched={true}>
							<button
								onClick={() => {
									setDisplayResult(true);
									handleBlur(true);
								}}
								className='p-1 w-full'
							>
								정산결과 확인하기
							</button>
						</Rounded>
					</div>
				)}
			</BodyContainer>
			{displayResult && (
				<>
					<FormContainer
						onCancel={() => {
							setDisplayResult(false);
							handleBlur(false);
						}}
						title='그룹정산 명세서'
					>
						{categoriesMap && (
							<UserPaymentContainer
								categoriesMap={categoriesMap}
								users={users}
								host={host}
							/>
						)}
					</FormContainer>
				</>
			)}
		</>
	);
}
