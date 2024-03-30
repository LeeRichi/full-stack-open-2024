/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types

import service from './service'; // Import the entire object

const Persons = ({ filteredPersons, setPersons }) =>
{
  const handleDelete = (person) =>
  {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) 
    {
      service.remove(person.id)
        .then(() => {
          setPersons(filteredPersons.filter(p => p.id !== person.id));
          console.log(`Deleted ${person.name}`);
        })
        .catch(error => {
          console.error('Error occurred while deleting:', error);
        });
    }
  }

  return (
    <div>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          <p>{person.name} {person.number}</p>
          <button onClick={() => handleDelete(person)}>delete</button>
        </div>
      ))}
    </div>
  )
}

export default Persons