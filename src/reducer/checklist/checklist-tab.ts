import {
	CheckListTab,
	CheckListTabAction as CheckListTabAction,
} from '../../types/components/checklist';

export default function checkListTabReducer(
	state: CheckListTab[],
	action: CheckListTabAction,
) {
	const { type, payload } = action;
	switch (type) {
		case 'init-tab': {
			return payload;
		}
		case 'update-tab': {
			return state.map(i => (i.id === payload.id ? payload : i));
		}
		case 'delete-tab': {
			return state.filter(i => i.id !== payload);
		}
		default:
			return [];
	}
}
