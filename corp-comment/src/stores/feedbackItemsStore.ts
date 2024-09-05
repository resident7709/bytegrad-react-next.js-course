import { create } from 'zustand';

import { TFeedbackItem } from '../lib/types';

type Store = {
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
  feedbackItems: TFeedbackItem[];
  getCompanyList: () => string[];
  fetchFeedbackItems: () => Promise<void>;
  selectCompany: (company: string) => void;
  addItemToList: (text: string) => Promise<void>;
  getFilteredFeedbackItems: () => TFeedbackItem[];
};

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  isLoading: false,
  errorMessage: '',
  feedbackItems: [],
  selectedCompany: '',
  getCompanyList: () => {
    return get()
      .feedbackItems.map(item => item.company)
      .filter((company, index, array) => {
        return array.indexOf(company) === index;
      });
  },
  getFilteredFeedbackItems: () => {
    const state = get();

    return state.selectedCompany
      ? state.feedbackItems.filter(
          feedbackItem => feedbackItem.company === state.selectedCompany,
        )
      : state.feedbackItems;
  },
  addItemToList: async (text: string) => {
    const companyName = text
      .split(' ')
      .find(word => word.includes('#'))!
      .substring(1);

    const newItem: TFeedbackItem = {
      text: text,
      daysAgo: 0,
      upvoteCount: 0,
      id: new Date().getTime(),
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    };

    set(state => ({ feedbackItems: [...state.feedbackItems, newItem] }));

    await fetch(
      'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks',
      {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
  },
  selectCompany: (company: string) => {
    set(() => ({ selectedCompany: company }));
  },
  fetchFeedbackItems: async () => {
    set(() => ({ isLoading: true }));

    try {
      const response = await fetch(
        'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks',
      );

      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();

      set(() => ({ feedbackItems: data.feedbacks }));
    } catch (error) {
      console.error(error);
      set(() => ({
        errorMessage: 'Could not fetch feedback. Please try again later.',
      }));
    }

    set(() => ({ isLoading: false }));
  },
}));
