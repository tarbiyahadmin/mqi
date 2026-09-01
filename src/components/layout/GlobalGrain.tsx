/** Full-viewport film grain overlay with subtle blend. */
export function GlobalGrain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] mix-blend-soft-light opacity-[0.08]"
      style={{
        backgroundImage: "url(/images/grain.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
