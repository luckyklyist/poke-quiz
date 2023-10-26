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
  useEffect(() => {
    const getUserProfile = async () => {
      const profile: UserProfile = await authService.getUserSession();
      const userProfileExist = await service.userProfileExists(profile.email);
      setUserProfileExist(userProfileExist);
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

  const createAccount = async () => {
    await service.createPortfolio({
      userId: "df",
      name: "df",
      country: "Nepal",
      points: 5,
    });
  };
  return (
    <div className="bg-gray-100 p-6 max-w-lg mx-auto rounded-md shadow-lg">
      {userProfileExist ? (
        <>
          <div className="text-center my-8">
            <h1 className="text-xl font-semibold">
              Name: {user?.name}
              <span className="text-gray-600 ml-2">
                Created At: {user?.$createdAt}
              </span>
              <span className="text-gray-600 ml-2">email: {user?.userId}</span>
            </h1>
          </div>

          <div className="text-center my-4">
            <div className="text-gray-600">Points</div>
            <p className="text-3xl font-semibold text-indigo-500">
              {user?.points}
            </p>
          </div>

          <div className="text-center my-4">
            <button className="btn-primary" onClick={createAccount}>
              Create Account
            </button>
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
