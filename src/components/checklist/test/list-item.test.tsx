import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CheckList from '../../../pages/CheckList';

describe('CheckList', () => {
	let input: HTMLInputElement;
	let button: HTMLButtonElement;
	let toggle: HTMLFormElement;
	beforeEach(() => {
		render(<CheckList />);
		input = screen.getByTestId('input');
		button = screen.getByTestId('submit');
		toggle = screen.getByTestId('toggle');
	});

	/* 
    untoggled => submit하면 unstaged에 등록 + 반대의 경우
    */

	it('renders correctly', () => {
		expect(input).toBeInTheDocument();
		expect(button).toBeInTheDocument();
		expect(toggle).toBeInTheDocument();
	});
	/* 
	it('toggle default true', async () => {
		userEvent.type(input, 'test');
		userEvent.click(button);

		const test = await screen.findByText('test');

		const lists = screen.getAllByRole('listitem');
		expect(lists[0]).toBeInTheDocument();
		expect(lists[1]).toBeInTheDocument();
	}); */

	it('when submits, update items related to current state of staged', async () => {
		userEvent.type(input, 'test');
		userEvent.click(button);

		const test = await screen.findByText('test');
		expect(test).toBeInTheDocument();
	});
});
