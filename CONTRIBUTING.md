# Contributing to LearnHub

First off, thank you for taking the time to contribute to LearnHub! 🎉 Contributions make the open-source community an amazing place to learn, inspire, and create.

To maintain a healthy and productive community, please follow these guidelines when contributing.

## Table of Contents
- [How to Participate](#how-to-participate)
- [Branch Naming Convention](#branch-naming-convention)
- [Local Development Setup](#local-development-setup)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Assignment Policy](#issue-assignment-policy)
- [Code Style and Quality](#code-style-and-quality)

---

## How to Participate

1. **Fork the Repository**: Create a personal copy of the repository on your GitHub account.
2. **Clone the Fork**: Clone your fork locally to begin working.
   ```bash
   git clone https://github.com/YOUR_USERNAME/learnhub.git
   cd learnhub
   ```
3. **Set Up Upstream Remote**: Keep your fork synced with the main repository.
   ```bash
   git remote add upstream https://github.com/udaycodespace/learnhub.git
   ```

## Branch Naming Convention

Create a descriptive branch for your changes using the following prefix conventions:
- `feat/` for new features (e.g., `feat/interactive-quizzes`)
- `fix/` for bug fixes (e.g., `fix/jwt-auth-expiration`)
- `docs/` for documentation updates (e.g., `docs/add-contributing-guide`)
- `refactor/` for code restructuring (e.g., `refactor/user-controller-optimization`)
- `test/` for adding or correcting tests (e.g., `test/admin-auth`)
- `chore/` for build tasks, package updates, etc. (e.g., `chore/dependency-updates`)

## Local Development Setup

Please refer to the [Local Setup Steps in the README](file:///README.md#-getting-started) to run the frontend and backend of LearnHub locally.

## Commit Message Guidelines

We follow the **Conventional Commits** specification. Commit messages should look like this:

```
<type>(<scope>): <short description>
```

### Allowed Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools/libraries

*Example:* `feat(auth): add google oauth registration`

## Pull Request Process

1. **Link an Issue**: Every PR must link to an open, assigned issue (e.g., `Closes #123` or `Fixes #456`).
2. **Keep PRs Focused**: One PR per issue. Do not bundle unrelated changes.
3. **No Unassigned PRs**: Ensure you are assigned to the issue before working on it. Unassigned PRs may be closed.
4. **Self-Review**: Review your own code changes, check for console logs, and verify there are no lint/build errors.

## Issue Assignment Policy

To work on an issue, express your interest in the issue comment section using the automated command:
- Comment `/assign` to self-assign (if the issue has no assignees yet).
- To prevent hoarding, contributors are limited to **2 concurrent open issues**.
- Active assignments are valid for **7 days**. A warning comment will be posted at day 5, and if no linked PR is submitted by day 7, the issue is unassigned to keep progress moving.

## Code Style and Quality

- **Linter**: Follow standard JavaScript/React ESLint rules defined in the frontend package.
- **No Console Errors**: Verify that your contributions do not print console errors or debug warnings.
- **No Unused Code**: Clean up commented-out draft blocks and unused imports before submitting.
