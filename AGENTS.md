# Antigravity Agent Guidelines for Dhaka College Science Club (DCSC)

## Mandatory Git Release & Asset Management Policy

Whenever you commit and push changes to GitHub (`seadib/dcsc`), you **MUST ALWAYS** execute the automated release and asset management workflow:

1. **Asset Verification**: Ensure all media assets in `image/`, `web/public/`, and `studio/` are properly tracked, linked, or migrated to Sanity CDN.
2. **Version Bumping**: Determine the semantic version increment:
   - `patch` for bug fixes, styling adjustments, content tweaks.
   - `minor` for new features, new pages, schema additions, or new data models.
   - `major` for architecture or framework overhauls.
3. **Automated Release Execution**:
   Run the release manager script:
   ```bash
   python .agents/skills/git-release-manager/scripts/publish_release.py [patch|minor|major] "<Release Title>" "<Release Notes>"
   ```
4. **Mandatory Live Links Format**:
   Ensure every release notes and documentation always contains the standardized live links:
   ```markdown
   ### 🔗 Live Links:
   - 🌐 **Live Website**: https://seadib.github.io/dcsc
   - 🛠️ **Admin Dashboard**: https://dcsc.sanity.studio
   - 💻 **Repository**: https://github.com/seadib/dcsc
   ```
5. **GitHub Releases Synchronization**: Confirm that the release object is published on `https://github.com/seadib/dcsc/releases` with download assets and comprehensive notes.
