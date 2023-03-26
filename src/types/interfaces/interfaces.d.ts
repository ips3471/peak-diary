export interface AuthContextValue {
	user: AuthUser | null;
	login(): void;
	logout(): void;
}

/* export interface AuthUser {
	uid: string;
	isAdmin: boolean;
	displayName: string;
	photoURL: string;
	name?: string;
} */

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

type IsRoute = boolean;

export type NavItemType = 'route' | 'profile' | 'login';

interface INavItem {
	type: NavItemType;
	id: string;
	isPrivate: boolean;
	isRequireAdmin: boolean;
}
type Route = INavItem & {
	type: 'route';
	path: string;
	title: string;
};
type Login = INavItem & {
	type: 'login';
};
type Profile = INavItem & {
	type: 'profile';
	path: string;
};
export type NavMenuItem<T extends NavItemType> = (Route | Login | Profile) & {
	type: T;
};

export type CheckListTab = CheckListTabItem & { items: CheckListItem[] };

export type ListID = Readonly<Params<string>>;
