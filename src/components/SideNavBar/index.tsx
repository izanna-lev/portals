import NavigationOption from "../sub-components/NavigationOption";
import styles from "./index.module.scss";
import { ICON } from "../../assets/index";

const SideNavBar = ({sideNavigationView}: {sideNavigationView: boolean}) => 
(
  <nav className={`${styles["navigation-sidebar"]}`}
  style={ sideNavigationView ? { display: "",transition: "all 1.5s ease-out" } : { display: "none", transition: "all 1.5s ease-out" }}
  >
    {NavigationOption("Dashboard", ICON.DASHBOARD_INACTIVE)}
    {NavigationOption("Travellers", ICON.PROFILE_INACTIVE, "travellers")}
    {NavigationOption("Itineraries", ICON.ITINERARIES_INACTIVE, "itinerary")}
    {NavigationOption("Chat", ICON.CHAT_INACTIVE)}
    {NavigationOption(
      "Access Management",
      ICON.ACCESS_MANAGEMENT_INACTIVE,
      "admin"
    )}
    {NavigationOption(
      "Send Notifications",
      ICON.NOTIFICATIONS_INACTIVE,
      "notifications"
    )}
    {NavigationOption("Settings", ICON.SETTINGS, "settings")}
  </nav>
);

export default SideNavBar;
