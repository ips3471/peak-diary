import React, { useEffect, useRef, useState } from 'react';
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
	const pageRef = useRef<HTMLUListElement>(null);

	const handleScrollToElement = (element: HTMLLIElement) => {
		element.scrollIntoView({ behavior: 'smooth', inline: 'center' });
	};

	const handleAdd = () => {
		const element = { id: Date.now().toString(), name: '' };
		// element를 db에 추가
		db[element.id] = [];
		setTabs(prev => [...prev, element]);
		onSelect(element);
	};

	return (
		<div className='flex border-b'>
			<ul
				ref={pageRef}
				className=' px-2 py-4 overflow-x-scroll scrollbar-hide whitespace-nowrap'
			>
				{tabs.map(tab => (
					<TabItem
						current={current}
						onSelect={onSelect}
						key={tab.id}
						item={tab}
						onFocus={handleScrollToElement}
					/>
				))}
			</ul>
			<div className='w-20 flex bg-slate-500'>
				<button onClick={handleAdd} className='w-full'>
					+
				</button>
			</div>
		</div>
	);
}