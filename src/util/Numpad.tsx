import { MouseEvent, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

type NumPadType = 'currency' | 'password';
type NumPadOptions = {
	numColor: string;
	clearColor: string;
	enterColor: string;
	buttonRadius: string;
	buttonGap: string;
	padTextColor: string;
};

type NumPadStyleObj = {
	[property: string]: string;
};
type NumPadStyles = {
	container: NumPadStyleObj;
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
	numColor: '#046241',
	clearColor: '#046241',
	enterColor: 'tomato',
	buttonRadius: '10px',
	buttonGap: '0.25rem',
	padTextColor: 'rgba(255,255,255,0.9)',
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
		container: {
			display: 'flex',
			minWidth: '16rem',
			padding: '0.5rem',
			flexDirection: 'column',
			justifyContent: 'center',
		},
		numpad__wrapper: {
			padding: '0.5rem',
			width: '100%',
		},
		input__container: {
			marginBottom: '0.5rem',
			width: '100%',
			display: 'flex',
			height: '2.2rem',
			gap: options.buttonGap,
		},
		numpad__input: {
			borderRadius: '7px',
			border: '3px solid #777',
			textAlign: 'right',
			padding: '0 0.5rem',
			color: type === 'password' ? 'tomato' : 'black',
		},
		numpad__input__clear: {
			width: '100%',
			padding: '0 1rem',
			backgroundColor: options.clearColor,
			borderRadius: options.buttonRadius,
			height: '100%',
			cursor: 'pointer',
			color: options.padTextColor,
		},
		numpad__container: {
			display: 'grid',
			gridTemplateColumns: 'repeat(3, 1fr)',
			gap: options.buttonGap,
		},

		numpad__pad: {
			flex: '0 1 1rem',
			backgroundColor: options.numColor,
			padding: '0.5rem',
			display: 'flex',
			justifyContent: 'space-around',
			alignItems: 'center',
			borderRadius: options.buttonRadius,
			cursor: 'pointer',
			color: options.padTextColor,
		},
		numpad__pad__00: {
			visibility: type === 'currency' ? 'visible' : 'hidden',
			pointerEvents: type === 'currency' ? 'auto' : 'none',
		},
		numpad__pad__enter: {
			backgroundColor: options.enterColor,
		},
	};

	return (
		<div style={styles.container} className={`flex-1 bg-red-100 rounded-lg`}>
			<header className='text-grey flex justify-between mb-1'>
				<h1 className=''>{title}</h1>
				<button type='button' onClick={onCancel} className={'text-xl'}>
					<AiOutlineClose />
				</button>
			</header>

			<article style={styles.numpad__wrapper}>
				<section style={styles.input__container}>
					<input
						value={input}
						style={styles.numpad__input}
						type='text'
						autoComplete='disable'
						readOnly
					/>
					<button
						type='button'
						style={styles.numpad__input__clear}
						onClick={onInputClear}
					>
						C
					</button>
				</section>

				<div style={styles.numpad__container}>
					{PADS.map((num, index) => (
						<button
							type='button'
							style={styles.numpad__pad}
							key={index}
							onClick={onInputChange}
						>
							{num}
						</button>
					))}
					<button
						type='button'
						style={{ ...styles.numpad__pad, ...styles.numpad__pad__00 }}
						onClick={onInputChange}
					>
						00
					</button>
					<button
						type='button'
						style={{ ...styles.numpad__pad, ...styles.numpad__pad__enter }}
						onClick={handleSubmit}
					>
						ENTER
					</button>
				</div>
			</article>
		</div>
	);
}
