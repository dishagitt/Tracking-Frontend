import './AddCard.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCard = ({ title, value, onChange, onAdd, placeholder }) => {
  const handleAddClick = () => {
    if (value.trim() === '') {
      toast.error('Please enter a value.');
    } else {
      onAdd();
    }
  };

  return (
    <div className="card">
      <h3>{title}</h3>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <button onClick={handleAddClick}>Add</button>
    </div>
  );
};

export default AddCard;
