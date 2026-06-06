export default function FirstDoorwayBanner() {
  return (
    <section className="bg-[#FAF6F0] px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div
          className="overflow-hidden rounded-[2rem] border border-[#658365]/10 shadow-xl"
          style={{ minHeight: "420px" }}
        >
          <img
            src="/flo-first-doorway.jpg"
            alt="Flo First Doorway — You already carry the answers within, the breath is the doorway"
            loading="eager"
            fetchPriority="high"
            style={{
              width: "100%",
              height: "100%",
              minHeight: "420px",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        </div>
      </div>
    </section>
  );
}
