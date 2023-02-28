import React, { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import { AiOutlineEnter } from 'react-icons/ai';
import Toggle from 'react-toggle';
import AddForm from '../components/checklist/addForm';
import ListContainer from '../components/checklist/list';
import StagedItem from '../components/checklist/list-item-staged';
import UnstagedItem from '../components/checklist/list-item-unstaged';
import { CheckListItem, TabItem } from '../types/interfaces/interfaces';
import Tab from './CheckList-tab';

type DB = {
	[id: string]: CheckListItem[];
};

export default function CheckList() {
	const db: DB = {
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
	const [input, setInput] = useState<string>('');
	const [toggle, setToggle] = useState<boolean>(true);
	const [currentTab, setCurrentTab] = useState<TabItem>();
	const [items, setItems] = useState<CheckListItem[]>([]);

	useEffect(() => {
		console.log('current tab changed, load router object');
		//fetch from db (checklists/currentTab.id)
		const id = currentTab?.id;
		if (!id) return;
		const promise = db[id];
		setItems(promise);
	}, [currentTab]);

	const handleSelectTab = (tab: any) => {
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
				<Tab onSelect={handleSelectTab} />
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
						items={items}
						onUpdate={handleUpdate}
						onDelete={handleDelete}
					/>
				</main>
			)}
		</>
	);
}
