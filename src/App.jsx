import { Link } from "react-router-dom";
import Title from "./components/Title";

function App() {
  const isoList = [
    { name: "9001", position: "-19px -75px" },
    { name: "14001", position: "-186px -75px" },
    { name: "19011", position: "-85px -265px" },
    { name: "27000", position: "-283px -265px" },
    { name: "45001", position: "-355px -75px" },
  ];

  return (
    <section className="flex flex-col items-center mt-14">
      <Title title="Selecciona la ISO" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 my-14">
        {isoList.map((iso, index) => (
          <Link
            to={`/caso/${iso.name}`}
            key={index}
            className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center hover:shadow-2xl transition-shadow cursor-pointer"
          >
            <div
              className="w-40 h-40 bg-no-repeat"
              style={{
                backgroundImage: `url('isos.png')`,
                backgroundPosition: iso.position,
                backgroundSize: "330%",
              }}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default App;
