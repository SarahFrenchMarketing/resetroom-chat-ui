import Head from 'next/head';
import ResetRoomChat from '../components/ResetRoomChat';

export default function Home() {
  return (
    <>
      <Head>
        <title>The Reset Room</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <ResetRoomChat />
      </main>
    </>
  );
}
