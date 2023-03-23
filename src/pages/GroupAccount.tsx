import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import BodyContainer from '../components/body/container';
import TabItem from '../components/buttons/tab/tab-item';
import {
	GroupAccountItem,
	GroupAccountState,
} from '../types/components/group-account';
import { AiOutlinePlus } from 'react-icons/ai';
import FormContainer from '../components/form/form-container';
import Rounded from '../components/form/rounded';
import { useAuthContext } from '../context/AuthContext';
import GroupAccountPresenter from '../presenter/group-account/GroupAccountPresenter';
import GroupAccountCard from '../components/group-account/group-account-item';

export default function GroupAccount() {
	const [accountItems, setAccountItems] = useState<GroupAccountItem[]>([]);
	const [activeState, setActiveState] =
		useState<GroupAccountState>('in-progress');
	const [dialog, setDialog] = useState(false);
	const [input, setInput] = useState({ title: '', date: '', userLength: 4 });
	const { user } = useAuthContext();
	const [numpad, setNumpad] = useState<GroupAccountItem | null>(null);

	useEffect(() => {
		GroupAccountPresenter.init(setAccountItems);
	}, []);

	const updateItem = (updated: GroupAccountItem) => {
		GroupAccountPresenter.updateList(updated, setAccountItems);
	};

	const handleNumpad = (item: GroupAccountItem | null) => {
		setNumpad(item);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.currentTarget;
		setInput(prev => ({ ...prev, [id]: value }));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!user) throw new Error(`Not Found User: ${user}`);
		console.log(input);
		// controller
		GroupAccountPresenter.addList(
			{ ...input, host: user.uid, users: [user] },
			setAccountItems,
		);
		setDialog(false);
	};

	return (
		<>
			<BodyContainer onBlur={dialog}>
				<nav className='flex mb-1 justify-between text-center'>
					<TabItem
						active={activeState}
						setState={setActiveState}
						text={'진행중'}
						state='in-progress'
					/>
					<TabItem
						active={activeState}
						setState={setActiveState}
						text={'마감'}
						state='done'
					/>
				</nav>
				<header className='flex justify-end mb-3'>
					<button
						onClick={() => setDialog(true)}
						className={`flex items-center text-gray-500 border rounded-3xl p-1 ${
							activeState === 'in-progress' ? 'visible' : 'invisible'
						}`}
					>
						<AiOutlinePlus />
						<span className={`text-zinc-900 text-xs font-medium `}>만들기</span>
					</button>
				</header>
				<ul>
					{user &&
						accountItems &&
						accountItems.map(item => (
							<GroupAccountCard
								onUpdate={updateItem}
								toggleNumpad={handleNumpad}
								numpadTarget={numpad?.id}
								item={item}
								user={user}
								key={item.id}
							/>
						))}
				</ul>
			</BodyContainer>
			{dialog && (
				<FormContainer
					onCancel={() => setDialog(false)}
					title='새로운 모임정산'
				>
					<form onSubmit={handleSubmit}>
						<section className='mb-3'>
							<label className='block mb-1' htmlFor='title'>
								모임이름:
							</label>
							<Rounded color='light' isStretched={true}>
								<input
									required
									className='text-xs'
									autoComplete='disable'
									spellCheck='false'
									id='title'
									type='text'
									value={input.title}
									onChange={handleInputChange}
								/>
							</Rounded>
						</section>
						<section className='mb-6'>
							<label className='block mb-1' htmlFor='date'>
								날짜:
							</label>
							<Rounded isStretched={false} color='light'>
								<input
									required
									className='text-xs'
									autoComplete='disable'
									spellCheck='false'
									id='date'
									type='date'
									value={input.date}
									onChange={handleInputChange}
								/>
							</Rounded>
						</section>
						<section className='mb-6'>
							<label className='block mb-1' htmlFor='date'>
								모임인원:
							</label>
							<Rounded isStretched={false} color='light'>
								<input
									required
									className='text-xs w-3'
									autoComplete='disable'
									spellCheck='false'
									id='userLength'
									type='number'
									value={input.userLength}
									onChange={handleInputChange}
								/>
							</Rounded>
						</section>
						<section className='flex justify-between text-center'>
							<button
								className='flex-1 text-body bg-brand/70 rounded-2xl py-3 font-semibold'
								type='submit'
							>
								만들기
							</button>
						</section>
					</form>
				</FormContainer>
			)}
		</>
	);
}
