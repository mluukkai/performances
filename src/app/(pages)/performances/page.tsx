import Link from 'next/link';

import * as PerformanceRepository from '../../lib/dataAccess/performanceRepository';
import { formatDate } from '@/app/lib/util';

export default async function Page() {
  const performances = await PerformanceRepository.findAll();

  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">
        Performances
      </h2>

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