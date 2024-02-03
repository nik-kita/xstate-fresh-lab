import Traffic from "../islands/Traffic.tsx";

export default function Home() {
  return (
    <div class="h-screen px-4 py-8 mx-auto bg-slate-500">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <Traffic />
      </div>
    </div>
  );
}
