import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, deleteItem } from "./features/itemsSlice";
import { Button } from "@mui/material";

export const ItemList = () => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.items.items);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <div>
      <h2> Item List</h2>

      <ul>
        {items.map((item) => (
          <li key={item.id} >
            {item.name}
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
