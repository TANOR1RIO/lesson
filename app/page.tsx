import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import { neon } from '@neondatabase/serverless';


export default function Page() {
  async function create(formData: FormData) {
    'use server';
    // Подключение к базе данных Neon
    const sql = neon(`${process.env.DATABASE_URL}`);
    const comment = formData.get('comment');
    
    // Вставка комментария из формы в базу данных Postgres
    await sql('INSERT INTO comments (comment) VALUES ($1)', [comment]);
  }

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
        {/* <AcmeLogo /> */}
      </div>
      
      {/* Форма для комментариев */}
      <div className="mt-4 rounded-lg bg-white p-6 shadow-md">
        <h2 className={`${lusitana.className} text-2xl font-bold text-gray-800 mb-4`}>
          Оставить комментарий
        </h2>
        <form action={create} className="space-y-4">
          <div>
            <input 
              type="text" 
              placeholder="Напишите комментарий..." 
              name="comment" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Отправить
          </button>
        </form>
        
        <div className="mt-4">
          <Link 
            href="/comments" 
            className="text-blue-500 hover:text-blue-600 underline"
          >
            Посмотреть все комментарии →
          </Link>
        </div>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
        <div className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black"/>
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href="/dashboard"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
      <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
            {/* Добавьте изображения-герои здесь */}
            <Image
              src="/hero-desktop.png"
              width={1000}
              height={760}
              className="hidden md:block"
              alt="Скриншоты проекта дашборда, показывающие десктопную версию"
            />
            <Image
              src="/hero-mobile.png"
              width={560}
              height={620}
              className="block md:hidden"
              alt="Скриншоты проекта дашборда, показывающие мобильную версию"
            />
      </div>

      </div>
    </main>
  );
}
