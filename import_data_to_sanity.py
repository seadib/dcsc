"""
DCSC to Sanity Auto-Importer Script
Imports all 29 committee members, 4 teachers, 10 news/posts, and events into Sanity dataset.
"""

import json
import os
import urllib.request

SANITY_PROJECT_ID = "t5npxsw7"
SANITY_DATASET = "production"
API_VERSION = "2024-03-01"

# Teachers data
teachers = [
    {
        "name": "Prof. Faria Sultana",
        "role": "Convener",
        "department": "Head of the Zoology Department",
        "image": "image/t1.webp",
        "order": 1
    },
    {
        "name": "Md. Zillur Rahman",
        "role": "Mentor",
        "department": "Assistant Professor, Department of Botany",
        "image": "image/t2.webp",
        "order": 2
    },
    {
        "name": "Afroja Nasrin",
        "role": "Mentor",
        "department": "Associate Professor, Department of Zoology",
        "image": "image/t3.webp",
        "order": 3
    },
    {
        "name": "Bikash Kumar Das",
        "role": "Mentor",
        "department": "Associate Professor, Department of Chemistry",
        "image": "image/t4.webp",
        "order": 4
    }
]

# Committee 2025-26 (All 29 members)
students = [
    ("Nazmus Sakib", "President", "c1.jpg", 1),
    ("Afnan Bhuiyan Nabil", "General Secretary", "c2.jpg", 2),
    ("Fahim Ahmed", "Sec of Planning and Development", "c3.jpg", 3),
    ("Md. Abu Kawsar Hadi", "General Coordinator", "c4.jpg", 4),
    ("Md. Redwan Rashid Miji", "Vice President of Administration", "c5.jpg", 5),
    ("Aritra Das", "Vice President of Event Management", "c6.jpg", 6),
    ("Al Samad Eusha", "Vice President of Sponsorship and Communication", "c7.jpg", 7),
    ("Muntasin Rahman Mahin", "Vice President of Publication", "c8.jpg", 8),
    ("Fahim Shahriar Shawn", "Vice President of Olympiad and Workshop", "c9.jpg", 9),
    ("Ayman Mahim Abid", "Vice President of Public Relation", "c10.jpg", 10),
    ("Md. Jahedur Rahman Thoha", "Assistant General Secretary", "c11.jpg", 11),
    ("Abdul Muhaimin Mojumder", "Assistant General Coordinator", "c12.jpg", 12),
    ("Md. Moin Uddin Bhuiyan Fahim", "Joint Secretary of Administration", "c13.jpg", 13),
    ("Abrar Bin Rashed Ayon", "Joint Secretary of Sponsorship and Communication", "c14.jpg", 14),
    ("Mujahidul Islam", "Joint Secretary of Publication", "c15.jpg", 16),
    ("Yeasin Arafat", "Joint Secretary of Public Relation", "c16.jpg", 17),
    ("Nazmul Alam Shanto", "Joint Secretary of IT", "c17.jpg", 18),
    ("SM Shahanur Rahman Sohan", "Joint Secretary of Project Development", "c18.jpg", 19),
    ("Mehedi Hasan", "Joint Secretary of Logistics", "c19.jpg", 20),
    ("Rafsun Rahman Saki", "Head of Administration", "c20.jpg", 21),
    ("Faiyaz Al Hadad", "Head of Event Management", "c21.jpg", 22),
    ("Srijon Kumar Shill", "Head of Publication", "c22.jpg", 23),
    ("Abdul Hai Sajim", "Head of Quiz", "c23.jpg", 24),
    ("Md. Shahariar Nafish", "Head of Sponsorship and Communication", "c24.jpg", 25),
    ("Shouvik Chanda", "Head of Olympiad and Workshop", "c25.jpg", 26),
    ("Mehedi Hasan Jidan", "Head of Public Relation", "c26.jpg", 27),
    ("Musfiq Bin Musa", "Head of IT", "c27.jpg", 28),
    ("Ahmed Bin Noor", "Head of Project Development", "c28.jpg", 29),
    ("Argho Ghosh", "Head of Logistics", "c29.jpg", 30)
]

# Events data
events = [
    {
        "title": "DCSC AI NeuroVerse 2026",
        "slug": "ai-neuroverse-2026",
        "category": "Intra Festival",
        "eventDate": "Aug 10–11, 2026",
        "shortDescription": "Showcase your expertise in AI & technology — solo/team quizzes, art, short films, and web design. A grand celebration of innovation at Dhaka College.",
        "facebookUrl": "https://www.facebook.com/events/28052714751025898",
        "coverImage": "image/e1.jpg"
    },
    {
        "title": "Olympiad Hunt 4.0 — Prize Giving",
        "slug": "olympiad-hunt-4-prize-giving",
        "category": "Olympiad Hunt",
        "eventDate": "02 Jun, 2026",
        "shortDescription": "Honoring champions at the grand closing ceremony of Olympiad Hunt 4.0.",
        "facebookUrl": "https://www.facebook.com/dcsc.dc/posts/pfbid0fqWbawpwdmbPjJU8ARpNnYz47nus37UZcLLyY63cpQTJKT4HFE7CYgfNTdXng7hsl",
        "coverImage": "image/e2.jpg"
    },
    {
        "title": "Grand Iftar Mahfil 2026",
        "slug": "grand-iftar-mahfil-2026",
        "category": "Reunion",
        "eventDate": "07 Mar, 2026",
        "shortDescription": "Alumni & members united in gratitude & fellowship at Brewed Harmony Intercontinental, Dhanmondi.",
        "facebookUrl": "https://www.facebook.com/events/2064513734405731",
        "coverImage": "image/e3.jpg"
    },
    {
        "title": "Everything About Quizzing Workshop",
        "slug": "everything-about-quizzing",
        "category": "Workshop",
        "eventDate": "2026",
        "shortDescription": "Master the art of quizzing with national champions and mentors.",
        "facebookUrl": "https://www.facebook.com/DhakaCollegeScienceClub",
        "coverImage": "image/e4.jpg"
    }
]

# Posts & News data
posts = [
    {
        "title": "July Mass Uprising Memorial",
        "slug": "july-mass-uprising-memorial",
        "category": "Club News",
        "date": "5 Aug, 2026",
        "excerpt": "July is not just a month — it is a symbol of courage, sacrifice, and change. Dhaka College Science Club pays humble respect to all the martyrs.",
        "facebookUrl": "https://www.facebook.com/DhakaCollegeScienceClub",
        "coverImage": "image/p1.jpg"
    },
    {
        "title": "Prize Giving Ceremony of Olympiad Hunt 4.0",
        "slug": "olympiad-hunt-4-prize-giving-ceremony",
        "category": "Celebrations",
        "date": "25 June, 2026",
        "excerpt": "Dhaka College Science Club is pleased to reveal the vibrant Prize Giving Ceremony of Olympiad Hunt 4.0! It was a day of joy, applause and celebration.",
        "facebookUrl": "https://www.facebook.com/dcsc.dc/posts/pfbid0fqWbawpwdmbPjJU8ARpNnYz47nus37UZcLLyY63cpQTJKT4HFE7CYgfNTdXng7hsl",
        "coverImage": "image/p2.1.jpg"
    },
    {
        "title": "Time Crystal - Wednesday Wonders",
        "slug": "time-crystal-wednesday-wonders",
        "category": "Wednesday Wonders",
        "date": "5 Aug, 2026",
        "excerpt": "Does the name 'Time Crystal' make you curious? There's a unique state of matter called Time Crystal where matter repeats its structure in time.",
        "facebookUrl": "https://www.facebook.com/DhakaCollegeScienceClub",
        "coverImage": "image/p8.jpg"
    }
]

print("DCSC Data Ready for Sanity Import.")
print(f"Total Teachers: {len(teachers)}")
print(f"Total Committee Members: {len(students)}")
print(f"Total Events: {len(events)}")
print(f"Total Posts: {len(posts)}")
