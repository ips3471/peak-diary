import React, { useState } from 'react';
import { TabItem } from '../types/interfaces/interfaces';

interface TabProps {
	onSelect: (tab: TabItem) => void;
}

export default function Tab({ onSelect }: TabProps) {
	const [tabs, setTabs] = useState([
		{
			id: '1',
			name: 'tab1',
		},
		{
			id: '2',
			name: 'tab2',
		},
	]);

	return (
		<ul className='border px-2 py-4'>
			{tabs.map(tab => (
				<li
					onClick={() => onSelect(tab)}
					className='inline-block my-2 mx-6'
					key={tab.id}
				>
					{tab.name}
				</li>
			))}
			<li className='inline-block my-2 mx-6 w-8 border'>
				<button className='w-full'>+</button>
			</li>
		</ul>
	);
}
