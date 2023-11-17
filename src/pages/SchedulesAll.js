
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

function ScheduleAll() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(undefined);
  const [result, setResult] = useState(null);
  const [uptadeId, setUpdateId] = useState(null);
  const [formInputData, setformInputData] = useState({
    s_time: '',
    s_activation: ''
  });

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

    console.log("updateId", uptadeId)

    fetchData();
  }, [result, status, uptadeId]);

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
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hoursString = hours.padStart(2, '0');
    const minutesString = minutes.padStart(2, '0');
    return `${hoursString}:${minutesString}`;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('Form submitted with data:', this.state);
    try {
      // console.log(123123)
      const response = await fetch(`http://localhost:3001/api/data/schedule-update/${uptadeId}`, {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          p_email: localStorage.getItem("medikit-email"),
          s_time: formInputData.s_time,
          s_activation: formInputData.s_activation,
        }),
      });

      const json = await response.json();
      setResult(json);
      setStatus(json.status)
      setUpdateId(null)
      setformInputData({
        s_time: null,
        s_activation: null
      })
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleInputChange = (event) => {
    const newInput = (data) => ({ ...data, [event.target.name]: event.target.value })
    setformInputData(newInput)
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
              time._id === uptadeId ? (
                <tr key={time._id}>
                  {/* <form onSubmit={(e) => handleSubmit(e)}> */}
                  <td>
                    <input
                      type="time"
                      className="form-control"
                      id="Time"
                      name="s_time"
                      // defaultValue={formatTime(time.s_time)}
                      value={formatTime(formInputData.s_time)}
                      autoComplete="on"
                      onChange={(e) => handleInputChange(e)}
                    />
                  </td>
                  <td>
                    <input type="text"
                      className="form-control"
                      id="Activation"
                      name="s_activation"
                      // defaultValue={time.s_activation}
                      value={formInputData.s_activation}
                      autoComplete="on"
                      onChange={(e) => handleInputChange(e)}
                    />
                  </td>
                  <td><button className="btn" onClick={() => handleDelete(time._id)}><i className="bi bi-trash3-fill text-danger"></i></button></td>
                  <td><button className="btn" onClick={handleSubmit}><i className="bi bi-pen text-info"></i></button></td>
                  {/* </form> */}
                </tr>
              ) : (
                <tr key={time._id}>
                  <td>{time.s_time}</td>
                  <td>{time.s_activation}</td>
                  <td><button className="btn" onClick={() => handleDelete(time._id)}><i className="bi bi-trash3-fill text-danger"></i></button></td>
                  <td><button className="btn" onClick={() => {
                    setUpdateId(time._id); 
                    setformInputData({
                      s_time: time.s_time,
                      s_activation: time.s_activation
                    });
                  }}><i className="bi bi-pen-fill text-info"></i></button></td>
                </tr>
              )
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