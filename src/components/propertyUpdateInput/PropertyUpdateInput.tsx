import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { getErrorText } from "../../pages/errors/localization";
import userUserService from "../../services/modules/user/userUserService";
import Console from "../../utils/Console";
import { MessageList } from "../messageList/MessageList";
import localization from "./localization";
import "./PropertyUpdateInput.css";

type PropertyUpdateInputProps = {
	labelText: string;
	property: string;
	type?: string;
	value: any;
	element?: string;
	onChange?: (val: string) => void
	locale?: string;
};
export const PropertyUpdateInput = (props: PropertyUpdateInputProps) => {
	const {setCtx} = useContext(AppContext)
	const [inputRef, setInputRef] = useState<HTMLInputElement | HTMLTextAreaElement | null>(null);
	const [value, setValue] = useState<string>("");
	const [errors, setErrors] = useState<string[]>([]);
	const [messages, setMessages] = useState<string[]>([]);

	const onChange = (value: string) => {
		props.onChange && props.onChange(value);
	};

	useEffect(() => {
		setValue(props.value);
		// eslint-disable-next-line
	}, []);

	useEffect(()=>{
		if (inputRef && inputRef.classList.contains("materialize-textarea")) {
			M.textareaAutoResize(inputRef);
		}
	},[inputRef])

	useEffect(() => {
		onChange(value);
		// eslint-disable-next-line
	}, [value]);

	const updateProperty = () => {
		if (inputRef)
			userUserService.updateProperty(props.property, inputRef.value).then(user => {
				inputRef.value = user[props.property] as string;
				setCtx({user});
				setMessages([localization[props.locale || "en"].success]);
			}).catch(err => {
				Console.error(err);
				if (err.response && err.response.data) {
					setErrors([getErrorText(err.response.data.error, props.locale || "en")]);
				}
			});
	};

	return (
		<div className="property-update-input">
			<div className="input-field">
				{props.element === "textarea" ?
					<textarea className="materialize-textarea" ref={elem => setInputRef(elem)} id={props.property}
					          value={value}
					          onChange={ev => setValue(ev.target.value)}/> :
					<input ref={elem => setInputRef(elem)} id={props.property} value={value}
					       onChange={ev => setValue(ev.target.value)} type={props.type ? props.type : "text"}/>}
				<label htmlFor={props.property}>{props.labelText}</label>
				<button className="btn" onClick={updateProperty}><i className="material-icons">check</i></button>
			</div>
			<MessageList messages={errors} timeout={3000} className="red accent-2"/>
			<MessageList messages={messages} timeout={3000} className="green accent-2"/>
		</div>
	);
};
