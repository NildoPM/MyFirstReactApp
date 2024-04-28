import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age: parseInt(age) }),
      });
      const data = await response.json();
      console.log(data.message);
      setName('');
      setAge('');
    } catch (err) {
      console.error('Error saving user data:', err);
    }
  };

  return (
    <div>
      <h1>Save User Data</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default App;