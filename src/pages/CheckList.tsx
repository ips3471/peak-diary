import React, { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import AddForm from '../components/checklist/addForm';
import ListContainer from '../components/checklist/list';
import Tab from '../components/checklist/tab/checkList-tab';
import { CheckListItem } from '../types/interfaces/interfaces';

type DB = {
	[id: string]: CheckListItem[];
};

export const db: DB = {
	'1': [
		{
			id: '1',
			name: 'first',
			staged: true,
			checked: false,
		},
		{
			id: '2',
			name: 'second',
			staged: false,
			checked: false,
		},
		{
			id: '2w',
			name: 'test',
			staged: false,
			checked: false,
		},
		{
			id: '2e',
			name: 'test',
			staged: false,
			checked: false,
		},
		{
			id: '2t',
			name: 'test',
			staged: false,
			checked: false,
		},
		{
			id: '26',
			name: 'test',
			staged: true,
			checked: false,
		},
		{
			id: '27',
			name: 'test',
			staged: true,
			checked: false,
		},
		{
			id: '28',
			name: 'test',
			staged: true,
			checked: false,
		},
		{
			id: '29',
			name: 'test',
			staged: true,
			checked: false,
		},
		{
			id: '2333',
			name: 'test',
			staged: true,
			checked: false,
		},
		{
			id: '24242',
			name: 'test',
			staged: true,
			checked: false,
		},
		{
			id: '462',
			name: 'test',
			staged: false,
			checked: false,
		},
		{
			id: '257',
			name: 'test',
			staged: true,
			checked: false,
		},
		{
			id: '2f57',
			name: 'test',
			staged: true,
			checked: false,
		},
		{
			id: '2gdg57',
			name: 'test',
			staged: true,
			checked: false,
		},
		{
			id: '2s57',
			name: 'test',
			staged: true,
			checked: false,
		},
	],
	'2': [
		{
			id: '1',
			name: 'it is the item of tab2',
			staged: true,
			checked: false,
		},
	],
};

export default function CheckList() {
	const [input, setInput] = useState<string>('');
	const [toggle, setToggle] = useState<boolean>(true);
	const [currentTab, setCurrentTab] = useState<string>();
	const [items, setItems] = useState<CheckListItem[]>([]);

	useEffect(() => {
		console.log('current tab changed, load router object');
		//fetch from db (checklists/currentTab.id)
		if (!currentTab) return;
		const promise = db[currentTab];
		setItems(promise);
	}, [currentTab]);

	const handleSelectTab = (id: string) => {
		setCurrentTab(id);
	};

	const handleInputToggle = () => {
		setToggle(!toggle);
	};

	const handleUpdate = (list: CheckListItem) => {
		// db에서 업데이트 (currentTab.id, list)
		console.log('updated', list);
		setItems(prev =>
			prev.map(item => {
				if (item.id !== list.id) {
					return item;
				}
				return list;
			}),
		);
	};

	const handleDelete = (list: CheckListItem) => {
		// db에서 제거
		setItems(prev => prev.filter(item => item.id !== list.id));
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value;
		setInput(val);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (input == null) return;

		setItems(prev => [
			...prev,
			{
				id: Date.now().toString(),
				checked: false,
				name: input,
				staged: toggle,
			},
		]);

		setInput('');
	};

	return (
		<div className='bg-red-50 h-full flex flex-col p-checkList'>
			<nav>
				<Tab onSelect={handleSelectTab} current={currentTab} />
			</nav>

			{currentTab && (
				<main className='relative flex flex-col flex-1 overflow-y-clip '>
					<AddForm
						onSubmit={handleSubmit}
						text={input}
						onInputChange={handleInputChange}
						toggled={toggle}
						onToggle={handleInputToggle}
					/>

					<ListContainer
						items={items}
						onUpdate={handleUpdate}
						onDelete={handleDelete}
					/>
				</main>
			)}
		</div>
	);
}
