export default function UnknownComponent({ blok }: { blok: any }) {
  console.log('Unknown component called with:', blok);
  
  return (
    <div className="p-4 border-2 border-red-500 bg-red-100 text-red-800">
      <h3 className="font-bold">Unknown Component: {blok.component}</h3>
      <pre className="text-xs mt-2">{JSON.stringify(blok, null, 2)}</pre>
    </div>
  );
}
