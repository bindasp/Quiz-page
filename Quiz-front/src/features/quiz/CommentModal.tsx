import React, { useEffect, useState } from 'react';
import { Modal, Text, Group, Stack, Title, Divider, Badge } from '@mantine/core';
import { getQuizFeedback } from '../../fetchFunctions/getFunctions';
import '../styles/Quiz.css';

interface FeedbackData {
  id: number;
  test_id: string;
  user_id: number;
  comment: string;
  rating: number;
  created_at: string;
}

interface CommentModalProps {
  quizId: string | undefined;
  opened: boolean;
  onClose: () => void;
}

export const CommentModal: React.FC<CommentModalProps> = ({ quizId, opened, onClose }) => {
  const [comments, setComments] = useState<FeedbackData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (opened && quizId) {
      setLoading(true);
      setError(null);

      getQuizFeedback(quizId)
        .then(data => {
          setComments(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching comments:', err);
          setError('Nie udało się pobrać komentarzy');
          setLoading(false);
        });
    }
  }, [quizId, opened]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Komentarze do quizu" size="lg">
      <div className="comment-modal-content">
        {loading ? (
          <Text>Ładowanie komentarzy...</Text>
        ) : error ? (
          <Text color="red">{error}</Text>
        ) : comments.length === 0 ? (
          <Text>Brak komentarzy dla tego quizu</Text>
        ) : (
          <Stack>
            {comments.map(comment => (
              <div key={comment.id} className="comment-item">
                <Group justify="apart" mb={5}>
                  <Group>
                    <Badge color="blue" className="comment-rating">Ocena: {comment.rating}/5</Badge>
                    <Text size="sm" className="comment-date">{formatDate(comment.created_at)}</Text>
                  </Group>
                </Group>
                <Text className="comment-text">{comment.comment || "Brak komentarza"}</Text>
              </div>
            ))}
          </Stack>
        )}
      </div>
    </Modal>
  );
};
