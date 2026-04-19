/* Renders 4 pixel-art corner accents inside a parent with .pixel-corners class */
export function PixelCorners() {
  return (
    <>
      <span className="corner tl" />
      <span className="corner tr" />
      <span className="corner bl" />
      <span className="corner br" />
    </>
  );
}
