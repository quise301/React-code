import React, { useEffect, useState } from "react";
import ProfileLayout from "./ProfileLayout";
import sabioDebug from "sabio-debug";
import PropTypes from "prop-types";
import VetDashboardMain from "./VetDashboardMain";
import VetAppointments from "./VetAppointments";
import VetInvoices from "./VetInvoices";
import VetClients from "./VetClients";
import vetProfilesService from "../../../services/vetProfilesService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function VetDashboard(props) {
  const _logger = sabioDebug.extend("VetDashboard");
  const navigate = useNavigate();
  _logger("VetDashboard props", props);
  const [componentType, setComponentType] = useState();
  const [vetProfile, setVetProfile] = useState();
  const [paging] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    setComponentType("main");
    vetProfilesService
      .getByUserId(props.currentUser.id, paging.pageIndex, paging.pageSize)
      .then(vetProfileSuccess)
      .catch(vetProfileError);
  }, []);

  const vetProfileSuccess = (resp) => {
    _logger("vetProfileSuccess", resp);
    const item = resp.item.pagedItems[0];
    setVetProfile((prevState) => {
      return {
        ...prevState,
        avatar: item.createdBy.userImage,
        name: `${item.createdBy.firstName} ${item.createdBy.lastName}`,
        email: item.businessEmail,
        id: item.id,
        verified: 1,
      };
    });
  };
  const vetProfileError = (err) => {
    _logger("vetProfileError", err);
    toast.warn("Error on getting the profile");
  };

  const setType = (type) => {
    _logger("setType", type);
    setComponentType(type);
  };

  const renderer = (selector) => {
    _logger("vetProfile", vetProfile);
    if (vetProfile) {
      switch (selector) {
        case "appointments":
          return <VetAppointments vetId={vetProfile.id}></VetAppointments>;

        case "invoices":
          return <VetInvoices vetId={vetProfile.id}></VetInvoices>;

        case "clients":
          return <VetClients vetId={vetProfile.id}></VetClients>;

        case "files":
          return navigate("/dashboard/files");

        default:
          return <VetDashboardMain />;
      }
    }
  };

  return (
    <React.Fragment>
      <ProfileLayout
        vetProfile={vetProfile}
        setType={setType}
        type={componentType}
      >
        {renderer(componentType)}
      </ProfileLayout>
    </React.Fragment>
  );
}

export default VetDashboard;

VetDashboard.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
};
