
import React from 'react';
import { GlassCard, Icon, Button } from './Core';

// PostCard for Networking Feed
export const PostCard: React.FC = () => {
  return (
    <GlassCard className="p-4 mb-6">
      <div className="flex items-center mb-4">
        <img src="https://picsum.photos/id/237/40" alt="avatar" className="w-10 h-10 rounded-full mr-3" />
        <div>
          <p className="font-semibold text-white text-lg">Creator Name</p>
          <p className="text-sm text-[#baccde]">2 hours ago</p>
        </div>
      </div>
      <p className="mb-4">This is a sample post in the Tarabot networking feed. Discussing the future of AI in Kuwait's startup ecosystem. What are your thoughts?</p>
      <img src="https://picsum.photos/id/1015/600/300" alt="post" className="rounded-lg mb-4" />
      <div className="flex justify-around border-t border-white/10 pt-2">
        <Button variant="ghost">Like</Button>
        <Button variant="ghost">Comment</Button>
        <Button variant="ghost">Share</Button>
      </div>
    </GlassCard>
  );
};

// ProfileCard for Profile Page
interface ProfileCardProps {
    name: string;
    role: string;
    sector: string;
    location: string;
}
export const ProfileCard: React.FC<ProfileCardProps> = ({ name, role, sector, location }) => {
  return (
    <GlassCard className="p-6 text-center">
      <img src={`https://i.pravatar.cc/120?u=${name}`} alt="avatar" className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-[#2762d4]" />
      <h2 className="font-display text-3xl text-white">{name}</h2>
      <p className="text-[#baccde] mb-4">{role}</p>
      <div className="flex items-center justify-center gap-2 text-[#10b981] mb-6">
        <Icon name="check-circle" size={20} />
        <span className="font-semibold">Verified</span>
      </div>
      <div className="text-left space-y-2">
        <p><span className="font-semibold text-white">Sector:</span> {sector}</p>
        <p><span className="font-semibold text-white">Location:</span> {location}</p>
      </div>
    </GlassCard>
  );
};
