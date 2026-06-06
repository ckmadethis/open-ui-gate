import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { test } from "node:test";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const bin = join(root, "bin", "open-ui-gate.mjs");

function run(args) {
  return new Promise((resolve) => {
    execFile(process.execPath, [bin, ...args], { cwd: root }, (error, stdout, stderr) => {
      resolve({
        code: error?.code ?? 0,
        stdout,
        stderr
      });
    });
  });
}

test("good fixture passes", async () => {
  const result = await run(["scan", "--path", "fixtures/good-ui", "--fail-on", "warn"]);

  assert.equal(result.code, 0);
  assert.match(result.stdout, /PASS: no findings/);
});

test("bad fixture fails on warnings", async () => {
  const result = await run(["scan", "--path", "fixtures/bad-ui", "--fail-on", "warn"]);

  assert.equal(result.code, 1);
  assert.match(result.stdout, /\[ERROR\] placeholder-content/);
  assert.match(result.stdout, /\[WARN\] purple-gradient-default/);
  assert.equal((result.stdout.match(/purple-gradient-default/g) || []).length, 1);
});

test("json output is machine readable", async () => {
  const result = await run(["scan", "--path", "fixtures/bad-ui", "--format", "json", "--fail-on", "error"]);
  const payload = JSON.parse(result.stdout);

  assert.equal(result.code, 1);
  assert.equal(payload.filesScanned, 1);
  assert.ok(payload.findings.some((finding) => finding.rule === "missing-image-alt"));
});

test("invalid format returns usage error", async () => {
  const result = await run(["scan", "--path", "fixtures/good-ui", "--format", "yaml"]);

  assert.equal(result.code, 2);
  assert.match(result.stderr, /--format must be text or json/);
});
