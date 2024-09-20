import Link from 'next/link';

import * as ComposerRepository from '../../lib/dataAccess/composerRepository';

export default async function Page() {
  const composers = await ComposerRepository.findAll();

  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">Säveltäjät</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Nimi</th>
            <th className="px-4 py-2">Esityksiä</th>
          </tr>
        </thead>
        <tbody>
          
          {composers.map((composer) => (
            <tr key={composer.id}>
              <td className="border px-4 py-2">
                <Link href={`/artists/${composer.id}`}>
                  <div className="text-blue-500">{composer.name}</div>
                </Link>
              </td>
              <td className="border px-4 py-2">
                {composer.performance_count}
              </td>
            </tr>
          ))}

        </tbody>
      </table>

    </div>
  );
}