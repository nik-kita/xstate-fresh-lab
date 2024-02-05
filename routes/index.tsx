import Car from "../islands/Car.tsx";
import Traffic from "../islands/Traffic.tsx";
import UiWrapper from "../islands/UiWrapper.tsx";

export default function Home() {
  return (
    <UiWrapper>
      <div class="px-4 py-8 mx-auto bg-pink-200">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <img
            class="my-6"
            src="/logo.svg"
            width="128"
            height="128"
            alt="the Fresh logo: a sliced lemon dripping with juice"
          />
          <Traffic />
          <Car />
        </div>
      </div>
    </UiWrapper>
  );
}
