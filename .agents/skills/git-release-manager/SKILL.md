---
name: git-release-manager
description: >-
  Automates Git push, asset bundling/verification, semantic version tagging,
  and official GitHub Releases publication for the Dhaka College Science Club (DCSC) repository.
  Trigger whenever user asks to commit, push, upload to Git, or create releases.
---

# Git Release & Asset Automation Skill

## Overview
This skill enforces automated release management and asset verification for the `seadib/dcsc` repository. Whenever changes are committed and pushed to GitHub:
1. All newly added images, media assets, and static files in `image/`, `web/public/`, and `studio/` must be verified and tracked.
2. A Semantic Version bump (`patch`, `minor`, or `major`) is computed.
3. An annotated Git tag (`vX.Y.Z`) is created and pushed to GitHub.
4. An official **GitHub Release Object** is created and published via the GitHub API with detailed release notes and changelog.
5. `CHANGELOG.md` and `WORK_TRACKER.md` are continuously updated.

## Automated Execution Procedure

Whenever you need to commit and push changes:
1. **Stage files and commit**:
   ```bash
   git add .
   git commit -m "<type>(<scope>): <clear description>"
   ```

2. **Run the Release Automation Script**:
   ```bash
   python .agents/skills/git-release-manager/scripts/publish_release.py [patch|minor|major] "<Release Title>" "<Release Notes/Description>"
   ```

3. **Verify GitHub Release**:
   The script queries `https://api.github.com/repos/seadib/dcsc/releases` using the local Git Credential Manager token to confirm the release is live on:
   `https://github.com/seadib/dcsc/releases`

## Standardized Live Links Format
Every release note, announcement, and documentation MUST include the standardized live links block:

```markdown
### 🔗 Live Links:
- 🌐 **Live Website**: https://seadib.github.io/dcsc
- 🛠️ **Admin Dashboard**: https://dcsc.sanity.studio
- 💻 **Repository**: https://github.com/seadib/dcsc
```

## Versioning Standards
- `patch` (`v2.1.0` -> `v2.1.1`): Bug fixes, CSS styling fixes, documentation, small content edits.
- `minor` (`v2.1.0` -> `v2.2.0`): New feature, new page route, new schema, data migrations, component additions.
- `major` (`v2.x.x` -> `v3.0.0`): Architectural overhauls, framework upgrades, major breaking changes.
