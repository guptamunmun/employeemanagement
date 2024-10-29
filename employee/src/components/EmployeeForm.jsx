// src/components/EmployeeForm.js
import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ onSubmit, selectedEmployee , userRole }) => {
  const [employee, setEmployee ] = useState({
    name: '',
    email: '',
    role: '',
    photo: null,
    dateOfBirth: '',
    resume: null,
  });

  useEffect(() => {
    if (selectedEmployee) setEmployee(selectedEmployee);
  }, [selectedEmployee]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setEmployee({ ...employee, [name]: files[0] });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const isValidAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    return monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ? age - 1
      : age;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidAge(employee.dateOfBirth) < 18) {
      alert('Employee must be at least 18 years old.');
      return;
    }
    if (employee.resume && employee.resume.size > 1024 * 1024) {
      alert('Resume must be less than 1 MB.');
      return;
    }
    onSubmit(employee);
    setEmployee({
      name: '',
      email: '',
      role: '',
      photo: null,
      dateOfBirth: '',
      resume: null,
    });
  };

  if (userRole !== 'admin') {
    return <p>You do not have permission to add employees.</p>;
  }
else{
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={employee.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={employee.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="role"
        placeholder="Role"
        value={employee.role}
        onChange={handleChange}
        required
      />
      <input
        type="file"
        name="photo"
        accept="image/*"
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="dateOfBirth"
        value={employee.dateOfBirth}
        onChange={handleChange}
        required
      />
      <input
        type="file"
        name="resume"
        accept=".pdf,.doc,.docx"
        onChange={handleChange}
        required
      />
      <button type="submit">
        {selectedEmployee ? 'Update Employee' : 'Add Employee'}
      </button>
    </form>
  );}
};

export default EmployeeForm;
