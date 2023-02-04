import React, { useState } from 'react';

const SkiResort = ({ resort, onDelete, onUpdate }) => (
  <li>
    {resort.name}, {resort.location}, {resort.number_of_ski_runs}
    &nbsp;
    &nbsp;
    &nbsp;
    <button onClick={onDelete}>Delete</button>
    &nbsp;
    &nbsp;
    &nbsp;
    <button onClick={() => onUpdate(resort)}>Edit</button>
  </li>
);

const SkiResorts = () => {
  
  const [resorts, setResorts] = useState([
    { name: 'Squaw Valley', location: 'Lake Tahoe, CA', 'number_of_ski_runs':2 },
    { name: 'Aspen Mountain', location: 'Aspen, CO' , 'number_of_ski_runs':4},
    { name: 'Deer Valley', location: 'Park City, UT' , 'number_of_ski_runs':5},
  ]);


  const [newResort, setNewResort] = useState({ name: '', location: '', number_of_ski_runs: 0});

  const handleAddResort = (event) => {
    event.preventDefault();
    setResorts([...resorts, newResort]);
    setNewResort({ name: '', location: '',  number_of_ski_runs:0  });
  };

  const handleDeleteResort = (index) => {
    setResorts(resorts.filter((_, i) => i !== index));
  };

  const handleUpdateResort = (index, updatedResort) => {
    setResorts(
      resorts.map((resort, i) => {
        if (i === index) {
          return updatedResort;
        }
        return resort;
      })
    );
  };

  return (
    <div>
      <h2>Ski Resorts</h2>
      <ul>
        {resorts.map((resort, index) => (
          <SkiResort
            key={index}
            resort={resort}
            onDelete={() => handleDeleteResort(index)}
            onUpdate={(updatedResort) => handleUpdateResort(index, updatedResort)}
          />
        ))}
      </ul>
      <form onSubmit={handleAddResort}>
        <input
          type="text"
          value={newResort.name}
          onChange={(event) =>
            setNewResort({ ...newResort, name: event.target.value })
          }
          placeholder="Name"
        />
        <input
          type="text"
          value={newResort.location}
          onChange={(event) =>
            setNewResort({ ...newResort, location: event.target.value })
          }
          placeholder="Location"
        />  
          <input
          type="number"
          value={newResort.number_of_ski_runs}
          onChange={(event) =>
            setNewResort({ ...newResort, number_of_ski_runs: event.target.value })
          }
          placeholder="Number Of ski runs"
        />
        <button type="submit">Add Resort</button>
      </form>
    </div>
  );
};

export default SkiResorts;
