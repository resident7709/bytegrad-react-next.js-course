export default function ContentBlock({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='h-full w-full overflow-hidden rounded-md bg-[#f7f8fa] shadow-sm'>
      {children}
    </div>
  );
}
