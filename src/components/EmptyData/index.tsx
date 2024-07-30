export default function EmptyData({message = 'No data found'} : {message: string} ) {
  return (
    <>
      <p className="ps-3">{message}</p>
    </>
  );
}