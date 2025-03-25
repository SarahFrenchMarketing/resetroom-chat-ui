import Head from 'next/head';
import ResetRoomChat from '../components/ResetRoomChat';

export default function Home() {
  return (
    <>
      <Head>
        <title>The Reset Room</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-anton mb-4">The Reset Room</h1>
        <p className="mb-6 text-center text-lg max-w-xl">
          Hi! I'm The Reset Room Assistant. Ready to guide you! Ask me anything...
        </p>
        <ResetRoomChat />
      </main>
    </>
  );
}
