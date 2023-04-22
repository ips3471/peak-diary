import { GroupAccountAction } from '../../types/group-account/group-account';
import { ScheduleData } from '../../types/models/model';

export default function groupAccountReducer<
	T extends ScheduleData,
	A extends GroupAccountAction<T>,
>(state: T[], action: A) {
	const { type, payload } = action;

	switch (type) {
		case 'init': {
			return payload;
		}
		case 'update': {
			console.log(payload);
			return state.map(i => (i.id === payload.id ? payload : i));
		}
		case 'delete': {
			return state.filter(i => i.id !== payload);
		}
		case 'add': {
			return [...state, payload];
		}
		default:
			throw new Error('Not Allowed Type: ', type);
	}
}
