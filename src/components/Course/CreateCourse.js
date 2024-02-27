import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateCourse() {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: '',
    category: '',
  });

  const [courses, setCourses] = useState([]);
  const [editingCourseId, setEditingCourseId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/course');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourseId) {
        await axios.put(`http://localhost:3000/course/${editingCourseId}`, formData);
        setEditingCourseId(null);
      } else {
        await axios.post('http://localhost:3000/course', formData);
      }
      setFormData({
        title: '',
        image: '',
        description: '',
        category: '',
      });
      fetchCourses();
    } catch (error) {
      console.error('Error creating/updating course:', error);
    }
  };

  const handleEdit = (course) => {
    setFormData({
      title: course.title,
      image: course.image,
      description: course.description,
      category: course.category.id,
    });
    setEditingCourseId(course.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/course/${id}`);
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Create/Update Course</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image URL:
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category:
          </label>
          <input
            type="number"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {editingCourseId ? 'Update Course' : 'Create Course'}
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id} className="mb-4">
            <div>
              <strong>{course.title}</strong> - {course.description}
            </div>
            <div>
              <img
                src={course.image}
                alt={course.title}
                style={{ width: '100px' }}
                className="mt-2"
              />
            </div>
            <div className="mt-2">
              <button
                onClick={() => handleEdit(course)}
                className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(course.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CreateCourse;
