function DownloadButton({ result }) {

  if (!result) {
    return null;
  }

  return (
    <a
      href={result}
      download="background-removed.png"
    >
      <button>
        ⬇️ Download PNG
      </button>
    </a>
  );
}

export default DownloadButton;