import React, {useState, useEffect} from 'react';
import {Container, Button, Input, InputGroup} from 'reactstrap';
import '../assets/App.css';

export default function App() {

	/// Render
  return (
    <div className="App">
			<h1>
				Sentence Visualiser
			</h1>
			<InputGroup>
				<Input 
				id='object'
				name='object'
				type='text'
				placeholder='Input sentence'>
				</Input>
				<Button
				onClick={drawFigure}>
					Draw	
				</Button>
			</InputGroup> 

			<canvas
			id='canvas'
			height='250'
			width='500'>
			</canvas> 

    </div>
  );
}

/// Functions
function isLetter(letter) {
	const charCode = letter.toUpperCase().charCodeAt(); 
	if ( (charCode >= 65) && (charCode <= 90) ) {
		return true;
	} else {
		return false;
	}
}

function setStroke(character, canvas) {

	// Declare
	const lineWidths = [ 2, 4, 16, 64 ];	
	const colors = [ 'red', 'blue', 'yellow' ];
	let charFloor, charValue, vectorBase, sqrtLimit;
	let stroke = {vectors: []}
	
	// Calculate difference of input character from lowest possible value
	charFloor = 65;
	charValue = character.toUpperCase().charCodeAt() - charFloor + 1;

	// Determine the exponential xy vectors for 'stroke',
	// based on value of 'charValue' and sqrt of dimension
	for (let i = 1; i <= 2; i++) {
		sqrtLimit = i === 1 ? Math.sqrt(canvas.width) : Math.sqrt(canvas.height);
		vectorBase = Math.floor(charValue * (sqrtLimit/26)); 
		stroke.vectors.push(Math.pow(vectorBase, 2)); 
	}

	// Set color
	stroke.color = colors[Math.floor(Math.random() * Math.floor(2))];
	// Set line-width
	stroke.lineWidth = lineWidths[Math.floor(Math.random() * Math.floor(3))]; 

	// Return 'stroke'
	return stroke;
}

function drawFigure(e) {
	e.preventDefault();
	console.log('Commencing figure drawing...'); 

	// Variables
	const canvas = document.getElementById('canvas');
	const centerPoint = { x: canvas.width/2, y: canvas.height/2 } 
	const ctx = canvas.getContext('2d');

	// Extract letters from 'object' input 
	const userInput = document.getElementById('object').value; 
	const characters = 
	userInput.split('').filter(character => character !== ' ');

	// Test for validity of each character, then make the approriate stroke
	let stroke;
	characters.forEach(character => {
		if (isLetter(character)) {

			// Get the stroke, based on character value and canvas size
			stroke = setStroke(character, canvas); 

			// Color and line-width adjustments 
			ctx.strokeStyle = stroke.color;
			ctx.lineWidth = stroke.lineWidth;

			// Draw line
			ctx.beginPath();
			ctx.moveTo(centerPoint.x, centerPoint.y);
			ctx.arc(stroke.vectors[0], stroke.vectors[1], 50, 0, 90);
			ctx.stroke(); 
			console.log(stroke); 

		} else {
			console.log('Invalid input. Not a letter.'); 
			return;
		}
	}); 
}
