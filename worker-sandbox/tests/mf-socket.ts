import { Miniflare } from "miniflare";
import { createServer } from "net";

export const server = createServer(function (socket) {
    socket.on('data', function (data) {
        socket.write(data, (err) => {
            console.error(err);
        });
    });
}).listen(8080);

export const mf = new Miniflare({
  scriptPath: "./build/worker/shim.mjs",
  compatibilityDate: "2024-12-05",
  modules: true,
  modulesRules: [
    { type: "CompiledWasm", include: ["**/*.wasm"], fallthrough: true },
  ],
  outboundService: {
    network: { allow: ["local"] }
  }
});

export const mfUrl = await mf.ready;
