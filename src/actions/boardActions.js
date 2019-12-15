import { CONSTANTS } from "../actions";
import {uuid} from "uuidv4";

export const setActiveBoard = id => {
  return {
    type: CONSTANTS.SET_ACTIVE_BOARD,
    payload: id
  };
};

export const addBoard = title => {
  const id = uuid();
  return {
    type: "ADD_BOARD",
    payload: { title, id }
  };
};
