import './root.css';

const WIDGET_URL =
  'https://widget.openocean.finance/?p=JTIzMTExRjI0JTI0KiUyNCUyMzBDMEYxOSUyNColMjQlMjMxMTFGMjQlMjQqJTI0JTIzMEMwRjE5JTI0KiUyNCUyM0ZGRkZGRiUyNColMjQlMjM4QzdGOEMlMjQqJTI0JTIzNUZGMENDJTI0KiUyNCUyM0ZGRkZGRiUyNColMjQlMjMzMzMxNDclMjQqJTI0JTIzYjFhN2IxJTI0KiUyNCUyMzQ3OWE0YiUyNColMjQlMjNmNzUwMjklMjQqJTI0T3Blbk9jZWFuJTI0KiUyNFJvYm90byUyNColMjQlMjQqJTI0RE5BJTI0KiUyNDB4MjE1N0EyM2JCMkE0MGJjRTdBNjY3OENiODUzZkNiNDlmODU4YjQxOCUyNColMjQwLjI1JTI0KiUyNGJzYyUyNColMjRCTkIlMjQqJTI0VVNEQyUyNColMjQ%3D&chain=bsc&fromSymbol=BNB&toSymbol=USDC';

export const SwapPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[520px] justify-center py-16 px-16 md:py-32 md:px-0">
      <div className="w-full overflow-hidden rounded-2xl surface border border-white/20 p-12 md:p-24">
        <iframe
          src={WIDGET_URL}
          title="OpenOcean Swap & Bridge Widget"
          className="w-full"
          style={{
            border: 'none',
            borderRadius: '16px',
            minHeight: '700px',
            height: '700px',
          }}
          allow="clipboard-write"
          loading="lazy"
        />
      </div>
    </div>
  );
};
