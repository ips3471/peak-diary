import { useMemo, useState } from 'react';
import Rounded from '../../../forms/rounded';
import { UserProfile } from '../../../../types/components/profile';

type Options = {
	colorMode: 'light' | 'dark';
	isStretch: boolean;
	textSize: 'text-xs' | 'text-sm' | 'text-lg';
};

interface FormSelectProps {
	name: string;
	options?: Options;
	users: UserProfile[];
	initialValue: string;
}

const defaultOptions: Options = {
	colorMode: 'light',
	isStretch: true,
	textSize: 'text-sm',
};

export default function FormSelect({
	name,
	users,
	initialValue,
	options = defaultOptions,
}: FormSelectProps) {
	const [select, setSelect] = useState<string>(initialValue);

	const { colorMode, isStretch, textSize } = useMemo(() => {
		return options;
	}, [options]);

	return (
		<Rounded color={colorMode} isStretched={isStretch}>
			<label className='text-sm flex items-center' htmlFor='user-select'>
				결제한 사람
			</label>
			<select
				required
				value={select}
				className={`py-2 px-10 text-right ${textSize}`}
				onChange={e => setSelect(e.currentTarget.value)}
				name={name}
				id='user-select'
			>
				{users.map(user => (
					<option key={user.uid} id={user.uid} value={user.uid}>
						{user.name}
					</option>
				))}
			</select>
		</Rounded>
	);
}
