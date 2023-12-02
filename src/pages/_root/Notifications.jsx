import { Link, Navigate } from "react-router-dom";

import { useCurrentUser } from "@/lib/store";
import { PatternBg } from "@/components";

const Notification = () => {
  const { currentUser } = useCurrentUser();
  const { user, isLoaded } = currentUser || {};

  return (
    <>
      {isLoaded && (
        <>
          {!user ? (
            <Navigate to="/" replace={true} />
          ) : (
            <div className="relative w-auto p-4 overflow-hidden rounded bg-card xs:p-6">
              <PatternBg />
              <div className="relative z-50 flex justify-between pb-4 border-b border-divider">
                <h5 className="flex items-center justify-between text-xl font-bold">
                  Notifications
                  <span className="w-5 h-5 ml-2 text-sm text-white rounded-full bg-primary flex_justify_center">
                    3
                  </span>
                </h5>

                <button className="text-sm font-bold hover:text-primary">
                  Mark all as read
                </button>
              </div>

              <ul className="flex flex-col gap-4 list-none">
                <li className="flex justify-between gap-3 p-3 rounded bg-main">
                  <img
                    src="/assets/images/avatar-1.webp"
                    alt="notification user avatar"
                    className="w-12 h-12"
                  />
                  <div className="flex-auto text-sm">
                    <div className="flex flex-wrap items-center">
                      <Link to="#" className="font-bold hover:text-primary">
                        Mark Smith
                      </Link>
                      &nbsp;
                      <span>reacted to your recent added playlist</span>
                      &nbsp;
                      <Link
                        href="#"
                        className="font-bold cursor-pointer text-darkgb hover:text-primary"
                      >
                        My first playlist!
                      </Link>
                    </div>

                    <p className="mt-1 text-gb">1m ago</p>
                  </div>
                </li>

                <li className="flex justify-between gap-3 p-3 rounded bg-main">
                  <img
                    src="/assets/images/avatar-2.webp"
                    className="w-12 h-12 "
                  />
                  <div className="flex-auto text-sm">
                    <div className="flex flex-wrap items-center">
                      <Link href="#" className="font-bold hover:text-primary">
                        Sarah Johnson
                      </Link>
                      &nbsp;
                      <span>created a new playlist</span>
                      &nbsp;
                      <Link href="#" className="font-bold hover:text-primary">
                        Downtown Music
                      </Link>
                      <div className="relative w-3 h-3 ml-3 flex_justify_center">
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full" />
                        <div className="absolute inline-block w-full h-full bg-red-500 rounded-full animate-ping" />
                      </div>
                    </div>
                    <p className="mt-1 text-gb">1 day ago</p>
                  </div>
                </li>

                <li className="flex justify-between gap-3 p-3 rounded">
                  <img
                    src="./assets/images/avatar-3.webp"
                    alt="notification user avatar"
                    className="w-12 h-12"
                  />
                  <div className="flex-auto ml-2 text-sm">
                    <Link href="#" className="font-bold hover:text-primary">
                      Bob Manuel
                    </Link>
                    &nbsp;
                    <span>sent you a private message</span>
                    <p className="mt-1 text-gb">1 week ago</p>
                    <p className="p-4 mt-3 border rounded cursor-pointer border-onNeutralBg hover:bg-primary-opacity">
                      Hello, thanks for setting up the Groove Music Club. Ive
                      been a member for a few weeks now and Im already having
                      lots of fun and improving my singing skills.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Notification;
