import { useMemo } from 'react';
import FormContainer from '../../forms/form-container';
import FormInputText from './form/form-input-text';
import FormInputDate from './form/form-input-date';
import FormInputNumber from './form/form-input-number';

interface ScheduleFormProps {
	onCancel: () => void;
	onSubmit: (data: FormInputs) => void;
}

export type FormInputs = {
	[name: string]: FormDataEntryValue;
};

export default function ScheduleForm({
	onCancel,
	onSubmit,
}: ScheduleFormProps) {
	const handleSubmit = (data: FormInputs) => {
		onSubmit(data);
		onCancel();
	};

	const printMinDate = useMemo(() => {
		const date = new Date();
		return `${String(date.getFullYear())}-${getFullDateFormat(
			date.getMonth() + 1,
		)}-01`;
	}, []);

	return (
		<FormContainer
			onSubmit={handleSubmit}
			onCancel={onCancel}
			title='새로운 정산모임'
		>
			<FormInputText
				name='title'
				initialValue={''}
				isFocused={true}
				placeholder='모임이름'
			/>
			<FormInputDate name='date' min={printMinDate} />
			<div className='flex'>
				<FormInputNumber
					calcTitle='인원 입력'
					name='userLength'
					initialValue={0}
					placeholder='모임인원'
					isStretched={false}
				/>
			</div>
		</FormContainer>
	);
}

function getFullDateFormat(monthOrDate: number): string {
	if (monthOrDate < 10) {
		return String('0' + monthOrDate);
	} else {
		return String(monthOrDate);
	}
}
