import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

import { useState } from "react";

interface Props {
  onClick: () => void;
}

const LikeIcon = ({ onClick }: Props) => {
  const [status, setStatus] = useState(true);
  const toggle = () => {
    setStatus(!status);
    onClick();
  };

  if (status) return <FaHeart color="purple" size="40" onClick={toggle} />;
  return <FaRegHeart size="40" onClick={toggle} />;
};

export default LikeIcon;
