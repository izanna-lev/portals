import { createSlice } from "@reduxjs/toolkit";

interface messageListObject {
  otherUser: {
    _id: string;
    name: string;
    image: string;
  };
  _id: string;
  messageType: number;
  userRef: string;
  channelRef: string;
  lastMessageReadAt: string;
  message: string;
  createdOn: string;
  updatedOn: string;
  itineraryStatus: number;
  unseenMessages: number;
}

interface MessageList {
  data: {
    messages: messageListObject[];
    itinerary: {
      location: {
        location: string;
      };
      name: string;
      otherUserName: string;
      image: string;
      fromDate: string;
      userImage: string;
    };
  };
  hasMore: boolean;
  page: number;
  size: number;
  total: number;
  limit: number;
}

const initialState: MessageList = {
  data: {
    messages: [],
    itinerary: {
      location: {
        location: "",
      },
      name: "",
      image: "",
      fromDate: "",
      otherUserName: "",
      userImage: "",
    },
  },
  hasMore: false,
  page: 0,
  size: 0,
  total: 0,
  limit: 10,
};

const messageList = createSlice({
  name: "messageList",
  initialState,
  reducers: {
    getMessages: (state: MessageList, action: { payload: MessageList }) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { getMessages } = messageList.actions;

export default messageList.reducer;
