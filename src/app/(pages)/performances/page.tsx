import Link from 'next/link';

import * as PerformanceRepository from '@/app/lib/dataAccess/performanceRepository';
import { formatDate } from '@/app/lib/util';
import { auth } from '@/auth';

export default async function Page() {
  const performances = await PerformanceRepository.findAll();
  const session = await auth()
  
  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">
        Performances
      </h2>

      { session?.user &&
        <div className="mt-5 mb-5">     
          <a 
            href="/performances/new"
            className="mt-5 mb-5  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Create a new
          </a>
        </div>
      }

      <table className="table-fixed">
        <thead>
          <tr>
            <th className="px-4 py-2">Work</th>
            <th className="px-4 py-2">Composer</th>
            <th className="px-4 py-2">Conductor</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          
          {performances.map((performance) => (
            <tr key={performance.id}>
              <td className="border px-4 py-2">
                <Link href={`/performances/${performance.id}`}>
                  <div className="text-blue-500">{performance.work}</div>
                </Link>
              </td>
              <td className="border px-4 py-2">
                {performance.composer}
              </td>
              <td className="border px-4 py-2">
                {performance.conductor}
              </td>
              <td className="border px-4 py-2">
                {formatDate(performance.date)}
              </td>
            </tr>
          ))}

        </tbody>
      </table>

    </div>
  );
}