import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './Modal.css';

const Modal = ({ handleClose, show, data, todoDelete, todoEdit }) => {
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState([]);

  useEffect(() => {
    setItem([]);
    setItem(data);
  }, [data]);

  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  const handleCloseOverlay = (e) => {
    if (e.target.nodeName === 'SECTION') {
      handleClose();
    }
  };

  const handleEdit = () => {
    // todoEdit(data);
    setEdit((prev) => !prev);
    // handleClose();
  };

  const handleDelete = () => {
    if (data.status == 1) {
      console.log('Tidak bisa menghapus data done');
    } else {
      todoDelete(data.id);
    }
    handleClose();
  };

  const handleChange = (e) => {
    let name = e.target.name;
    if (name === 'title') {
      setItem((prev) => ({ ...prev, title: e.target.value }));
    } else if (name === 'status') {
      setItem((prev) => ({ ...prev, status: parseInt(e.target.value) }));
    } else if (name === 'createdAt') {
      const date = new Date(e.target.value);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Month is 0-based
      const day = String(date.getUTCDate()).padStart(2, '0');
      const hour = String(date.getUTCHours()).padStart(2, '0');
      const minute = String(date.getUTCMinutes()).padStart(2, '0');

      const strDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
      setItem((prev) => ({ ...prev, createdAt: strDate }));
    } else {
      setItem((prev) => ({ ...prev, description: e.target.value }));
    }
  };

  const submitForm = () => {
    todoEdit(item);
    handleClose();
  };

  return (
    <section className={showHideClassName} onClick={handleCloseOverlay}>
      <div className="modal__main">
        {edit ? (
          <div className="modal__form">
            <input type="text" name="title" value={item.title} onChange={handleChange} />
            <input
              type="text"
              name="description"
              value={item.description}
              onChange={handleChange}
            />
            <select name="status" value={item.status} id="" onChange={handleChange}>
              <option value="1">Done</option>
              <option value="0">Not Done</option>
            </select>
            <input
              type="datetime-local"
              name="createdAt"
              value={item.createdAt}
              onChange={handleChange}
            />
            <button onClick={submitForm}>submit</button>
          </div>
        ) : (
          <div className="modal__body">
            <h3>{data.title}</h3>
            <p>{data.description}</p>
          </div>
        )}

        <div className="modal__footer">
          <button type="button" onClick={handleEdit}>
            Update
          </button>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
          <button type="button" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </section>
  );
};

const mapDispatch = (dispatch) => {
  return {
    todoEdit: (payload) => {
      dispatch({ type: 'EDIT_TODO', payload });
    },
    todoDelete: (payload) => {
      dispatch({ type: 'DELETE_TODO', payload });
    },
  };
};

export default connect(null, mapDispatch)(Modal);
