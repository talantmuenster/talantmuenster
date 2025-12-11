// app/page.tsx
'use client';

import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center  text-center p-4">
      <div>
        <Image
          src="/logo.png"
          alt="Logo"
          width={500}
          height={500}
          className="mx-auto mb-6"
        />
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-700">
          Website is under technical maintenance. <br />
          We'll be back soon.
        </h1>
      </div>
    </main>
  );
}
