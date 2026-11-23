import os
import json
import urllib.request
import urllib.error

TOKEN = "skUEDWBnoWXxrlzxN7t1XkDDR4J4iMsSZ8bQDuTBrvfuUSaGC0OdkVreUoqXn0CD3I1QfQATs6NNc6sL542lzahV0JF8BrMN3AH20Olbdio0cYpdTZ6c2snwBHehuFH5oD61oXIXTAlSVLMo0zaNd5MwuiRdBSPe56OKqoPFVUGhXHWk2XCL"
PROJECT_ID = "t5npxsw7"
DATASET = "production"
API_VERSION = "v2021-06-07"

HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

def upload_image(filepath):
    if not os.path.exists(filepath):
        print(f"Warning: File {filepath} not found.")
        return None
    
    ext = os.path.splitext(filepath)[1].lower()
    content_type = "image/jpeg"
    if ext == ".png":
        content_type = "image/png"
    elif ext == ".webp":
        content_type = "image/webp"
    elif ext == ".svg":
        content_type = "image/svg+xml"

    url = f"https://{PROJECT_ID}.api.sanity.io/{API_VERSION}/assets/images/{DATASET}"
    
    with open(filepath, "rb") as f:
        data = f.read()
    
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "Authorization": f"Bearer {TOKEN}",
            "Content-Type": content_type
        },
        method="POST"
    )
    
    try:
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            asset_id = result.get("document", {}).get("_id")
            print(f"  Uploaded image: {filepath} -> {asset_id}")
            return asset_id
    except Exception as e:
        print(f"  Failed to upload {filepath}: {e}")
        return None

def mutate(mutations):
    url = f"https://{PROJECT_ID}.api.sanity.io/{API_VERSION}/data/mutate/{DATASET}"
    body = json.dumps({"mutations": mutations}).encode("utf-8")
    req = urllib.request.Request(url, data=body, headers=HEADERS, method="POST")
    try:
        with urllib.request.urlopen(req) as resp:
            res = json.loads(resp.read().decode("utf-8"))
            print("Mutation success:", res.get("transactionId"))
            return True
    except urllib.error.HTTPError as e:
        print("Mutation failed:", e.code, e.read().decode("utf-8"))
        return False
    except Exception as e:
        print("Mutation failed:", e)
        return False

print("Step 1: Uploading Core Batch 2025-26...")
batch_doc = {
    "_id": "batch-2025-26",
    "_type": "batch",
    "sessionName": "2025-26",
    "slug": { "_type": "slug", "current": "2025-26" },
    "academicYear": "HSC Batch 2025-2026 Session",
    "isCurrent": True,
    "order": 100
}
mutate([{"createOrReplace": batch_doc}])

# Also create historical batches
batches_historical = [
    ("2024-25", "HSC Batch 2024-2025 Session", 90),
    ("2023-24", "HSC Batch 2023-2024 Session", 80),
]
for b_name, b_desc, b_order in batches_historical:
    mutate([{
        "createOrReplace": {
            "_id": f"batch-{b_name}",
            "_type": "batch",
            "sessionName": b_name,
            "slug": { "_type": "slug", "current": b_name },
            "academicYear": b_desc,
            "isCurrent": False,
            "order": b_order
        }
    }])

print("\nStep 2: Uploading Teachers & Mentors...")
teachers = [
    ("Prof. Faria Sultana", "Convener", "Head of the Zoology Department", "image/t1.webp", 1),
    ("Md. Zillur Rahman", "Mentor", "Assistant Professor, Department of Botany", "image/t2.webp", 2),
    ("Afroja Nasrin", "Mentor", "Associate Professor, Department of Zoology", "image/t3.webp", 3),
    ("Bikash Kumar Das", "Mentor", "Associate Professor, Department of Chemistry", "image/t4.webp", 4)
]

for name, role, dept, img_path, order in teachers:
    asset_id = upload_image(img_path)
    teacher_doc = {
        "_id": f"teacher-{order}",
        "_type": "teacherLeader",
        "name": name,
        "role": role,
        "department": dept,
        "isPaused": False,
        "order": order
    }
    if asset_id:
        teacher_doc["photo"] = {
            "_type": "image",
            "asset": { "_type": "reference", "_ref": asset_id }
        }
    mutate([{"createOrReplace": teacher_doc}])

print("\nStep 3: Uploading Executive Committee 2025-26 (All 29 members)...")
students = [
    ("Nazmus Sakib", "President", "image/c1.jpg", 1),
    ("Afnan Bhuiyan Nabil", "General Secretary", "image/c2.jpg", 2),
    ("Fahim Ahmed", "Sec of Planning and Development", "image/c3.jpg", 3),
    ("Md. Abu Kawsar Hadi", "General Coordinator", "image/c4.jpg", 4),
    ("Md. Redwan Rashid Miji", "Vice President of Administration", "image/c5.jpg", 5),
    ("Aritra Das", "Vice President of Event Management", "image/c6.jpg", 6),
    ("Al Samad Eusha", "Vice President of Sponsorship and Communication", "image/c7.jpg", 7),
    ("Muntasin Rahman Mahin", "Vice President of Publication", "image/c8.jpg", 8),
    ("Fahim Shahriar Shawn", "Vice President of Olympiad and Workshop", "image/c9.jpg", 9),
    ("Ayman Mahim Abid", "Vice President of Public Relation", "image/c10.jpg", 10),
    ("Md. Jahedur Rahman Thoha", "Assistant General Secretary", "image/c11.jpg", 11),
    ("Abdul Muhaimin Mojumder", "Assistant General Coordinator", "image/c12.jpg", 12),
    ("Md. Moin Uddin Bhuiyan Fahim", "Joint Secretary of Administration", "image/c13.jpg", 13),
    ("Abrar Bin Rashed Ayon", "Joint Secretary of Sponsorship and Communication", "image/c14.jpg", 14),
    ("Mujahidul Islam", "Joint Secretary of Publication", "image/c15.jpg", 15),
    ("Yeasin Arafat", "Joint Secretary of Public Relation", "image/c16.jpg", 16),
    ("Nazmul Alam Shanto", "Joint Secretary of IT", "image/c17.jpg", 17),
    ("SM Shahanur Rahman Sohan", "Joint Secretary of Project Development", "image/c18.jpg", 18),
    ("Mehedi Hasan", "Joint Secretary of Logistics", "image/c19.jpg", 19),
    ("Rafsun Rahman Saki", "Head of Administration", "image/c20.jpg", 20),
    ("Faiyaz Al Hadad", "Head of Event Management", "image/c21.jpg", 21),
    ("Srijon Kumar Shill", "Head of Publication", "image/c22.jpg", 22),
    ("Abdul Hai Sajim", "Head of Quiz", "image/c23.jpg", 23),
    ("Md. Shahariar Nafish", "Head of Sponsorship and Communication", "image/c24.jpg", 24),
    ("Shouvik Chanda", "Head of Olympiad and Workshop", "image/c25.jpg", 25),
    ("Mehedi Hasan Jidan", "Head of Public Relation", "image/c26.jpg", 26),
    ("Musfiq Bin Musa", "Head of IT", "image/c27.jpg", 27),
    ("Ahmed Bin Noor", "Head of Project Development", "image/c28.jpg", 28),
    ("Argho Ghosh", "Head of Logistics", "image/c29.jpg", 29)
]

for name, role, img_path, order in students:
    asset_id = upload_image(img_path)
    member_id = f"member-2025-26-{order}"
    member_doc = {
        "_id": member_id,
        "_type": "committeeMember",
        "name": name,
        "role": role,
        "batch": { "_type": "reference", "_ref": "batch-2025-26" },
        "about": f"{name} serves as {role} at Dhaka College Science Club (DCSC) for the 2025-26 session. Actively contributing to scientific exploration, event organization, and youth leadership.",
        "isPaused": False,
        "order": order
    }
    if asset_id:
        member_doc["photo"] = {
            "_type": "image",
            "asset": { "_type": "reference", "_ref": asset_id }
        }
    mutate([{"createOrReplace": member_doc}])

print("\nStep 4: Uploading Events & Festivals...")
events = [
    {
        "id": "event-1",
        "title": "DCSC AI NeuroVerse 2026",
        "slug": "ai-neuroverse-2026",
        "category": "Intra Festival",
        "eventDate": "Aug 10–11, 2026",
        "shortDescription": "Showcase your expertise in AI & technology — solo/team quizzes, art, short films, and web design. A grand celebration of innovation at Dhaka College.",
        "facebookUrl": "https://www.facebook.com/events/28052714751025898",
        "img": "image/e1.jpg",
        "order": 1
    },
    {
        "id": "event-2",
        "title": "Olympiad Hunt 4.0 — Prize Giving",
        "slug": "olympiad-hunt-4-prize-giving",
        "category": "Olympiad Hunt",
        "eventDate": "02 Jun, 2026",
        "shortDescription": "Honoring champions at the grand closing ceremony of Olympiad Hunt 4.0.",
        "facebookUrl": "https://www.facebook.com/dcsc.dc/posts/pfbid0fqWbawpwdmbPjJU8ARpNnYz47nus37UZcLLyY63cpQTJKT4HFE7CYgfNTdXng7hsl",
        "img": "image/e2.jpg",
        "order": 2
    },
    {
        "id": "event-3",
        "title": "Grand Iftar Mahfil 2026",
        "slug": "grand-iftar-mahfil-2026",
        "category": "Reunion",
        "eventDate": "07 Mar, 2026",
        "shortDescription": "Alumni & members united in gratitude & fellowship at Brewed Harmony Intercontinental, Dhanmondi.",
        "facebookUrl": "https://www.facebook.com/events/2064513734405731",
        "img": "image/e3.jpg",
        "order": 3
    },
    {
        "id": "event-4",
        "title": "Everything About Quizzing Workshop",
        "slug": "everything-about-quizzing",
        "category": "Workshop",
        "eventDate": "2026",
        "shortDescription": "Master the art of quizzing with national champions and mentors.",
        "facebookUrl": "https://www.facebook.com/DhakaCollegeScienceClub",
        "img": "image/e4.jpg",
        "order": 4
    }
]

for ev in events:
    asset_id = upload_image(ev["img"])
    ev_doc = {
        "_id": ev["id"],
        "_type": "event",
        "title": ev["title"],
        "slug": { "_type": "slug", "current": ev["slug"] },
        "category": ev["category"],
        "eventDate": ev["eventDate"],
        "shortDescription": ev["shortDescription"],
        "facebookUrl": ev["facebookUrl"],
        "featuredOnHome": True,
        "order": ev["order"]
    }
    if asset_id:
        ev_doc["coverImage"] = {
            "_type": "image",
            "asset": { "_type": "reference", "_ref": asset_id }
        }
    mutate([{"createOrReplace": ev_doc}])

print("\nStep 5: Uploading News & Wednesday Wonders Posts...")
posts = [
    {
        "id": "post-1",
        "title": "July Mass Uprising Memorial",
        "slug": "july-mass-uprising-memorial",
        "category": "Club News",
        "date": "5 Aug, 2026",
        "excerpt": "July is not just a month — it is a symbol of courage, sacrifice, and change. Dhaka College Science Club pays humble respect to all the martyrs.",
        "facebookUrl": "https://www.facebook.com/DhakaCollegeScienceClub",
        "img": "image/p1.jpg",
        "order": 1
    },
    {
        "id": "post-2",
        "title": "Prize Giving Ceremony of Olympiad Hunt 4.0",
        "slug": "olympiad-hunt-4-prize-giving-ceremony",
        "category": "Celebrations",
        "date": "25 June, 2026",
        "excerpt": "Dhaka College Science Club is pleased to reveal the vibrant Prize Giving Ceremony of Olympiad Hunt 4.0! It was a day of joy, applause and celebration.",
        "facebookUrl": "https://www.facebook.com/dcsc.dc/posts/pfbid0fqWbawpwdmbPjJU8ARpNnYz47nus37UZcLLyY63cpQTJKT4HFE7CYgfNTdXng7hsl",
        "img": "image/p2.1.jpg",
        "order": 2
    },
    {
        "id": "post-3",
        "title": "Time Crystal - #DCSC_Wednesday_Wonders",
        "slug": "time-crystal-wednesday-wonders",
        "category": "Wednesday Wonders",
        "date": "5 Aug, 2026",
        "excerpt": "Does the name 'Time Crystal' make you curious? There's a unique state of matter called Time Crystal where matter repeats its structure in time.",
        "facebookUrl": "https://www.facebook.com/DhakaCollegeScienceClub",
        "img": "image/p8.jpg",
        "order": 3
    }
]

for p in posts:
    asset_id = upload_image(p["img"])
    p_doc = {
        "_id": p["id"],
        "_type": "post",
        "title": p["title"],
        "slug": { "_type": "slug", "current": p["slug"] },
        "category": p["category"],
        "date": p["date"],
        "excerpt": p["excerpt"],
        "facebookUrl": p["facebookUrl"],
        "featuredOnHome": True,
        "order": p["order"]
    }
    if asset_id:
        p_doc["coverImage"] = {
            "_type": "image",
            "asset": { "_type": "reference", "_ref": asset_id }
        }
    mutate([{"createOrReplace": p_doc}])

print("\nStep 6: Uploading Site Settings & Home Page Builder Singleton...")
site_logo_id = upload_image("image/logo.png")

site_settings_doc = {
    "_id": "siteSettings",
    "_type": "siteSettings",
    "siteTitle": "Dhaka College Science Club (DCSC)",
    "tagline": "Spreading the knowledge of science to the utmost since 1996",
    "contactInfo": {
        "email": "dcsc.contact@gmail.com",
        "phone": "+880 1700-000000",
        "address": "Dhaka College, Mirpur Road, Dhanmondi, Dhaka-1205",
        "mapEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.228519448374!2d90.38072047589632!3d23.739223789228834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b7a6358c89%3A0x6b8014589d89edb3!2sDhaka%20College!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
    },
    "socialLinks": {
        "facebookPage": "https://www.facebook.com/DhakaCollegeScienceClub",
        "instagram": "https://www.instagram.com/dcsc_official"
    }
}
if site_logo_id:
    site_settings_doc["logo"] = {
        "_type": "image",
        "asset": { "_type": "reference", "_ref": site_logo_id }
    }
mutate([{"createOrReplace": site_settings_doc}])

home_page_doc = {
    "_id": "homePage",
    "_type": "homePage",
    "title": "Homepage",
    "sections": [
        {
            "_key": "hero",
            "_type": "heroBlock",
            "badge": "#ForClubAndCountry • Established 1996",
            "headingLine1": "Dhaka College",
            "headingLine2": "Science Club",
            "tagline": "Spreading the knowledge of science to the utmost since 1996. Building tomorrow's scientists, innovators, and leaders.",
            "primaryBtnText": "Explore Events",
            "primaryBtnLink": "/events",
            "secondaryBtnText": "Join the Club",
            "secondaryBtnLink": "/join"
        },
        {
            "_key": "stats",
            "_type": "statsBlock",
            "stats": [
                { "_key": "s1", "number": "30+", "label": "Years of Excellence" },
                { "_key": "s2", "number": "15,000+", "label": "Alumni & Members" },
                { "_key": "s3", "number": "200+", "label": "Olympiad Accolades" },
                { "_key": "s4", "number": "50+", "label": "Major Science Festivals" }
            ]
        },
        {
            "_key": "events",
            "_type": "eventsBlock",
            "heading": "Major Events & Science Festivals",
            "subheading": "Flagship competitions, olympiads, and annual celebrations",
            "limit": 3
        },
        {
            "_key": "posts",
            "_type": "postsBlock",
            "heading": "News, Updates & Wednesday Wonders",
            "subheading": "Exploring fascinating scientific phenomenon & club announcements",
            "limit": 3
        },
        {
            "_key": "scilab",
            "_type": "scilabBlock",
            "heading": "Interactive Sci-Lab Hub",
            "subheading": "Play, experiment, and simulate scientific phenomena in real-time"
        },
        {
            "_key": "cta",
            "_type": "joinCtaBlock",
            "heading": "Be a Part of the Legacy",
            "subheading": "Join Dhaka College Science Club today and unleash your scientific potential.",
            "buttonText": "Apply for Membership",
            "buttonLink": "/join"
        }
    ]
}
mutate([{"createOrReplace": home_page_doc}])

print("\n🎉 ALL DCSC DATA IMPORTED TO SANITY SUCCESSFULLY!")
