import React, { useState } from "react";
// custom components
import DefaultLayout from './components/_layouts/DefaultLayout';
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
if (localStorage.getItem("listSongLists") === null) {
  localStorage.setItem('listSongLists', JSON.stringify([
    {
      id: newId(),
      title: 'Japanese City Pop',
      songList: [
        {
          text: "Tatsuro Yamashita - Ride on Time",
          isCompleted: false
        },
        {
          text: "Gawr Gura - Ride on Time",
          isCompleted: false
        },
        {
          text: "Tatsuro Yamashita - Someday/Itsuka",
          isCompleted: false
        }
      ]
    },
    {
      id: newId(),
      title: 'Pop Songs',
      songList: [
        {
          text: "Miley Cyrus - Party in the USA",
          isCompleted: false
        },
        {
          text: "Jennifer Lopez - On The Floor ft. Pitbull",
          isCompleted: false
        },
        {
          text: "Ed Sheeran - Shape of You",
          isCompleted: false
        },
        {
          text: "Uptown Funk",
          isCompleted: false
        },
        {
          text: "Maroon 5 - Sugar",
          isCompleted: false
        },
      ]
    },
    {
      id: newId(),
      title: 'Japanese Pop',
      songList: [
        {
          text: "UNISON SQUARE GARDEN \"Sugar song and Bitter step\"",
          isCompleted: false
        },
        {
          text: "YOASOBI \"Racing into the Night\" Official Music Video",
          isCompleted: false
        }
      ]
    },
  ]));
}

function App() {
  // retrieve array from localStorage
  const [listSongLists, setListSongLists] = useLocalStorage('listSongLists');

  // apply functions on song list title (operation on title of one object in array of objects)
  const setStoredHeading = (songListIdx, text) => {
    const newArr = [...listSongLists]; // copy array
    newArr[songListIdx].title = text
    setListSongLists(newArr);
  }

  // apply functions on individual song lists (operation on the array of objects, songList, inside an array of objects, listSongLists)
  const addSongListItem = (songListIdx, text) => {
    const newArr = [...listSongLists]; // copy array
    const oldSongs = newArr[songListIdx].songList;
    const newSongs = [...oldSongs, {
      text: text,
      isCompleted: false
    }]; // operation on SongListItem
    newArr[songListIdx] = {
      id: newArr[songListIdx].id,
      title: newArr[songListIdx].title,
      songList: newSongs
    };
    setListSongLists(newArr);
  };

  const completeSongListItem = (songListIdx, songItemIdx) => {
    const newArr = [...listSongLists]; // copy array
    const oldSongs = newArr[songListIdx].songList;
    const newSongs = [...oldSongs];
    newSongs[songItemIdx].isCompleted = true; // operation on SongListItem
    newArr[songListIdx] = {
      id: newArr[songListIdx].id,
      title: newArr[songListIdx].title,
      songList: newSongs
    };
    setListSongLists(newArr);
  };

  const removeSongListItem = (songListIdx, songItemIdx) => {
    const newArr = [...listSongLists]; // copy array
    const oldSongs = newArr[songListIdx].songList;
    const newSongs = [...oldSongs];
    newSongs.splice(songItemIdx, 1); // operation on SongListItem
    newArr[songListIdx] = {
      id: newArr[songListIdx].id,
      title: newArr[songListIdx].title,
      songList: newSongs
    };
    setListSongLists(newArr);
  };

  // apply functions on list of song lists
  const removeListSongList = index => {
    const newTodos = [...listSongLists];
    newTodos.splice(index, 1);
    setListSongLists(newTodos);
  };

  const addSongList = () => {
    setListSongLists(oldArray => [...oldArray, {
      id: newId(),
      title: 'Favorite Songs',
      songList: [
        {
          text: "Tatsuro Yamashita - Ride on Time",
          isCompleted: false
        },
        {
          text: "Gawr Gura Sings Compilation",
          isCompleted: false
        },
        {
          text: "Tatsuro Yamashita - Someday/Itsuka",
          isCompleted: false
        }
      ]
    }]);
  }

  return (
    <div id="app">
      <DefaultLayout>
        <div className="flex-button-group">
          <UploadButton />
          <DownloadButton />
        </div>
        <div className="song-list-container">
          {
            listSongLists.map((val, idx) => {
              const { id, title, songList } = val;
              return (
                <SongList
                  key={idx}
                  songListIdx={idx}
                  removeSongList={removeListSongList}
                  completeTodo={completeSongListItem}
                  removeTodo={removeSongListItem}
                  addTodo={addSongListItem}
                  songs={songList}
                  storedHeading={title}
                  setStoredHeading={setStoredHeading}
                />
              );
            })
          }
          <div className="add-btn" onClick={addSongList}>
            <BsPlusCircle />
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
}

export default App;