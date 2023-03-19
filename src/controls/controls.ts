import { NavItemType, NavMenuItem } from '../types/interfaces/interfaces';

type Controls = {
	menu: {
		items: NavMenuItem<NavItemType>[];
	};
};

const controls: Controls = {
	menu: {
		items: [
			{
				id: '1',
				title: '관리자',
				path: 'admin',
				type: 'route',
				isPrivate: true,
				isRequireAdmin: true,
			},
			{
				id: '2',
				title: '체크리스트',
				path: 'checklist',
				type: 'route',
				isPrivate: true,
				isRequireAdmin: false,
			},
			{
				id: '3',
				title: '공동정산',
				path: 'group-account',
				type: 'route',
				isPrivate: true,
				isRequireAdmin: false,
			},
			/* {
				id: '3',
				title: '산행일기',
				path: 'diary',
				type: 'route',
				isPrivate: true,
				isRequireAdmin: false,
			}, */
			{
				id: '4',
				type: 'profile',
				path: 'mypage',
				isPrivate: true,
				isRequireAdmin: false,
			},
			{ id: '5', type: 'login', isPrivate: false, isRequireAdmin: false },
		],
	},
};

export default controls;
