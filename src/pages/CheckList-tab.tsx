import React, { useState } from 'react';
import { TabItem } from '../types/interfaces/interfaces';
import { db } from './CheckList';

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

	const handleAdd = () => {
		const name = prompt('새로운 탭의 이름을 입력하세요');
		if (name == null) return;
		const element = { id: Date.now().toString(), name };
		// element를 db에 추가
		db[element.id] = [];
		setTabs(prev => [...prev, element]);
		onSelect(element);
	};

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
				<button onClick={handleAdd} className='w-full'>
					+
				</button>
			</li>
		</ul>
	);
}
