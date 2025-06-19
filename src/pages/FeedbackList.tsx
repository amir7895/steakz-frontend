import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/Feedback.css';

interface FeedbackItem {
  id: number;
  name: string;
  rating: number;
  message: string;
  createdAt: string;
  reply?: string; // Added reply field
}

const FEEDBACK_KEY = 'steakz_feedbacks';

const FeedbackList: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState<{ [key: number]: string }>({}); // State to track reply inputs

  useEffect(() => {
    // Load feedbacks from localStorage
    const fetchData = async () => {
      try {
        const response = await axios.get('/feedback');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Failed to fetch feedbacks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleReplyChange = (id: number, value: string) => {
    setReplyText((prev) => ({ ...prev, [id]: value }));
  };

  const handleReplySubmit = async (id: number) => {
    const reply = replyText[id];
    if (reply) {
      console.log('Submitting feedback:', { id, reply });
      console.log('Attempting to submit feedback to backend:', { id, reply });
      try {
        const response = await axios.post('/feedback', {
          id,
          reply,
        });
        console.log('Backend response:', response.data);
        // Refresh feedback list after submission
        console.log('Refreshing feedback list after submission...');
        const updatedFeedbacks = await axios.get('/feedback');
        console.log('Updated feedback list:', updatedFeedbacks.data);
        setFeedbacks(updatedFeedbacks.data);
        setReplyText((prev) => ({ ...prev, [id]: '' })); // Clear the input field
      } catch (error) {
        console.error('Error while submitting feedback:', error);
      }
    }
  };

  // Mock feedback data for display purposes
  if (feedbacks.length === 0) {
    const mockFeedbacks = [
      {
        id: 1,
        name: 'John Doe',
        rating: 5,
        message: 'Great service!',
        createdAt: new Date().toISOString(),
        reply: 'Thank you!'
      },
      {
        id: 2,
        name: 'Jane Smith',
        rating: 4,
        message: 'Good experience overall.',
        createdAt: new Date().toISOString(),
        reply: 'We appreciate your feedback!'
      }
    ];
    setFeedbacks(mockFeedbacks);
  }

  return (
    <main className="feedback-main">
      <h1>Customer Feedback</h1>
      <p className="feedback-intro">See what our guests are saying about Steakz!</p>
      {loading ? (
        <div className="feedback-loading">Loading feedback...</div>
      ) : feedbacks.length === 0 ? (
        <div className="feedback-empty">No feedback submitted yet.</div>
      ) : (
        <ul className="feedback-list">
          {feedbacks.map(fb => (
            <li key={fb.id} className="feedback-card">
              <div className="feedback-card-header">
                <span className="feedback-name">{fb.name}</span>
                <span className="feedback-rating">{'★'.repeat(fb.rating)}{'☆'.repeat(5 - fb.rating)}</span>
              </div>
              <div className="feedback-message">{fb.message}</div>
              <div className="feedback-date">{fb.createdAt}</div>
              {fb.reply && <div className="feedback-reply">Reply: {fb.reply}</div>}
              <div className="feedback-reply-input">
                <input
                  type="text"
                  placeholder="Write a reply..."
                  value={replyText[fb.id] || ''}
                  onChange={(e) => handleReplyChange(fb.id, e.target.value)}
                />
                <button onClick={() => handleReplySubmit(fb.id)}>Submit</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default FeedbackList;
