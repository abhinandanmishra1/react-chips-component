import React from "react";

interface SelectedChipsProps {
  selectedChipsOptions: string[];
  onDeselectChip: (chip: string) => void;
  backspaceCount: number;
}

export const SelectedChips: React.FC<SelectedChipsProps> = ({
  selectedChipsOptions,
  onDeselectChip,
  backspaceCount
}) => {
  return (
    <div className="chips">
      {selectedChipsOptions.map((chip) => (
        <p key={chip} className="chip" data-remove-count={backspaceCount}>
          {chip}
          <button
            className="chip-remove-btn"
            onClick={() => onDeselectChip(chip)}
          >
            {" "}
            x
          </button>
        </p>
      ))}
    </div>
  );
};
