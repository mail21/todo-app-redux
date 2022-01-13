import React from 'react';
import Item from '../Item/Item';
import Modal from '../Modal/Modal';
import './ItemList.css';

function ItemList({ todos, section }) {
  const [show, setShow] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState({});
  const handleClose = () => setShow(false);
  const handleOpen = (item) => {
    setSelectedItem(item);
    setShow(true);
  };

  return (
    <div className="container__list">
      <div className="container__list__header">{section}</div>
      <div>
        {todos
          .filter((item) => item.status === (section === 'done' ? 1 : 0))
          .map((item) => (
            <Item
              key={item.id}
              id={item.id}
              title={item.title}
              createdAt={item.createdAt}
              status={item.status}
              description={item.description}
              onClick={() => handleOpen(item)}
            />
          ))
          .sort((a, b) => {
            if (section === 'done') {
              return new Date(a.props.createdAt) - new Date(b.props.createdAt);
            }
            return new Date(a.props.createdAt) + new Date(b.props.createdAt);
          })}
      </div>
      <Modal handleClose={handleClose} show={show} data={selectedItem} />
    </div>
  );
}

export default ItemList;
