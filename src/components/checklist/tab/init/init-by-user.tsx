import { useEffect, useReducer, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { BsFillPencilFill } from 'react-icons/bs';
import BodyContainer from '../../../body/container';
import InitItemsByTab from '../../items/init/init-by-tab';
import { CheckListController } from '../../../../controller/checklist';
import { CheckListItemController } from '../../../../controller/checklist-item';
import controls from '../../../../controls/controls';
import checkListReducer from '../../../../reducer/checklist/checklist';
import {
	CheckListDialog,
	CheckListReducer,
	CheckListTab,
} from '../../../../types/components/checklist';
import PromptDialog from '../dialog/prompt';

interface CheckListProps {
	tabController: CheckListController;
}

export default function InitTabsByUser({ tabController }: CheckListProps) {
	const [checkListTabs, dispatch] = useReducer<CheckListReducer<CheckListTab>>(
		checkListReducer,
		[],
	);
	const [selectedTab, setSelectedTab] = useState<CheckListTab | null>(null);
	const [dialog, setDialog] = useState<CheckListDialog<string>>(
		controls.checklist.tab.defaultDialog,
	);
	console.log('render checklist app');

	useEffect(() => {
		tabController.initTabs(dispatch);
	}, [selectedTab]);

	const resetDialog = () => {
		setDialog({ input: null, isActive: false });
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

	const isOverride = !!selectedTab;

	return (
		<>
			<BodyContainer onBlur={dialog.isActive}>
				<header className='flex sm:hidden w-full bg-red-50 text-center'>
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
						onClick={() =>
							setDialog({ input: selectedTab?.name || null, isActive: true })
						}
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
				{dialog.isActive &&
					createPortal(
						<PromptDialog
							dialog={dialog}
							onSubmit={handleSubmit}
							onDelete={handleDelete}
							title={isOverride ? '탭 이름 수정' : '새로운 탭 생성'}
							onCancel={resetDialog}
							type={isOverride ? '수정' : '생성'}
						/>,
						document.body,
					)}
			</BodyContainer>
		</>
	);
}
