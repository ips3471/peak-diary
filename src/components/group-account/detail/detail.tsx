import { useCallback, useEffect, useState } from 'react';
import BodyContainer from '../../body/container';
import ReceiptsByCategory from './container/category-component/category-component';
import controls from '../../../controls/controls';
import {
	CategoryId,
	ReceiptAddForm,
	ReceiptItem,
} from '../../../types/group-account/group-account';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import AddReceiptForm from '../receipt/dialog/add-receipt-form';
import GroupAccountDetailController from '../../../controller/group-account/group-account-detail';
import UserPaymentSummary from '../receipt/dialog/user-payment-summary';
import ReceiptDetailButton from '../receipt/button/receipt-detail-button';

interface GroupAccountDetailProps {
	controller: GroupAccountDetailController;
}

export default function GroupAccountDetail({
	controller,
}: GroupAccountDetailProps) {
	console.log('render groupAccoult-detail');

	const [dialogTarget, setDialogTarget] = useState<ReceiptItem | null>(null);
	const { title, isDone, host } = controller.item;
	const [categoriesMap, setCategoriesMap] = useState(
		controls.receiptCategory.reduce(
			(form, category) => form.set(category.id, []),
			new Map<CategoryId, ReceiptItem[]>(),
		),
	);

	const [displayResult, setDisplayResult] = useState(false);

	const handleAdd = (form: ReceiptAddForm) => {
		controller.addReceipt(form, setCategoriesMap);
		setDialogTarget(null);
	};

	const handleUpdate = (prev: ReceiptItem, form: ReceiptAddForm) => {
		controller.updateReceipt(prev.id, form, setCategoriesMap);
		setDialogTarget(null);
	};

	const handleDelete = (receipt: ReceiptItem) => {
		controller.deleteReceipt(receipt, setCategoriesMap);
		setDialogTarget(null);
	};

	const handleFinish = () => {
		console.log('isDone을 업데이트');
	};

	useEffect(() => {
		controller.initReceipts(setCategoriesMap);
	}, [controller]);

	return (
		<>
			<BodyContainer onBlur={!!dialogTarget || displayResult}>
				{categoriesMap && (
					<div className='h-full rounded-lg overflow-y-scroll scrollbar-hide'>
						<div className={`p-1 font-bold mb-2 flex items-center`}>
							<Link className='p-2' to={'/group-account'}>
								<BiArrowBack />
							</Link>
							<h1 className={` `}>
								{title} {isDone ? '(완료)' : ''}
							</h1>
						</div>
						<ul
							className={`shadow-sm ${isDone ? 'opacity-50' : 'opacity-100'}`}
						>
							{controls.receiptCategory.map(receiptCategory => (
								<ReceiptsByCategory
									key={receiptCategory.id}
									users={controller.userProfiles}
									user={controller.user}
									category={receiptCategory}
									items={categoriesMap.get(receiptCategory.id) || []}
									onChangeDialogTarget={setDialogTarget}
								/>
							))}
						</ul>
						<section>
							<ReceiptDetailButton
								title='정산결과 확인하기'
								onClick={() => setDisplayResult(true)}
							/>
							{controller.user.uid === host && !isDone && (
								<ReceiptDetailButton
									title='정산끝내기'
									onClick={() => {
										const confimed = window.confirm('정산을 끝낼까요?');
										confimed && handleFinish();
									}}
								/>
							)}
						</section>
					</div>
				)}
			</BodyContainer>
			{displayResult && (
				<UserPaymentSummary
					onClose={() => setDisplayResult(false)}
					categoriesMap={categoriesMap}
					allUsers={controller.userProfiles}
					host={controller.userProfiles.find(u => u.uid === host)!}
				/>
			)}
			{dialogTarget && (
				<AddReceiptForm
					item={dialogTarget}
					onCancel={() => setDialogTarget(null)}
					onAdd={handleAdd}
					onDelete={handleDelete}
					onUpdate={handleUpdate}
					users={controller.userProfiles}
				/>
			)}
		</>
	);
}
