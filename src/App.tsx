import ListGroup from "./components/ListGroup/";
import Alert from "./components/Alert";
import { Button } from "./components/Button";
import { useState } from "react";
import LikeIcon from "./components/LikeIcon";
import { NavBar } from "./components/NavBar";
import Cart from "./components/Cart";
import ExpandableText from "./components/ExpandableText";

function App() {
  // updating objects, arrays and array of objects exercise
  const [game, setGame] = useState({
    id: 1,
    player: {
      name: "John",
    },
  });

  const handleClick = () => {
    setGame({ ...game, player: { ...game.player, name: "Tino" } });
  };

  const [pizza, setPizza] = useState({
    name: "Spicy pepperoni",
    toppings: ["Mushroom"],
  });

  const handleClick2 = () => {
    setPizza({ ...pizza, toppings: [...pizza.toppings, "Cheese"] });
  };

  const [cart, setCart] = useState({
    discount: 0.1,
    items: [
      { id: 1, title: "product 1", quantity: 1 },
      { id: 2, title: "product 2", quantity: 1 },
    ],
  });

  const handleClick3 = () => {
    setCart({
      ...cart,
      items: cart.items.map((item) =>
        item.id === 1 ? { ...item, quantity: item.quantity + 1 } : item
      ),
    });
  };

  // from ListGroup component exercise
  let items = ["London", "Paris", "New York", "Tokyo"];
  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  // updating state
  const [alertVisible, setVisibility] = useState(false);
  // passing state to children components: navbar & cart
  const [cartItems, setCartItems] = useState(["Product 1", "Product 2"]);

  return (
    <div>
      <NavBar cartItemsCount={cartItems.length} />
      <Cart cartItems={cartItems} onClear={() => setCartItems([])}></Cart>
      <ExpandableText>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae,
        dolorem voluptatem sapiente excepturi quas eius quo, dolor laborum
        incidunt accusamus sequi error, ratione suscipit. Temporibus autem nisi
        libero ipsam praesentium voluptates suscipit, repellendus eaque dolores
        recusandae inventore ipsa, molestiae, deleniti similique ratione odit!
        Facilis eaque recusandae quo iusto, commodi neque laudantium
        consequuntur perferendis reprehenderit nulla, placeat quas! Dolores
        dicta dolore vel ratione quos rem ea accusantium veniam incidunt ipsum,
        quam quisquam omnis facere ullam unde ipsa placeat tenetur quibusdam
        sapiente! Voluptates quibusdam harum ipsam, iusto cupiditate delectus
        culpa debitis dolor consequatur dicta asperiores vel nemo modi
        architecto molestias veniam similique.
      </ExpandableText>
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
