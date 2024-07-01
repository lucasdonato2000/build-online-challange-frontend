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
    if (contact && contact.address) {
      dispatch(fetchMapCenter(contact.address));
    }
  }, [contact, dispatch]);

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
        <div className="relative flex flex-col items-center bg-custom-grey rounded-3xl p-4 sm:p-8 shadow-lg w-full max-w-3xl min-h-[36rem] mx-auto my-6 sm:my-12">
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex space-x-4 sm:space-x-6">
            <img
              src="/edit.svg"
              alt="Edit"
              className="mt-1 w-5 sm:w-6 h-5 sm:h-6 cursor-pointer"
              onClick={handleEditClick}
            />
            <MdOutlineFileUpload
              className="w-6 sm:w-8 h-6 sm:h-8 cursor-pointer"
              onClick={() => console.log(`Upload for contact ${contact.name}`)}
            />
          </div>
          <div className="w-24 sm:w-32 h-24 sm:h-32 mb-4 rounded-full border-4 border-custom-green flex items-center justify-center">
            <div className="w-20 sm:w-28 h-20 sm:h-28 rounded-full overflow-hidden">
              <img
                src={contact.profilePicture || defaultAvatar}
                alt={contact.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 font-red-hat truncate w-full overflow-hidden whitespace-nowrap text-ellipsis text-center">
            {contact.name}
          </h2>
          <p className="text-gray-400 text-base sm:text-lg lg:text-xl mb-4 pt-3 font-public-sans truncate w-full overflow-hidden whitespace-nowrap text-ellipsis text-center">
            {contact.title}
          </p>
          <div className="w-full text-center text-gray-400 pt-4">
            <div className="mb-4 relative">
              <h3 className="text-white font-bold font-red-hat truncate">
                Address
              </h3>
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
        </div>
      )}
    </>
  );
};

export default ContactDetail;
