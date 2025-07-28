import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import React from 'react';
import { Link } from 'react-router-dom';

const Course = ({ course }) => {
  return (
    <Link to={`/course-detail/${course._id}`}>
      <div className="rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] w-[280px] border border-blue-100 dark:bg-gray-900 dark:border-gray-700">

        {/* 📸 IMAGE */}
        <img
          src={course.courseThumbnail}
          alt="course"
          className="w-full h-[160px] object-cover"
        />

        {/* 📄 CONTENT */}
        <div className="p-4 space-y-3">
          <h1 className="text-base font-semibold text-gray-800 dark:text-white line-clamp-2 hover:underline">
            {course.courseTitle}
          </h1>

          {/* 👤 Author + Badge */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={course.creator?.photoUrl || 'https://github.com/shadcn.png'}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {course.creator?.name || 'CN'}
              </span>
            </div>
            <Badge className="text-white text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600">
              {course.courseLevel}
            </Badge>
          </div>

          {/* 💰 Price */}
          <div className="text-lg font-bold text-blue-800 dark:text-blue-300">
            ₹{course.coursePrice}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Course;
