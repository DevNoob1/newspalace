import React, { useState } from 'react';
import './art.css'

const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png?20210219185637'; // Replace with your default image URL

const Article = ({ article, toggleLike, isLiked }) => {
    const [bursts, setBursts] = useState([]);

    const handleLikeClick = () => {
        toggleLike(article);
        if (!isLiked) {
            createBursts();
        }
    };

    const createBursts = () => {
        const newBursts = [];
        for (let i = 0; i < 10; i++) {
            newBursts.push(
                <div
                    key={i}
                    className="burst"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                ></div>
            );
        }
        setBursts(newBursts);
        setTimeout(() => {
            setBursts([]);
        }, 600); // Remove bursts after animation duration
    };

    return (
        <div className="relative border rounded-lg shadow-md bg-white overflow-hidden transition transform hover:shadow-xl hover:scale-105">
            {article.urlToImage ? (
                <img
                    className="w-full h-48 object-cover object-center"
                    src={article.urlToImage}
                    alt={article.title}
                />
            ) : (
                <img
                    className="w-full h-48 object-cover object-center"
                    src={defaultImage}
                    alt="Default"
                />
            )}
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2 text-black">{article.title}</h2>
                <p className="text-gray-700 mb-4">{article.description}</p>
                <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 font-semibold hover:underline"
                >
                    Read more
                </a>
            </div>
            <div className="absolute top-4 right-4 burst-wrapper">
                <button onClick={handleLikeClick} className="focus:outline-none relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-8 w-8 transition transform ${isLiked ? 'fill-current text-red-500 scale-110' : 'text-gray-300 hover:text-red-500 hover:scale-110'}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 21l-1-1C5.5 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 4.5 2.09C13.09 4.01 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.5 6.86-9 11.5l-1 1z" />
                    </svg>
                    {isLiked && bursts.map(burst => burst)}
                </button>
            </div>
        </div>
    );
};

export default Article;
