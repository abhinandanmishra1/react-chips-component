// ChipInput.tsx
import React from "react";

interface ChipInputProps {
  setSearchInput: (input: string) => void;
  searchInput: string;
  onInputFocus: () => void;
  onInputBlur: () => void;
  onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const ChipInput: React.FC<ChipInputProps> = ({
  setSearchInput,
  searchInput,
  onInputFocus,
  onInputBlur,
  onKeyPress,
}) => {
  return (
    <input
      placeholder="Enter your tag..."
      className="chip-input"
      onChange={(e) => {
        setSearchInput(e.target.value);
      }}
      onKeyDown={onKeyPress}
      value={searchInput}
      onFocus={onInputFocus}
      onBlur={onInputBlur}
    />
  );
};
