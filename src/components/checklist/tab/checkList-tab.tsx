import React, {
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import TabItem from './tab-item';
import { BsFillPencilFill } from 'react-icons/bs';
import { CheckListTab } from '../../../types/interfaces/interfaces';
import PromptDialog from '../../dialog/prompt';

interface TabProps {
	onSelect: (id: string) => void;
	current?: string;
	tabs: CheckListTab[];
	onAddTab: (name: string) => void;
}

export default function Tab({ onSelect, current, tabs, onAddTab }: TabProps) {
	const [dialog, setDialog] = useState(false);
	const [input, setInput] = useState<string>();
	const inputRef = useRef<HTMLInputElement>(null);
	const pageRef = useRef<HTMLUListElement>(null);

	const handleScrollToElement = (element: HTMLLIElement) => {
		element.scrollIntoView({
			behavior: 'smooth',
			inline: 'center',
			block: 'nearest',
		});
	};

	const handleUpdate = () => {
		// current가 있으면 수정, 없으면 생성
		if (current) {
			console.log('change tab name', current);
			setInput(tabs.find(t => t.id === current)?.name);
			setDialog(true);
		} else {
			console.log('new tab', current);
			setInput('');
			setDialog(true);
		}
		const found = tabs.find(t => t.id === current);
		if (!found) return;
	};

	useEffect(() => {
		dialog && inputRef.current?.select();
	}, [dialog]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput(e.currentTarget.value);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!input) return;

		if (current) {
			// update db
		} else {
			// set db
			// console.log('add new tab', input);
			// const element = await database.checkList.addTab(input);
			// setTabs(prev => [...prev, element]);
			onAddTab(input);
		}

		/* setTabs(prev =>
			prev.map(item => {
				if (item.id === current) {
					return { ...item, name: input };
				} else {
					return item;
				}
			}),
		); */
		//db에 업데이트

		setDialog(false);
	};

	return (
		<>
			<div className={`flex flex-col items-center sm:flex-row sm:border-b `}>
				<div className='flex sm:hidden w-full bg-red-50 text-center'>
					<select
						onChange={e => {
							const selected = e.currentTarget.value;
							onSelect(selected);
						}}
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
					<button onClick={() => onAddTab('')} className='w-20'>
						+
					</button>
				</div>
			</div>
			{dialog && (
				<PromptDialog
					title={current ? '탭 이름 수정' : '새로운 탭 생성'}
					onSubmit={handleSubmit}
					onCancel={() => setDialog(false)}
				>
					<input
						ref={inputRef}
						value={input}
						onChange={handleChange}
						type='text'
						required
						className='bg-red-100 text-brand text-center border-b border-dotted text-xl mb-6 border-b-red-300'
					/>
				</PromptDialog>
			)}
		</>
	);
}
