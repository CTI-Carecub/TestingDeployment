/**
 * Intentionally vulnerable API route for CodeQL testing.
 * DO NOT use in production.
 */

import { exec } from "node:child_process";
import fs from "node:fs";
import { type NextRequest, NextResponse } from "next/server";

// ❌ CWE-78: OS Command Injection
// CodeQL: js/command-line-injection
export async function GET(req: NextRequest) {
  const filename = req.nextUrl.searchParams.get("file") ?? "";

  // User input flows directly into exec() — command injection
  exec(`cat ${filename}`, (err, stdout) => {
    console.log(stdout);
  });

  return NextResponse.json({ ok: true });
}

// ❌ CWE-22: Path Traversal
// CodeQL: js/path-injection
export async function POST(req: NextRequest) {
  const body = await req.json();
  const userPath = body.path as string;

  // No sanitization — attacker can supply "../../etc/passwd"
  const contents = fs.readFileSync(userPath, "utf8");

  return NextResponse.json({ contents });
}

// ❌ CWE-89: SQL Injection (illustrative — no DB wired up)
// CodeQL: js/sql-injection
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const username = body.username as string;

  // String concatenation into a query — classic SQL injection
  const query = `SELECT * FROM users WHERE name = '${username}'`;
  console.log("Running query:", query);

  return NextResponse.json({ query });
}
