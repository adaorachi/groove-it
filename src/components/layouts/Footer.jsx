import { Link } from "react-router-dom";

import { Title, Icon } from "@/components";

const downloadBtnList = [
  { name: "App Store", desc: "Download on", icon: "FaApple" },
  {
    name: "Google Play",
    desc: "Get it on",
    icon: "IoLogoGooglePlaystore",
  },
];

const pageLink = [
  { name: "About", link: "/" },
  { name: "Contact", link: "/" },
  { name: "Legal", link: "/" },
  { name: "Policy", link: "/" },
];

export default function Footer() {
  return (
    <div className="footer">
      <div className="py-4 border-t border-divider">
        <Title name="Go mobile" divider={false} />
        <div className="download_buttons">
          <div className="grid grid-cols-1 gap-3 xs:grid-cols-2">
            {downloadBtnList.map((item) => (
              <div key={item.name} className="col-span-1">
                <button className="w-full gap-2 p-2 text-left rounded bg-divider flex_justify_center hover:bg-main">
                  <Icon name={item.icon} size={22} />
                  <div className="flex flex-col">
                    <span className="block -mb-1 text-xs text-secondary">
                      {item.desc}
                    </span>
                    <p className="text-sm font-semibold">{item.name}</p>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="footer_links">
          <div className="flex gap-2 mt-4">
            {pageLink.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className="text-sm hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="mt-2 footer_copyright">
            <p className="text-xs text-secondary"> © Copyright 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
}
