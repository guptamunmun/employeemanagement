// src/components/EmployeeForm.js
import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ onSubmit, selectedEmployee }) => {
  const [employee, setEmployee] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    if (selectedEmployee) setEmployee(selectedEmployee);
  }, [selectedEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(employee);
    setEmployee({ name: '', email: '', role: '' });
  };

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
      <button type="submit">
        {selectedEmployee ? 'Update Employee' : 'Add Employee'}
      </button>
    </form>
  );
};

export default EmployeeForm;
