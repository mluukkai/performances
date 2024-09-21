import Performances from '@/app/components/Performances';
import * as WorksRepository from '@/app/lib/dataAccess/worksRepository';

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const work = await WorksRepository.findOne(id);

  if(!work) {
    return <div>Work not found</div>
  }

  const performances = await WorksRepository.findPerformancesOf(id);

  return (
    <div>
      <h2 className="text-3xl font-extrabold dark:text-white">
        {work.name} by {work.composer}
      </h2>

      <Performances performances={performances} skip='composer_work'/>
    </div>
  );
}