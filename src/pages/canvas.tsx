import { client } from 'client';
import BMCanvas from 'components/BMCanvas';
import { getNextStaticProps, is404 } from '@faustjs/next';
import { GetStaticPropsContext } from 'next';
import { Header } from 'components';
import Button from '@mui/material/Button';

export default function Page(): JSX.Element {
  const { useQuery } = client;
  const { generalSettings } = useQuery();
  const canvases = useQuery().openCanvases()?.nodes;
  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />
      <BMCanvas />
      <Button variant='contained'>Contained</Button>
      <Button variant='outlined'>Outlined</Button>
    </>
  );
}
