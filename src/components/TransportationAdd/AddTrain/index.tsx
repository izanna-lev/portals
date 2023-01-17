import { IoCloseOutline } from "react-icons/io5";
import InputForm from "../../InputTypes/InputForm/index";
import TextArea from "../../InputTypes/TextArea/index";
import styles from "./index.module.scss";
import { Modal } from "../../Portal";
import ImagePopup from "../../sub-components/ImagePopup";
import React, { useState, useRef, useEffect } from "react";
import Dropdown from "../../InputTypes/Dropdown";
import {
  API,
  TRAIN_CLASS,
  GOOGLE_API,
  TRANSPORTATION_TYPE,
} from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { usePlacesWidget } from "react-google-autocomplete";
import { Create } from "../../../api/Create";
import { NewTicket } from "../NewTicket";
import { AiOutlinePlus } from "react-icons/ai";

interface props {
  handleAddPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewTransportationForm = (props: props) => {
  const [ticketsData, setTicketsData] = useState<any>([
    { name: "", image: "" },
  ]);
  const [showImage, setshowImage] = useState(false);
  const [imageUrl, setimageUrl] = useState("");
  const [arrival, setArrival] = useState({});
  const [depart, setDepart] = useState({});

  const dispatch = useAppDispatch();
  const { _id } = useAppSelector((state) => state.itinerary.itineraryDetails);
  const apiMessage = useAppSelector((state) => state.apiMessage);

  const dayRef = useRef();
  const trainClassRef = useRef();
  const arrivalDateRef = useRef();
  const departTimeRef = useRef();
  const arrivalTimeRef = useRef();
  const specialistNoteRef = useRef();

  const DepartLocation = usePlacesWidget({
    apiKey: GOOGLE_API,
    onPlaceSelected: (place) => checkPlace("depart", place),
    options: { types: [] },
  });

  const ArrivalLocation = usePlacesWidget({
    apiKey: GOOGLE_API,
    onPlaceSelected: (place) => checkPlace("arrival", place),
    options: { types: [] },
  });

  const checkPlace = (type: string, place: any) => {
    const {
      formatted_address,

      geometry: {
        location: { lat, lng },
      },
    } = place;

    const newLocationObj = {
      location: formatted_address,
      type: "Point",
      coordinates: [Math.abs(lng()), Math.abs(lat())],
    };
    if (type === "depart") setDepart(newLocationObj);
    else setArrival(newLocationObj);
  };

  const saveUserTicketsData = ({
    length,
    image,
    name,
  }: {
    length: number;
    image: string;
    name: string;
  }) => {
    const newObj = [...ticketsData];

    if (name) newObj[length].name = name;
    else newObj[length].image = image;
    setTicketsData(newObj);
  };

  const removeUserTicket = (id: string, index: number) => {
    const elementToRemove = document.getElementById(
      `ticket${index}`
    ) as HTMLElement;
    if (elementToRemove) elementToRemove.remove();
    const filteredTickets = ticketsData.filter(
      (ticket: any, idx: number) => idx !== index
    );

    setTicketsData(filteredTickets);
  };

  const addMoreTickets = () => {
    const addNewTicketInArr = [...ticketsData];
    addNewTicketInArr.push({ name: "", image: "" });
    setTicketsData(addNewTicketInArr);
  };

  const handleImagePopup = () => setshowImage(false);

  const { handleAddPopup } = props;

  const saveTrainDetails = (e: any) => {
    e.preventDefault();
    const getInputValue = (ref: any) => ref.current.value;
    const data = {
      day: getInputValue(dayRef),
      trainClass: getInputValue(trainClassRef),
      depart: depart,
      arrival: arrival,
      specialistNote: getInputValue(specialistNoteRef),
      userDetails: ticketsData,
      departDateTime: new Date(
        `${getInputValue(arrivalDateRef)}T${getInputValue(departTimeRef)}`
      ).toISOString(),
      arrivalDateTime: new Date(
        `${getInputValue(arrivalDateRef)}T${getInputValue(arrivalTimeRef)}`
      ).toISOString(),
      itineraryRef: _id,
      transportationType: TRANSPORTATION_TYPE.TRAIN,
    };

    // if (!ticketsData[0].image) return alert("Please select an image!");

    dispatch(
      Create(API.ADD_TRAIN, data, false, "", API.TRANSPORTATION_DATA, {
        itineraryRef: _id,
        transportationType: TRANSPORTATION_TYPE.TRAIN,
      })
    );
  };

  useEffect(() => {
    if (apiMessage.message === "Train Added Successfully!") {
      handleAddPopup(false);
    }
  }, [apiMessage]);

  return (
    <div className={styles["add-itinerary-data-form"]}>
      <div className={styles["form-background"]}>
        <div className="form-cross">
          <IoCloseOutline
            className={styles["cross"]}
            onClick={() => handleAddPopup(false)}
          />
        </div>
        <form className="form-block" onSubmit={(e) => saveTrainDetails(e)}>
          <div
            className={`${styles["form-heading"]} ${styles["bold"]} feild-heading`}
          >
            Basic Details
          </div>
          <div className={styles["form-required-feilds"]}>
            <div className={styles["form-left-details"]}>
              <InputForm
                inputFields={{
                  ref: dayRef,
                  name: "Day",
                  id: "day",
                  maxlength: 30,
                  type: "number",
                }}
              />

              <Dropdown
                name="Train Class"
                inputFields={TRAIN_CLASS}
                refe={trainClassRef}
              />

              <InputForm
                inputFields={{
                  ref: ArrivalLocation.ref,
                  name: "Arrival Station",
                  placeholder: "",
                  id: "arrival",
                  maxlength: 70,
                  type: "text",
                }}
              />

              <InputForm
                inputFields={{
                  ref: arrivalDateRef,
                  name: "Arrival Date",
                  id: "date",
                  maxlength: 30,
                  type: "date",
                }}
              />
            </div>
            <div className={styles["form-left-details"]}>
              <InputForm
                inputFields={{
                  ref: arrivalTimeRef,
                  name: "Arrival Time",
                  id: "time",
                  maxlength: 30,
                  type: "time",
                }}
              />

              <InputForm
                inputFields={{
                  ref: DepartLocation.ref,
                  name: "Depart Station",
                  placeholder: "",
                  id: "depart",
                  maxlength: 360,
                  type: "text",
                }}
              />
              <InputForm
                inputFields={{
                  ref: departTimeRef,
                  name: "Depart Time",
                  id: "time",
                  maxlength: 30,
                  type: "time",
                }}
              />

              <TextArea
                inputFields={{
                  ref: specialistNoteRef,
                  name: "Specialist Note",
                  id: "specialist note",
                  maxlength: 1000,
                  type: "text",
                }}
              />
            </div>
          </div>
          <div
            className={`${styles["form-heading"]} ${styles["bold"]} feild-heading`}
          >
            Traveler Train Details
          </div>
          <div className={styles["form-required-feilds"]}>
            {ticketsData.map((element: any, index: number) =>
              NewTicket(
                index,
                saveUserTicketsData,
                setshowImage,
                setimageUrl,
                dispatch,
                removeUserTicket
              )
            )}
          </div>
          <div
            className={`add-more-tickets ${styles["form-heading"]}`}
            onClick={addMoreTickets}
          >
            <AiOutlinePlus />
            &nbsp;Add More Travelers
          </div>

          <div className={styles["button-save"]}>
            <button className={`continue-button no-border`} type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
      {showImage && imageUrl ? (
        <Modal
          modal={
            <ImagePopup
              imageUrl={imageUrl}
              handleImagePopup={handleImagePopup}
            />
          }
          root={document.getElementById("overlay-root") as HTMLElement}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default NewTransportationForm;
