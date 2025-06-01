// import { Attachment } from "stream-chat-react";
// import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

// const GOOGLE_MAPS_API_KEY = "key";

// export const AttachmentWithMap = (props) => {
//   const [locationAttachment] = props.attachments;

//   if (locationAttachment.type === "location") {
//     const { latitude, longitude } = locationAttachment;

//     return (
//       <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
//         <Map
//           style={{ width: "300px", height: "300px" }}
//           defaultCenter={{ lat: latitude, lng: longitude }}
//           defaultZoom={16}
//           disableDefaultUI={true}
//           gestureHandling="greedy"
//         >
//           <Marker position={{ lat: latitude, lng: longitude }} />
//         </Map>
//       </APIProvider>
//     );
//   }

//   return <Attachment {...props} />;
// };

import { Map, Placemark } from "@pbe/react-yandex-maps";
import { Attachment } from "stream-chat-react";

export const AttachmentWithMap = (props) => {
  const [attachment] = props.attachments;

  if (attachment?.type === "location") {
    const latitude = attachment.latitude ?? attachment?.data?.latitude;
    const longitude = attachment.longitude ?? attachment?.data?.longitude;

    if (latitude && longitude) {
      return (
        <Map
          defaultState={{
            center: [latitude, longitude],
            zoom: 16,
          }}
          width="300px"
          height="300px"
          options={{ controls: [] }}
        >
          <Placemark geometry={[latitude, longitude]} />
        </Map>
      );
    }
  }

  return <Attachment {...props} />;
};
