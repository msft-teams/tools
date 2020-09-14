import axios from "axios";
import { getIdToken, getAccessToken } from "../services/authService";
import { Task_Link1 } from "../links";
const apiurl = "https://localhost:44368/api/CommunityData/";

export const GetAnnouncementAdaptiveCardDetails = async () => {
  const config = {
    headers: { Authorization: `Bearer ${getIdToken()}` },
  };

  let data: Array<any> = [];
  await axios
    .get(`${apiurl}AnnouncementAdaptiveCardDetails`, config)
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
  const config = {
    headers: { Authorization: `Bearer ${getIdToken()}` },
  };
  let data: any;
  await axios.get(`${apiurl}GetTeamsConfig`, config).then((res) => {
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
  const config = {
    headers: { Authorization: `Bearer ${getIdToken()}` },
  };
  await axios.get(`${apiurl}NewsData`, config).then((res: { data: any }) => {
    if (res.data.status === 200) {
      data = res.data.value;
    } else {
      data = [];
    }
  });
  return data;
};

export const GetTeamMemberDetails = async () => {
  let data: any;
  const config = {
    headers: { Authorization: `Bearer ${getIdToken()}` },
  };
  await axios
    .get(`${apiurl}TeamMemberDetails`, config)
    .then((res: { data: any }) => {
      if (res.data.status === 200) {
        data = res.data;
      }
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
