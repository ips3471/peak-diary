import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import CheckList from '../../../pages/CheckList';

describe('CheckList', () => {
	let input: HTMLInputElement;
	let button: HTMLButtonElement;
	let checkbox: HTMLFormElement;
	beforeEach(() => {
		render(<CheckList />);
		input = screen.getByRole('textbox');
		button = screen.getByRole('button');
		checkbox = screen.getByRole('checkbox');
	});

	/* 
    untoggled => submit하면 unstaged에 등록 + 반대의 경우
    */

	it('renders correctly', () => {
		expect(input).toBeInTheDocument();
		expect(button).toBeInTheDocument();
		expect(checkbox).toBeInTheDocument();
	});
	/* 
	it('checkbox default true', async () => {
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
