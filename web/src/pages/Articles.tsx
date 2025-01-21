import React from "react";
import Vide from "../components/Vide";
import { useAllUsersWithPosts } from "../utils/hooks";

export default function Articles() {
  const { AllUsersWithPosts, loading } = useAllUsersWithPosts();
  return (
    <>
      {loading ? (
        <p>Chargement</p>
      ) : (
        <>
          {AllUsersWithPosts && AllUsersWithPosts.length > 0 ? (
            <>
              {AllUsersWithPosts.map((item) => (
                <React.Fragment key={item.post_id}>
                  <div className="flex justify-center mt-8 mb-8">
                    <div className=" text-center relative bg-white border-2 border-gray-100 rounded-t-xl w-3/6 py-3  ">
                      <div className="absolute left-10 bg-green-400 px-2 py-0.5 rounded-md">
                        <p>• {item.username}</p>
                      </div>
                      <div className="text-gray-400 font-medium">
                        <p>{item.title}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="flex justify-between w-3/6 border-gray-100 border-l-2 border-r-2 border-b-2 rounded-b-xl drop-shadow-sm p-4 pl-8">
                      <p>{item.content}</p>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </>
          ) : (
            <Vide title="articles" />
          )}
        </>
      )}
    </>
  );
}
