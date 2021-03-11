import React, { useState } from "react";
// custom components
import UploadButton from './components/UploadButton';
import DownloadButton from './components/DownloadButton';
import SongList from './components/SongList';
// assets
import { BsPlusCircle } from 'react-icons/bs';
// util function
import newId from './utils/newid';
import useLocalStorage from './hooks/useLocalStorage';
// styling
import "./App.css";

// if null, save a default value to localStorage
if (localStorage.getItem("listNotesLists") === null) {
  localStorage.setItem('listNotesLists', JSON.stringify([
    {
      id: newId(),
      name: 'Japanese City Pop',
      notesList: [
        {
          text: "Tatsuro Yamashita - Ride on Time"
        },
        {
          text: "Gawr Gura - Ride on Time"
        },
        {
          text: "Tatsuro Yamashita - Someday/Itsuka"
        }
      ]
    },
    {
      id: newId(),
      name: 'Pop Songs',
      notesList: [
        {
          text: "Miley Cyrus - Party in the USA"
        },
        {
          text: "Jennifer Lopez - On The Floor ft. Pitbull"
        },
        {
          text: "Ed Sheeran - Shape of You"
        },
        {
          text: "Uptown Funk"
        },
        {
          text: "Maroon 5 - Sugar"
        },
      ]
    },
    {
      id: newId(),
      name: 'Japanese Pop',
      notesList: [
        {
          text: "UNISON SQUARE GARDEN \"Sugar song and Bitter step\"",
          isCompleted: false
        },
        {
          text: "YOASOBI \"Racing into the Night\" Official Music Video"
        }
      ]
    },
  ]));
}

function App() {
  // retrieve array from localStorage
  const [listNotesLists, setListNotesLists] = useLocalStorage('listNotesLists');

  // apply functions on song list name (operation on name of one object in array of objects)
  const setStoredHeading = (notesListIdx, text) => {
    const newArr = [...listNotesLists]; // copy array
    newArr[notesListIdx].name = text
    setListNotesLists(newArr);
  }

  // apply functions on individual song lists (operation on the array of objects, notesList, inside an array of objects, listNotesLists)
  const addnotesListItem = (notesListIdx, text) => {
    const newArr = [...listNotesLists]; // copy array
    const oldSongs = newArr[notesListIdx].notesList;
    const newSongs = [...oldSongs, {
      text: text,
      isCompleted: false
    }]; // operation on notesListItem
    newArr[notesListIdx] = {
      id: newArr[notesListIdx].id,
      name: newArr[notesListIdx].name,
      notesList: newSongs
    };
    setListNotesLists(newArr);
  };

  const removenotesListItem = (notesListIdx, songItemIdx) => {
    const newArr = [...listNotesLists]; // copy array
    const oldSongs = newArr[notesListIdx].notesList;
    const newSongs = [...oldSongs];
    newSongs.splice(songItemIdx, 1); // operation on notesListItem
    newArr[notesListIdx] = {
      id: newArr[notesListIdx].id,
      name: newArr[notesListIdx].name,
      notesList: newSongs
    };
    setListNotesLists(newArr);
  };

  // apply functions on list of song lists
  const removelistNotesList = index => {
    const newTodos = [...listNotesLists];
    newTodos.splice(index, 1);
    setListNotesLists(newTodos);
  };

  const addNotesList = () => {
    setListNotesLists(oldArray => [...oldArray,
    {
      id: newId(),
      name: 'Japanese City Pop',
      notesList: [
        {
          text: "Tatsuro Yamashita - Ride on Time"
        },
        {
          text: "Gawr Gura - Ride on Time"
        },
        {
          text: "Tatsuro Yamashita - Someday/Itsuka"
        }
      ]
    }]);
  }

  return (
    <div className="container">
      <div className="flex-button-group">
        <UploadButton />
        <DownloadButton />
      </div>
      <div className="d-flex flex-row flex-wrap mt-3">
        {
          listNotesLists.map((val, idx) => {
            const { id, name, notesList } = val;
            return (
              <SongList
                key={id}
                songListIdx={idx}
                removeSongList={removelistNotesList}
                removeTodo={removenotesListItem}
                addTodo={addnotesListItem}
                songs={notesList}
                storedHeading={name}
                setStoredHeading={setStoredHeading}
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