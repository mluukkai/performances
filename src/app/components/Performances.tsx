import { formatDate } from "@/app/lib/util";
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/solid'

interface PerformanceProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
 performances: any[]
 skip?: 'composer' | 'venue' | 'composer_work'
}

const Performances = ({ performances, skip } : PerformanceProps) => {
  const skipComposer = skip === 'composer' || skip === 'composer_work'
  const skipWork =  skip === 'composer_work'
  const skipVenue =  skip === 'venue'

  return (
    <div className="mt-3">
      <h3 className="text-2xl font-bold dark:text-white">Performances</h3>

      <table className="table-auto w-full">
        <thead>
          <tr>
            {!skipWork && <th className="px-4 py-2">Work</th>}
            {!skipComposer &&<th className="px-4 py-2">Composer</th>}
            {!skipVenue &&<th className="px-4 py-2">Venue</th>}
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2" />
          </tr>
        </thead>
        <tbody>
          {performances.map((performance) => (
            <tr key={performance.id}>
              {!skipWork && 
                <td className="border px-4 py-2">
                  <Link href={`/performances/${performance.id}`}>
                    <div className="text-blue-500">{performance.work}</div>
                  </Link>
                </td>
              }
              {!skipComposer &&<td className="border px-4 py-2">{performance.composer}</td>}
              {!skipVenue &&<td className="border px-4 py-2">{performance.venue}</td>}
              <td className="border px-4 py-2">{formatDate(performance.date)}</td>
              <td className="border px-4 py-2">
                <Link href={`/performances/${performance.id}`}>
                  <ArrowRightIcon className="size-6 text-blue-500" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Performances;