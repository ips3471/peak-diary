import React, { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import Container from '../components/body/container';
import AddForm from '../components/checklist/addForm';
import ListContainer from '../components/checklist/list';
import Tab from '../components/checklist/tab/checkList-tab';
import database from '../database/database';
import { CheckListItem, CheckListTab } from '../types/interfaces/interfaces';

export default function CheckList() {
	const [input, setInput] = useState<string>('');
	const [toggle, setToggle] = useState<boolean>(true);
	const [currentTab, setCurrentTab] = useState<string>();
	const [tabs, setTabs] = useState<CheckListTab[]>([]);

	useEffect(() => {
		database.checkList.getTabs().then(setTabs);
		console.log('load tabs from database');
	}, []);

	const handleUpdateTab = (tab: CheckListTab) => {
		database.checkList.updateTab(tab);
		setTabs(prev => prev.map(item => (item.id === tab.id ? tab : item)));
	};

	const handleDeleteTab = () => {
		currentTab && database.checkList.deleteTab(currentTab);
		setTabs(prev => prev.filter(item => item.id !== currentTab));
		setCurrentTab('');
	};

	const handleSelectTab = (id: string) => {
		setCurrentTab(prev => id);
	};

	const handleInputToggle = () => {
		setToggle(!toggle);
	};

	const handleAddTab = async (name = '') => {
		const element = await database.checkList.addTab(name);
		setTabs(prev => [...prev, element]);
		handleSelectTab(element.id);
	};

	const handleUpdateItem = (list: CheckListItem) => {
		database.checkList.updateItem(list);
		setTabs(prev =>
			prev.map(tab => {
				if (tab.id === list.category) {
					console.log(
						'update item',
						list,
						{
							...tab,
							items: tab.items.map(item => (item.id === list.id ? list : item)),
						},
						list.checked,
					);
					return {
						...tab,
						items: tab.items.map(item => (item.id === list.id ? list : item)),
					};
				} else {
					return tab;
				}
			}),
		);
	};

	const handleDelete = (list: CheckListItem) => {
		database.checkList.deleteItem(list);
		setTabs(prev =>
			prev.map(tab =>
				tab.id === list.category
					? { ...tab, items: tab.items.filter(item => item.id !== list.id) }
					: tab,
			),
		);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value;
		setInput(val);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (input == null) return;
		if (currentTab == null) return;

		const element = await database.checkList.addList({
			category: currentTab,
			checked: false,
			name: input,
			staged: toggle,
		});

		setTabs(prev =>
			prev.map(tab =>
				tab.id === element.category
					? {
							...tab,
							items: [...tab.items, element],
					  }
					: tab,
			),
		);

		setInput('');
	};

	return (
		<Container>
			<nav>
				<Tab
					tabs={tabs}
					onAddTab={handleAddTab}
					onUpdateTab={handleUpdateTab}
					onSelect={handleSelectTab}
					current={currentTab}
					onDeleteTab={handleDeleteTab}
				/>
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
						current={currentTab}
						tabs={tabs}
						onUpdate={handleUpdateItem}
						onDelete={handleDelete}
					/>
				</main>
			)}
		</Container>
	);
}
