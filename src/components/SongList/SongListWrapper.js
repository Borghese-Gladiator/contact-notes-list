import React, { useState } from 'react';
// custom components
import InlineEdit from './InlineEdit';
import DropdownMenu from './DropdownMenu';

function SongItem({ songListIdx, todo, index, removeTodo }) {
  return (
    <div
      className="song-item"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      <span className="song-item-link">{todo.text}</span>
      <div style={{margin: '5px'}}>
        <button onClick={() => removeTodo(songListIdx, index)}>x</button>
      </div>
    </div>
  );
}

function SongItemForm({ songListIdx, addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(songListIdx, value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

export default function SongListWrapper(props) {
  const { storedHeading, setStoredHeading, removeTodo, addTodo, songs, songListIdx, removeSongList, date } = props;
  const options = [
    {
      text: "Delete",
      execFunc: () => {
        return (
          removeSongList(songListIdx)
        )
      }
    }
  ]
  
  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <div className="card m-1 p-2">
        <div className="close-btn" >
          <DropdownMenu options={options} />
        </div>
        <h3>
          <InlineEdit
            text={storedHeading}
            onSetText={text => setStoredHeading(songListIdx, text)}
          />
        </h3>
        <span>{date}</span>
        <div className="song-list">
          {songs.map((todo, index) => (
            <SongItem
              key={index}
              songListIdx={songListIdx}
              index={index}
              todo={todo}
              removeTodo={removeTodo}
            />
          ))}
          <SongItemForm songListIdx={songListIdx} addTodo={addTodo} />
        </div>
      </div>
    </div>
  )
}