import React from 'react';

const Test = () => {
    return (
        <div id="quiz-container">
            <h1>Cuestionario de React</h1>
            <h2 id="question">Cargando pregunta...</h2>
            <ul id="options"></ul>
            <p id="feedback"></p>
            <button id="next-btn">Siguiente</button>
        </div>
  );
};

export default Test; 