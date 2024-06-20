import React, { useState } from 'react';

const SearchFilter = ({ setKeyword }) => {
    const [input, setInput] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        setKeyword(input);
    };

    return (
        <div className="mb-4">
            <form onSubmit={handleSearch} className="flex items-center">
                <div className="p-5 overflow-hidden w-[60px] h-[60px] hover:w-[270px] bg-[#4070f4]  shadow-[2px 2px 20px rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300">
                    <div className="flex items-center justify-center fill-white">
                        <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="22" height="22">
                            <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Search your topic..."
                        className="outline-none text-[20px] bg-transparent w-full text-white font-normal placeholder-white px-4"
                    />
                </div>

            </form>
        </div>
    );
};

export default SearchFilter;
