
import Performances from '@/app/components/Performances';
import * as OrchesterRepository from '@/app/lib/dataAccess/orchesterRepository';

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const artist = await OrchesterRepository.findOne(id);

  if(!artist) {
    return <div>Artistia ei löytynyt</div>
  }

  const performances = await OrchesterRepository.findPerformancesOf(id);

  return (
    <div>
      <h3 className="text-3xl font-extrabold dark:text-white">
        {artist.name}
      </h3>

      <Performances performances={performances} />
    </div>
  );
}