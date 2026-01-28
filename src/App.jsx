import { useState, useEffect } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Test from'./components/Test.jsx'



function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
 
  const quizData = [
    {
        question: "¿Qué es React principalmente ?",
        options: [
            "Un lenguaje de programación completo.",
            "Una base de datos para aplicaciones web.",
            "Una biblioteca de JavaScript para construir interfaces de usuario (UI).",
            "Un sistema operativo para servidores web."
        ],
        correctAnswer: "Una biblioteca de JavaScript para construir interfaces de usuario (UI).",
        explanation: "¡Correcto! React es una biblioteca de JavaScript, no un framework completo. Se enfoca en la parte visual de una aplicación."
    },
    {
        question: "¿Qué es JSX?",
        options: [
            "Una versión más rápida de JavaScript.",
            "Un lenguaje para estilizar componentes, similar a CSS.",
            "Una extensión de sintaxis que permite escribir una estructura similar a HTML en archivos de JavaScript.",
            "Una herramienta para crear proyectos de React automáticamente."
        ],
        correctAnswer: "Una extensión de sintaxis que permite escribir una estructura similar a HTML en archivos de JavaScript.",
        explanation: "¡Exacto! JSX (JavaScript XML) te permite escribir código que se ve casi idéntico a HTML dentro de tu JavaScript, haciendo la creación de componentes más intuitiva."
    },
    {
        question: "¿Cuál de estas es una regla OBLIGATORIA para nombrar un componente de React?",
        options: [
            "El nombre debe estar en minúsculas.",
            "El nombre debe comenzar con una letra mayúscula.",
            "El nombre debe incluir la palabra 'Component'.",
            "El nombre no puede contener números."
        ],
        correctAnswer: "El nombre debe comenzar con una letra mayúscula.",
        explanation: "¡Muy bien! React utiliza la primera letra mayúscula para diferenciar tus componentes (como <MiBoton />) de las etiquetas HTML nativas (como <button>)."
    },
    {
        question: "¿Cuál es el principal beneficio del DOM Virtual que utiliza React?",
        options: [
            "Hace que el código sea más seguro.",
            "Permite escribir CSS directamente en los componentes.",
            "Mejora el rendimiento al minimizar las actualizaciones directas del DOM real del navegador.",
            "Se asegura de que la aplicación funcione sin conexión a internet."
        ],
        correctAnswer: "Mejora el rendimiento al minimizar las actualizaciones directas del DOM real del navegador.",
        explanation: "¡Perfecto! El DOM Virtual es una copia en memoria que React usa para calcular los cambios más eficientes antes de actualizar el DOM real, lo que hace las aplicaciones mucho más rápidas."
    }
];

// --- ELEMENTOS DEL DOM ---
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');

// --- ESTADO DE LA APLICACIÓN ---
let currentQuestionIndex = 0;
let score = 0;

// --- FUNCIONES PRINCIPALES ---
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Siguiente";
    loadQuestion();
}

function loadQuestion() {
    resetState();
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.options.forEach(optionText => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.innerText = optionText;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectAnswer(button, optionText));
        li.appendChild(button);
        optionsElement.appendChild(li);
    });
}

function resetState() {
    nextBtn.style.display = 'none';
    feedbackElement.innerText = '';
    feedbackElement.style.backgroundColor = '#f8f9fa';
    while (optionsElement.firstChild) {
        optionsElement.removeChild(optionsElement.firstChild);
    }
}

function selectAnswer(buttonElement, selectedAnswer) {
    const currentQuestion = quizData[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
        buttonElement.classList.add('correct');
        score++;
    } else {
        buttonElement.classList.add('incorrect');
    }

    feedbackElement.innerText = currentQuestion.explanation;
    feedbackElement.style.backgroundColor = isCorrect ? '#eafaf1' : '#fdeded';

    Array.from(optionsElement.children).forEach(li => {
        li.firstChild.disabled = true; // Deshabilitar todos los botones
        if (li.firstChild.innerText === currentQuestion.correctAnswer) {
            li.firstChild.classList.add('correct');
        }
    });

    nextBtn.style.display = 'block';
}

function showResults() {
    resetState();
    questionElement.innerText = `¡Cuestionario completado!`;
    optionsElement.innerHTML = `<p style="font-size: 1.2rem;">Tu puntuación final es: <strong>${score} de ${quizData.length}</strong></p>`;
    nextBtn.innerText = "Reiniciar";
    nextBtn.style.display = "block";
}

function handleNextButtonClick() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < quizData.length) {
        handleNextButtonClick();
    } else {
        startQuiz();
    }
});

// --- INICIAR EL CUESTIONARIO ---
startQuiz();
}, []);
  
  

  return (    
    <>    
      <Test />
      </>
  )
}

export default App
