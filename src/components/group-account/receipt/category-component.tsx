import {
	GroupAccountItem,
	ReceiptCategory,
	ReceiptItem,
} from '../../../types/components/group-account';
import { AiOutlineDownload, AiOutlinePlus } from 'react-icons/ai';
import { ImSpinner3 } from 'react-icons/im';
import { useLocation, useParams } from 'react-router-dom';
import {
	ChangeEvent,
	FormEvent,
	useEffect,
	useReducer,
	useRef,
	useState,
} from 'react';
import GroupAccountPresenter from '../../../presenter/group-account/GroupAccountPresenter';
import { useAuthContext } from '../../../context/AuthContext';
import { uploadImage } from '../../../service/cloudinary/cloudinary';
import FormContainer from '../../form/form-container';
import Rounded from '../../form/rounded';
import { BiCalculator } from 'react-icons/bi';
import NumPad from '../../../util/Numpad';
import { BsCheck } from 'react-icons/bs';
import Receipt from './receipt-item';
import calcReducer from '../../../reducer/calcReducer';

interface ReceiptItemProps {
	category: ReceiptCategory;
	onSetDialog: (target: ReceiptCategory | null) => void;
	isDialogOpen: boolean;
	isSelected: boolean;
	onCategoryReset: () => void;
}

export default function ReceiptsByCategory({
	category,
	onSetDialog,
	isDialogOpen,
	onCategoryReset,
	isSelected,
}: ReceiptItemProps) {
	const location = useLocation();
	const { code, date, host, id, isDone, title, userLength, users } =
		location.state as GroupAccountItem;
	const { user: me } = useAuthContext();
	const { id: listId } = useParams();
	const [calcState, calcDispatch] = useReducer(calcReducer, { isOpen: false });
	const [receiptsByCategory, setReceiptsByCategory] = useState<ReceiptItem[]>(
		[],
	);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [formInputs, setFormInputs] = useState<ReceiptItem>({
		coordinatorUid: me?.uid || '',
		description: '',
		exceptedUsers: [],
		receiptURL: '',
		total: undefined,
		category: category.id,
		id: undefined,
	});
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const [isFormComplated, setIsFormCompleted] = useState(false);

	const defaultForm = {
		coordinatorUid: me?.uid || '',
		description: '',
		exceptedUsers: [],
		receiptURL: '',
		total: undefined,
		category: category.id,
		id: undefined,
	};

	useEffect(() => {
		const essentialInputs = ['total', 'coordinatorUid', 'description'];
		const mapped = essentialInputs.map(
			key => formInputs[key as keyof typeof formInputs],
		);
		const isComplated = mapped.every(val => {
			if (typeof val === 'number') {
				return val > 0;
			} else if (typeof val === 'string') {
				return val.length > 0;
			}
		});
		setIsFormCompleted(isComplated);
	}, [formInputs]);

	useEffect(() => {
		GroupAccountPresenter.receipts.init(id, category.id, setReceiptsByCategory);
	}, []);

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const file = e.currentTarget.files && e.currentTarget.files[0];
		if (file) {
			setIsUploading(true);
			uploadImage(file)
				.then(url => handleInputChange('receiptURL', url))
				.then(() => setIsUploading(false));
		}
	};

	const handleInputChange = (name: keyof ReceiptItem, value: any) => {
		setFormInputs(formInputs => ({ ...formInputs, [name]: value }));
	};

	const handleSelectToPays = (uid: string) => {
		const { exceptedUsers } = formInputs;

		if (exceptedUsers.includes(uid)) {
			setFormInputs(prev => ({
				...prev,
				exceptedUsers: prev.exceptedUsers.filter(u => u !== uid),
			}));
		}
		if (!exceptedUsers.includes(uid)) {
			setFormInputs(prev => ({
				...prev,
				exceptedUsers: [...exceptedUsers, uid],
			}));
		}
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!listId) {
			throw Error(`Not found list-id`);
		}

		if (!formInputs.id) {
			const element: Omit<ReceiptItem, 'id'> = {
				...formInputs,
				category: category.id,
			};

			GroupAccountPresenter.receipts.addItem(
				listId,
				element,
				setReceiptsByCategory,
			);
		}

		if (formInputs.id) {
			GroupAccountPresenter.receipts.updateReceipt(
				listId,
				formInputs,
				setReceiptsByCategory,
			);
		}

		inputReset();
	};

	const handleDelete = () => {
		listId &&
			GroupAccountPresenter.receipts.deleteItem(
				listId,
				formInputs,
				setReceiptsByCategory,
			);
		inputReset();
	};

	const handleUpdate = (receiptItem: ReceiptItem) => {
		setFormInputs(receiptItem);
		onSetDialog(category);
	};

	function inputReset() {
		onCategoryReset();
		setFormInputs(defaultForm);
	}

	return (
		<>
			<li
				key={category.id}
				className={`mb-6 bg-pureWhite/50 p-2 rounded-md ${
					isDialogOpen ? 'blur-sm select-none' : ''
				}`}
			>
				<div className='flex justify-between mb-1'>
					<h1 className=' text-brand font-medium mb-1'>{category.name}</h1>
					<button
						onClick={() => {
							onSetDialog(category);
						}}
						className={`${
							isDialogOpen ? 'pointer-events-none' : ''
						} flex items-center text-gray-500 p-1`}
					>
						<AiOutlinePlus />
						<span className={`text-brand text-xs font-medium `}>추가하기</span>
					</button>
				</div>
				<ul className=''>
					{receiptsByCategory &&
						receiptsByCategory.map(receipt => (
							<Receipt
								onUpdate={handleUpdate}
								key={receipt.id}
								receipt={receipt}
							/>
						))}
				</ul>
				<div className='flex justify-between py-2 text-sm text-brand'>
					<span>합계</span>
					<span>
						{receiptsByCategory
							.reduce((sum, curr) => sum + (curr.total || 0), 0)
							.toLocaleString('ko')}
					</span>
				</div>
				<hr className='' />
			</li>
			{isSelected && (
				<FormContainer
					title={category.name + ' 지출내역 추가'}
					onCancel={inputReset}
				>
					<form name={category.id} onSubmit={handleSubmit}>
						<section>
							<Rounded isStretched={true} color='light'>
								<label htmlFor='user-select'>결제한 사람</label>
								<select
									required
									value={formInputs.coordinatorUid}
									onChange={e =>
										handleInputChange('coordinatorUid', e.currentTarget.value)
									}
									name='coordinatorUid'
									id='user-select'
								>
									{users.map(user => (
										<option key={user.uid} id={user.uid} value={user.uid}>
											{user.name} {user.uid === me?.uid && '(me)'}
										</option>
									))}
								</select>
							</Rounded>
							<Rounded isStretched={true} color='light'>
								<input
									className='w-full'
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
									value={formInputs.total?.toLocaleString('ko')}
									onChange={e =>
										handleInputChange('total', e.currentTarget.value)
									}
								/>
								<button
									type='button'
									name={category.id}
									onClick={e => {
										if (e.currentTarget.name === category.id) {
											calcDispatch({ type: 'toggle_visible' });
										}
									}}
									className='p-1'
								>
									<BiCalculator />
								</button>
							</Rounded>
							{calcState.isOpen && (
								<div className={`relative`}>
									<NumPad
										title='금액 입력'
										onCancel={() => calcDispatch({ type: 'toggle_visible' })}
										onSubmit={value => {
											calcDispatch({ type: 'toggle_visible' });
											handleInputChange('total', value);
										}}
										type='currency'
									/>
								</div>
							)}
							<Rounded isStretched={true} color='light'>
								<span className='text-placeHolder'>정산에 포함</span>
								<ul className='w-full flex justify-end overflow-x-scroll gap-2'>
									{users.map(user => (
										<li
											key={user.uid}
											className={`border overflow-hidden rounded-lg ${
												formInputs.exceptedUsers?.includes(user.uid)
													? 'text-button_disabled'
													: 'bg-brand/90 text-pureWhite'
											} `}
										>
											<button
												className='p-2'
												type='button'
												onClick={() => handleSelectToPays(user.uid)}
											>
												{user.name}
											</button>
										</li>
									))}
								</ul>
							</Rounded>
							<div className='flex my-3 '>
								<button
									onClick={() => fileInputRef && fileInputRef.current?.click()}
									type='button'
									className={`rounded-lg flex w-28 justify-center shadow-sm items-center ${
										formInputs.receiptURL ? 'bg-brand' : 'bg-bodyAccent/90'
									} py-1 px-2 text-pureWhite/95 text-sm`}
								>
									{isUploading ? (
										<span className='animate-[spin_0.5s_ease-in-out_infinite]'>
											<ImSpinner3 />
										</span>
									) : (
										<>
											{!formInputs.receiptURL && <AiOutlineDownload />}
											{formInputs.receiptURL ? <BsCheck /> : '영수증 첨부'}
										</>
									)}
								</button>
								<input
									ref={fileInputRef}
									className='w-0'
									type='file'
									accept='image/*'
									onChange={handleFileChange}
								/>
							</div>
						</section>

						<section className='flex gap-1 flex-col justify-between text-center mt-2'>
							<button
								className={`flex-1 text-body rounded-2xl py-3 font-semibold ${
									isFormComplated && !isUploading
										? 'bg-brand/70'
										: 'bg-button_disabled/70 pointer-events-none'
								}`}
								type='submit'
							>
								추가하기
							</button>
							{formInputs.id && (
								<button
									onClick={handleDelete}
									className={`flex-1 text-body rounded-2xl py-3 font-semibold bg-bodyAccent`}
									type='button'
								>
									삭제
								</button>
							)}
						</section>
					</form>
				</FormContainer>
			)}
		</>
	);
}
