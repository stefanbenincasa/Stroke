import React, {useState, useEffect} from 'react';
import {Container, Button, Form, FormGroup, Input} from 'reactstrap';
import Canvas from './Canvas';
import '../assets/App.css';

export default function App() {

	/// Hooks
	const [keyMap, setKeyMap] = useState([
		['a','b','c','d','e'],
		['f','g','h','i','j'],
		['k','l','m','n','o'],
		['p','q','r','s','t'],
		['u','v','w','x','y'],
		['z']
	]);
	const [strokeWidths, setStrokeWidths] = useState([]); 

	/// Functions
	const drawFigure = function(e) {
		e.preventDefault();
		const userInput = document.getElementById('object').value; 
		console.log(userInput); 
	}

	/// Render
  return (
    <div className="App">

			<Form>
				<FormGroup>
					<Input 
					id='object'
					name='object'
					type='text'
					placeholder='Input object name'>
					</Input>
					<Button
					onClick={drawFigure}>
						Draw	
					</Button>
				</FormGroup>
			</Form> 

			<Canvas 
			strokeWidths={strokeWidths} />

    </div>
  );
}

/// Helpers
