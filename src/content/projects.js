export const projects = [
  {
    slug: "bheeshma",
    name: "Bheeshma",
    subtitle: "A quieter way into the Gita.",
    category: "Web experience",
    theme: "gold",
    visual: "bheeshma",
    description:
      "A Bhagavad Gita companion for exploring Sanskrit verses, translations, guidance, and audio. An old text, given room to breathe on the web.",
    technologies: ["React", "Python", "Structured verse data"],
    live: "https://bheeshma.vercel.app/",
    repository: "https://github.com/saagarnkashyap/Bheeshma",
    sections: [
      [
        "The question",
        "How can a digital edition make a complex philosophical text approachable while preserving the relationship between the original Sanskrit, its translation, and its interpretation?",
      ],
      [
        "The approach",
        "Organize the experience around chapters and verses, with paths into translations, guidance, and recitations. The current web edition gives each part its own place instead of presenting the text as one long document.",
      ],
      [
        "Design decisions",
        "Dark surfaces, warm gold accents, Devanagari, and a distinct reading hierarchy establish the atmosphere. The chapter index gives a direct route into the text; the visual identity serves the reading experience.",
      ],
      [
        "Implementation",
        "The current React edition uses verse data collected and processed with Python from Gita Supersite. The linked public repository documents the earlier Streamlit edition, including chapter exploration, emotion-to-verse matching, and audio fallback.",
      ],
      [
        "The challenge",
        "Sanskrit, transliteration, meaning, interpretation, and audio all need to remain connected to the right verse. The earlier source also handles unavailable recitation files with a speech fallback.",
      ],
      [
        "The result",
        "A live digital study edition with chapter navigation, guidance, and audio. The live application and the public repository document different stages of the project.",
      ],
    ],
  },
  {
    slug: "arti-e",
    name: "ARTI-E",
    subtitle: "Inside the semiconductor workcell.",
    category: "Robotics & simulation",
    theme: "sage",
    visual: "arti-e",
    description:
      "A browser-based wafer-handling simulator combining computer vision, robotic motion planning, and a three-dimensional workcell.",
    technologies: ["Python", "OpenCV", "FastAPI", "React", "Three.js"],
    live: "https://arti-e.vercel.app/",
    sections: [
      [
        "The question",
        "How can vision-guided wafer transfers and robot motion planning be explored in a browser without a physical semiconductor workcell?",
      ],
      [
        "The approach",
        "Represent the workcell in 3D and connect wafer localization, inverse kinematics, and collision-aware path planning. The project models both 3-DOF and 4-DOF robotic arms.",
      ],
      [
        "Design decisions",
        "A technical interface brings the workcell, planning controls, and trajectory information into the same view. Spatial relationships carry the explanation rather than a decorative 3D scene.",
      ],
      [
        "Implementation",
        "The supplied resume documents a React and Three.js frontend, a Python and FastAPI backend, OpenCV wafer localization, and RRT-Connect motion planning. Trajectory visualization makes the simulated transfer inspectable.",
      ],
      [
        "The challenge",
        "Localization, reachable poses, collision checks, and trajectories need to agree on the workcell geometry. The simulator includes obstacle avoidance and performance benchmarking for evaluating planned transfers.",
      ],
      [
        "The result",
        "A live browser simulator for semiconductor wafer handling, with an inspectable workcell, motion controls, and trajectory visualization.",
      ],
    ],
  },
  {
    slug: "semiconductor-insights",
    name: "Semiconductor insights",
    subtitle: "Making the numbers comparable.",
    category: "Data & business intelligence",
    theme: "sage",
    visual: "semiconductor",
    year: "2025",
    description:
      "An interactive financial view of Western Digital, Micron, Intel, and TSMC, built to make revenue, inventory, and cash flow easier to compare.",
    technologies: ["Python", "Pandas", "Streamlit", "Excel"],
    live: "https://sd-insights.streamlit.app/",
    repository: "https://github.com/saagarnkashyap/Sandisk-Corp",
    sections: [
      [
        "The question",
        "What becomes visible when financial and inventory data from semiconductor companies is brought into a consistent, explorable view?",
      ],
      [
        "The approach",
        "Collect and transform financial datasets, then compare revenue, cost of goods sold, inventory, and cash flow across Western Digital, Micron, Intel, and TSMC.",
      ],
      [
        "Design decisions",
        "Use a structured dashboard to support comparison and trend inspection. The analytical work is organized around business measures, with the underlying data preparation kept in Python scripts.",
      ],
      [
        "Implementation",
        "Python and Pandas handle processing and transformation. Streamlit presents the dashboard, while the repository also contains Excel processing tools, inventory comparison data, and automation scripts.",
      ],
      [
        "The challenge",
        "Comparisons depend on preparing data consistently. The project separates data automation and Excel handling from the dashboard so that the analysis can be traced back to its inputs.",
      ],
      [
        "The result",
        "A published case-study dashboard with comparative financial analysis, inventory processing tools, and an accessible source repository.",
      ],
    ],
  },
  {
    slug: "wafex",
    name: "Wafex",
    subtitle: "Reading patterns in silicon.",
    category: "Machine learning",
    theme: "sage",
    visual: "wafer",
    description:
      "A convolutional neural network for classifying semiconductor wafer-map defect patterns using the WM-811K dataset.",
    technologies: ["Python", "TensorFlow", "Keras", "WM-811K"],
    repository: "https://github.com/saagarnkashyap/WAFERX",
    sections: [
      [
        "The question",
        "Can spatial patterns on wafer maps be classified consistently enough to support semiconductor defect screening?",
      ],
      [
        "The approach",
        "Use the WM-811K manufacturing dataset to train a CNN across eight defect classes, including center, donut, edge-ring, and scratch patterns.",
      ],
      [
        "Design decisions",
        "Keep the investigation centered on wafer patterns and per-class behavior, rather than reducing the evaluation to one accuracy figure.",
      ],
      [
        "Implementation",
        "The public README describes 64 × 64 grayscale inputs, three convolutional blocks, batch normalization, dropout, and an eight-class softmax output. TensorFlow and Keras provide the training framework.",
      ],
      [
        "The challenge",
        "Class imbalance and irregular scratch patterns complicate evaluation. Stratified splitting and per-class precision, recall, and F1 scores help reveal the differences between defect types.",
      ],
      [
        "The result",
        "A documented wafer defect classification experiment with per-class evaluation and training analysis. The source notebook and project documentation provide a closer look at the model and its behavior.",
      ],
    ],
  },
  {
    slug: "ridezilla",
    name: "RideZilla",
    subtitle: "A closer look at the ride.",
    category: "Data & personal tools",
    theme: "rust",
    visual: "ride",
    description:
      "A personal cycling analytics dashboard for exploring distance, speed, elevation, and consistency using Strava activity data.",
    technologies: ["Python", "Streamlit", "Pandas", "Strava API"],
    repository: "https://github.com/saagarnkashyap/RideZilla",
    live: "https://ridezilla.streamlit.app/",
    sections: [
      [
        "The question",
        "What can ride history reveal about pacing and consistency when activities are viewed together rather than one at a time?",
      ],
      [
        "The approach",
        "Bring cycling activity data into an interactive dashboard with monthly average speed comparisons, recent ride plots, and weekly consistency tracking.",
      ],
      [
        "Design decisions",
        "Emphasize relationships between distance, pace, elevation, and speed. The dashboard supports personal reflection on performance rather than competition between athletes.",
      ],
      [
        "Implementation",
        "Python, Pandas, Matplotlib, Seaborn, and Streamlit process and present the data. The public project supports CSV data and activity fetching through a supplied Strava token.",
      ],
      [
        "The challenge",
        "Activity access and expiring credentials need careful handling. The public README describes a personal token-based setup, not a complete multi-user OAuth flow.",
      ],
      [
        "The result",
        "A personal cycling dashboard for exploring speed, distance, elevation, and consistency, with published source and a documented setup.",
      ],
    ],
  },
  {
    slug: "neuroasha",
    name: "NeuroAsha",
    subtitle: "A dementia companion research project.",
    category: "Machine learning & web",
    theme: "sage",
    visual: "neuro",
    description:
      "A dementia companion project combining an Alzheimer’s MRI classifier with LLM-based symptom tracking.",
    technologies: ["Python", "CNN", "Vision Transformers", "Deep learning"],
    repository: "https://github.com/saagarnkashyap/NeuroAsha-website",
    live: "https://neuroasha.vercel.app/",
    sections: [
      [
        "The question",
        "How can image classification and symptom tracking be brought together in a dementia companion research project?",
      ],
      [
        "The approach",
        "The supplied resume describes a CNN-based Alzheimer’s MRI classifier combined with LLM-based symptom tracking. The work explores both imaging and a conversational interface.",
      ],
      [
        "Design decisions",
        "Keep the classification experiment and the companion interface understandable as distinct parts of the project. A prediction is an experimental model output, not a clinical conclusion.",
      ],
      [
        "Implementation",
        "The resume lists Python, convolutional neural networks, Vision Transformers, ImageNet, and deep learning. The linked public repository is the NeuroAsha website; it is distinct from the model repository referenced in the resume.",
      ],
      [
        "Challenges & outcome",
        "A companion interface needs to communicate what the model can and cannot establish. The project has a published website; no clinical validation, diagnostic reliability, or healthcare deployment is claimed here.",
      ],
    ],
  },
];
