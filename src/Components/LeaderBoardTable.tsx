import React, { useEffect } from "react";
import service, { LeaderBoard } from "../appwrite/appwriteConfig";

function LeaderboardTable() {
  const [leaderBoard, setLeaderBoard] = React.useState<LeaderBoard[]>();
  useEffect(() => {
    async function getLeaderBoard() {
      const leaderBoard = await service.getLeaderBoard();
      setLeaderBoard(leaderBoard.documents);
    }
    getLeaderBoard();
  }, []);
  return (
    <div className="bg-gray-100 p-6">
      <div className="text-md font-bold underline my-4">
        LeaderBoard of the players
      </div>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-200  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 bg-gray-200  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 bg-gray-200  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Points
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderBoard?.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="px-6 py-4 whitespace-no-wrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-no-wrap">{item.country}</td>
                <td className="px-6 py-4 whitespace-no-wrap">{item.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaderboardTable;
