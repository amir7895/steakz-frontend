import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../pages/styles/CreatePost.css';

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user || user.role !== 'WRITER') {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost(title, content);
      navigate('/');
    } catch (err) {
      setError('Failed to create post');
    }
  };

  return (
    <form className="create-post-form" onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post Content"
        required
      />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
