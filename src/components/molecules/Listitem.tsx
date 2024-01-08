import React from "react";

const ListItem = ({ name, onClick }: { name: string; onClick: () => void }) => {
  return (
    <div
      className="p-2 bg-white border-2 border-black rounded-md cursor-pointer text-center"
      onClick={onClick}
    >
      {name}
    </div>
  );
};

export default ListItem;
