// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Performances = ({ performances } : { performances: any[]}) => {
  return (
    <div className="mt-3">
      <h3 className="text-2xl font-bold dark:text-white">Esitykset</h3>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Teos</th>
            <th className="px-4 py-2">Säveltäjä</th>
            <th className="px-4 py-2">Paikka</th>
            <th className="px-4 py-2">Päivämäärä</th>
          </tr>
        </thead>
        <tbody>
          {performances.map((performance) => (
            <tr key={performance.id}>
              <td className="border px-4 py-2">{performance.work}</td>
              <td className="border px-4 py-2">{performance.composer}</td>
              <td className="border px-4 py-2">{performance.venue}</td>
              <td className="border px-4 py-2">{performance.date.toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Performances;