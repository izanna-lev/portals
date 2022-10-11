/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs"
import {
  IMAGE,
  ITINERARY_STATUS,
  ICON,
  API,
  PLANNED_TRAVELLER,
} from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setFormRef } from "../../store/slices/appData";
import { Pagination } from "../../components/Pagination";
import { getFormattedDate, SerialNum } from "../../util";
import { Fetch } from "../../api/Fetch";
import "./index.scss";
import useComponentVisible from "../../components/outsideClickHandler";
import { Create } from "../../api/Create";

const TableHead = () => (
  <thead className="table-head">
    <tr className="head-tr">
      <th>Sr.No.</th>
      <th>Location Required</th>
      <th>User Name</th>
      <th>Contact Number</th>
      <th>Planned Date</th>
      <th className="custom-head">How much have you already planned?</th>
      <th>No. of guests</th>
      <th>Assign Specialist</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
);

const TableRow = (
  item: any,
  index: number,
  limit: number,
  page: number,
  navigate: any,
  dispatch: any,
  handleDropDown: Function,
  userDropdown: string,
  ref: any,
  userList: any,
  assignSpecialist: any,
) => {
  const itineraryDetailsPage = (item: any) => {
    dispatch(setFormRef(item._id));
    navigate(`/itinerary/detail/${item._id}`);
  };

  return (
    <tr className="body-tr" key={index}>
      <td>{SerialNum(limit, page, index)}</td>
      <td>
        <div className="name-image-cell">
          <span className="table-user-name">{item.location}</span>
        </div>
      </td>
      <td>{item.userName}</td>
      <td>{item.contactNumber}
      </td>
      <td>{getFormattedDate(item.plannedDate)}</td>
      <td>{PLANNED_TRAVELLER[item.plannedTraveller - 1 || 0].name}</td>
      <td>{item.plannedTraveller}</td>
      <td className="assign-specialist">
        <div className="dropdown-container">
          <label> { item.specialistName || "None"}</label>
          <BsChevronDown className="list-icon"
            onClick={() => {
              handleDropDown(item._id);
            }} />
          {userDropdown === item._id &&
            <div className="specialist-user-list" ref={ref}>
              {
                userList.map((user: any) => {
                  return <option
                  onClick={() => {
                    assignSpecialist({
                      formRef: item._id,
                      specialistRef: user._id
                    });
                  }}

                   >{user.name}</option>
                })
              }
            </div>}

        </div></td>
      <td>
        <div className="table-data-status">
          {ITINERARY_STATUS[item.status]}
        </div>
      </td>
      <td>
        <button
          className=" btn view-button"
          onClick={() => {
            itineraryDetailsPage(item);
          }}
        >
          View Details
        </button>
      </td>
    </tr>
  );
};

const ItineraryPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userDropdown, setUserDropdown] = useState("");
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  const handleDropDown = (id: string) => {
    setIsComponentVisible(true)
    setUserDropdown(id)
  };

  useEffect(() => {
    dispatch(Fetch(API.SPECIALIST_LIST, {}, 1, 1000));
  }, []);

  useEffect(() => {
    if (!isComponentVisible) {
      setUserDropdown("")
      setIsComponentVisible(false)
    }
  }, [isComponentVisible]);


  let { page, limit, size, total, list } = useAppSelector(
    (state) => state.itineraries
  );

  let { list: userList } = useAppSelector(
    (state) => state.specialistList
  );

  useEffect(() => {
    dispatch(Fetch(API.ITINERARIES, {}, 1, 10));
  }, [dispatch]);


  const assignSpecialist = (data: any) => {
    dispatch(
      Create(
        API.ASSIGN_SPECIALIST,
        data,
        false,
      )
    );
    setUserDropdown("")
  };


  return (
    <main className="content-container">
      <section className="content-top">
        <h2 className="content-heading">Itineraries</h2>
      </section>
      {list.length
        ? Pagination({
          page,
          limit,
          total,
          size,
          nextPage: () =>
            dispatch(Fetch(API.ITINERARIES, {}, page + 1, limit)),
          previousPage: () =>
            dispatch(Fetch(API.ITINERARIES, {}, page - 1, limit)),
        })
        : null}
      <section className="table-container">
        <table className="itinerary-table table">
          {TableHead()}
          <tbody className="body-tr">
            {list.length ? (
              list.map((item, index) =>  TableRow(item, index, limit, page, navigate, dispatch, handleDropDown, userDropdown, ref, userList, assignSpecialist)
              )
            ) : (
              <tr className="table-empty">
                <td colSpan={7}>
                  <div>No Data</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default ItineraryPage;
