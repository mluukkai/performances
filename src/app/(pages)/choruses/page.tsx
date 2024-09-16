import Link from 'next/link';

import * as ChorusRepository from '../../lib/dataAccess/chorusRepository';

export default async function Page() {
  const chors = await ChorusRepository.findAll();

  return (
    <div>
      <h2>Kuorot</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Nimi</th>
            <th className="px-4 py-2">Esityksiä</th>
          </tr>
        </thead>
        <tbody>
          
          {chors.map((chor) => (
            <tr key={chor.id}>
              <td className="border px-4 py-2">
                <Link href={`/artists/${chor.id}`}>
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