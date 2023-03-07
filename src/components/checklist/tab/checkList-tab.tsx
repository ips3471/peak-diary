import React, {
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import { db } from '../../../pages/CheckList';
import TabItem from './tab-item';
import { BsFillPencilFill } from 'react-icons/bs';

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

	const handleAdd = () => {
		const element = { id: Date.now().toString(), name: '' };
		// element를 db에 추가
		db[element.id] = [];
		setTabs(prev => [...prev, element]);
		onSelect(element.id);
	};

	const handleUpdate = () => {
		const found = tabs.find(t => t.id === current);
		if (!found) return;
		setInput(tabs.find(t => t.id === current)?.name);
		setDialog(true);
	};

	useEffect(() => {
		dialog && inputRef.current?.focus();
	}, [dialog]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput(e.currentTarget.value);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!input) return;
		setTabs(prev =>
			prev.map(item => {
				if (item.id === current) {
					return { ...item, name: input };
				} else {
					return item;
				}
			}),
		);
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
					<button onClick={handleAdd} className='w-20'>
						+
					</button>
				</div>
			</div>
			{dialog && (
				<article className='fixed w-full left-0 top-1/2 transform -translate-y-1/2 p-6 bg-red-100 rounded-lg z-30'>
					<h1 className='text-grey mb-3'>탭 이름을 수정</h1>
					<form
						onSubmit={handleSubmit}
						className='flex flex-col   text-center '
					>
						<input
							ref={inputRef}
							value={input}
							onChange={handleChange}
							type='text'
							required
							className='bg-red-100 text-brand text-center border-b border-dotted text-xl mb-6 border-b-red-300'
						/>
						<button type='submit' className='text-grey'>
							확인
						</button>
					</form>
				</article>
			)}
		</>
	);
}
