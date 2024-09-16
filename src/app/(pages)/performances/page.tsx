import Link from 'next/link';

import * as PerformanceRepository from '../../lib/dataAccess/performanceRepository';

export default async function Page() {
  const performances = await PerformanceRepository.findAll();

  console.log(performances);

  return (
    <div>
      <h2>Esitykset</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Teos</th>
            <th className="px-4 py-2">Säveltäjä</th>
            <th className="px-4 py-2">Kapellimestarti</th>
            <th className="px-4 py-2">Päivä</th>
          </tr>
        </thead>
        <tbody>
          
          {performances.map((performance) => (
            <tr key={performance.id}>
              <td className="border px-4 py-2">
                <Link href={`/artists/${performance.id}`}>
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
                {performance.date.toDateString()}
              </td>
            </tr>
          ))}

        </tbody>
      </table>

    </div>
  );
}