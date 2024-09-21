import Link from 'next/link';

import * as OrchesterRepository from '../../lib/dataAccess/orchesterRepository';

export default async function Page() {
  const orchesters = await OrchesterRepository.findAll();

  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">
        Orchestras
      </h2>
      <table className="table-fixed">
        <thead>
          <tr>
            <th className="px-4 py-2 w-64">Name</th>
            <th className="px-4 py-2 w-32">Performances</th>
          </tr>
        </thead>
        <tbody>
          {orchesters.map((orchestra) => (
            <tr key={orchestra.id}>
              <td className="border px-4 py-2">
                <Link href={`/orchestras/${orchestra.id}`}>
                  <div className="text-blue-500">{orchestra.name}</div>
                </Link>
              </td>
              <td className="border px-4 py-2">
                {orchestra.performance_count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}