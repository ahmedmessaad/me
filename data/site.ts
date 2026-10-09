import type { SiteData } from "@/lib/types";

export const site: SiteData = {
  "meta": {
    "name": "Ahmed Messaad",
    "title": "Ahmed Messaad | Medical AI, Computer Vision & Deep Learning Engineer",
    "description": "Projects by Ahmed Messaad: brain tumor MRI classification, blood cell detection with YOLOv8 and U-Net, ICU treatment reinforcement learning, and full-stack ML products.",
    "url": "https://messaad.cc.cd",
    "email": "ahmed.messaad@outlook.com",
    "googleVerification": ""
  },
  "hero": {
    "eyebrow": "Medical AI, computer vision and deep learning engineer",
    "titleLines": [
      "I build the model.",
      "Then I build",
      "the product."
    ],
    "lead": "Brain tumor MRI classification, blood cell detection with YOLOv8, and ICU treatment agents trained with reinforcement learning. I build the models, then the products that put them in front of doctors.",
    "primaryCta": {
      "label": "Explore research",
      "href": "#work"
    },
    "cv": {
      "label": "Download CV",
      "href": "/resume.pdf"
    },
    "badges": [
      {
        "value": "99%",
        "label": "Brain tumor accuracy"
      },
      {
        "value": "BBC",
        "label": "4Tech featured"
      },
      {
        "value": "3",
        "label": "Apps in production"
      }
    ],
    "marquee": [
      "Medical AI",
      "Computer Vision",
      "Reinforcement Learning",
      "Full-Stack Products",
      "DICOM Pipelines",
      "Research to Deployment"
    ]
  },
  "work": {
    "label": "Research & engineering",
    "heading": "From research\nto real-world systems.",
    "note": "A selection of applied research and engineering projects across clinical AI, computer vision, reinforcement learning, and full-stack systems. Reported metrics describe project evaluations, not clinical outcomes."
  },
  "featured": {
    "label": "Featured · Medical computer vision · BBC 4Tech",
    "title": "HemaVision",
    "description": "Automated hematology platform replacing manual microscopy for routine blood analysis. YOLOv8 detection, U-Net segmentation, and a disease layer flagging cell morphology tied to leukemia, malaria, and anemia. Validated by a clinical hematologist before being featured on BBC News Arabic's 4Tech program.",
    "chips": [
      "YOLOv8",
      "U-Net",
      "OpenCV",
      "PyTorch",
      "97% accuracy",
      "45 min → 3 min"
    ],
    "link": {
      "label": "Watch BBC coverage",
      "href": "https://www.youtube.com/watch?v=fX77vZlHkng"
    },
    "pipelineCaption": "From smear image to clinical output",
    "steps": [
      {
        "kind": "INPUT",
        "title": "Detection",
        "text": "YOLOv8 locates cells in dense smear images"
      },
      {
        "kind": "PROCESS",
        "title": "Segmentation",
        "text": "U-Net isolates overlapping cell regions"
      },
      {
        "kind": "OUTPUT",
        "title": "Classification",
        "text": "RBC / WBC subtypes + disease flags"
      }
    ],
    "pipelineFoot": [
      "Computer vision pipeline",
      "Clinician-validated"
    ],
    "stats": [
      {
        "value": "97%",
        "label": "Detection accuracy"
      },
      {
        "value": "3 min",
        "label": "Down from 45 min per smear"
      }
    ],
    "slug": "hemavision",
    "seoTitle": "HemaVision: YOLOv8 blood cell detection and segmentation",
    "seoDescription": "HemaVision automates blood smear analysis with YOLOv8 detection and U-Net segmentation, flagging cell morphology linked to leukemia, malaria and anemia. Featured on BBC News Arabic 4Tech.",
    "writeup": [
      "HemaVision replaces manual microscopy for routine blood analysis. A technician normally counts and classifies cells by eye; here the same smear image goes through a computer vision pipeline instead.",
      "YOLOv8 detects cells in dense smear images, and a U-Net separates overlapping cell regions. A classification layer then labels RBC and WBC subtypes and flags morphology associated with leukemia, malaria and anemia.",
      "The pipeline reached 97% accuracy and cut analysis time from about 45 minutes to 3. A clinical hematologist validated it before it was featured on BBC News Arabic's 4Tech program. Reported metrics describe project evaluation, not clinical outcomes."
    ]
  },
  "projects": [
    {
      "group": "Medical AI",
      "kind": "Medical computer vision",
      "name": "AIRM — Brain MRI Classification",
      "description": "EfficientNet-B7 reaching 99% across four tumor categories with a full DICOM pipeline and a radiologist-validated PyQt5 interface built for real clinical workflow integration.",
      "resultLabel": "Result",
      "result": "99% four-class accuracy. DICOM pipeline tested with hospital MRI scanners.",
      "stack": [
        "EfficientNet-B7",
        "PyDICOM",
        "PyQt5"
      ],
      "link": {
        "label": "Watch demo",
        "href": "https://youtu.be/2OeqBKF3X_A"
      },
      "slug": "airm-brain-tumor-mri-classification",
      "seoTitle": "AIRM: brain tumor MRI classification with EfficientNet-B7",
      "seoDescription": "AIRM classifies brain MRI scans into four tumor categories with EfficientNet-B7 at 99% accuracy, using a DICOM pipeline and a PyQt5 desktop interface.",
      "writeup": [
        "AIRM classifies brain MRI scans into four tumor categories using EfficientNet-B7 and reached 99% four-class accuracy in evaluation.",
        "It reads DICOM files directly through a PyDICOM pipeline that was tested with hospital MRI scanners, so the model works on scanner output rather than curated image exports.",
        "The PyQt5 interface was reviewed by a radiologist and built around a real clinical workflow: open a study, get a prediction, inspect it."
      ]
    },
    {
      "group": "Reinforcement learning",
      "kind": "Reinforcement learning · Healthcare",
      "name": "Medical Treatment DRL",
      "description": "ICU treatment timing agent on MIMIC-III. A2C reached 99.5% clinical appropriateness with +76–145 reward improvement. Rule-based safety filter lifted PPO/DQN appropriateness by 40 points.",
      "resultLabel": "Result",
      "result": "99.5% appropriateness. 26-dimensional Gym environment modeling temporal lab trends.",
      "stack": [
        "Stable-Baselines3",
        "MIMIC-III",
        "Gym"
      ],
      "link": {
        "label": "View code",
        "href": "https://github.com/RYANX9/medical-treatment-drl/"
      },
      "slug": "medical-treatment-drl",
      "seoTitle": "Medical Treatment DRL: ICU treatment timing with reinforcement learning",
      "seoDescription": "An ICU treatment-timing agent trained on MIMIC-III with A2C, PPO and DQN, reaching 99.5% clinical appropriateness with a rule-based safety filter.",
      "writeup": [
        "This project trains reinforcement learning agents to decide treatment timing for ICU patients using the MIMIC-III dataset, in a 26-dimensional Gym environment that models temporal lab trends.",
        "A2C reached 99.5% clinical appropriateness with a reward improvement of +76 to +145. PPO and DQN scored lower until a rule-based safety filter lifted their appropriateness by 40 points.",
        "The takeaway is that the safety layer mattered as much as the algorithm. This is a research simulation, not a clinical tool."
      ]
    },
    {
      "group": "Products",
      "kind": "Full-stack product",
      "name": "SpecMob",
      "description": "Phone comparison and discovery platform. Next.js + FastAPI + async Postgres, trigram typo-tolerant search, tiered caching. Product copy generated by Gemini with a deterministic fallback — AI layer never blocks rendering.",
      "resultLabel": "Live product",
      "result": "Full-stack from nothing to production: frontend, API, database, AI copy layer.",
      "stack": [
        "Next.js",
        "FastAPI",
        "PostgreSQL",
        "Gemini"
      ],
      "link": {
        "label": "Visit site",
        "href": "https://specmob.vercel.app"
      },
      "slug": "specmob",
      "seoTitle": "SpecMob: phone comparison platform built with Next.js and FastAPI",
      "seoDescription": "SpecMob is a phone comparison and discovery platform built with Next.js, FastAPI and async Postgres, with typo-tolerant trigram search and tiered caching.",
      "writeup": [
        "SpecMob is a phone comparison and discovery platform I took from nothing to production: frontend, API, database and an AI copy layer.",
        "Search uses PostgreSQL trigram matching so typos still find the right phone, and tiered caching keeps responses fast. Product descriptions are generated by Gemini with a deterministic fallback, so the AI layer never blocks rendering."
      ]
    },
    {
      "group": "Medical AI",
      "kind": "Applied ML · Research thesis",
      "name": "My Daily Health",
      "description": "Multi-disease diagnostic platform across five domains. Systematic evaluation of 12 architectures with stratified cross-validation. Secure clinical workflow, sub-200ms inference. ICSTEM 2023 Outstanding Presentation Award.",
      "resultLabel": "Result",
      "result": "90–99% accuracy across five disease domains on M.Sc. thesis evaluation.",
      "stack": [
        "TensorFlow",
        "PyTorch",
        "Flask",
        "ResNet"
      ],
      "link": {
        "label": "Watch demo",
        "href": "https://youtu.be/kh7WBjNPpEM"
      },
      "slug": "my-daily-health",
      "seoTitle": "My Daily Health: multi-disease diagnosis with deep learning",
      "seoDescription": "My Daily Health is an M.Sc. thesis platform for five disease domains, comparing 12 architectures with stratified cross-validation and 90-99% accuracy.",
      "writeup": [
        "My Daily Health is the practical part of my M.Sc. thesis: a diagnostic platform covering five disease domains with a secure clinical workflow and sub-200ms inference.",
        "I compared 12 architectures, including ResNet variants, using stratified cross-validation, and reached 90-99% accuracy depending on the domain.",
        "The work was presented at ICSTEM 2023 in Istanbul and received the Best Presentation Award."
      ]
    }
  ],
  "more": [
    {
      "name": "Healthcare Cost Prediction",
      "kind": "Conv1D · SHAP · R² 0.88",
      "link": {
        "label": "View",
        "href": "https://github.com/RYANX9/healthcare-cost-prediction"
      }
    },
    {
      "name": "Deep RL for Crypto Trading",
      "kind": "PPO · A2C · Negative result",
      "link": {
        "label": "View",
        "href": "https://github.com/RYANX9/deep-rl-trading"
      }
    },
    {
      "name": "Day Tracker",
      "kind": "Next.js · PostgreSQL · Web Push",
      "link": {
        "label": "View",
        "href": "https://github.com/RYANX9/rystudio"
      }
    },
    {
      "name": "Git-Backed CMS",
      "kind": "Next.js · GitHub Contents API",
      "link": {
        "label": "Visit",
        "href": "https://zaid-saad.vercel.app"
      }
    }
  ],
  "publications": {
    "label": "Publications",
    "heading": "Research, in\nthe literature.",
    "note": "Conference research and scientific contributions.",
    "items": [
      {
        "status": "Conference presentation · December 2023",
        "title": "Helping System for Brain Disease Diagnosis Using Deep Learning",
        "description": "Presented at the International Conference on Science, Technology, Engineering and Management (ICSTEM), Istanbul, Turkey, 3–7 December 2023.",
        "tags": [
          "Transfer Learning",
          "Deep Learning",
          "Medical Imaging"
        ],
        "award": "Best Presentation Award",
        "link": {
          "label": "View certificate",
          "href": "/Ahmed_ISER_certificate.pdf"
        },
        "note": "ICSTEM 2023"
      }
    ]
  },
  "about": {
    "label": "About",
    "statement": "Research makes me careful about what a model *actually knows*. Systems work makes me care about latency, failure modes, and what happens when the happy path breaks.",
    "paragraphs": [
      "I am a PhD researcher and AI/ML engineer working across applied deep learning, clinical and diagnostic applications, and the engineering needed to turn research into usable systems. Research and implementation inform each other.",
      "My project work includes brain tumor classification, automated blood cell detection, and ICU treatment-timing agents. I care about the assumptions behind a result, how it is evaluated, and what it takes to make a system useful beyond an experiment.",
      "On the systems side: Next.js and React on the frontend, FastAPI or Flask on the backend, Postgres for storage. I've taken a full product from nothing to production and keep several Postgres-backed apps running."
    ],
    "facts": [
      {
        "label": "Core focus",
        "value": "Medical AI · Applied systems"
      },
      {
        "label": "Technical range",
        "value": "CV · DL · RL · Web"
      },
      {
        "label": "Academic path",
        "value": "PhD Researcher · M.Sc. Embedded Systems"
      },
      {
        "label": "Based in",
        "value": "Algeria"
      }
    ]
  },
  "footer": {
    "blurb": "PhD researcher and AI/ML engineer working across medical AI, deep learning, and the systems that turn research into useful products.",
    "wordmark": "messaad",
    "columns": [
      {
        "title": "Research",
        "links": [
          {
            "label": "Selected work",
            "href": "#work"
          },
          {
            "label": "Publications",
            "href": "#publications"
          },
          {
            "label": "About",
            "href": "#about"
          }
        ]
      },
      {
        "title": "Connect",
        "links": [
          {
            "label": "GitHub",
            "href": "https://github.com/RYANX9"
          },
          {
            "label": "LinkedIn",
            "href": "https://linkedin.com/in/ahmedmessaad"
          },
          {
            "label": "Kaggle",
            "href": "https://kaggle.com/ahmedmessaad"
          },
          {
            "label": "Email",
            "href": "mailto:ahmed.messaad@outlook.com"
          }
        ]
      }
    ],
    "socials": [
      {
        "type": "github",
        "label": "GitHub",
        "href": "https://github.com/RYANX9"
      },
      {
        "type": "linkedin",
        "label": "LinkedIn",
        "href": "https://linkedin.com/in/ahmedmessaad"
      },
      {
        "type": "kaggle",
        "label": "Kaggle",
        "href": "https://kaggle.com/ahmedmessaad"
      },
      {
        "type": "email",
        "label": "Email",
        "href": "mailto:ahmed.messaad@outlook.com"
      }
    ]
  }
};
