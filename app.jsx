function EmployeeCard({ employee, handleEdit }) {
    return (
      <div className="card">
        <h2>{employee.name}</h2>
        <p>{employee.body}</p>
        <button onClick={() => handleEdit(employee)}>Edit</button>
      </div>
    );
  }
  
  function App() {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editEmployee, setEditEmployee] = useState(null);
  
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
  
    const handleEdit = (employee) => {
      setEditEmployee(employee);
    };
  
    const handleSave = (e) => {
      e.preventDefault();
      const updatedEmployees = employees.map(emp => 
        emp.id === editEmployee.id ? editEmployee : emp
      );
      setEmployees(updatedEmployees);
      setEditEmployee(null);
    };
  
    return (
      <div className="App">
        <h1>Employee Dashboard</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="employee-cards">
            {employees.map(employee => (
              <EmployeeCard key={employee.id} employee={employee} handleEdit={handleEdit} />
            ))}
          </div>
        )}
        {editEmployee && (
          <form onSubmit={handleSave}>
            <input
              type="text"
              value={editEmployee.name}
              onChange={(e) => setEditEmployee({ ...editEmployee, name: e.target.value })}
            />
            <textarea
              value={editEmployee.body}
              onChange={(e) => setEditEmployee({ ...editEmployee, body: e.target.value })}
            />
            <button type="submit">Save</button>
          </form>
        )}
      </div>
    );
  }
  