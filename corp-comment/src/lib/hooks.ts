import { useContext, useEffect, useState } from 'react';

import { TFeedbackItem } from './types';
import { FeedbackItemsContext } from '../contexts/FeedbackItemsContextProvider';

export function useFeedbackItemsContext() {
  const context = useContext(FeedbackItemsContext);

  if (!context) {
    throw new Error(
      'FeedbackItemsContext must be used within a FeedbackItemsContextProvider',
    );
  }

  return context;
}

export function useFeedbackItems() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks',
        );

        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();

        setFeedbackItems(data.feedbacks);
      } catch (error) {
        console.error(error);
        setErrorMessage('Could not fetch feedback. Please try again later.');
      }

      setIsLoading(false);
    };

    fetchFeedbackItems();
  }, []);

  return {
    isLoading,
    errorMessage,
    feedbackItems,
    setFeedbackItems,
  };
}
