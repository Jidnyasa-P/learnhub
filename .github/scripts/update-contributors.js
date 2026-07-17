const fs = require('fs');
const path = require('path');

const README_PATH = path.join(__dirname, '../../README.md');

function getContributionType(prPayload) {
  const pr = prPayload.pull_request;
  const labels = (pr.labels || []).map(l => l.name.toLowerCase());
  
  if (labels.some(l => l.includes('frontend') || l.includes('ui') || l.includes('css') || l.includes('design') || l.includes('style'))) {
    return '🎨 Frontend';
  }
  if (labels.some(l => l.includes('design') || l.includes('ux'))) {
    return '🎨 Design';
  }
  if (labels.some(l => l.includes('backend') || l.includes('api') || l.includes('database') || l.includes('db') || l.includes('server'))) {
    return '💻 Code';
  }
  if (labels.some(l => l.includes('docs') || l.includes('documentation') || l.includes('readme') || l.includes('wiki'))) {
    return '📖 Docs';
  }
  if (labels.some(l => l.includes('bug') || l.includes('fix') || l.includes('hotfix') || l.includes('patch'))) {
    return '🐛 Bug fix';
  }
  if (labels.some(l => l.includes('test') || l.includes('testing') || l.includes('spec') || l.includes('jest') || l.includes('pytest'))) {
    return '🧪 Tests';
  }
  if (labels.some(l => l.includes('performance') || l.includes('speed') || l.includes('perf'))) {
    return '⚡ Performance';
  }
  if (labels.some(l => l.includes('security') || l.includes('vuln') || l.includes('auth'))) {
    return '🔒 Security';
  }
  if (labels.some(l => l.includes('infra') || l.includes('ci') || l.includes('cd') || l.includes('workflow') || l.includes('docker') || l.includes('github-actions'))) {
    return '🚇 Infrastructure';
  }
  if (labels.some(l => l.includes('accessibility') || l.includes('a11y'))) {
    return '♿ Accessibility';
  }
  
  // Fallback to title matching
  const title = (pr.title || '').toLowerCase();
  if (title.startsWith('feat') || title.includes('frontend') || title.includes('ui')) {
    if (title.includes('frontend') || title.includes('ui')) return '🎨 Frontend';
    if (title.includes('design')) return '🎨 Design';
    if (title.includes('docs') || title.includes('readme')) return '📖 Docs';
    if (title.includes('test')) return '🧪 Tests';
    if (title.includes('perf')) return '⚡ Performance';
    if (title.includes('security') || title.includes('auth')) return '🔒 Security';
    if (title.includes('infra') || title.includes('workflow') || title.includes('github action')) return '🚇 Infrastructure';
    return '💻 Code';
  }
  if (title.startsWith('fix') || title.includes('bug')) {
    return '🐛 Bug fix';
  }
  if (title.startsWith('docs')) {
    return '📖 Docs';
  }
  if (title.startsWith('test')) {
    return '🧪 Tests';
  }
  
  return '💻 Code';
}

function parseExistingContributors(sectionContent) {
  const contributors = [];
  const regex = /<td align="center">\s*<a href="https:\/\/github\.com\/([^"]+)">\s*<img src="([^"]+)"[^>]*\/>\s*<br \/>\s*<sub><b>([^<]+)<\/b><\/sub>\s*<br \/>\s*<sub>([^<]+)<\/sub>\s*<\/a>\s*<\/td>/gi;
  
  let match;
  while ((match = regex.exec(sectionContent)) !== null) {
    contributors.push({
      username: match[1].trim(),
      avatarUrl: match[2].trim(),
      name: match[3].trim(),
      role: match[4].trim()
    });
  }
  return contributors;
}

function generateTableHTML(contributors) {
  const columnsPerRow = 5;
  let html = '\n<div align="center">\n\n<table>\n  <tbody>\n';
  
  for (let i = 0; i < contributors.length; i += columnsPerRow) {
    html += '    <tr>\n';
    const chunk = contributors.slice(i, i + columnsPerRow);
    for (const c of chunk) {
      html += `      <td align="center">
        <a href="https://github.com/${c.username}">
          <img src="${c.avatarUrl}" width="80px" />
          <br />
          <sub><b>${c.name}</b></sub>
          <br />
          <sub>${c.role}</sub>
        </a>
      </td>\n`;
    }
    html += '    </tr>\n';
  }
  
  html += '  </tbody>\n</table>\n\n</div>\n';
  return html;
}

async function main() {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (!eventPath) {
    console.error('Error: GITHUB_EVENT_PATH not set.');
    process.exit(1);
  }

  let eventPayload;
  try {
    eventPayload = JSON.parse(fs.readFileSync(eventPath, 'utf8'));
  } catch (err) {
    console.error('Error reading event payload:', err.message);
    process.exit(1);
  }

  const pr = eventPayload.pull_request;
  if (!pr) {
    console.error('Error: Event payload is missing pull_request info.');
    process.exit(1);
  }

  // Handle Bot accounts
  const username = pr.user.login;
  const isBot = pr.user.type === 'Bot' || username.toLowerCase().endsWith('[bot]') || username.toLowerCase() === 'github-actions';
  if (isBot) {
    console.log(`Skipping bot contributor: ${username}`);
    process.exit(0);
  }

  const avatarUrl = `https://github.com/${username}.png`;
  let name = username; // Default to username

  // Fetch real profile name from GitHub API (authenticated if GITHUB_TOKEN is available)
  const headers = { 'User-Agent': 'learnhub-contributors-automation' };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`, { headers });
    if (response.ok) {
      const userData = await response.json();
      if (userData.name) {
        name = userData.name;
        console.log(`Fetched display name: "${name}" for user ${username}`);
      }
    } else {
      console.warn(`GitHub API returned status ${response.status} when fetching profile for ${username}`);
    }
  } catch (err) {
    console.warn(`Failed to fetch user profile name from GitHub API, using username instead: ${err.message}`);
  }

  const role = getContributionType(eventPayload);

  // Read README
  if (!fs.existsSync(README_PATH)) {
    console.error(`Error: README.md not found at ${README_PATH}`);
    process.exit(1);
  }

  let readmeContent = fs.readFileSync(README_PATH, 'utf8');

  // Locate the contributors section
  const startComment = '<!-- CONTRIBUTORS-START -->';
  const endComment = '<!-- CONTRIBUTORS-END -->';

  const startIndex = readmeContent.indexOf(startComment);
  const endIndex = readmeContent.indexOf(endComment);

  if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
    console.error('Error: Contributors placeholder comments not found in README.md.');
    process.exit(1);
  }

  const sectionContent = readmeContent.substring(startIndex + startComment.length, endIndex);
  const contributors = parseExistingContributors(sectionContent);

  // Check for duplicates
  const alreadyExists = contributors.some(c => c.username.toLowerCase() === username.toLowerCase());
  if (alreadyExists) {
    console.log(`Contributor ${username} already exists in README.md. Skipping.`);
    process.exit(0);
  }

  // Add new contributor
  contributors.push({
    username,
    avatarUrl,
    name,
    role
  });

  console.log(`Adding new contributor: ${username} with role: ${role}`);

  // Generate new HTML table
  const newTableHTML = generateTableHTML(contributors);

  // Construct new README content
  const updatedReadmeContent = 
    readmeContent.substring(0, startIndex + startComment.length) +
    newTableHTML +
    readmeContent.substring(endIndex);

  fs.writeFileSync(README_PATH, updatedReadmeContent, 'utf8');
  console.log('README.md successfully updated.');
}

if (require.main === module) {
  main();
}

module.exports = {
  getContributionType,
  parseExistingContributors,
  generateTableHTML
};
