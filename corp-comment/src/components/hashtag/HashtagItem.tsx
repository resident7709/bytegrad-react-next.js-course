type Props = {
  company: string;
  onSelectCompany: (company: string) => void;
};

export default function HashtagItem({ company, onSelectCompany }: Props) {
  return (
    <li key={company}>
      <button onClick={() => onSelectCompany(company)}>#{company}</button>
    </li>
  );
}
