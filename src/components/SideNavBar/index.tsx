import NavigationOption from "../sub-components/NavigationOption";
import { ICON } from "../../constants";
import styles from "./index.module.scss";
import { NAVIGATE } from "../../constants";

const SideNavBar = () => (
  <nav className={`${styles["navigation-sidebar"]} `}>
    {NavigationOption("Dashboard", ICON.DASHBOARD_INACTIVE, NAVIGATE.DASHBOARD)}
    {NavigationOption("Travellers", ICON.PROFILE_INACTIVE, NAVIGATE.TRAVELELRS, "travellers")}
    {NavigationOption(
      "Itineraries",
      ICON.ITINERARIES_INACTIVE,
      NAVIGATE.ITINERARY,
      "itinerary/list"
    )}
    {NavigationOption("Chat", ICON.CHAT_INACTIVE, NAVIGATE.CHAT)}
    {NavigationOption(
      "Cancel Request",
      ICON.CANCELLED_ITINERARIES_INACTIVE,
      NAVIGATE.CANCELLED_ITINERARIES,
      "itinerary/cancelled"
    )}
      {NavigationOption(
      "Access Management",
      ICON.ACCESS_MANAGEMENT_INACTIVE,
      NAVIGATE.ACCESS_MANAGEMENT,
      "admin/accessSpecialistList"
    )}
    {NavigationOption(
      "Send Notifications",
      ICON.NOTIFICATIONS_INACTIVE,
      NAVIGATE.NOTIFICATION,
      "notifications"
    )}
  </nav>
);

export default SideNavBar;
