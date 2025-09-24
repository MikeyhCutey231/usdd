import React, { useState, useEffect } from 'react';
import { UserCircle } from 'lucide-react';
import Switch from './ui/Switch';
import UpdateUsernameModal from './modals/UpdateUsernameModal';
import UpdateCountryModal from './modals/UpdateCountryModal';
import UpdateProfileModal from './modals/UpdateProfileModal';
import ConfirmationModal from './modals/ConfirmationModal';
import HideInformationModal from './modals/HideInformationModal';

const AccountSettings = () => {
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (isUsernameModalOpen || isCountryModalOpen || isProfileModalOpen || isDeactivateModalOpen || isDeleteModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isUsernameModalOpen, isCountryModalOpen, isProfileModalOpen, isDeactivateModalOpen, isDeleteModalOpen]);

  return (
    <div className="space-y-12">
      <UpdateUsernameModal isOpen={isUsernameModalOpen} onClose={() => setIsUsernameModalOpen(false)} />
      <UpdateCountryModal isOpen={isCountryModalOpen} onClose={() => setIsCountryModalOpen(false)} />
      <UpdateProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
      <ConfirmationModal isOpen={isDeactivateModalOpen} onClose={() => setIsDeactivateModalOpen(false)} title="Deactivate Account" />
      <ConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete Account" />
    <section>
      <h2 className="text-2xl font-bold mb-6">General</h2>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="font-medium">Email Address</p>
          <p className="text-gray-400">m.labastida1823@gmail.com</p>
        </div>
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsUsernameModalOpen(true)}>
          <p className="font-medium">Username</p>
          <p className="text-gray-400">@labastida1823</p>
        </div>
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsCountryModalOpen(true)}>
          <p className="font-medium">Country of residence</p>
          <p className="text-gray-400">Philippines</p>
        </div>
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsProfileModalOpen(true)}>
          <div>
            <p className="font-medium">Profile Information</p>
            <p className="text-sm text-gray-500">Edit your photo, name, pronouns, short bio, etc.</p>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-gray-400">MLabastida1823</p>
            <UserCircle size={24} className="text-gray-400" />
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-6">Authorization</h2>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Google Account</p>
            <p className="text-sm text-gray-500">Connect to log in to US-DD with your Google account</p>
          </div>
          <button className="border border-gray-600 rounded-full px-4 py-1 text-sm">Disconnect</button>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">GitHub Account</p>
            <p className="text-sm text-gray-500">Connect to log in to US-DD with your GitHub account</p>
          </div>
          <button className="bg-primary text-black rounded-full px-4 py-1 text-sm font-semibold">Connect</button>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-6">Advanced</h2>
      <div className="space-y-6">
        <div className="cursor-pointer" onClick={() => setIsDeactivateModalOpen(true)}>
          <p className="text-red-500 font-medium">Deactivate account</p>
          <p className="text-sm text-gray-500">Deactivating will suspend your account until you sign back in.</p>
        </div>
        <div className="cursor-pointer" onClick={() => setIsDeleteModalOpen(true)}>
          <p className="text-red-500 font-medium">Delete account</p>
          <p className="text-sm text-gray-500">Permanently delete your account and all of your content.</p>
        </div>
      </div>
    </section>
  </div>
  );
};

const PrivacySettings = () => {
  const [toggles, setToggles] = useState({
    viewProfile: true,
    allowFollow: true,
    allowComments: true,
    promotePost: true,
    emailUpdates: true,
    hideInformation: false,
  });
  const [isHideModalOpen, setIsHideModalOpen] = useState(false);

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleHideInformation = () => {
    setToggles(prev => ({ ...prev, hideInformation: !prev.hideInformation }));
  };

  return (
    <div className="space-y-12">
      <HideInformationModal
        isOpen={isHideModalOpen}
        onClose={() => setIsHideModalOpen(false)}
        onConfirm={handleHideInformation}
      />
      <section>
        <h2 className="text-2xl font-bold mb-6">Information</h2>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p>Display country</p>
            <p className="text-primary">Enable</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Display gender identity</p>
            <p className="text-gray-400">Disable</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Hide information</p>
            <button
              onClick={() => setIsHideModalOpen(true)}
              className={`${toggles.hideInformation ? 'text-primary' : 'text-gray-400'} hover:text-[#DDDDDD]`}
            >
              {toggles.hideInformation ? 'Enable' : 'Disable'}
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Allow people to view profile information</p>
              <p className="text-sm text-gray-500">Let people view your profile information</p>
            </div>
            <Switch isToggled={toggles.viewProfile} onToggle={() => handleToggle('viewProfile')} />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Allow people to follow you</p>
              <p className="text-sm text-gray-500">Let people follow you to see your profile posts in their home feed</p>
            </div>
            <Switch isToggled={toggles.allowFollow} onToggle={() => handleToggle('allowFollow')} />
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-6">Comment Preferences</h2>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Allow anyone to comment on your answers and posts</p>
              <p className="text-sm text-gray-500">Let people comment on all your posts</p>
            </div>
            <Switch isToggled={toggles.allowComments} onToggle={() => handleToggle('allowComments')} />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Allow US-DD to promote your post.</p>
              <p className="text-sm text-gray-500">Let US-DD moderators highlight your posts</p>
            </div>
            <Switch isToggled={toggles.promotePost} onToggle={() => handleToggle('promotePost')} />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Allow US-DD to sent you email updates.</p>
              <p className="text-sm text-gray-500">Let US-DD notify you for important notifications.</p>
            </div>
            <Switch isToggled={toggles.emailUpdates} onToggle={() => handleToggle('emailUpdates')} />
          </div>
        </div>
      </section>
    </div>
  );
};
const ThemeCard = ({ theme, selected, onClick }) => (
  <div onClick={onClick} className={`cursor-pointer rounded-lg p-2 ${selected ? 'border-2 border-primary' : 'border-2 border-transparent'}`}>
    <div className={`border rounded-lg relative ${theme === 'light' ? 'bg-gray-100' : 'bg-[#1E1E1E]'}`}>
      <div className="flex justify-between items-center p-2 border-b">
        <div className="flex items-center">
          <div className={`w-10 h-4 rounded mr-2 ${theme === 'light' ? 'bg-primary' : 'bg-primary'}`}></div>
        </div>
        <div className={`w-10 h-4 rounded ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-700'}`}></div>
      </div>
      <div className="p-4 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className={`p-2 rounded-md ${theme === 'light' ? 'bg-white' : 'bg-[#2A2A2A]'}`}>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-md mr-2 ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-600'}`}></div>
              <div>
                <div className={`h-2 w-16 rounded ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-500'} mb-1`}></div>
                <div className={`h-2 w-24 rounded ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-500'}`}></div>
              </div>
              <div className={`w-6 h-3 rounded ml-auto ${theme === 'light' ? 'bg-primary' : 'bg-primary'}`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <p className="mt-2">{theme.charAt(0).toUpperCase() + theme.slice(1)} Theme</p>
  </div>
);

const DisplaySettings = () => {
  const [selectedTheme, setSelectedTheme] = useState('dark');

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Theme</h2>
      <p className="text-gray-400 mb-6">Adjust how you'd like US-DD to appear on this browser.</p>
      <div className="grid grid-cols-2 gap-8">
        <ThemeCard theme="light" selected={selectedTheme === 'light'} onClick={() => setSelectedTheme('light')} />
        <ThemeCard theme="dark" selected={selectedTheme === 'dark'} onClick={() => setSelectedTheme('dark')} />
      </div>
    </div>
  );
};
const NotificationsSettings = () => {
  const [toggles, setToggles] = useState({
    emailNotifications: true,
    commentMentions: true,
    newFollowers: true,
    voteExpirations: true,
    repliesToComments: true,
    likesOnForumPost: true,
    likes: true,
    personYouFollow: true,
    trendingForums: true,
    featuredContent: true,
  });

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-6">General</h2>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Allow email notifications</p>
              <p className="text-sm text-gray-500">You'll still receive administrative emails even if this setting is off.</p>
            </div>
            <Switch isToggled={toggles.emailNotifications} onToggle={() => handleToggle('emailNotifications')} />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Comment mentions</p>
              <p className="text-sm text-gray-500">Notify me when someone mentions me in a forums</p>
            </div>
            <Switch isToggled={toggles.commentMentions} onToggle={() => handleToggle('commentMentions')} />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">New followers</p>
              <p className="text-sm text-gray-500">Notify me when I received new follower</p>
            </div>
            <Switch isToggled={toggles.newFollowers} onToggle={() => handleToggle('newFollowers')} />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Vote expirations</p>
              <p className="text-sm text-gray-500">Notify me when a petitions I bookmarked is about to end.</p>
            </div>
            <Switch isToggled={toggles.voteExpirations} onToggle={() => handleToggle('voteExpirations')} />
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-6">Activity</h2>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Replies to comments</p>
              <p className="text-sm text-gray-500">Notify me when a person reply to my comment</p>
            </div>
            <Switch isToggled={toggles.repliesToComments} onToggle={() => handleToggle('repliesToComments')} />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Likes on forum post</p>
              <p className="text-sm text-gray-500">Notify me when a person likes my forum</p>
            </div>
            <Switch isToggled={toggles.likesOnForumPost} onToggle={() => handleToggle('likesOnForumPost')} />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Likes</p>
              <p className="text-sm text-gray-500">Notify me when a person likes my forum</p>
            </div>
            <Switch isToggled={toggles.likes} onToggle={() => handleToggle('likes')} />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Person you follow</p>
              <p className="text-sm text-gray-500">Notify me when the person I follow post a new forum</p>
            </div>
            <Switch isToggled={toggles.personYouFollow} onToggle={() => handleToggle('personYouFollow')} />
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-6">Recommendation</h2>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Trending forums</p>
              <p className="text-sm text-gray-500">Notify me when a there is a new trends</p>
            </div>
            <Switch isToggled={toggles.trendingForums} onToggle={() => handleToggle('trendingForums')} />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Featured content</p>
              <p className="text-sm text-gray-500">Notify me when a there is a new featured forum</p>
            </div>
            <Switch isToggled={toggles.featuredContent} onToggle={() => handleToggle('featuredContent')} />
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-6">Push Notification</h2>
        <p className="text-gray-400">Open the US-DD app from your mobile device to make changes to push notifications.</p>
      </section>
    </div>
  );
};
const languages = [
  { name: 'English', country: 'India' },
  { name: 'Espanol', country: 'Belice' },
  { name: 'Deutsch', country: 'Schweiz' },
  { name: 'Bonsanski', country: 'Bosna i Hercegovina' },
  { name: 'Cestina', country: 'Ceska republika' },
  { name: 'English', country: 'New Zealand' },
  { name: 'English', country: 'Singapore' },
  { name: 'Catala', country: 'Espanya' },
  { name: 'Azerbaycan dili', country: 'Azerbaycan' },
  { name: 'Espanol', country: 'Chili' },
  { name: 'Deutsch', country: 'Osterreich' },
  { name: 'Bahasa Indonesia', country: 'Indonesia' },
  { name: 'Tagalog', country: 'Philippines' },
  { name: 'Bisaya', country: 'Philippines' },
];

const LanguageCard = ({ language, selected, onClick }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer p-4 rounded-lg ${selected ? 'border border-gray-600' : 'border border-transparent'}`}
  >
    <p className="font-semibold">{language.name}</p>
    <p className="text-sm text-gray-400">{language.country}</p>
  </div>
);

const LanguagesSettings = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Language Configuration</h2>
      <div className="grid grid-cols-4 gap-4">
        {languages.map((lang, index) => (
          <LanguageCard
            key={index}
            language={lang}
            selected={selectedLanguage.name === lang.name && selectedLanguage.country === lang.country}
            onClick={() => setSelectedLanguage(lang)}
          />
        ))}
      </div>
    </div>
  );
};
const BannersSettings = () => <div>Banners Settings Content</div>;
const securityOptions = [
  {
    category: 'Web & Mobile Security',
    title: 'PIN Authentication',
    description: 'Secure your account with a personal identification number. This adds an extra layer of security to your account.',
    status: 'Active',
  },
  {
    category: 'Web & Mobile Security',
    title: 'Email Authentication',
    description: 'Verify your identity using a one-time code sent to your email. This ensures that only you can access your account.',
    status: 'Active',
  },
  {
    category: 'Mobile Security',
    title: 'Voice Authentication',
    description: 'Use your voice as a unique identifier for account access. This is a convenient and secure way to log in.',
    status: 'Disable',
  },
  {
    category: 'Web & Mobile Security',
    title: 'Face Authentication',
    description: 'Unlock your account using facial recognition technology. This is a fast and secure way to access your account.',
    status: 'Disable',
  },
  {
    category: 'Mobile Security',
    title: 'SMS Authentication',
    description: 'Receive a text message with a code to verify your identity. This is a common and secure way to protect your account.',
    status: 'Active',
  },
  {
    category: 'Web & Mobile Security',
    title: 'QR Authentication',
    description: 'Scan a QR code with your mobile device to log in securely. This is a fast and easy way to access your account.',
    status: 'Active',
  },
  {
    category: 'Mobile Security',
    title: 'Biometric Authentication',
    description: 'Use your fingerprint or other biometric data to access your account. This is a highly secure and convenient method.',
    status: 'Disable',
  },
];

const SecurityCard = ({ option }) => (
  <div className="bg-[#2A2A2A] rounded-lg">
    <div className="p-6">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-gray-400">{option.category}</p>
      <span
        className="text-xs px-2 py-1 rounded-full text-white"
        style={{ backgroundColor: option.status === 'Active' ? '#41B883' : '#CD1010' }}
      >
        {option.status}
      </span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
      <p className="text-sm text-gray-400">{option.description}</p>
    </div>
    <div className="border-t border-gray-600 px-6 py-4">
      <button className="text-primary text-sm font-semibold">Manage Security</button>
    </div>
  </div>
);

const SecuritySettings = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Protection Options</h2>
    <div className="grid grid-cols-3 gap-6">
      {securityOptions.map((option, index) => (
        <SecurityCard key={index} option={option} />
      ))}
    </div>
  </div>
);

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Account');

  const renderContent = () => {
    switch (activeTab) {
      case 'Account':
        return <AccountSettings />;
      case 'Privacy':
        return <PrivacySettings />;
      case 'Display':
        return <DisplaySettings />;
      case 'Notifications':
        return <NotificationsSettings />;
      case 'Languages':
        return <LanguagesSettings />;
      case 'Banners':
        return <BannersSettings />;
      case 'Security':
        return <SecuritySettings />;
      default:
        return <AccountSettings />;
    }
  };

  const tabs = ['Account', 'Privacy', 'Display', 'Notifications', 'Languages', 'Banners', 'Security'];

  return (
    <div className="bg-[#1A1A1A] text-white flex-1 p-12">
      <div>
        <header className="mb-10">
          <h1 className="text-4xl font-bold">Settings</h1>
          <p className="text-gray-400">Modify how your account work.</p>
        </header>

        <div className="flex border-b border-gray-700 mb-10">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 ${activeTab === tab ? 'text-primary border-b-2 border-primary font-semibold' : 'text-gray-400'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default Settings;
