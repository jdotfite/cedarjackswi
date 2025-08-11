// Test Web3Forms integration (local/dev only)
// NOTE: Requires NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to be set in your env.
async function testWeb3FormsSubmission() {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error('Missing NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY – set it before running this test.');
    return;
  }

  const testData = new FormData();
  testData.append('access_key', accessKey);
  testData.append('subject', 'Test Basement Reservation Request');
  testData.append('from_name', 'Cedar Jacks Reservation Form');
  testData.append('name', 'Test User');
  testData.append('phone', '123-456-7890');
  testData.append('date', '2025-07-01');
  testData.append('email', 'test@example.com');
  testData.append('notes', 'This is a test reservation for the basement.');

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: testData,
    });

    const result = await response.text();
    console.log('Response status:', response.status);
    console.log('Response:', result);

    if (response.ok) {
      console.log('✅ Web3Forms test submission successful!');
    } else {
      console.log('❌ Web3Forms test submission failed');
    }
  } catch (error) {
    console.error('Error testing Web3Forms:', error);
  }
}

// Uncomment to run test (ONLY in local dev)
// testWeb3FormsSubmission();
