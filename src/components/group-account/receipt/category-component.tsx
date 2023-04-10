import {
	GroupAccountItem,
	ReceiptCategory,
	ReceiptItem,
} from '../../../types/components/group-account';
import { AiOutlineDownload, AiOutlinePlus } from 'react-icons/ai';
import { ImSpinner3 } from 'react-icons/im';
import { useLocation } from 'react-router-dom';
import {
	ChangeEvent,
	FormEvent,
	useEffect,
	useReducer,
	useRef,
	useState,
} from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { uploadImage } from '../../../service/cloudinary/cloudinary';
import FormContainer from '../../forms/form-container';
import Rounded from '../../forms/rounded';
import { BiCalculator } from 'react-icons/bi';
import NumPad from '../../../util/Numpad';
import { BsCheck } from 'react-icons/bs';
import Receipt from './receipt-item';
import calcReducer from '../../../reducer/calcReducer';
import { UserProfile } from '../../../types/components/profile';
import LoadingSpinner from '../../forms/loading-spinner';

interface ReceiptItemProps {
	category: ReceiptCategory;
	onSetDialog: (target: ReceiptItem | null) => void;
	isDialogOpen: boolean;
	dialogTarget: ReceiptItem | null;
	items: ReceiptItem[];
	onUpdate: (item: ReceiptItem) => void;
	onDelete: (item: ReceiptItem) => void;
}

export default function ReceiptsByCategory({
	category,
	onSetDialog,
	isDialogOpen,
	items,
	onUpdate,
	onDelete,
	dialogTarget,
}: ReceiptItemProps) {
	const location = useLocation();
	const { users } = location.state as GroupAccountItem;
	const { user: me } = useAuthContext();
	const [calcState, calcDispatch] = useReducer(calcReducer, { isOpen: false });
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const defaultForm: ReceiptItem = {
		coordinatorUid: me?.uid || '',
		description: '',
		exceptedUsers: [],
		receiptURL: '',
		total: 0,
		category: category.id,
		id: undefined,
		paymentToEqual: 0,
		usersToPay: [],
	};

	const [formInputs, setFormInputs] = useState<ReceiptItem>({
		...defaultForm,
		usersToPay: users,
	});
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const [isFormComplated, setIsFormCompleted] = useState(false);

	useEffect(() => {
		const essentialInputs = [
			'total',
			'coordinatorUid',
			'description',
			'usersToPay',
		];
		const mapped = essentialInputs.map(
			key => formInputs[key as keyof typeof formInputs],
		);
		const isComplated = mapped.every(val => {
			if (typeof val === 'number') {
				return val > 0;
			} else if (typeof val === 'string') {
				return val.length > 0;
			} else if (Array.isArray(val)) {
				return val.length > 0;
			}
		});

		setIsFormCompleted(isComplated);
	}, [formInputs]);

	useEffect(() => {
		dialogTarget?.category === category.id && setFormInputs(dialogTarget);
	}, [dialogTarget]);

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

	const handleSelectToPays = (user: UserProfile) => {
		setFormInputs(prev => {
			const exceptedUsers = formInputs.exceptedUsers?.includes(user)
				? formInputs.exceptedUsers.filter(u => u !== user)
				: [...(formInputs?.exceptedUsers || []), user];
			return {
				...prev,
				exceptedUsers,
				usersToPay: users.filter(u => !exceptedUsers.includes(u)),
			};
		});
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		onUpdate(formInputs);
		onSetDialog(null);
	};

	const handleDelete = () => {
		onDelete(formInputs);
		onSetDialog(null);
	};

	const handleUpdate = (receiptItem: ReceiptItem) => {
		onSetDialog(receiptItem);
	};

	return (
		<>
			<li
				className={`mb-6 shadow-sm p-2 rounded-md ${
					isDialogOpen ? 'blur-sm select-none' : ''
				}`}
			>
				<div className='flex justify-between mb-1'>
					<h1 className=' text-brand font-medium mb-1'>{category.name}</h1>
					<button
						onClick={() => {
							onSetDialog({ ...defaultForm, usersToPay: users });
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
					{items.map(receipt => (
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
						{items
							.reduce((sum, curr) => sum + (curr.total || 0), 0)
							.toLocaleString('ko')}
					</span>
				</div>
			</li>
			{dialogTarget?.category === category.id && (
				<FormContainer
					title={category.name + ' 지출내역 추가'}
					onCancel={() => onSetDialog(null)}
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
									spellCheck='false'
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
									spellCheck='false'
									name='total'
									placeholder='금액'
									value={formInputs.total ? formInputs.total : ''}
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
												formInputs.usersToPay
													.map(users => users.uid)
													.includes(user.uid)
													? 'bg-brand/90 text-pureWhite'
													: 'text-button_disabled'
											} `}
										>
											<button
												className='p-2'
												type='button'
												onClick={() => handleSelectToPays(user)}
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
										<LoadingSpinner />
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
