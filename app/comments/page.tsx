import { neon } from '@neondatabase/serverless';
import { lusitana } from '@/app/ui/fonts';

interface Comment {
  id: number;
  comment: string;
  created_at: string;
}

async function getComments(): Promise<Comment[]> {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const comments = await sql`SELECT * FROM comments ORDER BY created_at DESC`;
  return comments;
}

export default async function CommentsPage() {
  const comments = await getComments();

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <h1 className={`${lusitana.className} text-3xl font-bold text-white`}>
          Комментарии
        </h1>
      </div>
      
      <div className="mt-4 rounded-lg bg-white p-6 shadow-md">
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Пока нет комментариев. Будьте первым!
            </p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <p className="text-gray-800 mb-2">{comment.comment}</p>
                <p className="text-sm text-gray-500">
                  {new Date(comment.created_at).toLocaleString('ru-RU')}
                </p>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-6">
          <a 
            href="/" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors inline-block"
          >
            ← Вернуться на главную
          </a>
        </div>
      </div>
    </main>
  );
}
