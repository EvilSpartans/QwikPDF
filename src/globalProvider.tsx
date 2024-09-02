import { component$, createContextId, Slot, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';

export const GlobalContext = createContextId('global-context');

export const GlobalProvider = component$(() => {
  const store = useStore({
    user: null,           
  });

  useVisibleTask$(() => {
    const storedState = localStorage.getItem('appState');
    if (storedState) {
      Object.assign(store, JSON.parse(storedState));
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => store.user);
    localStorage.setItem('appState', JSON.stringify(store));
  });

  useContextProvider(GlobalContext, store);

  return (
    <Slot />
  );
});
