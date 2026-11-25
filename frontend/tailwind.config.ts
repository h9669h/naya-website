import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        navy: {
          950: '#080f26',
          900: '#0d1734',
          800: '#152246',
          700: '#1d3061',
        },
        lavender: {
          50: '#f7f4ff',
          100: '#eee8ff',
          200: '#ddceff',
          300: '#c3a8ff',
          400: '#a681ff',
          500: '#8b5cf6',
          600: '#7541e8',
          700: '#6030c2',
        },
      },
      borderRadius: {
        xl: 'calc(var(--radius) + 4px)',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 12px 45px -18px rgba(28, 25, 70, 0.22)',
        lift: '0 24px 70px -28px rgba(28, 25, 70, 0.32)',
        glow: '0 0 60px -12px rgba(139, 92, 246, 0.4)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(120deg, #080f26 0%, #142249 50%, #29214d 100%)',
        'radial-violet': 'radial-gradient(circle at center, rgba(166,129,255,.2), transparent 68%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -14px, 0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)', opacity: '0.35' },
          '50%': { transform: 'translate3d(12px, -18px, 0)', opacity: '0.75' },
        },
        orbit: {
          to: { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        drift: 'drift 9s ease-in-out infinite',
        'orbit-slow': 'orbit 32s linear infinite',
      },
    },
  },
  plugins: [animate],
};

export default config;
