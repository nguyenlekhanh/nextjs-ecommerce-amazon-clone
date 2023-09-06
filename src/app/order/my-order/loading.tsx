import { BeatLoader } from "react-spinners";

export default function loading() {
  return (
      // <main className="bg-slate-200 mx-auto max-w-lg p-1 min-h-screen">
      //     <h2 className="m-4 text-2xl font-bold">Loading...</h2>
      // </main>
    <div className="w-full flex flex-col gap-6 items-center justify-center py-20">
      <p>Your product is loading...</p>
      <BeatLoader color="#131921" size={40} />
    </div>
  )
}