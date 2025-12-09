'use client';
import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';

const TextEditor = ({ placeholder ,value , onChangeHandler}) => {
	const editor = useRef(null);
	const [content, setContent] = useState('');

	return (
		<JoditEditor
			ref={editor}
			value={value}
			// config={config}
			tabIndex={1} // tabIndex of textarea
			onChange={(data) => onChangeHandler(data)}
		/>
	);
};

export default TextEditor;