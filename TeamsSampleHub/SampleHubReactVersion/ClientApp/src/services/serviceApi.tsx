import axios from "axios";
import { getIdToken, getAccessToken } from "../services/authService";
import { TeamsConfig,Task_Link1, NewsData,TeamMemberDetails,AnnouncementAdaptiveCardDetails} from "../links";

export const GetAnnouncementAdaptiveCardDetails = async () => {
  
  let data: Array<any> = [];
  await axios
      .get(`${AnnouncementAdaptiveCardDetails}`, {
      headers: {
        "Content-Type": "application/text",
        Authorization: "Bearer " + getIdToken(),
      },
    })    
    .then((res) => {
      if (res.status === 200) {
        data = res.data.value;
      } else {
        data = [];
      }
    });
  return data;
};

export const GetTeamsConfig = async () => {
  let data: any;
  await await axios
  .get(`${TeamsConfig}`, {
  headers: {
    "Content-Type": "application/text",
    Authorization: "Bearer " + getIdToken(),
  },
}).then((res) => {
    if (res.status === 200) {
      data = res.data;
    }
  });
  return data;
};

export const GraphHomeapi = async () => {
  let userProfile: any;
  let config = {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  };

  await axios
    .get("https://graph.microsoft.com/v1.0/me", config)
    .then((res: { data: any }) => {
      userProfile = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return userProfile;
};
export const GetNewsData = async () => {
  let data: Array<any> = [];
  await await axios
  .get(`${NewsData}`, {
  headers: {
    "Content-Type": "application/text",
    Authorization: "Bearer " + getIdToken(),
  },
}).then((res: { data: any }) => {
      data = res.data.value;
  });
  return data;
};

export const GetTeamMemberDetails = async () => {
  let data: any;
  
  await await axios
  .get(`${TeamMemberDetails}`, {
  headers: {
    "Content-Type": "application/text",
    Authorization: "Bearer " + getIdToken(),
  },
})
    .then((res: { data: any }) => {
        data = res.data
    });
  return data;
};
export const GetTaskDetails = async () => {
  let data: any;
  let config = {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  };

  await axios.get(`${Task_Link1}`, config).then((res: { data: any }) => {
    if (res.data.status === 200) {
      data = res.data;
    }
  });
  return data;
};

export const GetShiftDetails = async (linkValue: string) => {
  let data: any;
  let config = {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  };

  await axios.get(`${linkValue}`, config).then((res: { data: any }) => {
    if (res.data.status === 200) {
      data = res.data;
    }
  });
  return data;
};
