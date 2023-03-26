type CalcReducerState = {
	isOpen: boolean;
};
type CalcReducerAction = {
	type: 'toggle_visible';
};

export default function calcReducer(
	state: CalcReducerState,
	action: CalcReducerAction,
) {
	const { isOpen } = state;
	if (action.type === 'toggle_visible') {
		return { isOpen: !isOpen };
	}
	throw Error('Unknown action.');
}
