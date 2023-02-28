import React, { ChangeEvent, useState, FormEvent } from 'react';
import { AiOutlineEnter } from 'react-icons/ai';
import Toggle from 'react-toggle';
import ListItem from '../components/checklist/list-item';
import { CheckListItem } from '../types/interfaces/interfaces';

export default function CheckList() {
	const [input, setInput] = useState<string>();
	const [toggle, setToggle] = useState<boolean>(true);
	const [items, setItems] = useState<CheckListItem[]>([
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
	]);

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
				id: new Date().getSeconds().toString(),
				checked: false,
				name: input,
				staged: toggle,
			},
		]);

		setInput('');
	};

	function ListItemsFilteredByStaged(isStaged: boolean) {
		return items
			.filter(i => i.staged === isStaged)
			.map(filtered => <ListItem item={filtered} key={filtered.id} />);
	}

	return (
		<>
			<h1>checkList</h1>
			<div>
				<form onSubmit={handleSubmit} className='flex'>
					<input
						type='text'
						autoComplete='off'
						value={input || ''}
						onChange={handleInputChange}
					/>
					<button type='submit' className='border'>
						<AiOutlineEnter />
					</button>
					<Toggle
						id='toggle-status'
						defaultChecked={toggle}
						onChange={() => setToggle(!toggle)}
					/>
					<label htmlFor='toggle-status'>활성화시 스테이지에 등록</label>
				</form>
			</div>
			<div>
				<b>active</b>
			</div>
			<ul>
				<li>체크박스: 누르면 체크표시</li>
				<li>이름: 변경시마다 업데이트</li>
				<li>제외버튼: unstaged로</li>
				{ListItemsFilteredByStaged(true)}
			</ul>
			<div>
				<b>unstaged</b>
				<ul>
					<li>추가버튼: active로</li>
					<li>이름: 변경시마다 업데이트</li>
					<li>삭제버튼: db에서 제거</li>
					{ListItemsFilteredByStaged(false)}
				</ul>
			</div>
		</>
	);
}
