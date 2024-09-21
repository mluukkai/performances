import Performances from '@/app/components/Performances';
import * as ChorusRepository from '@/app/lib/dataAccess/chorusRepository';

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const chorus = await ChorusRepository.findOne(id);

  if(!chorus) {
    return <div>No chorus found</div>
  }

  const performances = await ChorusRepository.findPerformancesOf(id);

  return (
    <div>
      <h2 className="text-3xl font-extrabold dark:text-white">
        {chorus.name}
      </h2>

      <Performances performances={performances} />
    </div>
  );
}