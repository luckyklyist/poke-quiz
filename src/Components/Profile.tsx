import React, { useEffect } from "react";
import authService from "../appwrite/auth";
import Logout from "./Logout";
import service from "../appwrite/appwriteConfig";
import CreateProfilePage from "./CreateProifle";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface UserProfile {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  registration: string;
  status: boolean;
  labels: string[];
  passwordUpdate: string;
  email: string;
  phone: string;
  emailVerification: boolean;
  phoneVerification: boolean;
  prefs: Record<string, any>;
  accessedAt: string;
}

interface userInfo {
  name: string;
  points: number;
  userId: string;
  country: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
}

const Profile = () => {
  const [userProfileExist, setUserProfileExist] = React.useState(false);
  const [user, setUser] = React.useState<userInfo>();
  const email = useSelector((state: RootState) => state.auth.email);
  const [loader, setLoader] = React.useState(true);
  useEffect(() => {
    const getUserProfile = async () => {
      const profile: UserProfile = await authService.getUserSession();
      const userProfileExist = await service.userProfileExists(profile.email);
      setUserProfileExist(userProfileExist);
      setLoader(false);
    };

    getUserProfile();

    // const getSessions = async () => {
    //   const sessions = await authService.getCuurentSession();
    //   console.log(sessions, "this is provider sessions");
    // };

    // getSessions();

    const getUserInfo = async () => {
      const userInfo = await service.getPortfolioByUserId(email);
      console.log(userInfo, "this is user info");
      // @ts-ignore
      setUser(userInfo);
    };
    getUserInfo();
  }, [email]);

  if (loader) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 p-6 shadow-md h-full">
      {userProfileExist ? (
        <>
          <div className="flex flex-col justify-center items-center md:flex-row md:items-start my-12">
            <div className="text-center md:text-left">
              <div className="text-gray-600 mb-2">
                <span className="text-xl font-semibold">Name:</span>{" "}
                {user?.name}
              </div>
              <div className="text-gray-600 mb-2">
                <span className="text-xl font-semibold">Created At:</span>{" "}
                {user?.$createdAt}
              </div>
              <div className="text-gray-600 mb-2">
                <span className="text-xl font-semibold">Email:</span>{" "}
                {user?.userId}
              </div>
            </div>

            <div className="md:ml-4">
              <div className="text-center my-4">
                <img
                  src="https://i.pinimg.com/1200x/83/1d/22/831d2202cf59cc795da3ca0109735171.jpg"
                  alt="Profile Picture"
                  className="w-20 h-20 rounded-full object-cover mx-auto"
                />
              </div>
            </div>
          </div>

          <div className="text-center my-4">
            <Logout />
          </div>
        </>
      ) : (
        <div>
          <CreateProfilePage />
        </div>
      )}
    </div>
  );
};

export default Profile;
