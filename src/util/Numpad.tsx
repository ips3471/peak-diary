import React, { MouseEvent, useEffect, useState } from 'react';
import FormContainer from '../components/form/form-container';

type NumPadType = 'currency' | 'password';
type NumPadOptions = {
	numColor: string;
	clearColor: string;
	enterColor: string;
	buttonRadius: string;
	buttonGap: string;
};

type NumPadStyleObj = {
	[property: string]: string;
};
type NumPadStyles = {
	numpad__wrapper: NumPadStyleObj;
	input__container: NumPadStyleObj;
	numpad__input: NumPadStyleObj;
	numpad__input__clear: NumPadStyleObj;
	numpad__container: NumPadStyleObj;
	numpad__pad: NumPadStyleObj;
	numpad__pad__00: NumPadStyleObj;
	numpad__pad__enter: NumPadStyleObj;
};

interface NumPadProps {
	type: NumPadType;
	onSubmit: (value: number) => void;
	options?: NumPadOptions;
	onCancel: () => void;
}

const PADS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const defaultOptions = {
	numColor: '#7fffd4',
	clearColor: '#7fffd4',
	enterColor: 'tomato',
	buttonRadius: '10px',
	buttonGap: '0.25rem',
};

export default function NumPad({
	type = 'currency',
	onSubmit,
	onCancel,
	options = defaultOptions,
}: NumPadProps) {
	const [input, setInput] = useState<string>('');

	const handleSubmit = () => {
		const value = Number(input);
		onSubmit(value);
		setInput('');
	};

	const onInputChange = (e: MouseEvent<HTMLButtonElement>) => {
		if (type === 'password' && input.length >= 4) {
			return;
		}
		const key = e.currentTarget.textContent;
		setInput(prev => prev + key);
	};
	const onInputClear = () => {
		setInput('');
	};

	const styles: NumPadStyles = {
		numpad__wrapper: {},
		input__container: {
			display: 'flex',
			padding: '0 0.5rem',
			height: '2.8rem',
			flex: '1 1 0%',
			gap: options.buttonGap,
		},
		numpad__input: {
			flex: '1 1 70%',
			height: '100%',
			'border-radius': '7px',
			border: '1px solid #777',
			'text-align': 'right',
			padding: '0 1rem',
			'font-size': '1.1rem',
			color: type === 'password' ? 'tomato' : 'black',
		},
		numpad__input__clear: {
			'background-color': options.clearColor,
			'border-radius': options.buttonRadius,
			flex: '1 1 30%',
			cursor: 'pointer',
		},
		numpad__container: {
			width: '20rem',
			display: 'grid',
			'grid-template-columns': 'repeat(3, 1fr)',
			gap: options.buttonGap,
			padding: '0.5rem',
		},

		numpad__pad: {
			flex: '1 1 3rem',
			'background-color': options.numColor,
			height: '4rem',
			display: 'flex',
			'justify-content': 'space-around',
			'align-items': 'center',
			'border-radius': options.buttonRadius,
			cursor: 'pointer',
		},
		numpad__pad__00: {
			visibility: type === 'currency' ? 'visible' : 'hidden',
			'pointer-events': type === 'currency' ? 'auto' : 'none',
		},
		numpad__pad__enter: {
			'background-color': options.enterColor,
		},
	};

	return (
		<FormContainer title='참야코드 입력' onCancel={onCancel}>
			<div className='numpad__wrapper' style={styles.numpad__wrapper}>
				<div style={styles.input__container} className='input__container'>
					<input
						value={input}
						style={styles.numpad__input}
						type='text'
						autoComplete='disable'
						readOnly
					/>
					<button
						style={styles.numpad__input__clear}
						className='numpad__pad numpad__pad__clear'
						onClick={onInputClear}
					>
						C
					</button>
				</div>
				<div style={styles.numpad__container} className='numpad__container'>
					{PADS.map((num, index) => (
						<button
							style={styles.numpad__pad}
							className='numpad__pad'
							key={index}
							onClick={onInputChange}
						>
							{num}
						</button>
					))}
					<button
						style={{ ...styles.numpad__pad, ...styles.numpad__pad__00 }}
						className='numpad__pad numpad__pad__00'
						onClick={onInputChange}
					>
						00
					</button>
					<button
						style={{ ...styles.numpad__pad, ...styles.numpad__pad__enter }}
						className='numpad__pad numpad__pad__enter'
						onClick={handleSubmit}
					>
						ENTER
					</button>
				</div>
			</div>
		</FormContainer>
	);
}
