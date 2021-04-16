import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { REACT_APP_API_KEY } from '../../config/config';

export const APIContext = createContext({});

const APIProvider = ({ children }) => {
  const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';

  // sample endpoints
  // https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews?product_id=17067
  // https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=17067

  // sample request to get all products

  const getAllProducts = async () => {
    try {
      const products = await axios.get(`${baseURL}/products`, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <APIContext.Provider
      value={{
        getAllProducts,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export default APIProvider;
