
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

function ScheduleAll() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(undefined);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localEmail = localStorage.getItem('medikit-email')

        const response = await fetch(`http://localhost:3001/api/data/schedule-all/${localEmail}`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        setData(json);
        // console.log("data", data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [result, status]);

  const handleDelete = async (id) => {
    // console.log(id, "delete")
    try {

      const response = await fetch(`http://localhost:3001/api/data/schedule-delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setResult(json);
      setStatus(json.status)
      // console.log("resultjson", json)
      // console.log("result", result)
      // console.log("ststus", status)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <>
      {status === 'success' && (
        <div className="alert alert-success d-flex align-items-center" role="alert">
          <i className="bi bi-check-circle-fill" />
          <div>&nbsp;{result && result.msg}</div>
        </div>
      )}
      {status === 'danger' && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <i className="bi bi-exclamation-triangle-fill" />
          <div>&nbsp;{result && result.msg}</div>
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th scope="col"># Time</th>
            <th scope="col">Activation</th>
            <th scope="col">Delete</th>
            <th scope="col">Update</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? <tr><td>Loading...</td></tr> : (
            data.map((time) => (
              <tr key={time._id}>
                <td>{time.s_time}</td>
                <td>{time.s_activation}</td>
                <td><button className="btn" onClick={() => handleDelete(time._id)}><i className="bi bi-trash3-fill text-danger"></i></button></td>
                <td>Update</td>
              </tr>
            ))
          )}
        </tbody>
      </table>



    </>
    // <div>
    //   {data.length === 0 ? <p>Loading...</p> : (
    //     <ul>
    //       {data.map((time) => (
    //         <li key={time._id}>{time.s_time}{time.s_activation}</li>
    //       ))}
    //     </ul>
    //   )}
    // </div>
  );
}

export default ScheduleAll;