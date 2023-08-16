import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { db } from "../firebase.js";// eslint-disable-next-line
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import "./Todo.css";
import todoStore from "../zustandStore.js";
import { toast } from "react-toastify";
// import { ThemeContext, useTheme } from "@emotion/react";

const Todo = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedTodo, setEditedTodo] = useState(item.todo);
  const deleteTodo = todoStore((state) => state.deleteTodo);

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
    updateTodo()
      .then(() => {
        
        toast.success("Todo updated successfully", { toastId: "edit-success" });
      })
      .catch((error) => {
        toast.error("Error updating todo", { toastId: "edit-error" });
      });
  };

  const updateTodo = async (event) => {
    const todoRef = doc(db, "todos", item.id);
    await updateDoc(todoRef, { todo: editedTodo });
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleEditInputChange = (event) => {
    if (event && event.target) {
      setEditedTodo(event.target.value);
    }
  };
  

  const handleConfirmDelete = () => {
    deleteTodo(item)
      .then(() => {
        setOpen(false); // Close the dialog
        toast.success("One Todo deleted successfully", { toastId: "delete-success" });
      })
      .catch((error) => {
        setOpen(false); // Close the dialog
        toast.error("Error deleting item", { toastId: "delete-error" });
      });
  };

  return (
    <>
    
          <List className="todo__list">
        {item && (
          <ListItem>
            <ListItemAvatar />
            {editMode ? (
              <>
                <input type="text" value={editedTodo} onChange={handleEditInputChange} />
                <Button onClick={handleSaveClick}>Save</Button>
              </>
            ) : (
              <ListItemText checkbox primary={item.todo} secondary={item.todo} />
            )}
          </ListItem>
        )}
        {!editMode && (
          <EditIcon
            fontSize="large"
            style={{
              opacity: 0.7,
              color: "blue",
              cursor: "pointer",
              borderRadius: "50%",
              paddingRight: "12px",
            }}
            onClick={handleEditClick}
          />
        )}
        <DeleteIcon
          fontSize="large"
          style={{
            opacity: 0.7,
            color: "red",
            cursor: "pointer",
            borderRadius: "50%",
            paddingRight: "12px",
          }}
          onClick={handleDeleteClick}
        />
      </List>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Delete Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this todo item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Todo;