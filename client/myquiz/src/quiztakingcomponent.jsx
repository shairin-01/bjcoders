import React, { useState } from 'react';

const Quiz = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const question = 'What is the capital of France?'; // Sample question

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic to check the answer and calculate the score
    console.log('Selected option:', selectedOption);
    // Calculate score and update it in the state or send it to the backend
  };

  return (
    <div>
      <h2>Quiz Time!</h2>
      <form onSubmit={handleSubmit}>
        <h3>{question}</h3>
        <label>
          <input
            type="radio"
            value="optionA"
            checked={selectedOption === 'optionA'}
            onChange={() => handleOptionChange('optionA')}
          />
          Option A
        </label>
        <label>
          <input
            type="radio"
            value="optionB"
            checked={selectedOption === 'optionB'}
            onChange={() => handleOptionChange('optionB')}
          />
          Option B
        </label>
        {/* Add more options if necessary */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Quiz;
