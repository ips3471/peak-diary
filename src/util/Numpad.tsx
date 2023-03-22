import React, { MouseEvent, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

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
	title: string;
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
	title,
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
		numpad__wrapper: {
			padding: '0.5rem',
		},
		input__container: {
			display: 'flex',
			padding: '0 0.5rem',
			height: '2.2rem',
			gap: options.buttonGap,
		},
		numpad__input: {
			flex: '1 1 80%',
			'border-radius': '7px',
			border: '1px solid #777',
			'text-align': 'right',
			padding: '0 0.5rem',
			height: '100%',
			'font-size': '1.1rem',
			color: type === 'password' ? 'tomato' : 'black',
		},
		numpad__input__clear: {
			'background-color': options.clearColor,
			'border-radius': options.buttonRadius,
			height: '100%',
			flex: '1 1 20%',
			cursor: 'pointer',
		},
		numpad__container: {
			display: 'grid',
			'grid-template-columns': 'repeat(3, 1fr)',
			gap: options.buttonGap,
			padding: '0.5rem',
		},

		numpad__pad: {
			flex: '1 1 1rem',
			'background-color': options.numColor,
			'min-height': '2rem',
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
		<div className={`flex-1 bg-red-100 rounded-lg`}>
			<header className='text-grey flex justify-between mb-1'>
				<h1 className=''>{title}</h1>
				<button type='button' onClick={onCancel} className={'text-xl'}>
					<AiOutlineClose />
				</button>
			</header>

			<article className='numpad__wrapper ' style={styles.numpad__wrapper}>
				<section
					style={styles.input__container}
					className='input__container items-center'
				>
					<input
						value={input}
						style={styles.numpad__input}
						type='text'
						autoComplete='disable'
						readOnly
					/>
					<button
						type='button'
						style={{ ...styles.numpad__pad, ...styles.numpad__input__clear }}
						className='px-5 numpad__pad numpad__pad__clear'
						onClick={onInputClear}
					>
						C
					</button>
				</section>

				<div style={styles.numpad__container} className='numpad__container'>
					{PADS.map((num, index) => (
						<button
							type='button'
							style={styles.numpad__pad}
							className='numpad__pad'
							key={index}
							onClick={onInputChange}
						>
							{num}
						</button>
					))}
					<button
						type='button'
						style={{ ...styles.numpad__pad, ...styles.numpad__pad__00 }}
						className='numpad__pad numpad__pad__00'
						onClick={onInputChange}
					>
						00
					</button>
					<button
						type='button'
						style={{ ...styles.numpad__pad, ...styles.numpad__pad__enter }}
						className='numpad__pad numpad__pad__enter'
						onClick={handleSubmit}
					>
						ENTER
					</button>
				</div>
			</article>
		</div>
	);
}
