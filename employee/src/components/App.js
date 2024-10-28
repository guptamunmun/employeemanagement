
// src/App.js
import React, { useState } from 'react';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';

function App() {
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
  };

  const handleDelete = (index) => {
    setEmployees(employees.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setSelectedEmployeeIndex(index);
  };

  return (
    <div className="App">
      <h1>Employee Management System</h1>
      <EmployeeForm
        onSubmit={handleAddOrEdit}
        selectedEmployee={employees[selectedEmployeeIndex]}
      />
      <EmployeeList
        employees={employees}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;

