import packageJson from "../../../package.json";

export const VERSION = packageJson.version;
export const CLIENT_WS_ROOT =
  process.env.NEXT_PUBLIC_WS_ROOT ?? "ws://localhost:8000";

console.log("CLIENT_WS_ROOT", CLIENT_WS_ROOT);
console.log("VERSION", VERSION);

export function getServerEnv() {
  const API_ROOT = process.env.API_ROOT ?? "http://127.0.0.1:8000";
  const API_ROOT_V1 = `${API_ROOT}/v1`;
  const NODE_ENV = process.env.NODE_ENV ?? "production";

  console.log("API_ROOT", API_ROOT);
  console.log("API_ROOT_V1", API_ROOT_V1);
  console.log("NODE_ENV", NODE_ENV);

  return {
    API_ROOT,
    API_ROOT_V1,
    IS_DEV: NODE_ENV === "development",
  };
}
