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
import MoneyIcon from "../../assets/icons/svgs/wallet_icon.svg";
import PreferencesIcon from "../../assets/icons/svgs/preferences_icon2.svg";
// import CategoryByUser from "../../../../assets/icons/svgs/users_group_icon.svg";

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
      icon: MoneyIcon,
    },
    {
      icon_name: "PreferencesIcon",
      icon: PreferencesIcon,
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
