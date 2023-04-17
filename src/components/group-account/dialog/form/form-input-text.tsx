import { useMemo, useState } from 'react';
import Rounded from '../../../forms/rounded';
import { InputItem } from '../form';

type Options = {
	colorMode: 'light' | 'dark';
	isStretch: boolean;
	textSize: 'text-xs' | 'text-sm' | 'text-lg';
};

interface FormInputTextProps {
	name: string;
	placeholder: string;
	options?: Options;
}

const defaultOptions: Options = {
	colorMode: 'light',
	isStretch: true,
	textSize: 'text-xs',
};

export default function FormInputText({
	name,
	placeholder,
	options = defaultOptions,
}: FormInputTextProps) {
	const [input, setInput] = useState<string | number>();

	const { colorMode, isStretch, textSize } = useMemo(() => {
		return options;
	}, [options]);

	const type = useMemo(() => {
		return typeof input === 'number' ? 'number' : 'text';
	}, []);

	return (
		<Rounded color={colorMode} isStretched={isStretch}>
			<input
				required
				name={name}
				className={`py-2 ${textSize}`}
				autoComplete='disable'
				spellCheck='false'
				type={type}
				value={input}
				placeholder={placeholder}
				onChange={e => setInput(e.currentTarget.value)}
			/>
		</Rounded>
	);
}
