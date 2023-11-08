import React from 'react';
import ReactDOM from 'react-dom';
import RegistrationForm from './RegistrationForm';
import Quiz from './Quiz';

const App = () => {
  // Example logic to switch between registration and quiz components
  const isRegistered = true; // Set this based on user registration status

  return (
    <div>
      {isRegistered ? <Quiz /> : <RegistrationForm />}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
