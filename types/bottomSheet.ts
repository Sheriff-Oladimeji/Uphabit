import React from "react";

export type BottomSheetProps = {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  radius?: number;
  
};


export type HabitOptionProps = {
  isVisible: boolean;
  onClose: () => void;
  name: string,
  onDelete: () => void,
  onEdit: () => void
};