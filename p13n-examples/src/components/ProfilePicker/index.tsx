import React, { useState } from 'react';
import { StyledProfilePicker, ProfileCard, Logo } from './styles';
import { profiles } from './profiles';

interface Props {
  onProfileChange: (profile: any) => void;
}

const ProfilePicker: React.FC<Props> = ({ onProfileChange }) => {
  const [activeProfile, setActiveProfile] = useState<any>(null);

  const handleProfileChange = (profile: any) => {
    setActiveProfile(profile);
    onProfileChange(profile);
  };

  return (
    <StyledProfilePicker>
      <Logo>p13n.ai</Logo>
      {profiles.map((profile, index) => (
        <ProfileCard
          key={index}
          className={activeProfile === profile ? 'active' : ''}
          onClick={() => handleProfileChange(profile)}
        >
          <input
            type="radio"
            value={index}
            checked={activeProfile === profile}
            onChange={() => { }}
          />
          <div className="profileDetails">
            <strong>{profile.name}</strong>
            <p>{profile.age} years old</p>
            <p>{profile.job_title}</p>
            <p>{profile.location}</p>
          </div>
        </ProfileCard>
      ))}
    </StyledProfilePicker>
  );
};

export default ProfilePicker;
