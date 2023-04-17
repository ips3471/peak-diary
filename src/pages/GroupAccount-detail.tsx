import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BodyContainer from '../components/body/container';
import ReceiptsByCategory from '../components/group-account/receipt/category-component';
import controls from '../controls/controls';
import {
	Category,
	GroupAccountItem,
	ReceiptItem,
} from '../types/group-account/group-account';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import GroupAccountPresenter from '../presenter/group-account/GroupAccountPresenter';
import UserPaymentContainer from '../components/user-payment/user-payment-container';
import Rounded from '../components/forms/rounded';
import FormContainer from '../components/forms/form-container';
import { useAuthContext } from '../context/AuthContext';

export default function GroupAccountDetail() {
	const location = useLocation();
	const categories = controls.receiptCategory;
	const [dialogTarget, setDialogTarget] = useState<ReceiptItem | null>(null);
	const {
		host,
		id: listId,
		isDone,
		title,
		users,
	} = location.state as GroupAccountItem;
	const { user } = useAuthContext();
	const { update, init, remove } = GroupAccountPresenter.receipts;
	const [isFinished, setIsFinished] = useState(isDone);

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

	const handleFinish = () => {
		GroupAccountPresenter.lists.updateState(listId, setIsFinished);
	};

	useEffect(() => {
		console.log('render groupAccoult-detail');

		init(listId, setCategoriesMap);
	}, []);

	return (
		<>
			<BodyContainer>
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
							<h1 className={` `}>
								{title} {isDone ? '(완료)' : ''}
							</h1>
						</div>
						<ul
							className={`shadow-sm ${
								isFinished ? 'opacity-50' : 'opacity-100'
							}`}
						>
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
								}}
								className='p-1 w-full'
							>
								정산결과 확인하기
							</button>
						</Rounded>
						{user?.uid === host && !isFinished && (
							<Rounded color='light' isStretched={true}>
								<button
									onClick={() => {
										const confimed = window.confirm('정산을 끝낼까요?');
										confimed && handleFinish();
									}}
									className='p-1 w-full'
								>
									정산 끝내기
								</button>
							</Rounded>
						)}
					</div>
				)}
			</BodyContainer>
			{displayResult && (
				<>
					<FormContainer
						onSubmit={() => {}}
						onCancel={() => {
							setDisplayResult(false);
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
