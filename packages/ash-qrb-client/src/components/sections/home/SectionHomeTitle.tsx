export default function SectionHomeTitle({ title }: { title: string }) {
  return (
    <section className="section bg-teal-600 mt-[50px] py-5 text-white">
      <div className="container">
        <h1 className="text-6xl font-600">
          { title }
        </h1>
      </div>
    </section>
  );
}
