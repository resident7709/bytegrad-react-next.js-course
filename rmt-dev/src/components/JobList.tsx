import Spinner from './Spinner';
import { JobItem } from '../lib/types';
import JobListItem from './JobListItem';
import { useActiveId } from '../lib/hooks';

type JobListProps = {
  isLoading: boolean;
  jobItems: JobItem[];
};

export function JobList({ jobItems, isLoading }: JobListProps) {
  const activeId = useActiveId();

  return (
    <ul className='job-list'>
      {isLoading && <Spinner />}
      {!isLoading &&
        jobItems.map(jobItem => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={activeId === jobItem.id}
          />
        ))}
    </ul>
  );
}

export default JobList;
