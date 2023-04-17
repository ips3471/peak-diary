import { useMemo, useReducer } from 'react';
import FormContainer from '../../forms/form-container';
import FormInputText from './form/form-input-text';
import calcReducer from '../../../reducer/calcReducer';
import { BiCalculator } from 'react-icons/bi';
import NumPad from '../../../util/Numpad';
import FormInputDate from './form/form-input-date';

interface ScheduleFormProps {
	onCancel: () => void;
	onSubmit: (data: FormInputs) => void;
}

export type FormInputs = {
	[name: string]: FormDataEntryValue;
};

export type InputItem = { name: string; value: any };

export default function ScheduleForm({
	onCancel,
	onSubmit,
}: ScheduleFormProps) {
	const [calcState, calcDispatch] = useReducer(calcReducer, { isOpen: false });

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
			<FormInputText name='title' placeholder='모임이름' />
			<FormInputDate name='date' min={printMinDate} />
			<div className='flex'>
				<FormInputText
					name='userLength'
					placeholder='모임인원'
					options={{
						isStretch: false,
						colorMode: 'light',
						textSize: 'text-xs',
					}}
				/>
				{!calcState.isOpen && (
					<button
						className='pl-4'
						type='button'
						onClick={() => calcDispatch({ type: 'toggle_visible' })}
					>
						<BiCalculator />
					</button>
				)}
			</div>
			{calcState.isOpen && (
				<NumPad
					onCancel={() => {
						calcDispatch({ type: 'toggle_visible' });
					}}
					onSubmit={val => {
						calcDispatch({ type: 'toggle_visible' });
					}}
					title={'모임인원 입력'}
					type='currency'
				/>
			)}
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
