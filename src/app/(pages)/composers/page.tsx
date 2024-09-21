import Link from 'next/link';

import * as ComposerRepository from '../../lib/dataAccess/composerRepository';

export default async function Page() {
  const composers = await ComposerRepository.findAll();

  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">
        Composers
      </h2>

      <table className="table-fixed">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Performances</th>
          </tr>
        </thead>
        <tbody>
          
          {composers.map((composer) => (
            <tr key={composer.id}>
              <td className="border px-4 py-2 w-64">
                <Link href={`/composers/${composer.id}`}>
                  <div className="text-blue-500">{composer.name}</div>
                </Link>
              </td>
              <td className="border px-4 py-2 w-32">
                {composer.performance_count}
              </td>
            </tr>
          ))}

        </tbody>
      </table>

    </div>
  );
}