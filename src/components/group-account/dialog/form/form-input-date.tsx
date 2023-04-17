import { useMemo, useState } from 'react';
import Rounded from '../../../forms/rounded';
import { InputItem } from '../form';

type Options = {
	colorMode: 'light' | 'dark';
	isStretch: boolean;
	textSize: 'text-xs' | 'text-sm' | 'text-lg';
};

interface FormInputDateProps {
	name: string;
	min?: string;
	max?: string;
	options?: Options;
}

const defaultOptions: Options = {
	colorMode: 'light',
	isStretch: true,
	textSize: 'text-xs',
};

export default function FormInputDate({
	name,
	min,
	max,
	options = defaultOptions,
}: FormInputDateProps) {
	const [input, setInput] = useState<string>();

	const { colorMode, isStretch, textSize } = useMemo(() => {
		return options;
	}, [options]);

	return (
		<Rounded color={colorMode} isStretched={isStretch}>
			<input
				required
				name={name}
				className={`py-2 ${textSize}`}
				type='date'
				min={min}
				max={max}
				value={input}
				onChange={e => setInput(e.currentTarget.value)}
			/>
		</Rounded>
	);
}
