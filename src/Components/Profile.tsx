import React, { useEffect } from "react";
import authService from "../appwrite/auth";
import Logout from "./Logout";
import service from "../appwrite/appwriteConfig";
import CreateProfilePage from "./CreateProifle";

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

const Profile = () => {
  const [userProfileExist, setUserProfileExist] = React.useState(false);
  const [user, setUser] = React.useState<UserProfile>();
  useEffect(() => {
    const getUserProfile = async () => {
      const profile: UserProfile = await authService.getUserSession();
      const userProfileExist = await service.userProfileExists(profile.email);
      setUserProfileExist(userProfileExist);
      setUser(profile);
    };

    getUserProfile();

    const getSessions = async () => {
      const sessions = await authService.getCuurentSession();
      console.log(sessions, "this is provider sessions");
    };

    getSessions();
  }, []);

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
              User email: {user?.email}
              <span className="text-gray-600 ml-2">
                Created At: {user?.$createdAt}
              </span>
            </h1>
          </div>

          <div className="text-center my-4">
            <div className="text-gray-600">Points</div>
            <p className="text-3xl font-semibold text-indigo-500">500</p>
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
