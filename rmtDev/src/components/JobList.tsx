import Spinner from './Spinner';
import { JobItem } from '../lib/types';
import JobListItem from './JobListItem';

type JobListProps = {
  isLoading: boolean;
  jobItems: JobItem[];
};

export function JobList({ jobItems, isLoading }: JobListProps) {
  return (
    <ul className='job-list'>
      {isLoading && <Spinner />}
      {!isLoading && jobItems.map(jobItem => <JobListItem jobItem={jobItem} />)}
    </ul>
  );
}

export default JobList;
