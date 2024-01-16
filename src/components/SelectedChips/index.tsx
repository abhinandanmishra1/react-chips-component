import React from "react";
import { User } from "../../interfaces/User";

interface SelectedChipsProps {
  selectedChipsOptions: User[];
  onDeselectChip: (user: User) => void;
  backspaceCount: number;
}

export const SelectedChips: React.FC<SelectedChipsProps> = ({
  selectedChipsOptions,
  onDeselectChip,
  backspaceCount,
}) => {
  return (
    <>
      {selectedChipsOptions.map((user) => (
        <p
          key={user.userId}
          className="chip"
          data-remove-count={backspaceCount}
        >
          <img src={user.profile} alt={user.name} className="chip-img" />
          <span>{user.name}</span>
          <button
            className="chip-remove-btn"
            onClick={() => onDeselectChip(user)}
          >
            {" "}
            x
          </button>
        </p>
      ))}
    </>
  );
};
