import React from "react";
import styles from "@/styles/listitem.module.css";

const ListItem = ({ name, onClick }: { name: string; onClick: () => void }) => {
  return (
    <div
      className={`p-2 bg-white rounded-md cursor-pointer text-center capitalize ${styles.itemContainer}`}
      onClick={onClick}
    >
      {name}
    </div>
  );
};

export default ListItem;
