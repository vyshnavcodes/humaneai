// frontend/src/components/Chatbot.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chatbot = ({ token }) => {
  const [chatbots, setChatbots] = useState([]);
  const [name, setName] = useState('');
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChatbots();
  }, [token]);

  const fetchChatbots = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3000/chatbot', {
        headers: { Authorization: token },
      });
      setChatbots(response.data);
    } catch (error) {
      setError('Failed to fetch chatbots. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        'http://localhost:3000/chatbot',
        { name, data },
        { headers: { Authorization: token } }
      );
      setChatbots([...chatbots, response.data]);
      setName('');
      setData('');
    } catch (error) {
      setError('Failed to create chatbot. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Chatbots</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {chatbots.map((chatbot) => (
          <li key={chatbot._id}>{chatbot.name}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Data"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Create Chatbot
        </button>
      </form>
    </div>
  );
};

export default Chatbot;