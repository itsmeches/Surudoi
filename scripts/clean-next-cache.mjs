import { rm } from "node:fs/promises";
import path from "node:path";

const TARGETS = [".next", ".next-dev"];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function safeRemove(targetPath) {
  const absolutePath = path.resolve(process.cwd(), targetPath);

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      await rm(absolutePath, { recursive: true, force: true });
      return;
    } catch (error) {
      const code = error && typeof error === "object" && "code" in error ? error.code : "UNKNOWN";
      const retriable = code === "EPERM" || code === "EACCES" || code === "EBUSY";

      if (!retriable || attempt === 2) {
        console.warn(`[predev] Skipped removing ${targetPath}: ${String(code)}`);
        return;
      }

      await wait(180 * (attempt + 1));
    }
  }
}

await Promise.all(TARGETS.map((target) => safeRemove(target)));
