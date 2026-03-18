import { useState } from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router';
import EmployeeList from './Pages/EmployeeList';
import { APP_Routes } from './Utils/Constants';
import EmployeeForm from './Pages/EmployeeForm';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<EmployeeList />} />
        <Route path={APP_Routes.EmployeeList} element={<EmployeeList />} />
        <Route path={APP_Routes.ADD_EMPLOYEE} element={<EmployeeForm />} />
        <Route path={APP_Routes.EDIT_EMPLOYEE} element={<EmployeeForm />} />
      </Routes>
    </Router>
  )
}

export default App
