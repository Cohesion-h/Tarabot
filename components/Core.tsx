import React, { forwardRef } from 'react';
import { ICONS } from '../constants';

// 1. Icon Component
interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: keyof typeof ICONS;
  size?: number;
}
export const Icon: React.FC<IconProps> = ({ name, size = 24, className = '', ...props }) => {
  const IconComponent = ICONS[name];
  if (!IconComponent) return null;
  return <IconComponent width={size} height={size} className={className} {...props} />;
};

// 2. GlassCard Component
// FIX: Extended props with React.HTMLAttributes<HTMLDivElement> to allow passing standard div props like onClick.
interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}
export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-[#191919]/75 backdrop-blur-[10px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// 3. Button Component
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', className = '', ...props }, ref) => {
    const baseStyles = 'px-4 py-2 rounded-lg font-semibold transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2762d4] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantStyles = {
        primary: 'bg-[#2762d4] text-white hover:brightness-125 hover:shadow-[0_0_15px_#2762d4] active:scale-[0.98] disabled:bg-[#6b7280] disabled:shadow-none',
        secondary: 'bg-transparent text-[#2762d4] border border-[#2762d4] hover:bg-[#2762d4]/20 hover:shadow-[0_0_15px_#2762d4] active:scale-[0.98] active:bg-[#2762d4]/30 disabled:border-[#6b7280] disabled:text-[#6b7280] disabled:bg-transparent disabled:shadow-none',
        ghost: 'bg-transparent text-[#2762d4] hover:bg-[#2762d4]/20 active:scale-[0.98] active:bg-[#2762d4]/30 disabled:text-[#6b7280] disabled:bg-transparent',
        icon: 'p-2 rounded-full text-[#baccde] hover:text-[#2762d4] hover:bg-[#2762d4]/20 active:scale-[0.98] active:bg-[#2762d4]/30 disabled:text-[#6b7280] disabled:bg-transparent',
    };
    
    return (
      <button ref={ref} className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  }
);

// 4. InputField Component
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    ({ label, id, error, className, ...props }, ref) => {
        const errorClasses = error ? 'border-[#ef4444]' : 'border-[#baccde]/50';
        return (
            <div className="w-full">
                <label htmlFor={id} className="block text-sm font-medium text-[#baccde] mb-1">{label}</label>
                <input
                    ref={ref}
                    id={id}
                    className={`w-full bg-[#191919] p-2 rounded-lg text-[#baccde] border transition-all duration-200 ease-in-out focus:outline-none focus:border-[#2762d4] focus:ring-2 focus:ring-[#2762d4]/50 ${errorClasses} ${className}`}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-[#ef4444]">{error}</p>}
            </div>
        );
    }
);