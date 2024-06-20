import axios from 'axios';

const apiUrl = 'https://newsapi.org/v2/top-headlines';

export const fetchArticles = async (category, page, keyword) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `${apiUrl}?apiKey=${apiKey}&page=${page}&pageSize=10${category ? `&category=${category}` : ''}${keyword ? `&q=${keyword}` : ''}`;
    const response = await axios.get(url);
    return response.data;
};
