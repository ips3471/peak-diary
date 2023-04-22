import { useReducer, useState } from 'react';
import Rounded from '../../../forms/rounded';
import {
	ColorMode,
	IsStretched,
	TextSize,
} from '../../../../types/group-account/group-account';
import calcReducer from '../../../../reducer/calcReducer';
import { BiCalculator } from 'react-icons/bi';
import NumPad from '../../../../util/Numpad';

interface FormInputNumberProps {
	name: string;
	placeholder: string;
	initialValue?: number;
	colorMode?: ColorMode;
	isStretched?: IsStretched;
	textSize?: TextSize;
	calcTitle: string;
}

export default function FormInputNumber({
	calcTitle,
	name,
	placeholder,
	initialValue,
	colorMode = 'light',
	isStretched = true,
	textSize = 'text-sm',
}: FormInputNumberProps) {
	const [input, setInput] = useState<number | undefined>(initialValue);
	const [calcState, calcDispatch] = useReducer(calcReducer, { isOpen: false });

	return (
		<Rounded color={colorMode} isStretched={isStretched} flexDirection='col'>
			<div className='flex'>
				<input
					required
					name={name}
					className={`py-2 ${textSize}`}
					autoComplete='disable'
					spellCheck='false'
					type='number'
					value={input}
					placeholder={placeholder}
					onChange={e =>
						setInput(
							e.currentTarget.value ? Number(e.currentTarget.value) : undefined,
						)
					}
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
						setInput(val);
						calcDispatch({ type: 'toggle_visible' });
					}}
					title={calcTitle}
					type='currency'
				/>
			)}
		</Rounded>
	);
}
