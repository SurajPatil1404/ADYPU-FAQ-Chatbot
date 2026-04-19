# 🎓 ADYPU College FAQ Chatbot

> An intelligent AI-powered chatbot for ADYPU students that answers frequently asked questions about admissions, courses, campus facilities, and events — providing 24/7 instant support using ChatGPT Custom GPT with a structured FAQ knowledge base.

**Project by:** Ankur Singh  
**Institution:** Newton School of Technology (NST), Pune  
**University:** Atal Bihari Vajpayee Vishwavidyalaya (ADYPU), Pune  
**Reviewed By:** Tausif SK

---

## 📸 UI Preview

| Welcome Screen | Home Dashboard | Chat Interface |
|---|---|---|
| ![Welcome Screen](/images/image%201.png) | ![Home Dashboard](/images/image%202.png) | ![Chat Interface](/images/image%203.png) |

---

## 📌 Project Overview

The ADYPU College FAQ Chatbot is a no-code AI assistant built using ChatGPT Custom GPT. It classifies student queries by intent, retrieves answers from a structured Google Sheets knowledge base, and handles fallback cases by logging unanswered queries and redirecting students to the admin office.

### Example Workflow
```
Student: "What are the hostel timings?"
→ Intent classified as: hostel
→ Answer retrieved from FAQ knowledge base
→ Response: "Hostel gates close at 10:00 PM on weekdays and 11:00 PM on weekends."

Student: "Tell me about fees"
→ Intent is ambiguous
→ Chatbot asks: "Are you asking about hostel fees, course fees, or scholarship info?"
```

---

## ✨ Features

- 🤖 Natural language Q&A using ChatGPT Custom GPT
- 📊 FAQ knowledge base managed in Google Sheets (52+ Q&A pairs)
- 🗂️ Multi-topic support — Admissions, Academics, Hostel, Events, Contacts, Campus
- 💬 Conversation handling with follow-up clarifying questions
- 🔀 Intent-based query routing with IF-THEN logic rules
- 🚨 Fallback to human support for unanswered queries
- 📝 Feedback collection via Google Forms
- 🛠️ Admin panel in Google Sheets to update FAQs
- 📈 Sentiment analysis on user feedback (Milestone 3)
- 🎨 Canva-designed chatbot UI mockup

---

## 🧠 Intent Routing Logic

| Intent | Trigger Keywords |
|---|---|
| **admissions** | apply, admission, eligibility, enrollment, jee, counseling, documents |
| **fees** | fee, cost, tuition, scholarship, installment, refund, payment |
| **hostel** | hostel, room, mess, accommodation, warden, food, stay, leave |
| **courses** | btech, mba, mca, branch, cse, ece, program, syllabus, duration |
| **library** | library, book, borrow, digital, hours, database, nptel |
| **events** | fest, techfest, euphoria, sports, cultural, hackathon |
| **contacts** | contact, admin, office, helpline, email, phone, placement |
| **campus** | bus, wifi, gym, sports, canteen, medical, transport |
| **unknown** | (no match → triggers fallback to admin office) |

---

## 🏗️ System Architecture

```
Student Query (Natural Language)
        ↓
ChatGPT Custom GPT (Intent Classification)
        ↓
  ┌─────────────────────────────────┐
  │   IF-THEN Logic Routing Rules   │
  └─────────────────────────────────┘
        ↓                    ↓
  Answer Found          Answer Not Found
        ↓                    ↓
  FAQ Knowledge Base    Log to Google Sheets
  (Google Sheets)       + Redirect to Admin
        ↓
  Response to Student
        ↓
  Feedback via Google Forms
        ↓
  Sentiment Analysis (NLP)
```

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| **ChatGPT Custom GPT** | Chatbot engine & response generation |
| **Google Sheets** | FAQ knowledge base & admin panel |
| **Google Forms** | Feedback collection |
| **Canva** | UI mockup design |
| **Notion** | Project documentation |

---

## 📁 Project Structure

```
ADYPU-FAQ-Chatbot/
│
├── README.md                         # This file
├── image1.png                        # UI - Welcome Screen
├── image2.png                        # UI - Home Dashboard
├── image3.png                        # UI - Chat Interface
│
├── knowledge-base/
│   └── ADYPU_FAQ_ChatbotKB.xlsx      # 52+ Q&A pairs across 8 topics
│
├── docs/
│   ├── ADYPU_Milestone1_Doc.docx     # System architecture & AI agent definition
│   ├── knowledge_map.drawio          # Knowledge map of topic connections
│   └── system_architecture.drawio    # System architecture diagram
│
└── testing/
    └── test_results.xlsx             # Sample query test results (Milestone 2)
```

---

## 🚀 Milestones

### ✅ Milestone 1 — Knowledge Base & Setup (25%)
- Built 52+ Q&A pairs across 8 topics in Google Sheets
- Designed knowledge map connecting departments, courses, facilities
- Wrote ChatGPT system prompt for intent classification
- Defined chatbot as an AI agent (perception → processing → action)
- Documented system architecture

### ✅ Milestone 2 — Chatbot Building & Logic (50%)
- Built Custom GPT loaded with FAQ knowledge base
- Added IF-THEN logic for query routing
- Tested chatbot with 30+ sample queries
- Designed chatbot UI mockup in Canva

### 🔲 Milestone 3 — Generative Responses & Feedback (75%)
- Advanced prompt engineering for better responses
- Multi-turn conversation context handling
- Sentiment analysis on Google Forms feedback
- Fallback mechanism with Google Sheets logging
- Admin panel for updating knowledge base

### 🔲 Milestone 4 — Testing, Ethics & Demo (100%)
- End-to-end testing with 100+ sample queries
- Fairness checks across different query phrasings
- Complete documentation & user guide
- Final project presentation

---

## 🔗 Module Connections

| Module | Lecture | Connection |
|---|---|---|
| Module 1: Core AI Concepts | Lecture 1 | Chatbot defined as goal-based AI agent |
| Module 1: Generative AI | Lecture 3 | ChatGPT used for NL response generation |
| Module 3: Logic | Lecture 10 | IF-THEN routing rules |
| Module 3: Knowledge Representation | Lecture 12 | Google Sheets as knowledge base |
| Module 4: ML Evaluation | Lectures 14–15 | Chatbot accuracy testing |
| Module 5: NLP Concepts | Lecture 20 | Intent classification & sentiment analysis |
| Module 6: Ethics | Lecture 23 | Fairness checks across query phrasings |
| Module 6: AI in Business | Lecture 22 | Industry application documentation |

---

## ⚠️ Limitations

- Cannot handle real-time data (live seat availability, live exam schedules)
- Cannot make decisions requiring human judgment (e.g., scholarship approvals)
- Knowledge accuracy depends on how up-to-date the FAQ sheet is
- No voice input support (text only)

---

## 📄 License

This project is submitted as an academic project for Newton School of Technology (NST).  
Not intended for commercial use.

---

> **ADYPU College FAQ Chatbot** • Newton School of Technology, Pune
