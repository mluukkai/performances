import Link from 'next/link';

import * as ChorusRepository from '@/app/lib/dataAccess/chorusRepository';

export default async function Page() {
  const chors = await ChorusRepository.findAll();

  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">
        Chors
      </h2>
      <table className="table-fixed">
        <thead>
          <tr>
            <th className="px-4 py-2 w-64">Name</th>
            <th className="px-4 py-2 w-32">Performances</th>
          </tr>
        </thead>
        <tbody>
          
          {chors.map((chor) => (
            <tr key={chor.id}>
              <td className="border px-4 py-2">
                <Link href={`/choruses/${chor.id}`}>
                  <div className="text-blue-500">{chor.name}</div>
                </Link>
              </td>
              <td className="border px-4 py-2">
                {chor.performance_count}
              </td>
            </tr>
          ))}

        </tbody>
      </table>

    </div>
  );
}