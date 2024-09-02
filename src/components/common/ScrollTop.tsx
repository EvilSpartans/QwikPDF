import { component$, useVisibleTask$, useStore, $ } from '@builder.io/qwik';

export const ScrollTopButton = component$(() => {
  const state = useStore({ isVisible: false });

  useVisibleTask$(() => {
    const handleScroll = () => {
      state.isVisible = window.scrollY > 300;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const scrollToTop = $(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  return (
    <button
      onClick$={scrollToTop}
      class={`
        fixed bottom-4 right-4 p-3 rounded-full 
        bg-blue-500 text-white dark:bg-yellow-400 dark:text-gray-900 
        shadow-lg transition-opacity duration-300 
        ${state.isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      aria-label="Scroll to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
});
