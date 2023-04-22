import { CategoryId } from './../types/group-account/group-account.d';
import {
	ReceiptCategory,
	ScheduleProgress,
} from '../types/group-account/group-account';
import { NavItemType, NavMenuItem } from '../types/interfaces/global';

type Controls = {
	menu: {
		items: NavMenuItem<NavItemType>[];
	};
	receiptCategory: ReceiptCategory[];
	checklist: {
		tab: {
			defaultDialog: {
				input: string | null;
				isActive: boolean;
			};
		};
	};
	groupAccount: {
		header: {
			progressStates: ScheduleProgress[];
		};
		main: {
			receipt: {
				dialog: {
					categoryNames: { [key in CategoryId]: string };
				};
			};
		};
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
				title: '그룹정산',
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
	receiptCategory: [
		{ id: 'eating', name: '식당/카페' },
		{ id: 'shopping', name: '마트/편의점' },
		{ id: 'booking', name: '숙소/예약' },
		{ id: 'driving', name: '유류비/톨비' },
		{ id: 'etc', name: '기타' },
	],
	checklist: {
		tab: {
			defaultDialog: {
				input: null,
				isActive: false,
			},
		},
	},
	groupAccount: {
		header: {
			progressStates: ['pending', 'done'],
		},
		main: {
			receipt: {
				dialog: {
					categoryNames: {
						booking: '예약/티켓',
						driving: '주유/톨비',
						eating: '식당/카페',
						etc: '기타',
						shopping: '마트/편의점',
					},
				},
			},
		},
	},
};

export default controls;
