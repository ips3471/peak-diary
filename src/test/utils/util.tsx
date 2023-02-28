import { ReactNode } from 'react';
import { MemoryRouter, Routes } from 'react-router-dom';

export function withRouter(routes: ReactNode, initialEntry = '/') {
	return (
		<MemoryRouter initialEntries={[initialEntry]}>
			<Routes>{routes}</Routes>
		</MemoryRouter>
	);
}
