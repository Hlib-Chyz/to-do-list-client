import axios from "../../interceptors/AuthInterceptor";
import { INote } from "./ToDo.types";

export const addNote = async (title: string): Promise<void> => {
  await axios.post("/notes", {
    title,
  });
};
export const getNotes = async (): Promise<INote[]> => {
  const response = await axios.get("/notes");
  return response.data;
};
export const deleteNote = async (noteId: string): Promise<void> => {
  await axios.delete(`/notes/${noteId}`);
};
export const updateNote = async (
  noteId: string,
  title: string
): Promise<void> => {
  await axios.put(`/notes/${noteId}`, {
    title,
  });
};
