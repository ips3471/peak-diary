import FormContainer from '../../../forms/form-container';
import {
	ReceiptAddForm,
	ReceiptItem,
} from '../../../../types/group-account/group-account';
import FormInputText from '../../dialog/form/form-input-text';
import { UserProfile } from '../../../../types/components/profile';
import FormSelect from '../../dialog/form/form-select';
import FormSelectUsers from '../../dialog/form/select-users/form-select-users';
import controls from '../../../../controls/controls';
import FormInputNumber from '../../dialog/form/form-input-number';

interface AddReceiptFormProps {
	onCancel: () => void;
	onAdd: (form: ReceiptAddForm) => void;
	onUpdate: (prev: ReceiptItem, form: ReceiptAddForm) => void;
	onDelete: (form: ReceiptItem) => void;
	item: ReceiptItem;
	users: UserProfile[];
}

export default function AddReceiptForm({
	onCancel,
	onAdd,
	users,
	item,
	onDelete,
	onUpdate,
}: AddReceiptFormProps) {
	const { category, coordinator, description, total, usersToPay } = item;

	const handleSubmit = (data: any) => {
		const included: string[] = Object.entries(data)
			.filter(entry => entry[1] === 'on')
			.reduce((acc: any, curr) => {
				acc.push(curr[0]);
				return acc;
			}, []);
		if (included.length < 1) {
			alert('최소 한명 이상은 정산대상에 포함되어야 합니다');
			return;
		}
		const form: ReceiptAddForm = {
			usersToPay: included,
			category,
			coordinator: data.coordinator,
			description: data.description,
			total: data.total,
			receiptURL: data.receiptURL,
		};

		item.id ? onUpdate(item, form) : onAdd(form);
	};

	return (
		<FormContainer
			onSubmit={handleSubmit}
			title={item.category.name + ' 지출내역 추가'}
			hasDelete={!!item.id}
			onDelete={() => onDelete(item)}
			onCancel={onCancel}
			submitName={item.id ? '수정' : '생성'}
		>
			<section>
				<FormSelect
					name='coordinator'
					initialValue={coordinator.uid}
					users={users}
				/>
				<FormInputText
					name='description'
					initialValue={description}
					placeholder='사용처'
					isFocused={true}
				/>
				<div className='flex'>
					<FormInputNumber
						calcTitle='금액 입력'
						name='total'
						initialValue={total ? total : undefined}
						placeholder='금액'
						isStretched={false}
					/>
				</div>
				<FormSelectUsers users={users} usersToPay={usersToPay} />
			</section>
		</FormContainer>
	);
}
