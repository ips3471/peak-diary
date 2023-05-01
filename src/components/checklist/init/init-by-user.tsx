import { useEffect, useReducer, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { BsFillPencilFill } from 'react-icons/bs';
import BodyContainer from '../../body/main-container';
import InitItemsByTab from '../items/init/init-by-tab';
import { CheckListTabController } from '../../../controller/checklist/checklist-tab';
import { CheckListItemController } from '../../../controller/checklist/checklist-item';
import checkListReducer from '../../../reducer/checklist/checklist';
import {
	CheckListReducer,
	CheckListTab,
} from '../../../types/checklist/checklist';
import ChecklistTabForm from '../tab/dialog/prompt';

interface CheckListProps {
	tabController: CheckListTabController;
}

export default function InitChecklist({ tabController }: CheckListProps) {
	const [checkListTabs, dispatch] = useReducer<CheckListReducer<CheckListTab>>(
		checkListReducer,
		[],
	);
	const [selectedTab, setSelectedTab] = useState<CheckListTab | null>(null);
	const [dialog, setDialog] = useState<boolean>(false);
	console.log('render checklist app');

	useEffect(() => {
		tabController.initTabs(dispatch);
	}, [selectedTab]);

	const resetDialog = () => {
		setDialog(false);
	};

	const handleSelect = (tabId: string) => {
		const tab = checkListTabs.find(t => t.id === tabId) || null;
		setSelectedTab(tab);
	};

	const handleSubmit = (input: string) => {
		let created: CheckListTab;
		if (selectedTab) {
			created = tabController.updateTab(input, selectedTab, dispatch);
		} else {
			created = tabController.addTab(input, dispatch);
		}
		setSelectedTab(created);
		resetDialog();
	};

	const handleDelete = () => {
		selectedTab && tabController.deleteTab(selectedTab, dispatch);
		resetDialog();
		setSelectedTab(null);
	};

	const ItemController = useMemo(() => {
		return selectedTab
			? new CheckListItemController(tabController.db.userDB, selectedTab)
			: null;
	}, [selectedTab]);

	return (
		<>
			<BodyContainer title='체크리스트' onBlur={dialog}>
				<header className='flex sm:hidden w-full bg-main-light-50 text-center'>
					<select
						onChange={e => {
							handleSelect(e.currentTarget.value);
						}}
						value={selectedTab?.id}
						className='rounded-lg p-2 text-grey shadow-sm flex-1'
					>
						<option value=''>탭을 선택하세요</option>
						{checkListTabs.map(tab => (
							<option key={tab.id} value={tab.id}>
								{tab.name}
							</option>
						))}
					</select>
					<button
						onClick={() => setDialog(true)}
						className='text-grey pl-4 p-2'
					>
						<BsFillPencilFill />
					</button>
				</header>
				<main className='overflow-y-scroll'>
					{selectedTab && (
						<InitItemsByTab
							currentTab={selectedTab}
							controller={ItemController}
						/>
					)}
				</main>
				{dialog &&
					createPortal(
						<ChecklistTabForm
							selectedTab={selectedTab}
							onSubmit={handleSubmit}
							onDelete={handleDelete}
							onCancel={resetDialog}
						/>,
						document.body,
					)}
			</BodyContainer>
		</>
	);
}

/* 
<PromptDialog
							dialog={dialog}
							onSubmit={handleSubmit}
							onDelete={handleDelete}
							title={isOverride ? '탭 이름 수정' : '새로운 탭 생성'}
							onCancel={resetDialog}
							hasDeleteBtn={isOverride}
							// type={isOverride ? '수정' : '생성'}
						/>,
*/
