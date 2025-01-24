import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ItemList } from "./itemList";
import { ItemForm } from "./itemForm";

const App = () => {
  const [currentItem, setCurrentItem] = useState(null);

  return (
    <>
      <ItemList setCurrentItem={setCurrentItem} />
      <ItemForm currentItem={currentItem} setCurrentItem={setCurrentItem} />
      <ItemForm currentItem={currentItem} setCurrentItem={setCurrentItem} />
    </>
    // <Router>
    //   <div>
    //     <h1>CRUD Application</h1>
    //     <Route path="/" exact>
    //     </Route>
    //     <Route path="/add">
    //     </Route>
    //     <Route path="/edit">
    //     </Route>
    //   </div>
    // </Router>
  );
};

export default App;
