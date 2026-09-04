'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

const toggleClassName =
  'btn-social btn-social-animated bg-secondary text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

export function ThemeToggle() {
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const { resolvedTheme, setTheme } = useTheme();

  if (!mounted) {
    return (
      <button type="button" className={toggleClassName} aria-label="Toggle theme">
        <span className="h-[1.2rem] w-[1.2rem]" />
      </button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={toggleClassName}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? (
        <Moon
          className="h-[1.2rem] w-[1.2rem] transition-all duration-300"
          aria-hidden="true"
        />
      ) : (
        <Sun
          className="h-[1.2rem] w-[1.2rem] transition-all duration-300"
          aria-hidden="true"
        />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
