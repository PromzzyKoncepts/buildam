import Image from "next/image";
import NavBar from "./components/NavBar";

export default function Home() {
  const avatars = [
    { name: "Alex Johnson", color: "#F59E0B", src:"/images/guy1.jpg" },
    { name: "Priya Kumar", color: "#EF4444", src:"/images/girl1.jpg" },
    { name: "Sam Lee", color: "#10B981", src:"/images/guy2.jpg" },
    { name: "Maya Gomez", color: "#3B82F6", src:"/images/girl2.jpg" },
    { name: "Liam Chen", color: "#A78BFA", src:"/images/guy3.jpg" },
  ];
  const totalWaitlist = 1245; // sample count; replace with dynamic value when available

  const initials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <div className="">
      <main className="">

        <Image src="/images/house3.jpg" width={2000} height={2000} alt="ai house" className="object-cover h-screen" />
        <section
          id="home"
          className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[70%] text-white flex flex-col items-center justify-center text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            The AI-powered software for <span className="text-amber-600 italic">everything</span> construction
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 italic mb-8 ">
           Plan Smarter, Build Faster, Save More!
          </p>
          <p className="text-lg md:text-lg text-gray-400 mb-8 ">
            Get accurate and instant cost estimates for your construction
            projects using our advanced AI technology.
          </p>

          <div className="flex flex-col py-5 px-10 bg-[#ffffff10] backdrop-blur-sm rounded-lg gap-4 ">
            <input
            autoFocus={true}
              type="email"
              placeholder="johndoe@example.com"
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-amber-900 rounded-md hover:bg-amber-700 text-white px-6 py-2  font-semibold">
              Join the waitlist
            </button>
          </div>

          {/* Avatars / waitlist count */}
          <div className="mt-4 flex flex-col items-center gap-4">
            <div className="flex -space-x-3">
              {avatars.map((a, i) => (
                <Image
                  key={a.name + i}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold object-cover object-top text-white border-2 border-white"
                  style={{ backgroundColor: a.color }}
                  title={a.name}
                  src={a.src}
                  alt={a.name}
                  width={40}
                  height={40}                  
                />
              ))}
            </div>

            <div className="text-sm text-gray-200">
              <span className="font-semibold">{totalWaitlist.toLocaleString()}+</span>
              <span className="ml-2 text-gray-300">builders already on the waitlist</span>
            </div>
          </div>
        </section>
      </main>

      <section className="h-screen bg-[#1F1121]">

      </section>
    </div>
  );
}
