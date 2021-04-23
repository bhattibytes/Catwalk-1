import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { REACT_APP_API_KEY } from '../../config/config';
import { ReviewContext } from './ReviewsContext';
import { QuestionContext } from './QuestionsContext';
import { AnswerContext } from './AnswersContext';
import { ProductContext } from './ProductContext';

export const APIContext = createContext({});

const APIProvider = ({ children }) => {
  // context imports
  const {
    setReviews,
    feedback,
    setFeedback,
    sortTerm,
    setMetaData,
    newReview,
  } = useContext(ReviewContext);
  const { setQuestions } = useContext(QuestionContext);
  const { setAnswers } = useContext(AnswerContext);
  const { setSelectedProduct, setStyleList, setStyleSelected } = useContext(ProductContext);

  // const { setQuestions } = useContext(QuestionContext);
  // const { setAnswers } = useContext(AnswerContext);
  // const { setSelectedProduct } = useContext(ProductContext);
  const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';
  // hard coded product id for use in all components
  const pId = '17067';

  /** ****************************************************************************
  *                      API calls for products
  ***************************************************************************** */
  const getAllProducts = async () => {
    try {
      await axios.get(`${baseURL}/products`, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getProductById = async () => {
    try {
      const product = await axios.get(`${baseURL}/products/${pId}`, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      setSelectedProduct(product.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getProductStyles = async () => {
    try {
      const getStyles = await axios.get(`${baseURL}/products/${pId}/styles`, {
        headers: { Authorization: REACT_APP_API_KEY }
      });
      setStyleList(getStyles.data);
      setStyleSelected(getStyles.data.results[0]);
      return getStyles.data;
    } catch(err) {
      console.log({err})
    }
  }

  const getRelatedProducts = async (id) => {
    try {
      const relatedProducts = await axios.get(`${baseURL}/products/${pId}/related`, {
        headers: { Authorization: REACT_APP_API_KEY }
      });
    } catch(err) {
      console.log({err})
    }
  }

  /** ****************************************************************************
  *                      API calls for QAs
  ***************************************************************************** */

  const getQuestionsByProductId = async () => {
    try {
      const allQuestions = await axios.get(`${baseURL}/qa/questions?product_id=${pId}&count=100`, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      setQuestions(allQuestions.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const getAnswersByQuestionId = async (questionId) => {
    try {
      const allAnswers = await axios.get(`${baseURL}/qa/questions/${questionId}/answers`, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      setAnswers(allAnswers.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const markQuestionAsHelpful = async (questionId) => {
    try {
      await axios.put(`${baseURL}/qa/questions/${questionId}/helpful`, null, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      getQuestionsByProductId();
    } catch (err) {
      console.log(err);
    }
  };

  const markAnswerAsHelpful = async (answerId) => {
    try {
      await axios.put(`${baseURL}/qa/answers/${answerId}/helpful`, null, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      getQuestionsByProductId();
    } catch (err) {
      console.log(err);
    }
  };

  const reportQuestion = async (questionId) => {
    try {
      await axios.put(`${baseURL}/qa/questions/${questionId}/report`, null, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      getQuestionsByProductId();
    } catch (err) {
      console.log(err);
    }
  };

  const reportAnswer = async (answerId) => {
    try {
      await axios.put(`${baseURL}/qa/answers/${answerId}/report`, null, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      getQuestionsByProductId();
    } catch (err) {
      console.log(err);
    }
  };

  const addQuestion = async (questionData) => {
    try {
      const data = await axios.post(`${baseURL}/qa/questions`, questionData, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      console.log(data);
      getQuestionsByProductId();
    } catch (err) {
      console.log(err);
    }
  };

  const addAnswer = async (questionId, answerData) => {
    try {
      const data = await axios.post(`${baseURL}/qa/questions/${questionId}/answers`, answerData, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      console.log(data);
      getQuestionsByProductId();
    } catch (err) {
      console.log(err);
    }
  };

  /** ****************************************************************************
  *                      API calls for reviews
  ***************************************************************************** */

  const getReviewsByProductId = async () => {
    try {
      const allReviews = await axios.get(`${baseURL}/reviews?product_id=${pId}&count=100&sort=${sortTerm}`, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      setReviews(allReviews.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const markReviewAsHelpful = async (reviewId) => {
    try {
      await axios.put(`${baseURL}/reviews/${reviewId}/helpful`, null, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      getReviewsByProductId();
      setFeedback({
        ...feedback,
        [reviewId]: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const reportReview = async (reviewId) => {
    try {
      await axios.put(`${baseURL}/reviews/${reviewId}/report`, null, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      getReviewsByProductId();
    } catch (err) {
      console.log(err);
    }
  };

  const getReviewMetaDataByProductId = async () => {
    try {
      const data = await axios.get(`${baseURL}/reviews/meta/?product_id=${pId}`, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      setMetaData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createNewReview = async () => {
    try {
      const data = await axios.post(`${baseURL}/reviews`, newReview, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  /** ****************************************************************************
  *                      API call for click-tracking
  ***************************************************************************** */

  const trackClick = async (e) => {
    const data = {
      element: '',
      widget: '',
      time: new Date(),
    };
    // run check for closest for each widget return one that isnt null
    const elem = e.target;
    if (elem.closest('.overview')) {
      data.widget = 'overview';
    } else if (elem.closest('.related')) {
      data.widget = 'related';
    } else if (elem.closest('.questions')) {
      data.widget = 'questions';
    } else if (elem.closest('.reviews')) {
      data.widget = 'reviews';
    }
    // if outerHTML is > 1000 chars elem is body
    const elemString = e.target.outerHTML;
    if (elemString.length > 1000) {
      data.element = '<body></body>';
    } else {
      data.element = elemString;
    }
    if (data.widget && data.element) {
      try {
        const res = await axios.post(`${baseURL}/interactions`, data, {
          headers: { Authorization: REACT_APP_API_KEY },
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <APIContext.Provider
      value={{
        // Products
        getAllProducts,
        getProductById,
        getProductStyles,
        getRelatedProducts,
        // QAs
        getQuestionsByProductId,
        getAnswersByQuestionId,
        markQuestionAsHelpful,
        markAnswerAsHelpful,
        reportQuestion,
        reportAnswer,
        addQuestion,
        addAnswer,
        // Reviews
        getReviewsByProductId,
        markReviewAsHelpful,
        reportReview,
        getReviewMetaDataByProductId,
        createNewReview,
        // click tracker
        trackClick,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export default APIProvider;
