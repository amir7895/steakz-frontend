import React, { useState } from 'react';
import './styles/Feedback.css';

const initialFeedback = {
  name: '',
  email: '',
  rating: 5,
  message: '',
};

const FEEDBACK_KEY = 'steakz_feedbacks';

const Feedback: React.FC = () => {
  const [feedback, setFeedback] = useState(initialFeedback);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleRating = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFeedback({ ...feedback, rating: Number(e.target.value) });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);
    if (!feedback.name || !feedback.email || !feedback.message) {
      setError('Please fill in all required fields.');
      setSubmitting(false);
      return;
    }
    // Save feedback to localStorage
    const newFeedback = {
      id: Date.now(),
      name: feedback.name,
      rating: feedback.rating,
      message: feedback.message,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    const prev = JSON.parse(localStorage.getItem(FEEDBACK_KEY) || '[]');
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify([newFeedback, ...prev]));
    setSuccess(true);
    setFeedback(initialFeedback);
    setSubmitting(false);
  };

  return (
    <main className="feedback-main">
      <h1>We Value Your Feedback</h1>
      <p className="feedback-intro">Tell us about your Steakz experience. Your feedback helps us serve you better!</p>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <label>
          Name*
          <input name="name" value={feedback.name} onChange={handleInput} required />
        </label>
        <label>
          Email*
          <input name="email" type="email" value={feedback.email} onChange={handleInput} required />
        </label>
        <label>
          Rating*
          <select name="rating" value={feedback.rating} onChange={handleRating} required>
            <option value={5}>Excellent</option>
            <option value={4}>Very Good</option>
            <option value={3}>Good</option>
            <option value={2}>Fair</option>
            <option value={1}>Poor</option>
          </select>
        </label>
        <label>
          Message*
          <textarea name="message" value={feedback.message} onChange={handleInput} required placeholder="Share your thoughts, suggestions, or compliments!" />
        </label>
        {error && <div className="feedback-error">{error}</div>}
        {success && <div className="feedback-success">Feedback submitted!</div>}
        <button type="submit" className="feedback-submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Feedback'}</button>
      </form>
      <section className="feedback-info">
        <h2>Why Your Feedback Matters</h2>
        <ul>
          <li>We use your comments to improve our food, service, and atmosphere.</li>
          <li>All feedback is reviewed by Steakz management.</li>
          <li>Exceptional feedback may be featured on our website (with your permission).</li>
          <li>For urgent concerns, please call us directly for immediate assistance.</li>
        </ul>
      </section>
    </main>
  );
};

export default Feedback;