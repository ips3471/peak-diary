export type NavId = 'home' | 'personal' | 'benefit' | 'more';

export interface NavItem {
	id: NavId;
	url: string;
	name: string;
}
