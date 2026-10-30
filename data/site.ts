import type { SiteData } from "@/lib/types";

export const site: SiteData = {
  "meta": {
    "name": "Ahmed Messaad",
    "title": "Ahmed Messaad | PhD Researcher, Medical AI & Computer Vision",
    "description": "Projects by Ahmed Messaad: brain tumor MRI classification, blood cell detection with YOLOv8 and U-Net, ICU treatment reinforcement learning, and full-stack ML products.",
    "url": "https://messaad.cc.cd",
    "email": "ahmed.messaad@outlook.com",
    "googleVerification": ""
  },
  "hero": {
    "eyebrow": "",
    "titleLines": [
      "I build the",
      "model.",
      "Then I build",
      "the product."
    ],
    "lead": "I'm a PhD researcher in Algeria working on medical imaging. Here you'll find a brain MRI classifier, a blood cell detector that was shown on BBC News Arabic, an RL agent for ICU treatment timing, and the apps I've built around them.",
    "primaryCta": {
      "label": "See the projects",
      "href": "#work"
    },
    "cv": {
      "label": "Download CV",
      "href": "/resume.pdf"
    },
    "badges": [],
    "marquee": []
  },
  "work": {
    "label": "",
    "heading": "From research\nto real-world systems.",
    "note": "Research, a thesis, client work and a few experiments. Numbers come from project evaluations, not clinical use."
  },
  "featured": {
    "label": "Medical computer vision · BBC 4Tech",
    "title": "HemaVision",
    "description": "Blood smear analysis that replaces manual cell counting. YOLOv8 finds the cells, a U-Net separates the ones that overlap, and a last layer labels RBC and WBC subtypes and flags shapes linked to leukemia, malaria and anemia. A clinical hematologist checked it, and it was shown on BBC News Arabic's 4Tech.",
    "chips": [
      "YOLOv8",
      "U-Net",
      "OpenCV",
      "PyTorch",
      "97% accuracy",
      "45 min to 3 min"
    ],
    "link": {
      "label": "Watch BBC coverage",
      "href": "https://www.youtube.com/watch?v=fX77vZlHkng"
    },
    "pipelineCaption": "Smear image in, cell labels out",
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
        "label": "detection accuracy"
      },
      {
        "value": "3 min",
        "label": "per smear, down from 45"
      }
    ],
    "slug": "hemavision",
    "seoTitle": "HemaVision: YOLOv8 blood cell detection and segmentation",
    "seoDescription": "HemaVision automates blood smear analysis with YOLOv8 detection and U-Net segmentation, cutting analysis from 45 to 3 minutes. Featured on BBC 4Tech.",
    "writeup": [
      "HemaVision replaces manual microscopy for routine blood analysis. A technician normally counts and classifies cells by eye; here the same smear image goes through a computer vision pipeline instead.",
      "YOLOv8 detects cells in dense smear images, and a U-Net separates overlapping cell regions. A classification layer then labels RBC and WBC subtypes and flags morphology associated with leukemia, malaria and anemia.",
      "The pipeline reached 97% accuracy and cut analysis time from about 45 minutes to 3. A clinical hematologist validated it before it was featured on BBC News Arabic's 4Tech program. Reported metrics describe project evaluation, not clinical outcomes."
    ],
    "facts": [
      {
        "label": "Result",
        "value": "97% multi-class accuracy"
      },
      {
        "label": "Workflow",
        "value": "45 min to 3 min diagnostic time"
      },
      {
        "label": "Validation",
        "value": "Clinical hematologist"
      }
    ],
    "insight": ""
  },
  "projects": [
    {
      "group": "Clinical AI",
      "kind": "Medical computer vision",
      "name": "AIRM: Brain MRI Classification",
      "description": "Sorts brain MRI scans into four tumor categories with EfficientNet-B7, 99% accurate in evaluation. It reads DICOM files directly, and a radiologist reviewed the PyQt5 desktop app.",
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
      ],
      "image": "/work/airm-mri.jpg",
      "imageAlt": "Pair of axial brain MRI slices",
      "stats": [
        {
          "value": "99%",
          "label": "Four-class tumor classification accuracy"
        }
      ],
      "facts": [
        {
          "label": "Result",
          "value": "99% classification accuracy"
        },
        {
          "label": "Input",
          "value": "DICOM MRI pipeline"
        },
        {
          "label": "Interface",
          "value": "PyQt5 clinical application"
        }
      ],
      "insight": ""
    },
    {
      "group": "Clinical AI",
      "kind": "Reinforcement learning · Healthcare",
      "name": "Medical Treatment DRL",
      "description": "An agent that decides when to treat ICU patients, trained on MIMIC-III. A2C reached 99.5% clinical appropriateness. A rule-based safety filter raised PPO and DQN by 40 points. A research simulation, not a clinical tool.",
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
      "seoTitle": "Medical Treatment DRL: ICU timing with reinforcement learning",
      "seoDescription": "An ICU treatment-timing agent trained on MIMIC-III with A2C, PPO and DQN, reaching 99.5% clinical appropriateness with a rule-based safety filter.",
      "writeup": [
        "This project trains reinforcement learning agents to decide treatment timing for ICU patients using the MIMIC-III dataset, in a 26-dimensional Gym environment that models temporal lab trends.",
        "A2C reached 99.5% clinical appropriateness with a reward improvement of +76 to +145. PPO and DQN scored lower until a rule-based safety filter lifted their appropriateness by 40 points.",
        "The safety layer mattered as much as the algorithm. This is a research simulation, not a clinical tool."
      ],
      "image": "/work/drl-a2c-analysis.jpg",
      "imageAlt": "A2C reward distribution and abnormal lab counts over an episode",
      "stats": [
        {
          "value": "99.5%",
          "label": "Clinical appropriateness (A2C)"
        },
        {
          "value": "+76 to +145",
          "label": "Reward improvement over baselines"
        }
      ],
      "facts": [
        {
          "label": "Data",
          "value": "MIMIC-III"
        },
        {
          "label": "Agent",
          "value": "A2C"
        },
        {
          "label": "Safety",
          "value": "Custom filter + 26-D Gym environment"
        }
      ],
      "insight": ""
    },
    {
      "group": "Models to products",
      "kind": "Full-stack product",
      "name": "SpecMob",
      "description": "A phone comparison site on Next.js, FastAPI and async Postgres, with typo-tolerant search and tiered caching. Product descriptions come from Gemini, with a plain fallback so pages still render if the AI call fails.",
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
      ],
      "image": "",
      "imageAlt": "",
      "stats": [
        {
          "value": "Live",
          "label": "Full-stack product in production"
        }
      ],
      "facts": [
        {
          "label": "Stack",
          "value": "Next.js / FastAPI / PostgreSQL"
        },
        {
          "label": "Interface",
          "value": "Search / compare / guided pick"
        },
        {
          "label": "Intelligence",
          "value": "Typo-tolerant search + Gemini copy layer"
        }
      ],
      "insight": ""
    },
    {
      "group": "Models to products",
      "kind": "Applied ML · Research thesis",
      "name": "My Daily Health",
      "description": "My M.Sc. thesis: a diagnosis platform for five disease areas that compares 12 architectures with stratified cross-validation and answers in under 200 ms. Presented at ICSTEM 2023, where it won Best Presentation.",
      "resultLabel": "Result",
      "result": "90 to 99% accuracy across five disease domains on M.Sc. thesis evaluation.",
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
      ],
      "image": "/work/daily-network.png",
      "imageAlt": "Diagram of a convolutional neural network with three convolutional blocks, a fully connected layer and a softmax output",
      "stats": [
        {
          "value": "12",
          "label": "Architectures compared"
        },
        {
          "value": "90-99%",
          "label": "Accuracy across five disease domains"
        }
      ],
      "facts": [
        {
          "label": "Domains",
          "value": "Five disease areas"
        },
        {
          "label": "Architectures",
          "value": "12 evaluated"
        },
        {
          "label": "Reported accuracy",
          "value": "90 to 99%"
        }
      ],
      "insight": "",
      "imageCaption": "Illustrative CNN architecture."
    },
    {
      "slug": "healthcare-cost-prediction",
      "seoTitle": "Healthcare cost prediction with Conv1D and SHAP (R² 0.88)",
      "seoDescription": "A Conv1D model forecasts insurance costs with R² 0.88, using 47 engineered features and SHAP analysis to show what drives each estimate.",
      "writeup": [
        "This project predicts healthcare insurance costs with a Conv1D neural network and reached R² 0.88 in evaluation.",
        "Beyond a single prediction, it uses 47 engineered features and SHAP analysis to show which signals drive each cost estimate, which makes the model easier to interrogate.",
        "A systematic ablation study looked at which temporal convolution strategies work best for healthcare prediction tasks."
      ],
      "group": "Models to products",
      "kind": "Machine learning · Explainability",
      "name": "Healthcare Cost Prediction",
      "description": "A Conv1D model that predicts insurance costs (R² 0.88) from 47 engineered features, with SHAP to show what drives each estimate.",
      "resultLabel": "Result",
      "result": "R² 0.88 with SHAP-based explanations.",
      "stack": [
        "Conv1D",
        "SHAP",
        "Scikit-learn",
        "Plotly"
      ],
      "link": {
        "label": "Read the code",
        "href": "https://github.com/RYANX9/healthcare-cost-prediction"
      },
      "image": "/work/cost-predictions.png",
      "imageAlt": "Predicted versus actual insurance charges with a dashed ideal line",
      "stats": [
        {
          "value": "0.88",
          "label": "R² on insurance cost forecasting"
        }
      ],
      "facts": [
        {
          "label": "Model",
          "value": "Conv1D"
        },
        {
          "label": "Result",
          "value": "R² 0.88"
        },
        {
          "label": "Interpretation",
          "value": "47 engineered features + SHAP"
        }
      ],
      "insight": ""
    },
    {
      "slug": "deep-rl-crypto-trading",
      "seoTitle": "Deep RL crypto trading: PPO and A2C vs a simple SMA baseline",
      "seoDescription": "A reinforcement learning trading experiment where PPO and A2C failed to beat a simple moving-average baseline in a noisy market, with the negative result kept.",
      "writeup": [
        "This experiment compared deep reinforcement learning agents, PPO and A2C, against a simple SMA (simple moving average) baseline for crypto trading.",
        "In a noisy, non-stationary market, the more complex models did not beat the baseline.",
        "I left the negative result in the repository."
      ],
      "group": "Experiments",
      "kind": "Deep RL · Experiment",
      "name": "Deep RL for Crypto Trading",
      "description": "PPO and A2C trading agents against a simple moving-average baseline. They lost, and I kept the result in the repo.",
      "resultLabel": "Finding",
      "result": "PPO and A2C did not beat the SMA baseline; the negative result is kept.",
      "stack": [
        "PPO",
        "A2C",
        "SMA baseline"
      ],
      "link": {
        "label": "Read the experiment",
        "href": "https://github.com/RYANX9/deep-rl-trading"
      },
      "image": "",
      "imageAlt": "",
      "stats": [
        {
          "value": "SMA",
          "label": "Baseline that beat PPO and A2C"
        }
      ],
      "facts": [
        {
          "label": "Agents",
          "value": "PPO / A2C"
        },
        {
          "label": "Baseline",
          "value": "SMA"
        },
        {
          "label": "Finding",
          "value": "RL limits in noisy markets"
        }
      ],
      "insight": ""
    },
    {
      "slug": "day-tracker",
      "seoTitle": "Day Tracker: tasks, budgets, streaks and web push reminders",
      "seoDescription": "A personal productivity system with PostgreSQL storage that combines todos, budgets, streaks, notes and web push reminders.",
      "writeup": [
        "Day Tracker is a personal productivity system that ties tasks, budgets, streaks, reminders and notes into one application.",
        "Data lives in PostgreSQL and web push delivers reminders. It is designed around a daily human workflow rather than an algorithm."
      ],
      "group": "Models to products",
      "kind": "Software · Systems",
      "name": "Day Tracker",
      "description": "A personal app for tasks, budgets, streaks, reminders and notes, with Postgres storage and web push.",
      "resultLabel": "Result",
      "result": "Tasks, budgets, streaks, reminders and notes in one app built for daily use.",
      "stack": [
        "Next.js",
        "PostgreSQL",
        "Web Push"
      ],
      "link": {
        "label": "Read the code",
        "href": "https://github.com/RYANX9/rystudio"
      },
      "image": "",
      "imageAlt": "",
      "stats": [],
      "facts": [
        {
          "label": "Storage",
          "value": "PostgreSQL"
        },
        {
          "label": "Features",
          "value": "Todos / budget / streaks / notes"
        },
        {
          "label": "Realtime",
          "value": "Web push reminders"
        }
      ],
      "insight": ""
    },
    {
      "slug": "git-backed-cms",
      "seoTitle": "Git-backed CMS: a portfolio admin that commits to GitHub",
      "seoDescription": "A client portfolio built for Zaid Saad whose admin panel edits content through the GitHub Contents API, so git is the database.",
      "writeup": [
        "This is a portfolio built for Zaid Saad, a Flutter and Firebase developer, with an admin panel that needs no separate database or CMS.",
        "The /admin dashboard edits site content and posts to an API route that regenerates the data file and commits it straight back to the repository through the GitHub Contents API. Every edit is a real, versioned git commit.",
        "The same approach powers the admin on this site."
      ],
      "group": "Models to products",
      "kind": "Software · Systems",
      "name": "Git-Backed CMS",
      "description": "A portfolio for a client, Zaid Saad, whose admin panel commits edits straight to GitHub, so there is no database.",
      "resultLabel": "Result",
      "result": "No database: every edit is a git commit.",
      "stack": [
        "Next.js",
        "GitHub Contents API"
      ],
      "link": {
        "label": "See the product",
        "href": "https://zaid-saad.vercel.app"
      },
      "image": "",
      "imageAlt": "",
      "stats": [
        {
          "value": "0",
          "label": "Databases required"
        }
      ],
      "facts": [
        {
          "label": "Client",
          "value": "Zaid Saad, Flutter / Firebase developer"
        },
        {
          "label": "Storage",
          "value": "None; git is the database"
        },
        {
          "label": "Write path",
          "value": "GitHub Contents API"
        }
      ],
      "insight": ""
    }
  ],
  "more": [],
  "publications": {
    "label": "",
    "heading": "Publication",
    "note": "",
    "items": [
      {
        "status": "Conference presentation · December 2023",
        "title": "Helping System for Brain Disease Diagnosis Using Deep Learning",
        "description": "Presented at the International Conference on Science, Technology, Engineering and Management (ICSTEM), Istanbul, Turkey, 3 to 7 December 2023.",
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
    "label": "",
    "statement": "",
    "paragraphs": [
      "I'm a PhD researcher in Algeria working on medical imaging and computer vision. My M.Sc. was in embedded systems, and the thesis work from it was presented at ICSTEM 2023 in Istanbul.",
      "Most of what's on this site is medical: brain tumor classification, blood cell detection, ICU treatment timing. I spend a lot of time on how a result was measured, since an accuracy figure alone says little. One of the experiments here is a negative result I kept.",
      "For software I use Next.js, FastAPI or Flask, and Postgres. I took SpecMob from nothing to production and I run several other Postgres-backed apps."
    ],
    "facts": [
      {
        "label": "Based in",
        "value": "Algeria"
      },
      {
        "label": "Education",
        "value": "PhD (in progress), M.Sc. Embedded Systems"
      },
      {
        "label": "Contract work",
        "value": "AIRM and Hemolab"
      }
    ],
    "photo": "/ahmed.jpg",
    "photoAlt": "Portrait of Ahmed Messaad"
  },
  "footer": {
    "blurb": "",
    "wordmark": "messaad",
    "columns": [
      {
        "title": "Site",
        "links": [
          {
            "label": "Projects",
            "href": "/work"
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
    ],
    "cloudImage": "/clouds.jpg"
  },
  "menu": {
    "card": {
      "label": "Latest",
      "title": "HemaVision",
      "text": "Blood smear analysis, 45 minutes down to 3. Shown on BBC 4Tech.",
      "href": "/work/hemavision",
      "image": "/work/hemavision-thumb.jpg"
    },
    "links": [
      {
        "label": "Resume",
        "href": "/resume.pdf"
      },
      {
        "label": "Email",
        "href": "mailto:ahmed.messaad@outlook.com"
      },
      {
        "label": "GitHub",
        "href": "https://github.com/RYANX9"
      }
    ]
  }
};
