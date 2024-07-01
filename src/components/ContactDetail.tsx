import React, { useEffect } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { useLoadScript } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchMapCenter } from "../store/actions/mapActions";
import { ContactDetailProps, Contact } from "../types";
import EditContact from "./EditContact";
import MapTooltip from "./MapTooltip";
import { setMapLoaded, setShowMap } from "../store/reducers/mapReducer";
import Button from "./Button";

const ContactDetail: React.FC<ContactDetailProps> = ({
  contact,
  onEdit,
  isEditing,
  setIsEditing,
}) => {
  const defaultAvatar = "/default-avatar.png";
  const dispatch = useDispatch<AppDispatch>();

  const mapCenter = useSelector((state: RootState) => state.map.mapCenter);
  const showMap = useSelector((state: RootState) => state.map.showMap);
  const isLoaded = useSelector((state: RootState) => state.map.isLoaded);

  const isScreenSmall = window.innerWidth < 768;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = (updatedContact: Contact) => {
    onEdit(updatedContact);
    setIsEditing(false);
  };

  useEffect(() => {
    if (!isScreenSmall && contact && contact.address) {
      dispatch(fetchMapCenter(contact.address));
    }
  }, [contact, dispatch, isScreenSmall]);

  const { isLoaded: scriptLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  useEffect(() => {
    if (scriptLoaded) {
      dispatch(setMapLoaded(true));
    }
  }, [scriptLoaded, dispatch]);

  if (!contact) {
    return null;
  }

  return (
    <>
      {isEditing ? (
        <EditContact
          contact={contact}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      ) : (
        <div
          className={`relative flex flex-col rounded-3xl shadow-lg w-full max-w-3xl min-h-[36rem] mx-auto my-6 sm:my-12 ${
            isScreenSmall ? "bg-black p-4 pt-10" : "bg-custom-gray p-8"
          }`}
        >
          {!isScreenSmall && (
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex space-x-4 sm:space-x-6">
              <img
                src="/edit.svg"
                alt="Edit"
                className="mt-1 w-5 sm:w-6 h-5 sm:h-6 cursor-pointer"
                onClick={handleEditClick}
              />
              <MdOutlineFileUpload
                className="w-6 sm:w-8 h-6 sm:h-8 cursor-pointer"
                onClick={() =>
                  console.log(`Upload for contact ${contact.name}`)
                }
              />
            </div>
          )}
          <div
            className={`flex ${
              isScreenSmall ? "flex-row items-start" : "flex-col items-center"
            }`}
          >
            <div className={`mb-4 ${isScreenSmall ? "mr-4" : ""}`}>
              <img
                src={contact.profilePicture || defaultAvatar}
                alt={contact.name}
                className={`w-20 h-20 sm:w-32 sm:h-32 object-cover rounded-full ${
                  !isScreenSmall ? "p-1 sm:border-4 sm:border-custom-green" : ""
                }`}
              />
            </div>
            <div className={isScreenSmall ? "" : "text-center"}>
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold pt-3 mb-2 font-red-hat">
                {contact.name}
              </h2>
              <p className="text-gray-400 text-base sm:text-lg lg:text-xl mb-4 sm:pt-3 font-public-sans">
                {contact.title}
              </p>
            </div>
          </div>
          <div
            className={`${
              isScreenSmall ? "text-left" : "text-center"
            } text-gray-400 pt-4 w-full`}
          >
            <div className="mb-4 relative">
              <h3 className="text-white font-bold font-red-hat truncate">
                Address
              </h3>
              {isScreenSmall && (
                <p className="pt-2 font-public-sans truncate cursor-pointer relative">
                  {contact.address}
                </p>
              )}
              {!isScreenSmall && (
                <p
                  className="pt-2 font-public-sans truncate cursor-pointer relative"
                  onMouseEnter={() => dispatch(setShowMap(true))}
                  onMouseLeave={() => dispatch(setShowMap(false))}
                >
                  {contact.address}
                  <MapTooltip
                    mapCenter={mapCenter}
                    showMap={showMap}
                    isLoaded={isLoaded}
                  />
                </p>
              )}
            </div>
            <div className="mb-4">
              <h3 className="text-white font-bold font-red-hat truncate">
                Phone
              </h3>
              <p className="pt-2 font-public-sans truncate">{contact.phone}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-white font-bold font-red-hat truncate">
                Email
              </h3>
              <p className="pt-2 font-public-sans truncate">{contact.email}</p>
            </div>
          </div>
          {isScreenSmall && (
            <div className="flex justify-center mt-72">
              <Button
                type="button"
                className="w-2/3 h-14 sm:w-48 py-2 px-4 sm:px-8 rounded-full font-bold font-public-sans text-center"
                onClick={handleEditClick}
              >
                EDIT
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ContactDetail;
