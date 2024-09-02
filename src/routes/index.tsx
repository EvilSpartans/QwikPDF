import { component$ } from "@builder.io/qwik";

import Hero from "~/components/widgets/Hero";
import Steps from "~/components/widgets/Steps";

export default component$(() => {
  return (
    <>
      <Hero />
      <Steps />
    </>
  );
});
