import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const config = JSON.parse(fs.readFileSync(path.join(root, "tests", "project.config.json"), "utf8"));
const source = fs.readFileSync(path.join(root, "contracts", config.file), "utf8");

function methodBody(name) {
  const marker = `    def ${name}(`;
  const start = source.indexOf(marker);
  assert.notEqual(start, -1, `missing method ${name}`);
  const candidates = [
    source.indexOf("\n    @gl.public.", start + marker.length),
    source.indexOf("\n    def ", start + marker.length),
    source.indexOf("\nclass ", start + marker.length),
  ].filter(index => index >= 0);
  return source.slice(start, candidates.length ? Math.min(...candidates) : source.length);
}

test("contract uses native GenLayer reasoning", () => {
  assert.match(source, /class\s+RecallLoop\(gl\.Contract\)/);
  assert.match(source, /gl\.nondet\.web\.render/);
  assert.match(source, /gl\.nondet\.exec_prompt/);
  assert.match(source, /gl\.(?:vm\.run_nondet_unsafe|eq_principle\.prompt_comparative)/);
  assert.match(source, /gl\.eq_principle\.prompt_comparative/);
  assert.match(source, /prompt.inject/i);
  assert.match(source, /Validator-local rendered evidence/);
  assert.match(source, /CHALLENGE_WINDOW_SECONDS/);
});

test("authority and settlement invariants are explicit", () => {
  for (const name of ["configure_protocol", "add_evidence", "add_affected_lot", "add_distribution_destination", "review_with_genlayer", "finalize_case", "archive_case"]) {
    assert.match(methodBody(name), /_require_(admin|operator)/, `${name} must enforce authority`);
  }
  assert.match(methodBody("review_with_genlayer"), /_has_open_filings/);
  assert.match(methodBody("finalize_case"), /open_filing/);
  assert.match(methodBody("submit_challenge"), /challenge_window_closed/);
  assert.match(methodBody("submit_appeal"), /challenge_required/);
  assert.match(methodBody("resolve_challenge_with_genlayer"), /challenge_already_resolved/);
  assert.match(methodBody("resolve_appeal_with_genlayer"), /appeal_already_resolved/);
  assert.match(methodBody("expire_challenge"), /challenge_period_active/);
  assert.match(methodBody("expire_appeal"), /appeal_period_active/);
  assert.match(methodBody("finalize_case"), /challenge_period_active/);
});

test("the product recall containment operations surface is complete", () => {
  for (const method of [
    "open_recall", "assess_containment_with_genlayer", "archive_recall",
    "get_recall_count", "get_recall", "add_affected_lot", "add_distribution_destination",
    "get_lots", "get_destinations", "get_frontend_bootstrap",
  ]) assert.ok(methodBody(method).length > 20, `missing ${method}`);
  assert.match(source, /ACTIVE|ASSESSING|ASSESSED|OBJECTION_WINDOW|APPEALED|CLOSED|ARCHIVED/);
  assert.match(source, /pending|contained|uncontained|indeterminate/);
});
