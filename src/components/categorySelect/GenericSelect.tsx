import * as React from "react";
import { createRef, useEffect, useRef } from "react";
import GenericElement from "./GenericElement";

type GenericSelectProps = {
	id?: string;
	list: GenericElement<any>[];
	onUpdate?: (list: GenericElement<any>[]) => void;
	onSelect?: (element?: GenericElement<any>) => void;
	create?: boolean;
	newOptionText?: string;
	labelText?: string;
};
export const GenericSelect = (props: GenericSelectProps) => {
	const selectInstance = useRef<M.FormSelect>();
	const selectRef = createRef<HTMLSelectElement>();


	useEffect(() => {
		if (selectRef.current) {
			selectInstance.current = M.FormSelect.init(selectRef.current,
				{dropdownOptions: {closeOnClick: true, onCloseEnd: selectElement}});
		}
		M.updateTextFields();
		props.onUpdate && props.onUpdate(props.list);
		// eslint-disable-next-line
	}, [props.list]);

	const selectElement = () => {
		if (selectInstance.current) {
			const categName = selectInstance.current.input.value;
			const categ = props.list.find(elem => elem.filter(categName));
			props.onSelect && props.onSelect(categ);
		}
	};

	return (
		<div>
			<select id={props.id} ref={selectRef}>
				{!!props.create ? <option value="">{props.newOptionText}</option> : ""}
				{props.list.map(categ => <option value={categ.id}>{categ.name}</option>)}
			</select>
			<label htmlFor={props.id}>{props.labelText}</label>
		</div>
	);
};
