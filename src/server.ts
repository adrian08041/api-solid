import { env } from ".";
import { app } from "./app";

app
  .listen({
    port: env.PORT,

    //  passar este host para que nao tenha problemas quando for consumir no frontend
    host: "0.0.0.0",
  })
  .then(() => {
    console.log(" 🚀 HTTP server running!");
  });
