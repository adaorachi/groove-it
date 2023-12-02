import { Outlet } from "react-router-dom";

import { ScrollProvider } from "@/providers";

import { Modal, Navbar, Sidebar, TrackPlayer, TopPlay } from "@/components";

const RootLayout = () => {
  return (
    <>
      <ScrollProvider>
        <div
          className="flex flex-col max-w-full m-auto xl:flex-row app bg-main"
          id="main_app"
        >
          <Sidebar />
          <main className="relative w-full mx-auto overflow-hidden main_section">
            <Navbar />
            <div className="relative mb-6 xl:mb-[100px] overflow-y-scroll hide_scrollbar p-3 sm:p-6 max-w-7xl main_width page_content mt-main-top">
              <Outlet />
            </div>
            <Modal />
          </main>
          <TopPlay />
        </div>
      </ScrollProvider>
      <TrackPlayer />
    </>
  );
};

export default RootLayout;
