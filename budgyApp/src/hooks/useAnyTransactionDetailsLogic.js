export const useAnyTransactionDetailsLogic = () => {
  const navigationLogic = (navigation, toNavigate, comingFrom) => {
    const movingForwardToAddDescription = (
      navigation,
      toNavigate,
      comingFrom
    ) => {
      navigation.navigate(toNavigate, {
        comingFrom: comingFrom,
      });
    };
    const movingForwardToSelectCategoryView = (
      navigation,
      toNavigate,
      comingFrom
    ) => {
      navigation.navigate(toNavigate, {
        comingFrom: comingFrom,
      });
    };
    const movingForwardToGeneralCalendarView = (
      navigation,
      toNavigate,
      comingFrom
    ) => {
      navigation.navigate(toNavigate, {
        comingFrom: comingFrom,
      });
    };
    const movingForwardToDeleteConfirmationView = (
      navigation,
      toNavigate,
      transaction_id
    ) => {
      navigation.navigate(toNavigate, {
        transaction_id: transaction_id,
      });
    };

    const updatingTransactionProcess = async (
      navigation,
      updatingTransaction
    ) => {
      const response = await updatingTransaction();
      response ? navigation.navigate("My transactions") : null;
    };

    const closingMenu = (navigation) => {
      navigation.goBack();
    };
    return {
      movingForwardToAddDescription,
      movingForwardToSelectCategoryView,
      movingForwardToGeneralCalendarView,
      movingForwardToDeleteConfirmationView,
      updatingTransactionProcess,
      closingMenu,
    };
  };

  return {
    navigationLogic,
  };
};
