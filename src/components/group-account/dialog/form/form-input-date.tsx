import { useMemo, useState } from 'react';
import Rounded from '../../../forms/rounded';
import {
	ColorMode,
	IsStretched,
	TextSize,
} from '../../../../types/group-account/group-account';

interface FormInputDateProps {
	name: string;
	min?: string;
	max?: string;
	colorMode?: ColorMode;
	isStretched?: IsStretched;
	textSize?: TextSize;
}

export default function FormInputDate({
	name,
	min,
	max,
	colorMode = 'light',
	isStretched = true,
	textSize = 'text-sm',
}: FormInputDateProps) {
	const [input, setInput] = useState<string>();

	return (
		<Rounded color={colorMode} isStretched={isStretched}>
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
