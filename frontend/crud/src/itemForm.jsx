import  { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem, updateItem } from "./features/itemsSlice";
import { TextField, Button } from "@mui/material";

export const ItemForm = ({ currentItem, setCurrentItem }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(currentItem ? currentItem.name : "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentItem) {
      dispatch(updateItem({ id: currentItem.id, item: { name } }));
    } else {
      dispatch(addItem({ name }));
    }

    setName("");

    setCurrentItem(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <Button type="submit" variant="contained" color="primary">
        {currentItem ? "Update Item" : "Add Item"}
      </Button>
    </form>
  );
};
