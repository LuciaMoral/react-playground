import ListGroup from "./components/ListGroup/";
import Alert from "./components/Alert";
import { Button } from "./components/Button";
import { useState } from "react";
import LikeIcon from "./components/LikeIcon";

function App() {
  let items = ["London", "Paris", "New York", "Tokyo"];
  const handleSelectItem = (item: string) => {
    console.log(item);
  };
  const [alertVisible, setVisibility] = useState(false);

  return (
    <div>
      <LikeIcon onClick={() => console.log("clicked")} />
      {alertVisible && (
        <Alert onClose={() => setVisibility(false)}>My Alert</Alert>
      )}
      <Button onClick={() => setVisibility(true)}>My Button</Button>
      <ListGroup
        items={items}
        heading={"Cities"}
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}

export default App;
