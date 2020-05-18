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

	let charFloor, charValue, vectorBase, sqrtLimit;
	let stroke = {vectors: []}
	
	// Calculate difference of input character from lowest possible value
	charFloor = 65;
	charValue = character.toUpperCase().charCodeAt() - charFloor + 1;
	console.log('CharValue : ' + charValue); 

	// Determine the xy vectors for 'stroke', based on value of 'charValue'
	for (let i = 1; i <= 2; i++) {
		sqrtLimit = i === 1 ? Math.sqrt(canvas.height) : Math.sqrt(canvas.width);
		vectorBase = charValue * (sqrtLimit/26);
		stroke.vectors.push(Math.pow(vectorBase, 2)); 
	}

	// Return 'stroke'
	console.log('Vectors : ' + stroke.vectors);
	return stroke;
}

function drawFigure(e) {
	e.preventDefault();

	// Variables
	const canvas = document.getElementById('canvas');
	const centerPoint = {x: canvas.width/2, y: canvas.height/2}   
	const ctx = canvas.getContext('2d');
	console.log(centerPoint);

	// Extract letters from 'object' input 
	const userInput = document.getElementById('object').value; 
	const characters = userInput.split('');
	console.log(characters);

	// Test for validity of each character, then make the approriate stroke
	let stroke;
	ctx.strokeStyle = 'white';
	characters.forEach(character => {
		if (isLetter(character)) {
			stroke = setStroke(character, canvas); 
			ctx.beginPath();
			ctx.moveTo(centerPoint.x, centerPoint.y);
			ctx.lineTo(stroke.vectors[0], stroke.vectors[1]);
			ctx.stroke(); 
		} else {
			console.log('Invalid input. Not a letter.'); 
			return;
		}
	}); 
}

/* 
	const alphabet = [
		'a','b','c','d','e',
		'f','g','h','i','j',
		'k','l','m','n','o',
		'p','q','r','s','t',
		'u','v','w','x','y',
		'z'
	]
*/
