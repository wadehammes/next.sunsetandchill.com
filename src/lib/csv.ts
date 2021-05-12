import Papa from "papaparse";

const fetchCsv = async (url: string): Promise<string> => {
  const response = await fetch(url);

  return response.text();
};

export const parseCsv = async <T>(url?: string): Promise<T[]> => {
  if (!url) {
    return [];
  }

  const csvData = await fetchCsv(url);

  return new Promise<T[]>((resolve) => {
    Papa.parse<T>(csvData, {
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
    });
  });
};
