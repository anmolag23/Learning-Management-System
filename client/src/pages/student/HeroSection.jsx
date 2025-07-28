import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if(searchQuery.trim() !== ""){
      navigate(`/course/search?query=${searchQuery}`)
    }
    setSearchQuery("");

  }
  return (
  <div className="relative bg-gradient-to-br from-[#b1d8f5] to-[#5e9ffd] dark:from-gray-900 dark:to-gray-800 py-24 px-4 text-center transition-all duration-500">
  <div className="max-w-3xl mx-auto">
    <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-indigo-800 to-teal-600 drop-shadow-lg">
  Upskill with Confidence — One Click at a Time
</h1>

    <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
      Level up with flexible, career-ready courses you can trust
    </p>

    <form
      onSubmit={searchHandler}
      className="flex items-center bg-white/70 dark:bg-white/10 backdrop-blur-md rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6 ring-1 ring-white/40 dark:ring-gray-700"
    >
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search Courses"
        className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 bg-transparent"
      />
      <Button
        type="submit"
        // className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-300"
        className="bg-blue-600 hover:bg-blue-700 hover:shadow-md hover:scale-105 transition-transform duration-300 ">

      
        Search
      </Button>
    </form>

  <Button
  onClick={() => navigate(`/course/search?query`)}
  className="bg-gradient-to-r from-blue-700 via-indigo-700 to-teal-600 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:brightness-110"
>
  Explore Courses
</Button>

  </div>
</div>


  )
}

export default HeroSection;