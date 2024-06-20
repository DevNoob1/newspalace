import React, { useState } from 'react';

const categories = ['Business', 'Technology', 'Entertainment', 'Health', 'Science', 'Liked'];

const CategoryFilter = ({ setCategory }) => {
    const [activeCategory, setActiveCategory] = useState('');

    const handleCategoryClick = (category) => {
        setCategory(category.toLowerCase());
        setActiveCategory(category);
    };

    return (
        <div className="mb-4">
            <div className="flex flex-wrap gap-4">
                {categories.map((category) => (
                    <div
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className={`category-box cursor-pointer p-3 rounded-lg flex items-center justify-center text-center transition duration-300 ease-in-out ${activeCategory === category ? 'bg-blue-500 text-white shadow-md' : 'bg-white text-blue-500 hover:bg-gray-100'
                            }`}
                    >
                        {category}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;
