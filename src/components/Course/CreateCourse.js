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
    <div>
      <h2>Create/Update Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="number"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{editingCourseId ? 'Update Course' : 'Create Course'}</button>
      </form>

      <h2>Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <div>
              <strong>{course.title}</strong> - {course.description}
            </div>
            <div>
              <img src={course.image} alt={course.title} style={{ width: '100px' }} />
            </div>
            <div>
              <button onClick={() => handleEdit(course)}>Edit</button>
              <button onClick={() => handleDelete(course.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CreateCourse;
