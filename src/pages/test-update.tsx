import { getNextServerSideProps } from '@faustjs/next';
import { client, PostObjectsConnectionDateColumnEnum } from 'client';
import { Footer, Header, Hero } from 'components';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export interface FormData {
  title: string;
  content: string;
}

function TestUpdate() {
  const { useQuery } = client;
  const { useAuth, useMutation } = client.auth;
  // console.log(useAuth().authResult);
  const { generalSettings } = useQuery();
  const canvases = useQuery().openCanvases()?.nodes;
  const [typedTitle, setTypedTitle] = useState('');
  const [typedContent, setTypedContent] = useState('');
  const [submit, { isLoading, error }] = useMutation(
    (mutation, { title, content }: FormData) => {
      const result = mutation.createPost({
        input: {
          title: title,
          content,
        },
      });

      return result.post?.id;
    },
  );
  return (
    <>
      {useAuth().isLoading ? (
        <p>Loading...</p>
      ) : (
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
            <input
              type='text'
              name='title'
              onChange={(e) => setTypedTitle(e.target.value)}
            />
            <input
              type='textarea'
              name='content'
              onChange={(e) => setTypedContent(e.target.value)}
            />
            <button
              onClick={() => {
                submit({
                  args: {
                    title: typedTitle,
                    content: typedContent,
                  },
                });
              }}
            >
              Create Post
            </button>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
export default TestUpdate;

// export getNextServerSideProps() {

// }
