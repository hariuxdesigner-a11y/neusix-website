// Keeps public/lottie/dotlottie-player.wasm in sync with the installed @lottiefiles/dotlottie-web version,
// so Lottie animations are rendered from this site (no third-party CDN).
import fs from "node:fs";
import path from "node:path";
const src = path.join("node_modules", "@lottiefiles", "dotlottie-web", "dist", "dotlottie-player.wasm");
if (fs.existsSync(src)) {
  fs.mkdirSync(path.join("public", "lottie"), { recursive: true });
  fs.copyFileSync(src, path.join("public", "lottie", "dotlottie-player.wasm"));
}
