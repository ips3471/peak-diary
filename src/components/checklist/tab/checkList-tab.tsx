import React, { useState } from 'react';
import { CheckListTabItem } from '../../../types/interfaces/interfaces';
import { db } from '../../../pages/CheckList';
import TabItem from './tab-item';
interface TabProps {
	onSelect: (tab: CheckListTabItem) => void;
	current?: CheckListTabItem;
}

export default function Tab({ onSelect, current }: TabProps) {
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

	const handleTitleChange = (tab: CheckListTabItem) => {
		console.log('제목을 변경할 탭', tab);
	};

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
				<TabItem
					current={current}
					onSelect={onSelect}
					key={tab.id}
					item={tab}
					onTitleChange={handleTitleChange}
				/>
			))}
			<li className='inline-block my-2 mx-6 w-8 border'>
				<button onClick={handleAdd} className='w-full'>
					+
				</button>
			</li>
		</ul>
	);
}
