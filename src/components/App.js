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

function setStroke(character, canvas) {

	// Canvas limits; remember stroke is drawn from centerPoint aka 'halfway'
	const limits = { x: canvas.width/2, y: canvas.height/2}

	// Algorithm for the assignment of varying stroke, x, and y scalar 
	// There should be 1/2 chance of negation of a co-ordinate (x,y)
	let strokeWidth, x, y;
	strokeWidth = Math.floor(Math.random() * Math.floor(15));
	x = Math.floor(Math.random() * Math.floor(limits.x));
	y = Math.floor(Math.random() * Math.floor(limits.y));
	console.log(`${strokeWidth} ${x} ${y}`);
	
	// Stroke object has a strokeWidth, x, and y, property
	const stroke = {
		strokeWidth: strokeWidth,
		x: x,
		y: y
	}

	return stroke;
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
			stroke = setStroke(character, canvas); // Use stroke props within
			ctx.moveTo(centerPoint, centerPoint);
			ctx.lineTo(100,100);
			ctx.stroke();
		} else {
			return;
		}
	}); 
}
