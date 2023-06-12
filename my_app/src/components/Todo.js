import React, { useState } from "react";
import { List, ListItem, ListItemAvatar, ListItemText, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { db } from "../firebase.js";
import { doc, deleteDoc } from "firebase/firestore";
import "./Todo.css";
import todoStore from "../zustandStore.js";
import { toast } from "react-toastify";
import { ThemeContext, useTheme } from "@emotion/react";

const Todo = ({ item }) => {
  const [open, setOpen] = useState(false);
  const deleteTodo = todoStore((state) => state.deleteTodo);

  const handleDeleteClick = () => {
    setOpen(true);
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

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <List className="todo__list">
        {item && (
          <ListItem>
            <ListItemAvatar />
            <ListItemText primary={item.todo} secondary={item.todo} />
          </ListItem>
        )}
        <DeleteIcon
          fontSize="large"
          style={{
            opacity: 0.7,
            color: "red",
            cursor: "pointer",
            borderRadius: "50%",
            paddingRight: "24px",
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
