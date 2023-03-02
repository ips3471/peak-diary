import React, { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import AddForm from '../components/checklist/addForm';
import ListContainer from '../components/checklist/list';
import Tab from '../components/checklist/tab/checkList-tab';
import {
	CheckListItem,
	CheckListTabItem,
} from '../types/interfaces/interfaces';

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
	const [currentTab, setCurrentTab] = useState<CheckListTabItem>();
	const [items, setItems] = useState<CheckListItem[]>([]);

	useEffect(() => {
		console.log('current tab changed, load router object');
		//fetch from db (checklists/currentTab.id)
		const id = currentTab?.id;
		if (!id) return;
		const promise = db[id];
		setItems(promise);
	}, [currentTab]);

	const handleSelectTab = (tab: CheckListTabItem) => {
		setCurrentTab(tab);
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
		<>
			<nav>
				<Tab onSelect={handleSelectTab} current={currentTab} />
			</nav>

			{currentTab && (
				<main>
					<AddForm
						onSubmit={handleSubmit}
						text={input}
						onInputChange={handleInputChange}
						toggled={toggle}
						onToggle={handleInputToggle}
					/>

					<ListContainer
						title={currentTab.name}
						items={items}
						onUpdate={handleUpdate}
						onDelete={handleDelete}
					/>
				</main>
			)}
		</>
	);
}
