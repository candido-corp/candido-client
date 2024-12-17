import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EnumNotificationType } from '@/models/enums/EnumNotification';
import {
  Notification,
  ConfirmationNotification,
  FormNotification,
} from '@/models/interfaces/Notification';
import { RootState } from '.';

interface NotificationState {
  notification:
    | Notification
    | ConfirmationNotification
    | FormNotification
    | null;
}

const initialState: NotificationState = {
  notification: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      const { type, dialogProps } = action.payload;
      state.notification = { type, dialogProps };
    },
    addFormNotification: (state, action: PayloadAction<FormNotification>) => {
      const { dialogProps, formData, onSuccess, onFailure } = action.payload;
      state.notification = {
        type: EnumNotificationType.FORM,
        dialogProps,
        formData,
        onSuccess,
        onFailure,
      };
    },
    askConfirmation: (
      state,
      action: PayloadAction<ConfirmationNotification>
    ) => {
      const { dialogProps, cancelText, actionButtons } = action.payload;
      state.notification = {
        type: EnumNotificationType.CONFIRM,
        dialogProps,
        cancelText,
        actionButtons,
      };
    },
    removeNotification: (state) => {
      state.notification = null;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export const selectNotification = (state: RootState) =>
  state.notification.notification;

export default notificationSlice.reducer;
