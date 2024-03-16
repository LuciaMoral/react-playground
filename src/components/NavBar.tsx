import React from "react";

interface Props {
  // 2 options: 1. cartItems: string[] or 2. to the count below
  cartItemsCount: number;
}

export const NavBar = ({ cartItemsCount }: Props) => {
  return <div>NavBar: {cartItemsCount}</div>;
};
