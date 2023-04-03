
import { useSession } from "next-auth/react";
import React from "react";

interface Props {
  text?: string;
  onClick?: () => void;
}

const AdminButton: React.FC<Props> = ({ text = "Admin Button", onClick }) => {
  const session = useSession();

  if (session?.data?.user?.role === "Admin") {
    return (
      <button onClick={onClick} >
        {text}
      </button>
    );
  } else {
    return null;
  }
};

export default AdminButton;