import { useState } from "react";

import { Icon } from "..";

const socialAuthList = [
  { name: "Google", strategy: "oauth_google", icon: "FcGoogle" },
  { name: "Github", strategy: "oauth_github", icon: "FaGithub" },
];

const SocialAuthButton = ({
  icon,
  name,
  signInWithSocialAuth,
  strategy,
  currentProvider,
  setCurrentProvider,
  isSubmitting,
}) => {
  return (
    <button
      className="flex items-center w-full gap-2 p-3 text-left border rounded border-divider"
      onClick={() => {
        setCurrentProvider(strategy);
        signInWithSocialAuth(strategy);
      }}
    >
      {currentProvider === strategy && isSubmitting ? (
        <Icon name="FaSpinner" className="animate-spin" />
      ) : (
        <Icon name={icon} />
      )}
      <span className="text-sm text-onNeutralBg">Continue with {name}</span>
    </button>
  );
};

export default function SocialAuthButtons({ useSocialAuthSignUp }) {
  const { isSubmitting, socialAuthSignUp } = useSocialAuthSignUp();

  const [currentProvider, setCurrentProvider] = useState(null);

  return (
    <div className="flex flex-col gap-3 mt-4 social_medium_buttons">
      {socialAuthList.map((item) => (
        <SocialAuthButton
          key={item.name}
          icon={item.icon}
          name={item.name}
          signInWithSocialAuth={socialAuthSignUp}
          strategy={item.strategy}
          currentProvider={currentProvider}
          setCurrentProvider={setCurrentProvider}
          isSubmitting={isSubmitting}
        />
      ))}
    </div>
  );
}
