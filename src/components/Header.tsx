import React from 'react';
import styles from 'scss/components/Header.module.scss';
import Link from 'next/link';
import { client, MenuLocationEnum } from 'client';
import { decode } from 'html-entities';

interface Props {
  title?: string;
  description?: string;
}

function Header({
  title = 'Business Model Canvas & Guide',
  description,
}: Props): JSX.Element {
  const { menuItems } = client.useQuery();
  const links = menuItems({
    where: { location: MenuLocationEnum.PRIMARY },
  }).nodes;

  return (
    <header>
      <div className={styles.wrap}>
        <div className={styles['title-wrap']}>
          <p className={styles['site-title']}>
            <Link href='/'>
              <a>{decode(title)}</a>
            </Link>
          </p>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        <div className={styles.menu}>
          <Link href='/canvas'>
            <a>Canvas</a>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
