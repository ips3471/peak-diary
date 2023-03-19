import React, {
	ChangeEvent,
	useState,
	FormEvent,
	useEffect,
	useRef,
} from 'react';
import BodyContainer from '../components/body/container';
import AddForm from '../components/checklist/addForm';
import ListContainer from '../components/checklist/list';
import Tab from '../components/checklist/tab/checkList-tab';
import PromptDialog from '../components/dialog/prompt';
import database from '../database/database';
import { CheckListItem, CheckListTab } from '../types/interfaces/interfaces';

export default function CheckList() {
	const [input, setInput] = useState<string>('');
	const [tabInput, setTabInput] = useState<string>();
	const [toggle, setToggle] = useState<boolean>(true);
	const [currentTab, setCurrentTab] = useState<string>();
	const [tabs, setTabs] = useState<CheckListTab[]>([]);
	const [dialog, setDialog] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		database.checkList.getTabs().then(setTabs);
		console.log('load tabs from database');
	}, []);

	useEffect(() => {
		dialog && inputRef.current?.select();
	}, [dialog]);

	const handleDialog = (state: boolean) => {
		setDialog(state);
	};

	const handleUpdateTab = (tab: CheckListTab) => {
		database.checkList.updateTab(tab);
		setTabs(prev => prev.map(item => (item.id === tab.id ? tab : item)));
	};

	const handleDeleteTab = () => {
		currentTab && database.checkList.deleteTab(currentTab);
		setTabs(prev => prev.filter(item => item.id !== currentTab));
		setCurrentTab('');
		setDialog(false);
	};

	const handleSubmitTab = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!tabInput) return;

		const found = tabs.find(tab => tab.id === currentTab);
		if (found) {
			handleUpdateTab({ ...found, name: tabInput });
		} else {
			handleAddTab(tabInput);
		}

		setDialog(false);
	};

	const handleSelectTab = (id: string) => {
		setCurrentTab(prev => id);
	};

	const handleTabInput = (value: string) => {
		setTabInput(value);
		setDialog(true);
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

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTabInput(e.currentTarget.value);
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
		<>
			<BodyContainer onBlur={dialog}>
				<nav>
					<Tab
						tabs={tabs}
						onAddTab={handleAddTab}
						onSelect={handleSelectTab}
						current={currentTab}
						setDialog={handleDialog}
						onEditClick={handleTabInput}
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
			</BodyContainer>
			{dialog && (
				<PromptDialog
					onDeleteTab={handleDeleteTab}
					title={currentTab ? '기존 탭 이름을 변경' : '새로운 탭 생성'}
					current={currentTab}
					onSubmit={handleSubmitTab}
					onCancel={() => setDialog(false)}
				>
					<input
						ref={inputRef}
						value={tabInput}
						onChange={handleChange}
						spellCheck='false'
						type='text'
						required
						className='bg-red-100 text-brand text-center border-b border-dotted text-xl mb-6 border-b-red-300'
					/>
				</PromptDialog>
			)}
		</>
	);
}
