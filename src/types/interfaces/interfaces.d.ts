export interface AuthContextValue {
	user: AuthUser | null;
	login(): void;
	logout(): void;
}

export interface AuthUser {
	uid: string;
	isAdmin: boolean;
	displayName: string;
	photoURL: string;
}

export interface AuthContextProviderProps {
	children: ReactNode;
}

export type CheckListItem = {
	category: string;
	id: string;
	name: string;
	staged: boolean;
	checked: boolean;
};

export type CheckListTabItem = {
	id: string;
	name: string;
};

export type CheckListTab = CheckListTabItem & { items: CheckListItem[] };
