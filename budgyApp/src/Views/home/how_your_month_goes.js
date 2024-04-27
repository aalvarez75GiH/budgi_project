// import React, { useState, useEffect, useContext } from "react";
// import { FlatList } from "react-native";

// import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
// import { FlexibleContainer } from "../../global_components/containers/flexible_container";
// import { theme } from "../../infrastructure/theme";
// import { Text } from "../../infrastructure/typography/text.component";
// import { Spacer } from "../../global_components/optimized.spacer.component";
// import { TransactionTile } from "../../global_components/organisms/tiles/transaction_tile";
// import {
//   getTransactionsAndTotalAmountRequestOrderedByTimeStamp,
//   getTransactionsAndTotalAmountRequest_ByUser_ByCat_ByMonthyear_OrderedByTimeStamp,
// } from "../../infrastructure/services/transactions/transactions.services";
// import { IsLoadingContainer } from "../../global_components/containers/isLoading_container";
// import { CheckIconComponent } from "../../global_components/check_icon_component";
// import { RoundedOptionButton } from "../../global_components/buttons/rounded_option_button";
// import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
// import { ControlledContainer } from "../../global_components/containers/controlled_container";
// import { CircularButtonOptionComponent } from "../../global_components/organisms/clickables options/circularButton_option.component";
// import { CircularTextOptionComponent } from "../../global_components/organisms/clickables options/circular_text_option.component";

// import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";
// import { AuthenticationContext } from "../../infrastructure/services/authentication/authentication.context";
// import { CategoryListContext } from "../../infrastructure/services/category_list/category_list.context";

// export const HowMonthIsGoingView = ({ navigation }) => {
//   const [transactionsFromCloud, setTransactionsFromCloud] = useState([]);
//   const [transactionsTotalAmount, setTransactionsTotalAmount] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isLoadingByCat, setIsLoadingByCat] = useState(false);
//   const [isPressed, setIsPressed] = useState(true);

//   //   ***** Category List context consumption
//   const { categoryList } = useContext(CategoryListContext);
//   const { expense_categories } = categoryList;
//   // console.log("EXPENSE CATEGORIES AT HOW_MONTH:", expense_categories);

//   //   ***** Date Operations context consumption
//   const { month_year } = useContext(DateOperationsContext);
//   console.log("MONTH YEAR:", month_year);

//   //   ***** Authentication context consumption
//   const { user } = useContext(AuthenticationContext);
//   const { user_id } = user;
//   console.log("USER_ID:", user_id);

//   //   UseEffect make a request of all transactions and total amount spent by user id and month year
//   useEffect(() => {
//     (async () => {
//       try {
//         setIsLoading(true);
//         const transactionsAndAmount =
//           await getTransactionsAndTotalAmountRequestOrderedByTimeStamp(
//             user_id,
//             month_year
//           );

//         // console.log(
//         //   "TRANSACTIONS AND AMOUNT:",
//         //   JSON.stringify(transactionsAndAmount, null, 2)
//         // );
//         const { transactions, total_amount } = transactionsAndAmount;
//         // console.log(
//         //   "TRANSACTION REQUEST COMING:",
//         //   JSON.stringify(transactions, null, 2)
//         // );
//         // console.log(
//         //   "TRANSACTION REQUEST COMING:",
//         //   JSON.stringify(total_amount, null, 2)
//         // );
//         setTransactionsFromCloud(transactions);
//         setTransactionsTotalAmount(total_amount);
//         transactionsFromCloud ? setIsLoading(false) : setIsLoading(true);
//       } catch (error) {
//         console.log(error);
//       }
//     })();
//   }, []);

//   //   ********** it does make a request when user changes category in the horizontal FlatList component
//   const changingCategory = async (category_id) => {
//     console.log("CATEGORY ID AT FUNCTION:", category_id);
//     setIsPressed(false);
//     // setIsPressed(!isPressed);
//     try {
//       setIsLoadingByCat(true);
//       const transactionsAndAmount =
//         await getTransactionsAndTotalAmountRequest_ByUser_ByCat_ByMonthyear_OrderedByTimeStamp(
//           user_id,
//           category_id,
//           month_year
//         );

//       // console.log(
//       //   "TRANSACTIONS AND AMOUNT:",
//       //   JSON.stringify(transactionsAndAmount, null, 2)
//       // );
//       const { transactions, total_amount } = transactionsAndAmount;
//       // console.log(
//       //   "TRANSACTION REQUEST COMING:",
//       //   JSON.stringify(transactions, null, 2)
//       // );
//       // console.log(
//       //   "TRANSACTION REQUEST COMING:",
//       //   JSON.stringify(total_amount, null, 2)
//       // );
//       setTransactionsFromCloud(transactions);
//       setTransactionsTotalAmount(total_amount);
//       transactionsFromCloud
//         ? setIsLoadingByCat(false)
//         : setIsLoadingByCat(true);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //   ********** it does make a request when user clicks at "All" button
//   const gettingAllTransactions = async () => {
//     setIsPressed(true);
//     try {
//       setIsLoadingByCat(true);
//       const transactionsAndAmount =
//         await getTransactionsAndTotalAmountRequestOrderedByTimeStamp(
//           user_id,
//           month_year
//         );

//       // console.log(
//       //   "TRANSACTIONS AND AMOUNT:",
//       //   JSON.stringify(transactionsAndAmount, null, 2)
//       // );
//       const { transactions, total_amount } = transactionsAndAmount;
//       // console.log(
//       //   "TRANSACTION REQUEST COMING:",
//       //   JSON.stringify(transactions, null, 2)
//       // );
//       // console.log(
//       //   "TRANSACTION REQUEST COMING:",
//       //   JSON.stringify(total_amount, null, 2)
//       // );
//       setTransactionsFromCloud(transactions);
//       setTransactionsTotalAmount(total_amount);
//       transactionsFromCloud
//         ? setIsLoadingByCat(false)
//         : setIsLoadingByCat(true);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //   *************** it does render transactions
//   const renderItem = ({ item }) => {
//     return (
//       <TransactionTile
//         caption={item.category_name}
//         navigation={navigation}
//         icon_name={item.icon_name}
//         active_icon={true}
//         amount={item.amount}
//         transaction_date={item.transaction_date}
//         most_recent={item.most_recent}
//         short_name={item.short_name}
//       />
//     );
//   };

//   //   *************** it does render categories in the horizontal flatList
//   const renderCategoryItem = ({ item }) => {
//     console.log("ITEM:", item);
//     return (
//       <CircularButtonOptionComponent
//         caption={item.short_name}
//         // isPressed={isPressed}
//         icon_name={item.icon_name}
//         action={() => changingCategory(item.category_id)}
//         // action={testing}
//       />
//     );
//   };

//     /*********  Rendering whole UI if IsLoading=false  **************/
//   return isLoading ? (
//     <FlexibleContainer
//       color={theme.colors.bg.p_FFFFFF}
//       // color={"#FAD"}
//       direction="row"
//       flexibility={1}
//       justify={"center"}
//       isBordered={false}
//     >
//       <IsLoadingContainer
//         size="large"
//         color={theme.colors.brand.primary}
//         caption="Loading transactions..."
//       />
//     </FlexibleContainer>
//   ) : (
//     <GeneralFlexContainer>
//       <ExitHeaderComponent
//         navigation={navigation}
//         direction={"column"}
//         color={theme.colors.bg.p_FFFFFF}
//         // color={"#FAA"}
//         flexibility={0.14}
//       />

//       {/*********  Rendering Total Amount and change month option button  **************/}
//       <FlexibleContainer
//         color={theme.colors.bg.p_FFFFFF}
//         // color={"#FAD"}
//         direction="row"
//         flexibility={0.15}
//         justify={"flex-start"}
//         isBordered={false}
//       >
//         <ControlledContainer width={"60%"} height={"35%"} direction={"column"}>
//           <Spacer position="left" size="large">
//             <Text text_variant="dark_bold_caption_20">
//               Total: ${transactionsTotalAmount.toFixed(2)}
//             </Text>
//           </Spacer>
//           <Spacer position="top" size="medium" />
//           <ControlledContainer width={"100%"} height={"50%"} direction={"row"}>
//             <Spacer position="left" size="small">
//               <Spacer position="left" size="large">
//                 <CheckIconComponent icon_width={20} icon_height={20} />
//               </Spacer>
//             </Spacer>
//             <Text text_variant="bold_text_12">Most updated transaction</Text>
//           </ControlledContainer>
//         </ControlledContainer>
//         <Spacer position="left" size="medium">
//           <ControlledContainer
//             width={"35%"}
//             height={"45%"}
//             justify={"flex-start"}
//           >
//             <RoundedOptionButton
//               color={"#F4F4F4"}
//               onPress={() => null}
//               width={"140px"}
//               height={"55px"}
//               borderRadius={25}
//               caption={month_year}
//               underlined={true}
//             />
//           </ControlledContainer>
//         </Spacer>
//       </FlexibleContainer>
//       <Spacer position="top" size="small" />
//       <Spacer position="top" size="small" />

//       {/************* Rendering FlatList with categories option ***********/}
//       <FlexibleContainer
//         color={theme.colors.bg.p_FFFFFF}
//         // color={"lightblue"}
//         direction="row"
//         flexibility={0.16}
//         justify={"flex-start"}
//         isBordered={false}
//       >
//         <CircularTextOptionComponent
//           caption="All"
//           isPressed={isPressed}
//           action={gettingAllTransactions}
//         />
//         <ControlledContainer
//           width={"300px"}
//           height={"100px"}
//           justify="center"
//           alignment="center"
//         >
//           <FlatList
//             horizontal={true}
//             showsHorizontalScrollIndicator={false}
//             // showsVerticalScrollIndicator={true}
//             data={expense_categories}
//             renderItem={renderCategoryItem}
//             keyExtractor={(item, id) => {
//               return item.category_id;
//             }}
//           />
//         </ControlledContainer>
//       </FlexibleContainer>

//       {/************* Rendering FlatList with transactions  ***********/}
//       {isLoadingByCat ? (
//         <>
//           <Spacer position="top" size="small" />
//           <Spacer position="top" size="small" />
//           <FlexibleContainer
//             color={theme.colors.bg.p_FFFFFF}
//             // color={"#FAD"}
//             direction="row"
//             flexibility={1}
//             justify={"center"}
//             isBordered={false}
//           >
//             <IsLoadingContainer
//               size="large"
//               color={theme.colors.brand.primary}
//               caption="Loading transactions..."
//             />
//           </FlexibleContainer>
//         </>
//       ) : (
//         <>
//           <Spacer position="top" size="small" />
//           <Spacer position="top" size="small" />
//           <FlexibleContainer
//             color={theme.colors.bg.e_F4F4F4}
//             // color={"lightblue"}
//             direction="column"
//             flexibility={1}
//             justify={"center"}
//             isBordered={false}
//           >
//             <FlatList
//               showsHorizontalScrollIndicator={false}
//               showsVerticalScrollIndicator={false}
//               data={transactionsFromCloud}
//               renderItem={renderItem}
//               keyExtractor={(item, id) => {
//                 return item.transaction_id;
//               }}
//               scrollSpeed={0.5}
//             />
//           </FlexibleContainer>
//         </>
//       )}
//     </GeneralFlexContainer>
//   );
// };
