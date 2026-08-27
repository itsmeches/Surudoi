import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const cleanScript = path.join(__dirname, "clean-next-cache.mjs");
const nextBin = path.join(rootDir, "node_modules", "next", "dist", "bin", "next");

const nextCommand = process.argv[2];
const nextArgs = process.argv.slice(3);

if (!nextCommand || !["dev", "build", "start"].includes(nextCommand)) {
  console.error("Usage: node scripts/next-runner.mjs <dev|build|start> [...args]");
  process.exit(1);
}

const MAX_ATTEMPTS = nextCommand === "start" ? 1 : 3;

const runNodeProcess = (scriptPath, args = []) =>
  new Promise((resolve) => {
    const child = spawn(process.execPath, [scriptPath, ...args], {
      cwd: rootDir,
      stdio: "inherit",
      env: process.env,
    });

    child.on("exit", (code) => resolve(code ?? 1));
  });

const runNext = () =>
  new Promise((resolve) => {
    let combinedOutput = "";

    const child = spawn(process.execPath, [nextBin, nextCommand, ...nextArgs], {
      cwd: rootDir,
      env: process.env,
      stdio: ["inherit", "pipe", "pipe"],
    });

    child.stdout.on("data", (chunk) => {
      const text = chunk.toString();
      combinedOutput += text;
      process.stdout.write(text);
    });

    child.stderr.on("data", (chunk) => {
      const text = chunk.toString();
      combinedOutput += text;
      process.stderr.write(text);
    });

    child.on("exit", (code) => {
      resolve({ code: code ?? 1, combinedOutput });
    });
  });

const isTraceLockError = (output) => /EPERM: operation not permitted, open '.*trace'/.test(output);

for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
  if (attempt > 1) {
    console.warn(`[next-runner] Retrying ${nextCommand} after trace lock failure (attempt ${attempt}/${MAX_ATTEMPTS})...`);
  }

  if (nextCommand !== "start") {
    await runNodeProcess(cleanScript);
  }

  const result = await runNext();

  if (result.code === 0 || !isTraceLockError(result.combinedOutput) || attempt === MAX_ATTEMPTS) {
    process.exit(result.code);
  }
}
