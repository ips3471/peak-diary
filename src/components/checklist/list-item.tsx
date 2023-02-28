import React from 'react';
import { CheckListItem } from '../../types/interfaces/interfaces';

interface ListItemProps {
	item: CheckListItem;
}

export default function ListItem({ item }: ListItemProps) {
	return <li>{item.name}</li>;
}
