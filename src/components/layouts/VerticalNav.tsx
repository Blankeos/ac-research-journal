import React, { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tv } from 'tailwind-variants';

import useIsOnTop from '@/hooks/useIsOnTop';
import useScrollCallback from '@/hooks/useScrollCallback';
import pageRoutes, { navLinks } from '@/lib/pageRoutes';
import { cn } from '@/lib/utils';
import { button, container } from '@/styles/variants';
import { Icon } from '@iconify/react';

import Logo from '../Logo';

export type VerticalNavProps = {
  /**
   * Usecase: make it fixed for the homepage.
   *
   * Note for future devs:
   * Currently uses the same strings as tailwind. If you need different usecases,
   * use the { 'tailwind-class': position === 'your value' } syntax in the cn().
   * @defaultValue `"sticky"`
   */
  position?: 'sticky' | 'fixed';
  variant?: 'default' | 'inverted';
};

const VerticalNav: FC<VerticalNavProps> = (props) => {
  const pathname = usePathname();
  const { position = 'sticky', variant = 'default' } = props;

  const isOnTop = useIsOnTop();

  function isActive(path: string) {
    return pathname?.split('/')?.at(1) === path?.split('/')?.at(1);
  }

  // Variant Classes (Specifically for Inverted)
  const navLinkTextColor =
    variant === 'default'
      ? 'text-[#2B2B43]'
      : isOnTop
      ? 'text-white'
      : 'text-[#2B2B43]';

  const logoColor =
    variant === 'default' ? '#040593' : isOnTop ? '#ffffff' : '#040593';

  return (
    <nav
      className={cn(
        'relative top-0 left-0 right-0 z-[999998] w-full',
        position,
      )}
    >
      {/* Blur */}
      <div
        className={cn('absolute inset-0', isOnTop ? '' : 'backdrop-blur-sm')}
      />

      {/* Glass Background */}
      <div
        className={cn(
          'absolute inset-0 transition duration-700',
          isOnTop ? 'bg-primary-100/0' : 'bg-primary-100/40 border-b',
        )}
      />

      {/* Actual Nav Content */}
      <div
        className={container({
          class:
            'relative w-full items-center justify-between md:py-6 flex-row',
        })}
      >
        <span className="hidden md:block z-50">
          <Logo color={logoColor} />
        </span>

        <ul className="hidden gap-4 md:flex md:justify-center md:gap-x-12 md:bg-transparent md:absolute md:top-[50%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%]">
          {navLinks.map((navLink) => {
            if (navLink.desktop === false) return null;

            return (
              <Link
                key={navLink.url}
                className={cn(
                  'flex flex-col gap-y-3 items-center transition',
                  isActive(navLink.url)
                    ? 'text-primary-500 font-medium'
                    : navLinkTextColor,
                )}
                href={navLink.url}
              >
                <span className="">{navLink.label}</span>
              </Link>
            );
          })}
        </ul>

        <Link
          href={pageRoutes.archive}
          className={button({ class: 'hidden md:block z-10' })}
        >
          Read Archives
        </Link>
      </div>
    </nav>
  );
};

export default VerticalNav;
