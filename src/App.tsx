import ListGroup from "./components/ListGroup/";
import Alert from "./components/Alert";
import { Button } from "./components/Button";
import { useState, useEffect } from "react";
import LikeIcon from "./components/LikeIcon";
import { NavBar } from "./components/NavBar";
import Cart from "./components/Cart";
import ExpandableText from "./components/ExpandableText";
import { Form } from "./components/Form";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import categories from "./expense-tracker/categories";
import ProductList from "./components/ProductList";

import { CanceledError } from "./services/api-client";
import userService, { User } from "./services/user-service";
import useUsers from "./hooks/useUsers";

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

  //expense form exercise

  const [expenses, setExpenses] = useState([
    { id: 1, description: "Gas", amount: 80, category: "Utilities" },
    { id: 2, description: "Shopping", amount: 50, category: "Groceries" },
    {
      id: 3,
      description: "Cinema tickets",
      amount: 35,
      category: "Entertainment",
    },
    { id: 4, description: "Internet", amount: 40, category: "Utilities" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");
  // if selectedCategory has a value we call all expenses in the given category or if it's empty show all expenses.
  const visibleExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  // backend exercise Product list
  const [categ, setCateg] = useState("");
  // using a custom hook
  const { users, error, isLoading, setUsers, setError, setLoading } =
    useUsers();
  //deleting data
  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    // to persist changes
    userService.delete(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  // adding data
  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Luis" };
    setUsers([newUser, ...users]);

    userService
      .create(newUser)
      // .then((res) => setUsers([res.data, ...users])); OR like this
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  //updating data

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    userService.update(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-3"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <select
        name=""
        id=""
        className="form-select"
        onChange={(event) => setCateg(event.target.value)}
      >
        <option value=""></option>
        <option value="Clothing">Clothing</option>
        <option value="Household">Household</option>
      </select>
      <ProductList categ={categ}></ProductList>
      <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        />
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) =>
          setExpenses(expenses.filter((expense) => expense.id !== id))
        }
      />
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
      <Form />
    </div>
  );
}

export default App;
