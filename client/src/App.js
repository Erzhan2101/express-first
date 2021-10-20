import axios from "axios";
import {useEffect, useState} from "react";

function App() {
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        axios('http://localhost:8000/api/tasks')
            .then(({data}) => setTasks(data))
    }, [])
  return (
      <div className="container">
          <div className="list-group my-4">
              {
                  tasks.map(item =>
                      <li className="list-group-item" key={item._id}>{item.title}</li>)
              }
          </div>
      </div>
  );
}

export default App;
