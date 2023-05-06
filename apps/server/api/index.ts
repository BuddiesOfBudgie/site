import { server } from "./server";
import { startStandaloneServer } from "@apollo/server/standalone";

const port = process.env.PORT ? Number(process.env.PORT) : 4000;

startStandaloneServer(server, {
  listen: { port },
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
