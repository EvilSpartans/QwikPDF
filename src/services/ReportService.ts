export const createReport = async (reportData: any): Promise<Blob> => {
  const apiUrl = 'http://localhost:4200/report';
  const apiKey = '12345-abcde-67890-fghij';

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': apiKey,
    },
    body: JSON.stringify(reportData),
  });

  if (!response.ok) {
    throw new Error('Failed to create report');
  }

  return await response.blob();
};
