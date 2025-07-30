process.on("unhandledRejection", (reason) => {
  console.error("Rejeição não tratada:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Exceção não capturada:", error);
});

