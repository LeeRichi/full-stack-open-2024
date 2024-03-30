// eslint-disable-next-line react/prop-types
const Filter = ({setFilter}) =>
{
    const handleFilterChange = (event) =>
    {
        setFilter(event.target.value);
    }

    return (
        <div>            
            filter showb with<input type="text" onChange={handleFilterChange} />
        </div>
    )
}

export default Filter