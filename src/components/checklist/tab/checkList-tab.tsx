import TabItem from './tab-item';
import { BsFillPencilFill } from 'react-icons/bs';
import { CheckListTab } from '../../../types/interfaces/interfaces';

interface TabProps {
	onSelect: (id: string) => void;
	current?: string;
	tabs: CheckListTab[];
	onAddTab: (name: string) => void;
	setDialog: (state: boolean) => void;
	onEditClick: (value: string) => void;
}

export default function Tab({
	onSelect,
	current,
	tabs,
	onAddTab,
	setDialog,
	onEditClick,
}: TabProps) {
	const handleScrollToElement = (element: HTMLLIElement) => {
		element.scrollIntoView({
			behavior: 'smooth',
			inline: 'center',
			block: 'nearest',
		});
	};

	const handleUpdate = () => {
		if (current) {
			onEditClick(tabs.find(t => t.id === current)?.name || '');
			setDialog(true);
		} else {
			onEditClick('');
			setDialog(true);
		}
	};

	return (
		<>
			<div className={` flex flex-col items-center sm:flex-row sm:border-b `}>
				<div className='flex sm:hidden w-full bg-red-50 text-center'>
					<select
						onChange={e => {
							const selected = e.currentTarget.value;
							onSelect(selected);
						}}
						value={current}
						className=' rounded-lg  px-2 py-2  text-grey shadow-sm flex-1'
						name='tabs'
						id='tab-select'
					>
						<option value=''>탭을 선택하세요</option>
						{tabs.map(tab => (
							<option key={tab.id} value={tab.id}>
								{tab.name}
							</option>
						))}
					</select>
					<button onClick={handleUpdate} className='text-grey pl-4 p-2'>
						<BsFillPencilFill />
					</button>
				</div>
				<ul className='hidden sm:block px-2 py-4 overflow-x-scroll scrollbar-hide whitespace-nowrap'>
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
					<button onClick={() => onAddTab('')} className='w-20'>
						+
					</button>
				</div>
			</div>
		</>
	);
}
