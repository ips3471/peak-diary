import React, { useRef, useState } from 'react';
import { db } from '../../../pages/CheckList';
import TabItem from './tab-item';
interface TabProps {
	onSelect: (id: string) => void;
	current?: string;
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
		element.scrollIntoView({
			behavior: 'smooth',
			inline: 'center',
			block: 'nearest',
		});
	};

	const handleAdd = () => {
		const element = { id: Date.now().toString(), name: '' };
		// element를 db에 추가
		db[element.id] = [];
		setTabs(prev => [...prev, element]);
		onSelect(element.id);
	};

	return (
		<div className={`flex flex-col items-center sm:flex-row sm:border-b `}>
			<div className='flex sm:hidden w-full bg-red-50 text-center'>
				<select
					onChange={e => {
						const selected = e.currentTarget.value;
						selected && onSelect(selected);
					}}
					className=' rounded-lg  px-2 py-2  text-grey shadow-sm flex-1'
					name='tabs'
					id='tab-select'
				>
					<option value=''>탭을 선택하세요</option>
					{tabs.map(tab => (
						<option value={tab.id}>{tab.name}</option>
					))}
				</select>
			</div>
			<ul
				ref={pageRef}
				className='hidden sm:block px-2 py-4 overflow-x-scroll scrollbar-hide whitespace-nowrap'
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
			<div className='hidden sm:flex '>
				<button onClick={handleAdd} className='w-20'>
					+
				</button>
			</div>
		</div>
	);
}
