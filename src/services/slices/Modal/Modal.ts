import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalState } from './Modal.types';

const initialState: ModalState = {
  isShowed: false,
  modalTitle: '',
  postId: null,
  isSinglePostSelected: null,
};

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (
      state,
      action: PayloadAction<{ modalTitle: string; postId: number | null; isSinglePostSelected: boolean }>
    ) => {
      state.isShowed = true;
      state.modalTitle = action.payload.modalTitle;
      state.postId = action.payload.postId;
      state.isSinglePostSelected = action.payload.isSinglePostSelected;
    },
    closeModal: (state) => {
      state.isShowed = false;
      state.modalTitle = '';
    },
  },
});

const { reducer, actions } = modal;

export const { showModal, closeModal } = actions;
export default reducer;
