import React, { useEffect, useState, Fragment , useRef} from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
// import WebcamCapture from "./components/WebcamCapture";

const App = () => {
  const [resorts, setResorts] = useState(data);
  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;
  if (navigator.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      if(videoRef.current){
        videoRef.current.srcObject = stream;
      }
    });  
  }
  
  const capture = () => {

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    setImage(canvas.toDataURL("image/png"));
  };

  const [addFormData, setAddFormData] = useState({
    name: "",
    location: "",
    number_of_ski_runs: ""
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    location: "",
    number_of_ski_runs: ""
  });

  const [editResortId, setEditResortId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newResort = {
      id: nanoid(),
      name: addFormData.name,
      location: addFormData.location,
      number_of_ski_runs: addFormData.number_of_ski_runs
    };

    const newResorts = [...resorts, newResort];
    setResorts(newResorts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedResort = {
      id: editResortId,
      name: editFormData.name,
      location: editFormData.location,
      number_of_ski_runs: editFormData.number_of_ski_runs
    };

    const newResorts = [...resorts];

    const index = resorts.findIndex((resort) => resort.id === editResortId);

    newResorts[index] = editedResort;

    setResorts(newResorts);
    setEditResortId(null);
  };

  const handleEditClick = (event, resort) => {
    event.preventDefault();
    setEditResortId(resort.id);

    const formValues = {
      name: resort.name,
      location: resort.location,
      number_of_ski_runs: resort.number_of_ski_runs
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditResortId(null);
  };

  const handleDeleteClick = (resortId) => {
    const newResorts = [...resorts];

    const index = resorts.findIndex((resort) => resort.id === resortId);

    newResorts.splice(index, 1);

    setResorts(newResorts);
  };

  return (
    <div className="app-container">
    <h2>Ski Resorts</h2>

      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>location</th>
              <th>Number of Ski runs</th>
            </tr>
          </thead>
          <tbody>
            {resorts.map((resort) => (
              <Fragment>
                {editResortId === resort.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    resort={resort}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add a Resorts</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="name"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="location"
          required="required"
          placeholder="Enter an location..."
          onChange={handleAddFormChange}
        />
        <input
          type="number"
          name="number_of_ski_runs"
          required="required"
          placeholder="Enter number of ski runs..."
          onChange={handleAddFormChange}
        />
        <button data-testid="addButton" type="submit">Add</button>
      </form>
    <div>
        <video ref={videoRef} autoPlay />
        <br/>
        <button onClick={capture}>Capture</button>
        {image && <img src={image} alt="Captured Image" />}
    </div>
    </div>

  );
};

export default App;