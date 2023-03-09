import { useEffect, useState } from "react";
import { isEmpty } from 'ramda';
import axios, { AxiosRequestConfig } from 'axios';

/**
 * useApi is hook for fetching data via http request 
 * @param defaultResponseData - Initial state of the response data
 * @returns 
 */
export const useApi = <T,>(defaultResponseData: T) => {
  const [requestData, setRequestData] = useState({});
  const [responseData, setResponseData] = useState(defaultResponseData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const sendRequest = (data: AxiosRequestConfig) => {
    setRequestData(data);
  }

  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      const result = await axios(requestData);
      setResponseData(result.data);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if(!isEmpty(requestData)) {
      fetchData();
    }
  }, [requestData]);

  return { isLoading, isError, sendRequest, responseData };
};
