// src/components/Dashboard.jsx
import React, { useState } from 'react';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';

const Dashboard = ({ userRole }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState(null);

  const handleAddOrEdit = (employee) => {
    
    if (selectedEmployeeIndex !== null) {
      const updatedEmployees = employees.map((emp, index) =>
        index === selectedEmployeeIndex ? employee : emp
      );
      setEmployees(updatedEmployees);
      setSelectedEmployeeIndex(null);
    } else {
      setEmployees([...employees, employee]);
    }
  }
  ;

  const handleDelete = (index) => {
    setEmployees(employees.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setSelectedEmployeeIndex(index);
  };

  return (
    <div className="Dashboard">
      <h1>Employee Management System</h1>
      {userRole === 'admin' && (
      <EmployeeForm
        onSubmit={handleAddOrEdit}
        userRole={userRole}
        selectedEmployee={
            userRole === "admin" && employees.length > 0 && selectedEmployeeIndex !== null 
            ? employees[selectedEmployeeIndex]
        : null}
      />
      )}
      <EmployeeList
        employees={employees}
        onDelete={handleDelete}
        onEdit={userRole === 'admin' ?handleEdit: null}
      />
    </div>
  );
};

export default Dashboard;
