import { parseCsv } from "./csv";

describe("parseCsv", () => {
  const mockResponse = jest.fn();
  const mockFetch = jest.fn(() => Promise.resolve({
      text: () => Promise.resolve(mockResponse()),
    } as unknown as Response));
  const validUrl = "https://www.example.com/something.csv";

  const setUp = (csvContents: string) => {
    mockResponse.mockReturnValue(csvContents);
  };

  global.fetch = mockFetch;

  beforeEach(() => mockFetch.mockClear());

  it("returns empty list when given empty input", async () => {
    expect(await parseCsv(undefined)).toEqual([]);
    expect(await parseCsv("")).toEqual([]);
  });

  it("returns empty list for empty CSV", async () => {
    setUp("");
    expect(await parseCsv(validUrl)).toEqual([]);
  });

  it("returns parsed data for valid CSV", async () => {
    const exampleCsv = `city,dma,heroImage,zipCodes
Cypress,"Houston, TX",Houston,"77429, 77433"
The Colony,"Dallas, TX",Dallas,"75056, 75010"`;

    setUp(exampleCsv);
    expect(await parseCsv(validUrl)).toEqual([
      {
        city: "Cypress",
        dma: "Houston, TX",
        heroImage: "Houston",
        zipCodes: "77429, 77433",
      },
      {
        city: "The Colony",
        dma: "Dallas, TX",
        heroImage: "Dallas",
        zipCodes: "75056, 75010",
      },
    ]);
  });
});
