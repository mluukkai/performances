import Performances from '@/app/components/Performances';
import * as ComposersRepository from '@/app/lib/dataAccess/composerRepository';

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const composer = await ComposersRepository.findOne(id);

  if(!composer) {
    return <div>No composer found</div>
  }

  const performances = await ComposersRepository.findPerformancesOf(id);

  return (
    <div>
      <h2 className="text-3xl font-extrabold dark:text-white">
        {composer.name}
      </h2>

      <Performances performances={performances} skip='composer' />
    </div>
  );
}