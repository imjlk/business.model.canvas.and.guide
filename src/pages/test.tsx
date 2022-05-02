import { client } from 'client';
import { Footer, Header, Hero } from 'components';
import Head from 'next/head';
import Link from 'next/link';

function Test() {
  const { useQuery } = client;
  const { generalSettings } = useQuery();
  const canvases = useQuery().openCanvases()?.nodes;
  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />
      <Head>
        <title>Test Page - {generalSettings.title}</title>
      </Head>
      <Hero title='Test Page' />
      <main className='content content-single'>
        {canvases.length > 0 ? (
          canvases.map((e) => {
            // console.log(e);

            return (
              <div key={e.id ?? ''}>
                <Link href={`${e.uri}`}>
                  <a>{e.title({})}</a>
                </Link>
                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: e.keyPartners.join('') }}
                ></div>
              </div>
            );
          })
        ) : (
          <div>Loading...{console.log('loading')}</div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Test;
