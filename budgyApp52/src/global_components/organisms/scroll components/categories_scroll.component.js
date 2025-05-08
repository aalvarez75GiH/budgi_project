import React, { useContext } from "react";
import { CircularButtonOptionComponent } from "../clickables options/circularButton_option.component";

export const CategoriesScrollComponent = ({ item, selectedItem, action }) => {
  // const { transactionsByMonthYear } = useContext(TransactionsContext);
  const { category_id, icon_name, short_name, status } = item;
  const isSelected = selectedItem === category_id;
  if (status === "suspended") {
    return null;
  }
  return (
    <CircularButtonOptionComponent
      caption={short_name}
      icon_name={icon_name}
      action={() => action(item)}
      isSelected={isSelected}
      icon_width={25}
      // isSelected={}
    />
  );
};
