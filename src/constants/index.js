import {
    mobile,
    backend,
    ai,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    threejs,
    sait,
    nomad,
    wavemakers,
    linkedin,
    oracledb,
    python,
    java,
    flutter,
    proplan,
    hl7chatbotinterface,
    portfolio,
    sushirestaurant,
    newssummarize,

  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "learn",
      title: "Learned",
    },
    {
      id: "connect",
      title: "Connect with me",
    },
    {
      id: "works",
      title: "Works",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Full-Stack Developer",
      icon: web,
    },
    {
      title: "Software Developer",
      icon: backend,
    },
    {
      title: "Mobile Developer",
      icon: mobile,
    },
    {
      title: "AI Developer",
      icon: ai,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Oracle DB",
      icon: oracledb,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    
    {
      name: "python",
      icon: python,
    },
    
    {
      name: "java",
      icon: java,
    },
    {
      name: "flutter",
      icon: flutter,
    },
  ];
  
  const experiences = [
    {
      title: "Software Development Program",
      company_name: "Southern Alberta Institute of Technology (SAIT)",
      icon: sait, 
      iconBg: "#383E56",
      date: "Sept 2022 - April 2024",
      points: [
        "Engaged in intensive coursework covering Java, Python, and web development fundamentals.",
        "Completed various projects focusing on software development principles and best practices.",
        "Gained a strong understanding of object-oriented programming and data structures.",
        "Collaborated on team projects, enhancing skills in team communication and project management.",
      ],
    },
    {
      title: "LinkedIn Learning Courses",
      company_name: "LinkedIn",
      icon: linkedin, 
      iconBg: "#E6DEDD",
      date: "2022 Dec, 2023 March",
      points: [
        "Completed 'AWS Essential Training for Developers' on LinkedIn Learning, acquiring skills in cloud computing, AWS services, and cloud architecture.",
        "Gained practical knowledge in deploying and managing applications on the AWS platform.",
        "Studied 'GitHub Essential Training', enhancing my understanding of version control, repositories, branches, and collaboration using GitHub.",
        "Applied the learned concepts in personal and academic projects, improving source code management and team collaboration.",
      ],
    },
    {
      title: "Wavemakers Experiential Learning Program",
      company_name: "Capstone Project",
      icon: wavemakers, 
      iconBg: "#383E56", 
      date: "Nov 2023",
      points: [
        "Completed an intensive 8-week experiential learning program focused on developing future-proof skills for the workplace.",
        "Collaborated with team 'YellowWave' to conceptualize and present 'Green-Space Ease', a mobile app designed to make greenspaces more accessible.",
        "Championed the cause of good health and well-being, aiming to assist individuals struggling with mental health issues or disabilities affecting mobility.",
        "Developed the project under the government of Canada's innovative work-integrated learning initiative, acquiring practical experience in teamwork and project management.",
        "The website: https://www.wavemakers.network/",
      ],
    },
    {
      title: "Flutter Development Journey",
      company_name: "Online Learning via Nomad Coders",
      icon: nomad,
      iconBg: "#E6DEDD", 
      date: "Aug 2023 - Present",
      points: [
        "Engaged in a comprehensive Flutter course with Nomad Coders, covering Widget lifecycles, state management, data fetching, navigation, and UI design.",
        "Developed a webtoon application using Flutter, applying practical skills in UI development and local storage integration.",
        "Gained a deep understanding of Flutter's rich set of Widgets and how to use them to create interactive user interfaces.",
        "Learned and implemented advanced Flutter concepts such as managing app state, navigating between screens, and handling asynchronous data with Futures.",
        "Explored efficient coding practices with shortcuts and extensions to streamline development and maintenance of Flutter apps."
      ],
    },
    
  ];
  
  const connect = [
    {
      connect:
        "Passionate SAIT Software Development student with a focus on AI development. Let's connect and explore the tech landscape together!",
      name: "ryan-back",
      company: "LinkedIn",
      image: "src/assets/company/linkedin.png",
      socialLink:"https://www.linkedin.com/in/ryan-back/",
    },
    {
      connect:
        "Aspiring AI developer showcasing diverse projects from 3D environments to web apps. Excited to collaborate and learn in the coding world!",
      name: "ho0405",
      company: "Github",
      image: "src/assets/github.png",
      socialLink:"https://github.com/ho0405",
    },
    {
      connect:
        "Join me in the world of coding! I'm a SAIT Software Development student, sharing code and glimpses of daily life. Let's connect personally—follow for coding adventures and more! 🚀👩‍💻",
      name: "ryanback45",
      company: "Instagram",
      image: "src/assets/company/instagram.webp",
      socialLink:"https://www.instagram.com/ryanback45/",
    },
  ];
  
  const projects = [
    {
      name: "Pro Plan (Task manager)",
      description:
        "Pro Plan is a cutting-edge web application developed using React as part of the SAIT web development project. This powerful tool empowers teams to enhance collaboration, streamline task management, and visualize project progress effortlessly.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "vercel",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
        {
          name: "firebase",
          color: "orange-text-gradient",
        },
      ],
      image: proplan,
      website: "https://cprg-306-final-project.vercel.app/",
      source_code_link: "https://github.com/Sergei137/cprg-306-Final-Project",
    },
    {
      name: "3D Portfolio",
      description:
        "Step into a new dimension with the 3D Personal Portfolio – a groundbreaking showcase of skills and achievements crafted with three.js, Vite, and Tailwind CSS. This portfolio isn't just a static display; it's a dynamic and immersive experience designed to captivate visitors and provide an unparalleled insight into your creative journey.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "three.js",
          color: "green-text-gradient",
        },
        {
          name: "tailwindcss",
          color: "pink-text-gradient",
        },
        {
          name: "vite.js",
          color: "orange-text-gradient",
        }
      ],
      image: portfolio,
      source_code_link: "https://github.com/ho0405/3D_portfolio",
    },
    {
      name: "Sushi Restaurant",
      description:
          "Indulge in a culinary adventure with 'Sushi Restaurant,' an innovative mobile app crafted using Flutter. Designed to function seamlessly on both Android and iOS, this app revolutionizes the sushi dining experience. Dive into intuitive menu pages, customize your order, and enjoy the convenience of an integrated 'add to cart' feature.",
      tags: [
          {
              name: "flutter",
              color: "blue-text-gradient",
          },
          {
              name: "dart",
              color: "green-text-gradient",
          },
      ],
      image: sushirestaurant,
      source_code_link: "https://github.com/ho0405/sushi_resturant/",
  },
  {
    name: "News Summarizer & Sentiment Analyzer",
    description:
        "Empower your news reading experience with 'News Summarizer & Sentiment Analyzer,' a comprehensive tool developed in Python and PyQt5. This application is designed to simplify staying informed by summarizing news articles, performing sentiment analysis with TextBlob, and offering translation to Korean using the Google Cloud Translation API. Initially developed with Tkinter, it was transitioned to PyQt5 to ensure smooth operation across all platforms, including macOS. Created to save time and enhance comprehension for users, including a personal touch for my mom to access global news in her native language.",
    tags: [
        {
            name: "python",
            color: "green-text-gradient",
        },
        {
            name: "pyqt5",
            color: "orange-text-gradient",
        },
        {
            name: "textblob",
            color: "pink-text-gradient",
        },
        {
            name: "google cloud translation",
            color: "blue-text-gradient",
        },
    ],
    image: newssummarize,
    source_code_link: "https://github.com/ho0405/Summarize-News-Articles",
},

    {
      name: "HL7 Converter and Chatbot Interface",
    description: "Dive into the world of healthcare data interchange with our capstone project, the HL7 Converter and Chatbot Interface. This innovative software solution leverages the robust Flask backend and Python's Tesseract OCR for efficient conversion of PDF documents into HL7 format, facilitating seamless data sharing among various healthcare information systems. With a sleek front-end designed using React JS, users can experience intuitive interactions and easy navigation. The project also integrates Firebase for authentication, ensuring secure access and user management, alongside a custom chatbot powered by OpenAI's API for real-time assistance.",
    tags: [
    {
      name: "flask",
      color: "orange-text-gradient"
    },
    {
      name: "react",
      color: "blue-text-gradient"
    },
    {
      name: "firebase",
      color: "green-text-gradient"
    },
    {
      name: "python tesseract",
      color: "pink-text-gradient"
    },
    {
      name: "openai api",
      color: "purple-text-gradient"
    }
  ],
  image: hl7chatbotinterface,
  source_code_link: "https://github.com/ho0405/hi7_hl7fb"
    },
    
  ];
  
  export { services, technologies, experiences, connect, projects };