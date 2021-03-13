import React, { useState } from "react";
// custom components
import UploadButton from './components/UploadButton';
import DownloadButton from './components/DownloadButton';
import SongList from './components/SongList';
// assets
import { BsPlusCircle } from 'react-icons/bs';
// util function
import { localStorageKey, newId, formatDate } from './utils/utils';
import useLocalStorage from './hooks/useLocalStorage';
// styling
import "./App.css";

// if null, save a default value to localStorage
if (localStorage.getItem(localStorageKey) === null) {
  localStorage.setItem(localStorageKey, JSON.stringify([
    {
      id: newId(),
      name: 'Ryuichikun',
      date: new Date(),
      notesList: [
        {
          text: "Up to lots of stuff"
        },
      ]
    },
  ]));
}

function App() {
  // retrieve array from localStorage
  const [listNotesLists, setListNotesLists] = useLocalStorage(localStorageKey);

  // apply functions on song list name (operation on name of one object in array of objects)
  const setStoredHeading = (notesListIdx, text) => {
    const newArr = [...listNotesLists]; // copy array
    newArr[notesListIdx].name = text
    setListNotesLists(newArr);
  }

  // apply functions on individual song lists (operation on the array of objects, notesList, inside an array of objects, listNotesLists)
  const addItemToNotesList = (notesListIdx, text) => {
    // copy array
    const arrCopy = [...listNotesLists];
    // add new item to notesList at idx
    const newNotesList = [...arrCopy[notesListIdx].notesList, {
      text: text,
      isCompleted: false
    }];
    // set arrCopy to use new notesList
    arrCopy[notesListIdx] = {
      id: arrCopy[notesListIdx].id,
      name: arrCopy[notesListIdx].name,
      notesList: newNotesList
    };
    setListNotesLists(arrCopy);
  };

  const removeItemFromNotesList = (notesListIdx, songItemIdx) => {
    // copy array
    const arrCopy = [...listNotesLists];
    const newNotesList = [...arrCopy[notesListIdx].notesList]
    // remove 1 item at songItemIdx from notesList
    newNotesList.splice(songItemIdx, 1);
    // set arrCopy to use new notesList
    arrCopy[notesListIdx] = {
      id: arrCopy[notesListIdx].id,
      name: arrCopy[notesListIdx].name,
      notesList: newNotesList
    };
    setListNotesLists(arrCopy);
  };

  // apply functions on list of song lists
  const removeNotesList = index => {
    const newTodos = [...listNotesLists];
    newTodos.splice(index, 1);
    setListNotesLists(newTodos);
  };

  const addNotesList = () => {
    setListNotesLists(oldArray => [...oldArray,
    {
      id: newId(),
      name: 'Ryuichikun',
      date: new Date(),
      notesList: [
        {
          text: "Up to lots of stuff"
        },
      ],
    }]);
  }

  return (
    <div className="container">
      <div className="card d-flex justify-content-center align-items-center">
        <h4>Conversation Tracker</h4>
        <p>Track points from your last conversation with someone</p>
      </div>
      <div className="flex-button-group">
        <UploadButton />
        <DownloadButton />
      </div>
      <div className="d-flex flex-row flex-wrap mt-3">
        {
          listNotesLists.map((val, idx) => {
            const { id, name, notesList, date } = val;
            return (
              <SongList
                key={id}
                songListIdx={idx}
                removeSongList={removeNotesList}
                removeTodo={removeItemFromNotesList}
                addTodo={addItemToNotesList}
                songs={notesList}
                storedHeading={name}
                setStoredHeading={setStoredHeading}
                date={formatDate(date)}
              />
            );
          })
        }
        <div className="add-btn" onClick={addNotesList}>
          <BsPlusCircle />
        </div>
      </div>
    </div>
  );
}

export default App;