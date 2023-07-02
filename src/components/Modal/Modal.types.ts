import React from 'react';

export type ModalComponent = {
  children: React.ReactNode;
  onRemove: () => void;
};
