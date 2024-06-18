// import BugIcon from "../../../../assets/icons/svgs/bug.svg";
import AntsExpensesIcon from "../../assets/icons/svgs/bug.svg";
import HealthIcon from "../../assets/icons/svgs/bandage.svg";
// import FoodAndRestaurantsIcon from "../../assets/icons/svgs/burger.svg";
import FoodAndRestaurantsIcon from "../../assets/icons/svgs/fork_knife_eat_food_icon.svg";
import SupermarketsIcon from "../../assets/icons/svgs/cart2.svg";
import FamilyIcon from "../../assets/icons/svgs/family.svg";
import UnexpectedIcon from "../../assets/icons/svgs/cloud.svg";
import CarServicesIcon from "../../assets/icons/svgs/car_icon2.svg";
import GasIcon from "../../assets/icons/svgs/gas2.svg";
// import MenuIcon from "../../assets/icons/svgs/7124084_alt_menu_icon.svg";
import MenuIcon from "../../assets/icons/svgs/menu_icon.svg";
import FileIcon from "../../assets/icons/svgs/file.svg";
import ExitIcon from "../../assets/icons/svgs/exit_icon2.svg";
import UserIcon from "../../assets/icons/svgs/user_icon.svg";
import EmailIcon from "../../assets/icons/svgs/email_icon_2.svg";
import CheckIcon from "../../assets/icons/svgs/ok_success_icon.svg";
import TransactionsIcon from "../../assets/icons/svgs/receipt_icon.svg";
import WalletIcon from "../../assets/icons/svgs/wallet_icon.svg";
import PreferencesIcon from "../../assets/icons/svgs/preferences_icon2.svg";
import clearTextIcon from "../../assets/icons/svgs/delete_discard_icon.svg";
import editIcon from "../../assets/icons/svgs/edit_icon.svg";
import billIcon from "../../assets/icons/svgs/bills_icon.svg";
import calendarIcon from "../../assets/icons/svgs/calendar_icon.svg";
import descriptionIcon from "../../assets/icons/svgs/comment_icon.svg";
import removeIcon from "../../assets/icons/svgs/remove_icon.svg";
import ThinCheckIcon from "../../assets/icons/svgs/check_icon.svg";
import DollarMoneySignIcon from "../../assets/icons/svgs/8679129_money_dollar_circle_icon.svg";
import AddIncomeIcon from "../../assets/icons/svgs/hand_invoice_icon.svg";
import StatsIcon from "../../assets/icons/svgs/stats_icon.svg";
import UberIcon from "../../assets/icons/svgs/uber_icon.svg";
import DoordashIcon from "../../assets/icons/svgs/doordash_icon.svg";
import GrubHubIcon from "../../assets/icons/svgs/grubhub_icon.svg";
import LyftIcon from "../../assets/icons/svgs/lyft_icon.svg";

export const useSVGComponent = (icon_name) => {
  const defaultSVGIcons = [
    {
      icon_name: "AntsExpensesIcon",
      icon: AntsExpensesIcon,
    },
    {
      icon_name: "HealthIcon",
      icon: HealthIcon,
    },
    {
      icon_name: "FoodIcon",
      icon: FoodAndRestaurantsIcon,
    },
    {
      icon_name: "SupermarketsIcon",
      icon: SupermarketsIcon,
    },
    {
      icon_name: "FamilyIcon",
      icon: FamilyIcon,
    },
    {
      icon_name: "UnexpectedIcon",
      icon: UnexpectedIcon,
    },
    {
      icon_name: "CarServicesIcon",
      icon: CarServicesIcon,
    },
    {
      icon_name: "GasIcon",
      icon: GasIcon,
    },
    {
      icon_name: "MenuIcon",
      icon: MenuIcon,
    },
    {
      icon_name: "FileIcon",
      icon: FileIcon,
    },
    {
      icon_name: "ExitIcon",
      icon: ExitIcon,
    },
    {
      icon_name: "UserIcon",
      icon: UserIcon,
    },
    {
      icon_name: "EmailIcon",
      icon: EmailIcon,
    },
    {
      icon_name: "SuccessIcon",
      icon: CheckIcon,
    },
    {
      icon_name: "TransactionsIcon",
      icon: TransactionsIcon,
    },
    {
      icon_name: "SpendingIcon",
      icon: WalletIcon,
    },
    {
      icon_name: "PreferencesIcon",
      icon: PreferencesIcon,
    },
    {
      icon_name: "ClearTextIcon",
      icon: clearTextIcon,
    },
    {
      icon_name: "EditIcon",
      icon: editIcon,
    },
    {
      icon_name: "BillIcon",
      icon: billIcon,
    },
    {
      icon_name: "CalendarIcon",
      icon: calendarIcon,
    },
    {
      icon_name: "DescriptionIcon",
      icon: descriptionIcon,
    },
    {
      icon_name: "RemoveIcon",
      icon: removeIcon,
    },
    {
      icon_name: "ThinCheckIcon",
      icon: ThinCheckIcon,
    },
    {
      icon_name: "DollarMoneySignIcon",
      icon: DollarMoneySignIcon,
    },
    {
      icon_name: "AddIncomeIcon",
      icon: AddIncomeIcon,
    },
    {
      icon_name: "StatsIcon",
      icon: StatsIcon,
    },
    {
      icon_name: "UberIcon",
      icon: UberIcon,
    },
    {
      icon_name: "DoordashIcon",
      icon: DoordashIcon,
    },
    {
      icon_name: "GrubHubIcon",
      icon: GrubHubIcon,
    },
    {
      icon_name: "LyftIcon",
      icon: LyftIcon,
    },
  ];
  // const svg_path = "../../../../assets/icons/svgs";
  const index = defaultSVGIcons.findIndex((obj) => obj.icon_name === icon_name);
  const SVGIconComponent = defaultSVGIcons[index].icon;
  return {
    // svg_path,
    SVGIconComponent,
  };
};

// export const svg_path = "../../../../assets/icons/svgs";
export const pngs_path = "../../../../assets/icons/pngs";
