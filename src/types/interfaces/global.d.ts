export interface AuthContextValue {
	user: AuthUser | null;
	login(): void;
	logout(): void;
}

export interface AuthContextProviderProps {
	children: ReactNode;
}

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

export type ListID = Readonly<Params<string>>;

export type FormDialog<T> = {
	input: T | null;
	isActive: boolean;
};
