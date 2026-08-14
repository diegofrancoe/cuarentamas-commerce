const membresiaFlag = import.meta.env.VITE_ENABLE_MEMBRESIA;

export const isMembresiaEnabled =
  typeof membresiaFlag === "string"
    ? membresiaFlag === "true"
    : true;
