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
  console.log(backspaceCount);
  return (
    <>
      {selectedChipsOptions.map((user, index: number) => (
        <p
          key={user.userId}
          className="chip"
          {...(index === selectedChipsOptions.length - 1 && {
            ...{ "data-remove-count": backspaceCount },
          })}
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
