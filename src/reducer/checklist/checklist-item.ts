import {
	CheckListItem,
	CheckListItemAction,
} from '../../types/components/checklist';

export default function checkListItemReducer(
	state: CheckListItem[],
	action: CheckListItemAction,
) {
	const { type, payload } = action;
	switch (type) {
		case 'init-item': {
			return payload;
		}
		case 'update-item': {
			return state.map(i => (i.id === payload.id ? payload : i));
		}
		case 'delete-item': {
			return state.filter(i => i.id !== payload);
		}
		default:
			return [];
	}
}
