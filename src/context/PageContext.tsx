import React, { createContext, ReactNode, useState, useContext } from 'react';

type Page = 'home' | 'checklist' | 'diary' | 'admin';

interface IPageContext {
	page: Page;
	to: (page: Page) => void;
}

interface PageContextProviderProps {
	children: ReactNode;
}

const PageContext = createContext<IPageContext | null>(null);

export function PageContextProvider({ children }: PageContextProviderProps) {
	const [page, setPage] = useState<Page>('home');

	function to(page: Page) {
		setPage(page);
	}

	return (
		<PageContext.Provider value={{ page, to }}>{children}</PageContext.Provider>
	);
}

export function usePageContext() {
	return useContext(PageContext)!;
}
