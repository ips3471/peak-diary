import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { AuthProvider } from '../../context/AuthContext';

type Page = 'home' | 'checklist' | 'diary' | 'admin';

describe('Navbar rendering', () => {
	beforeEach(() => {
		let page: Page;
		render(
			<AuthProvider>
				<Navbar page='home' />,
			</AuthProvider>,
			{ wrapper: MemoryRouter },
		);
	});

	it('renders logo', () => {
		const headingElement = screen.getByRole('heading');
		expect(headingElement).toBeInTheDocument();
	});

	it('renders nav lists', () => {
		const listContainer = screen.getByRole('navigation');
		expect(listContainer).toBeInTheDocument();
	});
});
