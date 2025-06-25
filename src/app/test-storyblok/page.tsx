export default async function TestStoryblok() {
  const token = process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN;
    try {
    // Test 1: Try to get space info (US region)
    const spaceResponseUS = await fetch(
      `https://api.storyblok.com/v2/cdn/spaces/me?token=${token}`
    );
    
    const spaceDataUS = await spaceResponseUS.text();
    
    // Test 2: Try to get space info (EU region)
    const spaceResponseEU = await fetch(
      `https://api-eu.storyblok.com/v2/cdn/spaces/me?token=${token}`
    );
    
    const spaceDataEU = await spaceResponseEU.text();
    
    // Test 3: Try to get all stories (US)
    const storiesResponseUS = await fetch(
      `https://api.storyblok.com/v2/cdn/stories?token=${token}&version=draft`
    );
    
    const storiesDataUS = await storiesResponseUS.text();
    
    // Test 4: Try to get all stories (EU)
    const storiesResponseEU = await fetch(
      `https://api-eu.storyblok.com/v2/cdn/stories?token=${token}&version=draft`
    );
    
    const storiesDataEU = await storiesResponseEU.text();
      return (
      <div className="p-8 bg-white text-black">
        <h1 className="text-2xl font-bold mb-4">Storyblok API Test</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Token:</h2>
          <p className="font-mono bg-gray-100 p-2 rounded">{token}</p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Space Info Response (US):</h2>
          <p>Status: {spaceResponseUS.status}</p>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {spaceDataUS}
          </pre>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Space Info Response (EU):</h2>
          <p>Status: {spaceResponseEU.status}</p>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {spaceDataEU}
          </pre>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Stories Response (US):</h2>
          <p>Status: {storiesResponseUS.status}</p>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {storiesDataUS}
          </pre>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Stories Response (EU):</h2>
          <p>Status: {storiesResponseEU.status}</p>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {storiesDataEU}
          </pre>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-8 bg-red-100 text-red-800">
        <h1 className="text-2xl font-bold mb-4">Error Testing Storyblok</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }
}
