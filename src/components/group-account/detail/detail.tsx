import { useEffect, useState } from 'react';
import BodyContainer from '../../body/main-container';
import ReceiptsByCategory from './container/category-component/category-component';
import controls from '../../../controls/controls';
import {
	CategoryId,
	ReceiptAddForm,
	ReceiptItem,
} from '../../../types/group-account/group-account';
import AddReceiptForm from '../receipt/dialog/add-receipt-form';
import GroupAccountDetailController from '../../../controller/group-account/group-account-detail';
import UserPaymentSummary from '../receipt/dialog/user-payment-summary';
import ReceiptDetailButton from '../receipt/button/receipt-detail-button';
import DetailHeader from './detail-header/detail-header';
import { useNavigate } from 'react-router-dom';

interface GroupAccountDetailProps {
	controller: GroupAccountDetailController;
}

export default function GroupAccountDetailPage({
	controller,
}: GroupAccountDetailProps) {
	console.log('render groupAccoult-detail');
	const { title, isDone, host } = controller.item;
	const [dialogTarget, setDialogTarget] = useState<ReceiptItem | null>(null);
	const [isFinished, setIsFinished] = useState<boolean>(isDone);
	const [categoriesMap, setCategoriesMap] = useState(
		controls.receiptCategory.reduce(
			(form, category) => form.set(category.id, []),
			new Map<CategoryId, ReceiptItem[]>(),
		),
	);

	const [displayResult, setDisplayResult] = useState(false);
	const navigate = useNavigate();

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
		controller.finishItem();
		setIsFinished(true);
	};

	useEffect(() => {
		controller.initReceipts(setCategoriesMap);
	}, [controller]);

	return (
		<>
			<BodyContainer onBlur={!!dialogTarget || displayResult}>
				<div className='h-full rounded-lg overflow-y-scroll scrollbar-hide'>
					<div className={`p-1 font-bold mb-2 flex items-center`}>
						<DetailHeader isDone={isFinished} title={title} />
					</div>
					{categoriesMap && !isFinished && (
						<>
							<ul className={`shadow-sm`}>
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
							<>
								<ReceiptDetailButton
									title={'정산결과 확인하기'}
									onClick={() => setDisplayResult(true)}
								/>
								{controller.user.uid === host && (
									<ReceiptDetailButton
										title='정산끝내기'
										onClick={() => {
											const confimed = window.confirm('정산을 끝낼까요?');
											confimed && handleFinish();
										}}
									/>
								)}
							</>
						</>
					)}
				</div>
			</BodyContainer>
			{(displayResult || isFinished) && (
				<UserPaymentSummary
					onClose={
						isFinished
							? () => navigate('/group-account')
							: () => setDisplayResult(false)
					}
					items={Object.fromEntries(categoriesMap)}
					userProfiles={controller.userProfiles}
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
