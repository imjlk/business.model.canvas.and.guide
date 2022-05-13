import { client } from 'client';
import BMCanvas from 'components/BMCanvas';
import { getNextStaticProps, is404 } from '@faustjs/next';
import { GetStaticPropsContext } from 'next';
import { Header } from 'components';
import Button from '@mui/material/Button';
import { toPng } from 'html-to-image';
import { useCallback, useRef } from 'react';

export default function Page(): JSX.Element {
  const { useQuery } = client;
  const { generalSettings } = useQuery();
  const canvases = useQuery().openCanvases()?.nodes;
  const ref = useRef<HTMLDivElement>(null);

  const onButtonClick = useCallback(async () => {
    if (ref.current === null) {
      return;
    }

    try {
      // TODO: html-to-image 옵션 확인
      const dataUrl = await toPng(ref.current, {
        cacheBust: true,
        // width: 1920,
        // height: 1080,
        // style: {
        //   height: '1920px !important',
        //   width: '1080px !important',
        // },
        // canvasHeight: 1920,
        canvasWidth: 1080,
        pixelRatio: 1,
        skipAutoScale: true,
      });
      const link = document.createElement('a');
      // TODO: filename 변경하기
      link.download = 'my-image-name.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.log(err);
    }
    // toPng(ref.current, { cacheBust: true })
    //   .then((dataUrl) => {
    //     const link = document.createElement('a');
    //     // TODO: filename 변경하기
    //     link.download = 'my-image-name.png';
    //     link.href = dataUrl;
    //     link.click();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [ref]);

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />
      <BMCanvas canvasRef={ref} />
      <Button variant='contained' onClick={onButtonClick}>
        Download PNG
      </Button>
      <Button variant='outlined'>Outlined</Button>
    </>
  );
}
