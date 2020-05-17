import React, {useState, useEffect} from 'react';
import {Container, Button, Input, InputGroup} from 'reactstrap';
import '../assets/App.css';

export default function App() {

	/// Hooks

	/// Variables

	/// Render
  return (
    <div className="App">

			<InputGroup>
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
			</InputGroup> 

			<canvas
			id='canvas'
			height='500'
			width='500'>
			</canvas> 

    </div>
  );
}

/// Functions
function isLetter(letter) {
	const charCode = letter.toUpperCase().charCodeAt(); 
	console.log(charCode);
	if ( (charCode >= 65) && (charCode <= 90) ) {
		return true;
	} else {
		return false;
	}
}

function getStroke(character, canvas) {
	
	// Canvas limits
	const limits = { x: canvas.width-25, y: canvas.height-25}
	console.log(limits.x);
	
	// Stroke has a lineTo, x, and y, property

}

function drawFigure(e) {
	e.preventDefault();

	// Variables
	const centerPoint = 250;
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');

	// Extract letters from 'object' input 
	const userInput = document.getElementById('object').value; 
	const characters = userInput.split('');
	console.log(characters);

	// Test for validity of each character, then make the approriate stroke
	let stroke;
	characters.forEach(character => {
		if (isLetter(character)) {
			getStroke(character, canvas);
			ctx.moveTo(centerPoint, centerPoint);
			ctx.lineTo(100,100);
			ctx.stroke();
		} else {
			return;
		}
	}); 
}
