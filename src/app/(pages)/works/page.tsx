import Link from 'next/link';

import * as WorksRepository from '@/app/lib/dataAccess/worksRepository';

export default async function Page() {
  const works = await WorksRepository.findAll();

  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">
        Works
      </h2>

      <div className="mt-5 mb-5">     
        <a 
          href="/works/new"
          className="mt-5 mb-5  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Create a new
        </a>
      </div>
      
      <table className="table-fixed">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Composer</th>
            <th className="px-4 py-2">Performances</th>
          </tr>
        </thead>
        <tbody>
          {works.map((work) => (
            <tr key={work.id}>
              <td className="border px-4 py-2 w-64">
                <Link href={`/works/${work.id}`}>
                  <div className="text-blue-500">{work.name}</div>
                </Link>
              </td>
              <td className="border px-4 py-2 w-64">
                {work.composer}
              </td>
              <td className="border px-4 py-2 w-16">
                {work.performance_count}
              </td>
            </tr>
          ))}

        </tbody>
      </table>

    </div>
  );
}