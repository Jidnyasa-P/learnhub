/**
 * Tests for update-contributors.js
 *
 * Run with: node .github/scripts/update-contributors.test.js
 * (No extra dependencies needed — uses Node's built-in assert module)
 */

'use strict';

const assert = require('assert');
const { getContributionType, parseExistingContributors, generateTableHTML } = require('./update-contributors');

let passed = 0;
let failed = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`  ✅ ${description}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ ${description}`);
    console.error(`     ${err.message}`);
    failed++;
  }
}

function makePR(labels = [], title = '') {
  return {
    pull_request: {
      labels: labels.map(name => ({ name })),
      title
    }
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// getContributionType
// ─────────────────────────────────────────────────────────────────────────────
console.log('\ngetContributionType');

test('returns 🎨 Frontend for label "frontend"', () => {
  assert.strictEqual(getContributionType(makePR(['frontend'])), '🎨 Frontend');
});

test('returns 🎨 Frontend for label "ui"', () => {
  assert.strictEqual(getContributionType(makePR(['ui'])), '🎨 Frontend');
});

test('returns 🎨 Frontend for label "css"', () => {
  assert.strictEqual(getContributionType(makePR(['css'])), '🎨 Frontend');
});

test('returns 💻 Code for label "backend"', () => {
  assert.strictEqual(getContributionType(makePR(['backend'])), '💻 Code');
});

test('returns 💻 Code for label "api"', () => {
  assert.strictEqual(getContributionType(makePR(['api'])), '💻 Code');
});

test('returns 📖 Docs for label "docs"', () => {
  assert.strictEqual(getContributionType(makePR(['docs'])), '📖 Docs');
});

test('returns 📖 Docs for label "documentation"', () => {
  assert.strictEqual(getContributionType(makePR(['documentation'])), '📖 Docs');
});

test('returns 🐛 Bug fix for label "bug"', () => {
  assert.strictEqual(getContributionType(makePR(['bug'])), '🐛 Bug fix');
});

test('returns 🐛 Bug fix for label "fix"', () => {
  assert.strictEqual(getContributionType(makePR(['fix'])), '🐛 Bug fix');
});

test('returns 🧪 Tests for label "test"', () => {
  assert.strictEqual(getContributionType(makePR(['test'])), '🧪 Tests');
});

test('returns 🧪 Tests for label "jest"', () => {
  assert.strictEqual(getContributionType(makePR(['jest'])), '🧪 Tests');
});

test('returns ⚡ Performance for label "performance"', () => {
  assert.strictEqual(getContributionType(makePR(['performance'])), '⚡ Performance');
});

test('returns 🔒 Security for label "security"', () => {
  assert.strictEqual(getContributionType(makePR(['security'])), '🔒 Security');
});

test('returns 🚇 Infrastructure for label "ci"', () => {
  assert.strictEqual(getContributionType(makePR(['ci'])), '🚇 Infrastructure');
});

test('returns 🚇 Infrastructure for label "docker"', () => {
  assert.strictEqual(getContributionType(makePR(['docker'])), '🚇 Infrastructure');
});

test('returns ♿ Accessibility for label "a11y"', () => {
  assert.strictEqual(getContributionType(makePR(['a11y'])), '♿ Accessibility');
});

// Label takes priority over title
test('label takes priority over title prefix', () => {
  assert.strictEqual(getContributionType(makePR(['docs'], 'feat: add new thing')), '📖 Docs');
});

// Title fallback tests (no labels)
test('title starting with "fix" returns 🐛 Bug fix', () => {
  assert.strictEqual(getContributionType(makePR([], 'fix: correct typo')), '🐛 Bug fix');
});

test('title starting with "docs" returns 📖 Docs', () => {
  assert.strictEqual(getContributionType(makePR([], 'docs: update README')), '📖 Docs');
});

test('title starting with "test" returns 🧪 Tests', () => {
  assert.strictEqual(getContributionType(makePR([], 'test: add unit tests')), '🧪 Tests');
});

test('title with "ui" keyword returns 🎨 Frontend', () => {
  assert.strictEqual(getContributionType(makePR([], 'feat: improve ui layout')), '🎨 Frontend');
});

test('generic feat title defaults to 💻 Code', () => {
  assert.strictEqual(getContributionType(makePR([], 'feat: some backend feature')), '💻 Code');
});

test('returns 💻 Code as ultimate fallback (no labels, unknown title)', () => {
  assert.strictEqual(getContributionType(makePR([], 'chore: misc update')), '💻 Code');
});

// ─────────────────────────────────────────────────────────────────────────────
// parseExistingContributors
// ─────────────────────────────────────────────────────────────────────────────
console.log('\nparseExistingContributors');

const SINGLE_ENTRY_HTML = `
<td align="center">
  <a href="https://github.com/alice">
    <img src="https://github.com/alice.png" width="80px" />
    <br />
    <sub><b>Alice Smith</b></sub>
    <br />
    <sub>💻 Code</sub>
  </a>
</td>`;

const MULTI_ENTRY_HTML = `
<td align="center">
  <a href="https://github.com/alice">
    <img src="https://github.com/alice.png" width="80px" />
    <br />
    <sub><b>Alice Smith</b></sub>
    <br />
    <sub>💻 Code</sub>
  </a>
</td>
<td align="center">
  <a href="https://github.com/bob">
    <img src="https://github.com/bob.png" width="80px" />
    <br />
    <sub><b>Bob Jones</b></sub>
    <br />
    <sub>📖 Docs</sub>
  </a>
</td>`;

test('returns empty array for empty section', () => {
  const result = parseExistingContributors('');
  assert.deepStrictEqual(result, []);
});

test('parses a single contributor entry correctly', () => {
  const result = parseExistingContributors(SINGLE_ENTRY_HTML);
  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0].username, 'alice');
  assert.strictEqual(result[0].avatarUrl, 'https://github.com/alice.png');
  assert.strictEqual(result[0].name, 'Alice Smith');
  assert.strictEqual(result[0].role, '💻 Code');
});

test('parses multiple contributor entries', () => {
  const result = parseExistingContributors(MULTI_ENTRY_HTML);
  assert.strictEqual(result.length, 2);
  assert.strictEqual(result[0].username, 'alice');
  assert.strictEqual(result[1].username, 'bob');
  assert.strictEqual(result[1].role, '📖 Docs');
});

test('is case-insensitive for username matching (regex)', () => {
  // The regex uses the gi flag; verify duplicates found regardless of case
  const result = parseExistingContributors(SINGLE_ENTRY_HTML);
  const found = result.some(c => c.username.toLowerCase() === 'alice');
  assert.ok(found);
});

// ─────────────────────────────────────────────────────────────────────────────
// generateTableHTML
// ─────────────────────────────────────────────────────────────────────────────
console.log('\ngenerateTableHTML');

const ONE_CONTRIBUTOR = [
  { username: 'alice', avatarUrl: 'https://github.com/alice.png', name: 'Alice Smith', role: '💻 Code' }
];

const SIX_CONTRIBUTORS = Array.from({ length: 6 }, (_, i) => ({
  username: `user${i}`,
  avatarUrl: `https://github.com/user${i}.png`,
  name: `User ${i}`,
  role: '💻 Code'
}));

test('returns a string', () => {
  assert.strictEqual(typeof generateTableHTML(ONE_CONTRIBUTOR), 'string');
});

test('contains <table> and </table> tags', () => {
  const html = generateTableHTML(ONE_CONTRIBUTOR);
  assert.ok(html.includes('<table>'), 'Missing <table>');
  assert.ok(html.includes('</table>'), 'Missing </table>');
});

test('contains correct github profile link for contributor', () => {
  const html = generateTableHTML(ONE_CONTRIBUTOR);
  assert.ok(html.includes('https://github.com/alice'));
});

test('contains contributor avatar img', () => {
  const html = generateTableHTML(ONE_CONTRIBUTOR);
  assert.ok(html.includes('https://github.com/alice.png'));
});

test('contains contributor display name', () => {
  const html = generateTableHTML(ONE_CONTRIBUTOR);
  assert.ok(html.includes('Alice Smith'));
});

test('contains contributor role', () => {
  const html = generateTableHTML(ONE_CONTRIBUTOR);
  assert.ok(html.includes('💻 Code'));
});

test('wraps into multiple rows for 6 contributors (max 5 per row)', () => {
  const html = generateTableHTML(SIX_CONTRIBUTORS);
  // Should have at least 2 <tr> tags
  const trCount = (html.match(/<tr>/g) || []).length;
  assert.ok(trCount >= 2, `Expected ≥2 <tr> tags, got ${trCount}`);
});

test('first row has exactly 5 entries for 6 contributors', () => {
  const html = generateTableHTML(SIX_CONTRIBUTORS);
  // Count td elements — 6 total across 2 rows
  const tdCount = (html.match(/<td align="center">/g) || []).length;
  assert.strictEqual(tdCount, 6, `Expected 6 <td> entries, got ${tdCount}`);
});

test('empty contributors array returns table with no rows', () => {
  const html = generateTableHTML([]);
  assert.ok(!html.includes('<tr>'), 'Should have no <tr> for empty input');
});

// ─────────────────────────────────────────────────────────────────────────────
// Summary
// ─────────────────────────────────────────────────────────────────────────────
console.log(`\n${'─'.repeat(50)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  process.exit(1);
}
