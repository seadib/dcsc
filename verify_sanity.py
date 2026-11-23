import urllib.request
import urllib.parse
import json

TOKEN = "skUEDWBnoWXxrlzxN7t1XkDDR4J4iMsSZ8bQDuTBrvfuUSaGC0OdkVreUoqXn0CD3I1QfQATs6NNc6sL542lzahV0JF8BrMN3AH20Olbdio0cYpdTZ6c2snwBHehuFH5oD61oXIXTAlSVLMo0zaNd5MwuiRdBSPe56OKqoPFVUGhXHWk2XCL"
PROJECT_ID = "t5npxsw7"
DATASET = "production"

query = '*[_type in ["committeeMember", "teacherLeader", "event", "post", "batch"]]{_type, name, title, sessionName}'
url = f"https://{PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/{DATASET}?query={urllib.parse.quote(query)}"

req = urllib.request.Request(url, headers={"Authorization": f"Bearer {TOKEN}"})
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))['result']
    print(f"Total uploaded items in Sanity: {len(data)}")
    for item in data[:10]:
        print(" -", item)
