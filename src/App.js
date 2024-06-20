import React, { useState, useEffect } from 'react';
import { fetchArticles } from './fetch';
import Article from './components/Article';
import Pagination from './components/Pagination';
import CategoryFilter from './components/CategoryFilter';
import SearchFilter from './components/SearchFilter';
import './App.css';
import instructionsImage from './image-removebg-preview.png';
import emptyImage from './empty.png'; // Add your empty symbol image here

const App = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [likedArticles, setLikedArticles] = useState([]);
  console.log(process.env.REACT_APP_API_KEY)
  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchArticles(category, page, keyword);
        setArticles(data.articles);
        setTotalResults(data.totalResults);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    if (category !== 'liked') {
      getArticles();
    }
  }, [category, page, keyword]);

  useEffect(() => {
    setPage(1); // Reset to page 1 when category or keyword changes
  }, [category, keyword]);

  const handleKeywordChange = (newKeyword) => {
    setKeyword(newKeyword);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const toggleLikeArticle = (article) => {
    setLikedArticles((prevLikedArticles) =>
      prevLikedArticles.some((likedArticle) => likedArticle.url === article.url)
        ? prevLikedArticles.filter((likedArticle) => likedArticle.url !== article.url)
        : [...prevLikedArticles, article]
    );
  };

  const displayedArticles = category === 'liked' ? likedArticles : articles;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-100">
      <header className="text-center mb-8 pt-4">
        <h1 className="text-8xl font-bold text-blue-800">
          News Palace<span className="text-2xl align-top">&trade;</span>
        </h1>
        <p className="text-gray-600 text-xl mt-4">
          Your daily dose of news, tailored to your interests
        </p>
      </header>
      <div className="container mx-auto p-8">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <SearchFilter setKeyword={handleKeywordChange} />
          <CategoryFilter setCategory={handleCategoryChange} />
        </div>
        {/* Conditional rendering for instructions based on keyword presence and category */}
        {!keyword && !category && (
          <div className="instruct mb-6 text-center">
            <img
              src={instructionsImage}
              alt="Instructions"
              className="mx-auto mb-4 rounded-lg shadow-lg"
              style={{ maxWidth: '100%', maxHeight: '300px' }}
            />
            <p className="text-gray-700">
              Explore the latest articles based on your preferences. Use the filters above to customize your news feed.
            </p>
          </div>
        )}
        {/* Conditional rendering for empty liked articles */}
        {category === 'liked' && likedArticles.length === 0 && (
          <div className="flex flex-col justify-center items-center mb-6">
            <img
              src={emptyImage}
              alt="No liked articles"
              className="mx-auto mb-4 rounded-lg shadow-lg"
              style={{ maxWidth: '300px', maxHeight: '300px' }}
            />
            <p className="text-gray-700 text-center">
              No liked articles yet. Start liking articles to see them here.
            </p>
          </div>
        )}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {displayedArticles.map((article, index) => (
            <Article
              key={index}
              article={article}
              toggleLike={toggleLikeArticle}
              isLiked={likedArticles.some((likedArticle) => likedArticle.url === article.url)}
            />
          ))}
        </div>
        {category !== 'liked' && (
          <Pagination totalResults={totalResults} currentPage={page} setPage={setPage} />
        )}
      </div>
      <footer className="bg-blue-800 text-white text-center py-4 mt-8">
        <p>&copy; 2024 News Palace. All rights reserved.</p>
        <p>Privacy Policy | Terms of Service</p>
      </footer>
    </div>
  );
};

export default App;
