import subprocess
import sys
import re
import os
import json
import urllib.request
import urllib.error
from datetime import datetime

REPO_OWNER = "seadib"
REPO_NAME = "dcsc"

STANDARDIZED_LIVE_LINKS = """### 🔗 Live Links:
- 🌐 **Live Website**: https://seadib.github.io/dcsc
- 🛠️ **Admin Dashboard**: https://dcsc.sanity.studio
- 💻 **Repository**: https://github.com/seadib/dcsc
"""


def run_cmd(cmd, check=True):
    p = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if check and p.returncode != 0:
        print(f"Error running '{cmd}':\n{p.stderr}")
        sys.exit(p.returncode)
    return p.stdout.strip()

def get_github_token():
    try:
        p = subprocess.Popen(['git', 'credential', 'fill'], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        stdout, _ = p.communicate(input=f'protocol=https\nhost=github.com\nusername={REPO_OWNER}\n\n')
        for line in stdout.splitlines():
            if line.startswith('password='):
                return line.split('=', 1)[1]
    except Exception as e:
        print(f"Warning: Failed to retrieve token from git credential manager: {e}")
    return os.environ.get("GITHUB_TOKEN")

def get_latest_tag():
    tags = [t.strip() for t in run_cmd("git tag -l --sort=-v:refname", check=False).splitlines() if re.match(r"^v?\d+\.\d+\.\d+$", t.strip())]
    if tags:
        return tags[0]
    return "v2.1.1"


def bump_version(current_tag, bump_type="patch"):
    m = re.match(r"^v?(\d+)\.(\d+)\.(\d+)$", current_tag)
    if not m:
        major, minor, patch = 2, 1, 0
    else:
        major, minor, patch = map(int, m.groups())
    
    if bump_type == "major":
        major += 1
        minor = 0
        patch = 0
    elif bump_type == "minor":
        minor += 1
        patch = 0
    else: # patch
        patch += 1
    
    return f"v{major}.{minor}.{patch}"

def publish_github_release(tag, title, notes, token):
    if not token:
        print("Error: No GitHub token available to publish release.")
        return False
    
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/releases"
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "DCSC-Release-Automation"
    }
    
    full_body = f"{STANDARDIZED_LIVE_LINKS.strip()}\n\n---\n\n### 📝 Release Details\n{notes}"

    payload = {
        "tag_name": tag,
        "target_commitish": "main",
        "name": f"{tag} — {title}",
        "body": full_body,
        "draft": False,
        "prerelease": False
    }

    
    req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print(f"SUCCESS! GitHub Release published: {data.get('html_url')}")
            return True
    except urllib.error.HTTPError as e:
        print(f"Failed to publish release ({e.code}): {e.read().decode('utf-8')}")
        return False
    except Exception as e:
        print(f"Error publishing release: {e}")
        return False

def update_changelog_and_tracker(tag, title, notes):
    now_str = datetime.now().strftime("%Y-%m-%d")
    changelog_path = os.path.join(os.getcwd(), "CHANGELOG.md")
    entry = f"\n\n## [{tag}] - {now_str}\n### {title}\n{notes}\n"
    
    if os.path.exists(changelog_path):
        with open(changelog_path, "r", encoding="utf-8") as f:
            old_content = f.read()
        with open(changelog_path, "w", encoding="utf-8") as f:
            f.write(entry + old_content)
    else:
        with open(changelog_path, "w", encoding="utf-8") as f:
            f.write(f"# Changelog\n{entry}")

def main():
    bump_type = sys.argv[1] if len(sys.argv) > 1 else "patch"
    title = sys.argv[2] if len(sys.argv) > 2 else "Automated Update and Asset Sync"
    notes = sys.argv[3] if len(sys.argv) > 3 else "Routine maintenance, asset synchronization, and feature updates."
    
    print(f"--- DCSC Git Release Manager ---")
    current_tag = get_latest_tag()
    new_tag = bump_version(current_tag, bump_type)
    print(f"Bumping version: {current_tag} -> {new_tag} ({bump_type})")
    
    # Verify assets status
    print("Verifying repository assets...")
    img_count = len(os.listdir(r"X:\image")) if os.path.exists(r"X:\image") else 0
    print(f"Found {img_count} assets in image/ directory.")
    
    # Create git tag
    print(f"Creating Git tag {new_tag}...")
    run_cmd(f'git tag -a {new_tag} -m "{title}"')
    
    # Push commit and tag to GitHub
    print("Pushing commits and tags to GitHub remote 'origin'...")
    run_cmd("git push origin main")
    run_cmd(f"git push origin {new_tag}")
    
    # Publish GitHub Release
    token = get_github_token()
    print("Publishing official GitHub Release Object...")
    publish_github_release(new_tag, title, notes, token)
    
    # Update local changelog
    update_changelog_and_tracker(new_tag, title, notes)
    print(f"All done! Release {new_tag} is now live on GitHub.")

if __name__ == "__main__":
    main()
