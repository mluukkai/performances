import Performances from '@/app/components/Performances';
import * as VenuesRepository from '@/app/lib/dataAccess/venueRepository';

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const venue = await VenuesRepository.findOne(id);

  if(!venue) {
    return <div>No venue found</div>
  }

  const performances = await VenuesRepository.findPerformancesOf(id);

  const country = venue.country !== 'Suomi' ? `, ${venue.country}` : '';  

  return (
    <div>
      <h2 className="text-3xl font-extrabold dark:text-white">
        {venue.name}
      </h2>

      <div className='mt-5'>
        {venue.street}, {venue.city}{country}
      </div>
     
      <Performances performances={performances} skip='venue' />
    </div>
  );
}