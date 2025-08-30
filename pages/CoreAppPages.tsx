import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { GlassCard, Button, Icon } from '../components/Core';
import { OnboardingCreatorForm, OnboardingInvestorForm } from '../components/OnboardingForms';
import type { Post } from '../types';
import { Link } from 'react-router-dom';

const MOCK_POSTS: Post[] = [
    { id: 2, author: 'Dana Al-Fahad', avatar: 'https://i.pravatar.cc/40?u=dana', timestamp: '2 hours ago', content: "Just explored the new AI 'Project Spark' generator on Tarabot. It's incredibly powerful for outlining initial concepts. Highly recommend other creators give it a try!", image: "https://picsum.photos/id/1015/600/300" },
    { id: 1, author: 'Khaled Al-Mutairi', avatar: 'https://i.pravatar.cc/40?u=khaled', timestamp: '8 hours ago', content: "Looking for a UI/UX designer with experience in fintech for a new project. Reach out if you're interested in collaborating. #collaboration #fintech" },
];

const CreatePost: React.FC<{ onNewPost: (content: string) => void }> = ({ onNewPost }) => {
    const [content, setContent] = useState('');
    const { user } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (content.trim()) {
            onNewPost(content);
            setContent('');
        }
    };

    return (
        <GlassCard className="p-4 mb-6">
            <div className="flex items-start gap-4">
                <img src={`https://i.pravatar.cc/40?u=${user?.email}`} alt="avatar" className="w-10 h-10 rounded-full" />
                <form onSubmit={handleSubmit} className="w-full">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's on your mind?"
                        className="w-full bg-transparent text-lg text-white placeholder-gray-500 focus:outline-none resize-none"
                        rows={2}
                    ></textarea>
                    <div className="text-right mt-2">
                        <Button type="submit" disabled={!content.trim()}>Post</Button>
                    </div>
                </form>
            </div>
        </GlassCard>
    );
};

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <GlassCard className="p-4 mb-6">
      <div className="flex items-center mb-4">
        <img src={post.avatar} alt="avatar" className="w-10 h-10 rounded-full mr-3" />
        <div>
          <p className="font-semibold text-white text-lg">{post.author}</p>
          <p className="text-sm text-[#baccde]">{post.timestamp}</p>
        </div>
      </div>
      <p className="mb-4 whitespace-pre-wrap">{post.content}</p>
      {post.image && <img src={post.image} alt="post" className="rounded-lg mb-4" />}
      <div className="flex justify-around border-t border-white/10 pt-2">
        <Button variant="ghost">Like</Button>
        <Button variant="ghost">Comment</Button>
        <Button variant="ghost">Share</Button>
      </div>
    </GlassCard>
  );
};

export const NetworkingFeedPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
    const { user } = useAuth();

    const handleNewPost = (content: string) => {
        const newPost: Post = {
            id: Date.now(),
            author: user?.name || 'You',
            avatar: `https://i.pravatar.cc/40?u=${user?.email}`,
            timestamp: 'Just now',
            content: content,
        };
        setPosts(prevPosts => [newPost, ...prevPosts]);
    };

    return (
      <div>
        <h1 className="font-display text-4xl text-white mb-8 hidden md:block">Networking Feed</h1>
        <CreatePost onNewPost={handleNewPost} />
        {posts.map(post => <PostCard key={post.id} post={post} />)}
      </div>
    );
};

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;

  const skills = ['UI/UX Design', 'Fintech', 'React', 'TypeScript', 'Market Analysis'];

  return (
    <div>
      <h1 className="font-display text-4xl text-white mb-8 hidden md:block">Digital Palm</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 flex flex-col gap-8">
            <GlassCard className="p-6 text-center">
              <img src={`https://i.pravatar.cc/120?u=${user.email}`} alt="avatar" className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-[#2762d4]" />
              <h2 className="font-display text-3xl text-white">{user.name}</h2>
              <p className="text-[#baccde] mb-4">{user.role}</p>
              <div className="flex items-center justify-center gap-2 text-[#10b981] mb-6">
                <Icon name="shield-check" size={20} />
                <span className="font-semibold">Hawiyti Verified</span>
              </div>
              {user.role === 'Creator' && (
                <Button variant="secondary" className="w-full">
                    Sponsor Tools
                </Button>
              )}
            </GlassCard>

             <GlassCard className="p-6">
                <h3 className="font-display text-2xl text-white mb-4">Verified Badges</h3>
                <p className="text-sm text-center">No badges earned yet.</p>
            </GlassCard>
        </div>
        <div className="lg:col-span-2 flex flex-col gap-8">
            <GlassCard className="p-6">
                <h3 className="font-display text-2xl text-white mb-4">Verified Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                        <span key={skill} className="bg-[#2762d4]/20 text-[#baccde] text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
                    ))}
                </div>
            </GlassCard>
             <GlassCard className="p-6">
                <h3 className="font-display text-2xl text-white mb-4">Immutable Project History</h3>
                <p className="text-sm text-center">No projects completed on Tarabot yet.</p>
            </GlassCard>
        </div>
      </div>
    </div>
  );
};

export const MorePage: React.FC = () => {
  const { logout } = useAuth();

  const menuItems = [
    { name: 'Settings', icon: 'settings' as const, path: '#' },
    { name: 'Help / Q&A', icon: 'users' as const, path: '#/help' },
    { name: 'Submit an Idea', icon: 'lightbulb' as const, path: '#/submit-idea' },
    { name: 'Crowdfunding', icon: 'dollar-sign' as const, path: '#/crowdfunding' },
  ];

  return (
    <div>
        <h1 className="font-display text-4xl text-white mb-8 hidden md:block">More</h1>
        <GlassCard className="p-4">
            <div className="space-y-2">
                {menuItems.map(item => (
                    <Link key={item.name} to={item.path} className="w-full flex items-center gap-4 p-3 rounded-lg text-left text-lg text-white hover:bg-white/10 transition-colors">
                        <Icon name={item.icon} className="text-[#2762d4]" />
                        {item.name}
                    </Link>
                ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
                <Button 
                    onClick={logout} 
                    className="w-full flex items-center justify-center gap-2 !text-[#ef4444] !border-[#ef4444] hover:!bg-[#ef4444]/20" 
                    variant="secondary"
                >
                    <Icon name="log-out" />
                    Logout
                </Button>
            </div>
        </GlassCard>
    </div>
  );
};
