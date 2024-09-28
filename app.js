import React, { useEffect, useState } from 'react';
import './styles.css';


function App() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
      .then(response => response.json())
      .then(data => {
        setEmployees(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>Employee Dashboard</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="employee-cards">
          {employees.map(employee => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      )}
    </div>
  );
}

function EmployeeCard({ employee }) {
  return (
    <div className="card">
      <h2>{employee.name}</h2>
      <p>{employee.body}</p>
      <button>Edit</button>
    </div>
  );
}

export default App;
