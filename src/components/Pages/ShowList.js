import React, { useState } from 'react';
import Modal from './Modal';
import StudentForm from './StudentForm';
import './ShowList.css';

const ShowList = () => {
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchStudents = async () => {
    const response = await fetch("https://672c2c2a1600dda5a9f778f1.mockapi.io/students");
    const data = await response.json();
    setStudents(data);
  };

  const handleAddStudent = async (student) => {
    await fetch("https://672c2c2a1600dda5a9f778f1.mockapi.io/students", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });
    fetchStudents();
  };

  const handleUpdateStudent = async (student) => {
    await fetch(`https://672c2c2a1600dda5a9f778f1.mockapi.io/students/${student.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });
    fetchStudents();
  };

  const handleDeleteStudent = async (id) => {
    await fetch(`https://672c2c2a1600dda5a9f778f1.mockapi.io/students/${id}`, {
      method: 'DELETE'
    });
    fetchStudents();
  };

  const openModal = (student = null) => {
    setCurrentStudent(student);
    setIsEditMode(!!student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentStudent(null);
    setIsModalOpen(false);
  };

  const handleSave = (student) => {
    if (isEditMode) {
      handleUpdateStudent(student);
    } else {
      handleAddStudent(student);
    }
    closeModal();
  };

  return (
    <div className="container">
      <h1>학생 데이터 관리</h1>
      <button className="button" onClick={fetchStudents}>학생 데이터 가져오기</button>
      <button className="button" onClick={() => openModal()}>학생 데이터 추가</button>
      <div id="div_students">
        {students.map(student => (
          <div key={student.id} className="student-item">
            <span className="student-info">
              {student.id} - {student.name} ({student.age}세, {student.grade}등급, {student.city})
            </span>
            <div>
              <button className="edit-btn" onClick={() => openModal(student)}>수정</button>
              <button className="delete-btn" onClick={() => handleDeleteStudent(student.id)}>삭제</button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <StudentForm student={currentStudent} onSave={handleSave} onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default ShowList;