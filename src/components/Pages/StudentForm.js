import React, { useState, useEffect } from 'react';
import './StudentForm.css';

const StudentForm = ({ student, onSave, onClose }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    if (student) {
      setName(student.name);
      setAge(student.age);
      setGrade(student.grade);
      setCity(student.city);
    }
  }, [student]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: student?.id, name, age, grade, city });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="student_name">이름:</label>
        <input type="text" id="student_name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="input-group">
        <label htmlFor="student_age">나이:</label>
        <input type="number" id="student_age" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <div className="input-group">
        <label htmlFor="student_grade">등급:</label>
        <input type="text" id="student_grade" value={grade} onChange={(e) => setGrade(e.target.value)} />
      </div>
      <div className="input-group">
        <label htmlFor="student_city">도시:</label>
        <input type="text" id="student_city" value={city} onChange={(e) => setCity(e.target.value)} />
      </div>
      <button type="submit">{student ? '수정' : '추가'}</button>
      <button type="button" onClick={onClose}>취소</button>
    </form>
  );
};

export default StudentForm;