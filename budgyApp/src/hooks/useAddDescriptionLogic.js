import { useContext, useState } from "react";

import { TransactionsContext } from "../infrastructure/services/transactions/transactions.context";

export const useAddDescriptionLogic = () => {
  const {
    transactionInfoForRequest,
    setTransactionInfoForRequest,
    transactionInfoForUpdate,
    setTransactionInfoForUpdate,
  } = useContext(TransactionsContext);

  const [description, setDescription] = useState(
    transactionInfoForRequest.description
      ? transactionInfoForRequest.description
      : ""
  );
  const [descriptionToUpdate, setDescriptionToUpdate] = useState(
    transactionInfoForUpdate.description
      ? transactionInfoForUpdate.description
      : ""
  );

  const [isDoneActive, setIsDoneActive] = useState(
    transactionInfoForRequest.description ? true : false
  );

  const goingBack = (navigation, comingFrom) => {
    switch (comingFrom) {
      case "AnyTransactionDetailsView":
        setTransactionInfoForUpdate({
          ...transactionInfoForUpdate,
          description: descriptionToUpdate,
        });
        break;
      case "TransactionSummaryView":
        setTransactionInfoForRequest({
          ...transactionInfoForRequest,
          description: description,
        });
        break;
    }

    navigation.goBack();
  };

  const onChangeText = (value, comingFrom) => {
    {
      comingFrom === "AnyTransactionDetailsView"
        ? setDescriptionToUpdate(value)
        : setDescription(value);
    }
    {
      comingFrom === "TransactionSummaryView"
        ? setDescription(value)
        : setDescriptionToUpdate(value);
    }

    setIsDoneActive(
      comingFrom === "AnyTransactionDetailsView"
        ? descriptionToUpdate.length > 1
          ? true
          : false
        : description.length > 1
        ? true
        : false
    );
  };

  const cleaningDescription = (comingFrom) => {
    {
      comingFrom === "AnyTransactionDetailsView"
        ? setDescriptionToUpdate("")
        : setDescription("");
    }
    setIsDoneActive(false);
  };

  return {
    goingBack,
    onChangeText,
    cleaningDescription,
    isDoneActive,
    description,
    descriptionToUpdate,
  };
};
