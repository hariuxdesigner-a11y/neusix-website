// Makes .next/standalone fully self-contained (static assets + public files), so it can be
// run with `node .next/standalone/server.js` on any Node host, including Hostinger.
import fs from "node:fs";
const sa = ".next/standalone";
if (fs.existsSync(sa)) {
  fs.cpSync("public", `${sa}/public`, { recursive: true });
  fs.cpSync(".next/static", `${sa}/.next/static`, { recursive: true });
  // server-side content files read at runtime (on-site blog markdown)
  fs.cpSync("src/content/blog", `${sa}/src/content/blog`, { recursive: true });
  console.log("postbuild: standalone bundle ready");
}
