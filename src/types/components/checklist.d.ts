import { Reducer, SetStateAction, Dispatch } from 'react';

export type CheckListTab = {
	id: string;
	name: string;
	items: CheckListItem[];
};
export type CheckListDialog<T> = {
	input: T | null;
	isActive: boolean;
};
export type CheckListItem = {
	id: string;
	name: string;
	staged: boolean;
	checked: boolean;
};
export type UpdateReducer<T> = Dispatch<CheckListAction<T>>;
export type UpdateState<T> = Dispatch<SetStateAction<T[]>>;

export type ChecklistState = CheckListTab | CheckListItem;

export type CheckListTabAction =
	| UpdateTabAction
	| DeleteTabAction
	| InitTabAction;

export type CheckListItemAction =
	| UpdateItemAction
	| DeleteItemAction
	| InitItemAction;

export type CheckListTabReducer = Reducer<CheckListTab[], CheckListTabAction>;
export type CheckListItemReducer = Reducer<
	CheckListItem[],
	CheckListItemAction
>;
export type CheckListReducer<T> = Reducer<T[], CheckListAction<T>>;

type UpdateTabAction = {
	type: 'update-tab';
	payload: CheckListTab;
};
type DeleteTabAction = {
	type: 'delete-tab';
	payload: string;
};
type InitTabAction = {
	type: 'init-tab';
	payload: CheckListTab[];
};
type InitItemAction = {
	type: 'init-item';
	payload: CheckListItem[];
};
type UpdateItemAction = {
	type: 'update-item';
	payload: CheckListItem;
};
type DeleteItemAction = {
	type: 'delete-item';
	payload: string;
};
type CheckListTabActionType = 'update-tab' | 'delete-tab' | 'init-tab';

type CheckListItemActionType = 'update-item' | 'delete-item' | 'init-item';

type CheckListActionType = 'init' | 'update' | 'delete' | 'add';
export type CheckListAction<T> =
	| UpdateAction<T>
	| DeleteAction<T>
	| InitAction<T>
	| AddAction<T>;
type UpdateAction<T> = {
	type: 'update';
	payload: T;
};
type DeleteAction<T> = {
	type: 'delete';
	payload: string;
};
type InitAction<T> = {
	type: 'init';
	payload: T[];
};
type AddAction<T> = {
	type: 'add';
	payload: T;
};
