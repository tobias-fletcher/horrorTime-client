import React, { useState } from 'react';
import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    e.preventDefault();
    console.log(username, password);
    axios.post('itshorrortime/login', {
      Uername: username,
      Password: password
    })
      .then((response) => {
        const user = response.user;
        props.onLoggedIn(user);
      })
      .catch(e => {
        console.log('Invalid username')
      });
  };

  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );
}