import React from "react";

export type BottomSheetProps = {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  radius?: number;
  height?: any
  handler?: () => void
  
};


export type HabitOptionProps = {
  isVisible: boolean;
  onClose: () => void;
  name: string,
  onDelete: () => void,
  onEdit: () => void
};