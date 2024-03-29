import { FC, PropsWithChildren, useEffect, useState } from 'react';

import { useMediaQuery, useMediaQueryClient } from '@/hooks/useMediaQuery';

import ArchiveAside, { ArchiveAsideProps } from './ArchiveAside';
import VerticalMobileFooter from './VerticalMobileFooter';

type ArchiveLayoutType = PropsWithChildren & {} & ArchiveAsideProps;
/** A Horizontal Layout. */
const ArchiveLayout: FC<ArchiveLayoutType> = ({ children, collapsed }) => {
  const isTabletOrMobile = useMediaQueryClient('(max-width: 1224px)');

  return (
    <div className="h-screen max-h-screen flex">
      <ArchiveAside collapsed={isTabletOrMobile ? true : collapsed} />
      <main className="flex-1 overflow-auto flex flex-col">{children}</main>
      <nav className="fixed bottom-0">
        <VerticalMobileFooter />
      </nav>
    </div>
  );
};

export default ArchiveLayout;
