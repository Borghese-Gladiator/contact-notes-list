import React, { useState } from "react";
import { AiOutlineMore } from 'react-icons/ai';

export default function DropdownMenu({ options }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  return (
    <div>
      <div className="dropdown-header" onClick={toggling}>
        <AiOutlineMore />
      </div>
      {isOpen && (
        <div className="dropdown-list-container">
          <ul className="dropdown-list">
            {options.map((option, idx) => {
              const { text, execFunc } = option;
              return (
                <li
                  className="dropdown-list-item"
                  onClick={() => {
                    setIsOpen(false);
                    execFunc(); 
                  }}
                  key={`${text}: ${idx}`}
                >
                  {text}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  );
}