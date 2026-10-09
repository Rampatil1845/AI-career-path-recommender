/* ========================================
   PathPilot — Application Logic
   ======================================== */

// ==========================================
// STATE
// ==========================================
const state = {
    currentQuestion: 0,
    answers: [],
    recommendedCareer: null,
    userSkills: [],
    skillGapDone: false,
    learningStarted: false,
    projectsViewed: false,
    trackerOpen: false,
    profession: null,
    useGrok: false,
    grokQA: [],
    totalQuestions: 5
};

// ==========================================
// CAREER DATA
// ==========================================
const CAREERS = {
    'data-scientist': {
        title: 'Data Scientist',
        icon: '📊',
        match: 'your analytical mind and love for uncovering patterns in information',
        overview: 'Data Scientists extract insights from complex data using statistics, machine learning, and programming. They help organizations make data-driven decisions by analyzing trends, building predictive models, and communicating findings through compelling visualizations.',
        responsibilities: [
            'Collect, clean, and preprocess large datasets for analysis',
            'Build predictive models using machine learning algorithms',
            'Create data visualizations and dashboards to communicate insights',
            'Collaborate with business teams to define key metrics and KPIs',
            'Design and run A/B tests to validate hypotheses'
        ],
        skills: ['Python', 'Statistics', 'Machine Learning', 'SQL', 'Data Visualization', 'Pandas', 'NumPy', 'Critical Thinking'],
        tools: ['Jupyter Notebook', 'TensorFlow', 'Tableau', 'PostgreSQL', 'Scikit-learn', 'Power BI'],
        demand: 92,
        demandLabel: 'Very High',
        allSkills: ['Python', 'Statistics', 'Machine Learning', 'SQL', 'Data Visualization', 'Pandas', 'NumPy', 'Critical Thinking', 'Linear Algebra', 'Data Cleaning', 'R Programming', 'Deep Learning'],
        roadmap: [
            { step: 'Step 1', title: 'Learn Programming Fundamentals', desc: 'Start with Python — learn variables, loops, functions, and data structures. Python is the primary language for data science.' },
            { step: 'Step 2', title: 'Master Statistics & Mathematics', desc: 'Learn probability, descriptive/inferential statistics, linear algebra, and calculus — the mathematical foundation of data science.' },
            { step: 'Step 3', title: 'Learn Data Analysis Tools', desc: 'Master Pandas, NumPy, SQL, and data visualization libraries like Matplotlib and Seaborn.' },
            { step: 'Step 4', title: 'Study Machine Learning', desc: 'Learn supervised and unsupervised learning algorithms with Scikit-learn. Understand model evaluation and hyperparameter tuning.' },
            { step: 'Step 5', title: 'Build Data Science Projects', desc: 'Apply your skills to real-world datasets from Kaggle. Build an end-to-end portfolio featuring EDA, prediction models, and dashboards.' }
        ],
        freeCourses: [
            { title: 'Python for Beginners — Full Course', channel: 'freeCodeCamp', duration: '4h 30min', rating: 4.8, url: 'https://www.youtube.com/watch?v=rfscVS0vtbw', color: '#3B82F6' },
            { title: 'Data Analysis with Python', channel: 'Alex The Analyst', duration: '6h', rating: 4.5, url: 'https://www.youtube.com/watch?v=r-uOLxNrNk8', color: '#10B981' },
            { title: 'Machine Learning Course for Beginners', channel: 'freeCodeCamp', duration: '10h', rating: 4.9, url: 'https://www.youtube.com/watch?v=NWONeJKn6kc', color: '#F59E0B' },
            { title: 'Statistics Fundamentals', channel: 'StatQuest with Josh Starmer', duration: '3h 45min', rating: 4.9, url: 'https://www.youtube.com/watch?v=qBigTkBLU6g', color: '#8B5CF6' }
        ],
        paidCourses: [
            { title: 'Python for Data Science and Machine Learning', platform: 'Udemy', instructor: 'Jose Portilla', price: '$49', rating: 4.6, url: '#', color: '#3B82F6' },
            { title: 'IBM Data Science Professional Certificate', platform: 'Coursera', instructor: 'IBM', price: '$49/month', rating: 4.6, url: '#', color: '#10B981' },
            { title: 'Machine Learning A-Z', platform: 'Udemy', instructor: 'Kirill Eremenko', price: '$59', rating: 4.7, url: '#', color: '#F59E0B' },
            { title: 'Deep Learning Specialization', platform: 'Coursera', instructor: 'Andrew Ng', price: '$49/month', rating: 4.8, url: '#', color: '#8B5CF6' }
        ]
    },
    'ml-engineer': {
        title: 'Machine Learning Engineer',
        icon: '🤖',
        match: 'your passion for building intelligent systems and solving complex problems',
        overview: 'Machine Learning Engineers build and deploy AI/ML models at scale. They bridge the gap between data science research and production systems, designing robust ML pipelines and optimizing model performance for real-world applications.',
        responsibilities: [
            'Design, build, and maintain machine learning pipelines',
            'Optimize ML models for performance, latency, and scalability',
            'Deploy models to production using MLOps best practices',
            'Collaborate with data scientists to productionize research models',
            'Monitor model performance and implement retraining strategies'
        ],
        skills: ['Python', 'Deep Learning', 'TensorFlow/PyTorch', 'MLOps', 'Docker', 'Cloud Services', 'Mathematics', 'Software Engineering'],
        tools: ['PyTorch', 'TensorFlow', 'Kubernetes', 'AWS SageMaker', 'MLflow', 'Docker'],
        demand: 95,
        demandLabel: 'Extremely High',
        allSkills: ['Python', 'Deep Learning', 'TensorFlow', 'PyTorch', 'MLOps', 'Docker', 'Cloud Services', 'Mathematics', 'Software Engineering', 'Computer Vision', 'NLP', 'Model Optimization'],
        roadmap: [
            { step: 'Step 1', title: 'Master Python & Software Engineering', desc: 'Learn advanced Python, OOP, design patterns, version control with Git, and software engineering best practices.' },
            { step: 'Step 2', title: 'Deep Dive into Mathematics', desc: 'Master linear algebra, calculus, probability, and optimization — the core math behind ML algorithms.' },
            { step: 'Step 3', title: 'Learn Deep Learning Frameworks', desc: 'Build neural networks with PyTorch and TensorFlow. Study CNNs, RNNs, Transformers, and GANs.' },
            { step: 'Step 4', title: 'Master MLOps & Deployment', desc: 'Learn Docker, Kubernetes, CI/CD for ML, model serving with FastAPI, and cloud deployment (AWS/GCP).' },
            { step: 'Step 5', title: 'Build End-to-End ML Systems', desc: 'Design and deploy complete ML pipelines — from data ingestion to model monitoring — with real-world projects.' }
        ],
        freeCourses: [
            { title: 'Machine Learning Full Course', channel: 'freeCodeCamp', duration: '10h', rating: 5.0, url: 'https://www.youtube.com/watch?v=NWONeJKn6kc', color: '#3B82F6' },
            { title: 'PyTorch for Deep Learning', channel: 'freeCodeCamp', duration: '10h', rating: 4.8, url: 'https://www.youtube.com/watch?v=V_xro1bcAuA', color: '#EF4444' },
            { title: 'MLOps — Machine Learning Operations', channel: 'DataTalksClub', duration: '6h', rating: 4.7, url: 'https://www.youtube.com/watch?v=XwTH8BDGzYk', color: '#8B5CF6' },
            { title: 'Mathematics for Machine Learning', channel: 'freeCodeCamp', duration: '8h', rating: 4.6, url: 'https://www.youtube.com/watch?v=1VSZtNYMntM', color: '#F59E0B' }
        ],
        paidCourses: [
            { title: 'Deep Learning Specialization', platform: 'Coursera', instructor: 'Andrew Ng', price: '$49/month', rating: 4.8, url: '#', color: '#3B82F6' },
            { title: 'Machine Learning Engineering for Production (MLOps)', platform: 'Coursera', instructor: 'DeepLearning.AI', price: '$49/month', rating: 4.7, url: '#', color: '#EF4444' },
            { title: 'Deployment of Machine Learning Models', platform: 'Udemy', instructor: 'Soledad Galli', price: '$45', rating: 4.6, url: '#', color: '#8B5CF6' },
            { title: 'TensorFlow Developer Certificate in 2024', platform: 'Udemy', instructor: 'Andrei Neagoie', price: '$59', rating: 4.6, url: '#', color: '#06B6D4' }
        ]
    },
    'backend-developer': {
        title: 'Backend Developer',
        icon: '⚙️',
        match: 'your systematic thinking and interest in building the engines that power applications',
        overview: 'Backend Developers build the server-side logic, databases, and APIs that power web and mobile applications. They ensure applications run efficiently, securely, and can scale to handle millions of users.',
        responsibilities: [
            'Design and build RESTful APIs and microservices',
            'Manage databases and optimize query performance',
            'Implement authentication, authorization, and security best practices',
            'Write clean, testable, and well-documented code',
            'Deploy and maintain server infrastructure'
        ],
        skills: ['Python/Node.js', 'Databases', 'REST APIs', 'Git', 'Cloud Services', 'System Design', 'Testing', 'Security'],
        tools: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Docker', 'Redis'],
        demand: 88,
        demandLabel: 'High',
        allSkills: ['Python', 'Node.js', 'Databases', 'REST APIs', 'Git', 'Cloud Services', 'System Design', 'Testing', 'Security', 'SQL', 'Docker', 'Linux'],
        roadmap: [
            { step: 'Step 1', title: 'Learn Programming Fundamentals', desc: 'Start with Python or JavaScript (Node.js). Master variables, functions, OOP, and data structures.' },
            { step: 'Step 2', title: 'Master Databases & SQL', desc: 'Learn relational databases (PostgreSQL), NoSQL (MongoDB), data modeling, and query optimization.' },
            { step: 'Step 3', title: 'Build REST APIs', desc: 'Learn Express.js or Django/Flask. Build CRUD APIs with authentication, validation, and error handling.' },
            { step: 'Step 4', title: 'Learn DevOps Basics', desc: 'Master Git, Docker, CI/CD pipelines, cloud deployment (AWS/Heroku), and basic system administration.' },
            { step: 'Step 5', title: 'Build Backend Projects', desc: 'Create real-world APIs — e-commerce backends, chat servers, or content management systems — and deploy them.' }
        ],
        freeCourses: [
            { title: 'Node.js Full Course for Beginners', channel: 'freeCodeCamp', duration: '8h', rating: 4.8, url: 'https://www.youtube.com/watch?v=Oe421EPjeBE', color: '#10B981' },
            { title: 'Web Development Bootcamp (Free Edition)', channel: 'Programming with Mosh', duration: '7h', rating: 4.5, url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk', color: '#3B82F6' },
            { title: 'PostgreSQL Full Course', channel: 'Amigoscode', duration: '2h', rating: 4.7, url: 'https://www.youtube.com/watch?v=qw--VYLpxG4', color: '#F59E0B' },
            { title: 'REST API Design Best Practices', channel: 'Traversy Media', duration: '1h 30min', rating: 4.9, url: 'https://www.youtube.com/watch?v=fgTGo7_kGEk', color: '#8B5CF6' }
        ],
        paidCourses: [
            { title: 'The Complete Node.js Developer Course', platform: 'Udemy', instructor: 'Andrew Mead', price: '$49', rating: 4.7, url: '#', color: '#10B981' },
            { title: 'System Design Interview Prep', platform: 'Educative', instructor: 'Arslan Ahmad', price: '$39/month', rating: 4.8, url: '#', color: '#3B82F6' },
            { title: 'Microservices with Node JS and React', platform: 'Udemy', instructor: 'Stephen Grider', price: '$59', rating: 4.7, url: '#', color: '#EF4444' },
            { title: 'Backend Engineering Professional Certificate', platform: 'Coursera', instructor: 'Meta', price: '$49/month', rating: 4.8, url: '#', color: '#8B5CF6' }
        ]
    },
    'frontend-developer': {
        title: 'Frontend Developer',
        icon: '🎨',
        match: 'your creative eye and passion for building beautiful, interactive user experiences',
        overview: 'Frontend Developers build the visible parts of websites and applications that users interact with directly. They combine design, technology, and psychology to create intuitive and engaging digital experiences.',
        responsibilities: [
            'Build responsive user interfaces with modern frameworks like React or Vue',
            'Translate UI/UX design wireframes into high-quality code',
            'Optimize applications for maximum speed and scalability',
            'Ensure cross-browser compatibility and accessibility',
            'Collaborate with designers and backend developers'
        ],
        skills: ['JavaScript', 'React/Vue', 'HTML/CSS', 'Responsive Design', 'Git', 'Web Performance', 'Accessibility', 'UI/UX Principles'],
        tools: ['React', 'Next.js', 'Tailwind CSS', 'Figma', 'Vercel', 'Chrome DevTools'],
        demand: 88,
        demandLabel: 'High',
        allSkills: ['JavaScript', 'React', 'HTML', 'CSS', 'Git', 'TypeScript', 'Testing', 'Responsive Design', 'Web Performance', 'Accessibility', 'Tailwind', 'Figma'],
        roadmap: [
            { step: 'Step 1', title: 'Master HTML, CSS & JavaScript', desc: 'Learn semantic HTML, modern CSS (Flexbox, Grid, animations), and core JavaScript including ES6+ features.' },
            { step: 'Step 2', title: 'Learn a Frontend Framework', desc: 'Pick React or Vue.js. Build component-based UIs, manage state, and handle routing.' },
            { step: 'Step 3', title: 'Advanced CSS & Styling', desc: 'Learn Tailwind CSS, SASS, or CSS-in-JS. Master responsive design for all screen sizes.' },
            { step: 'Step 4', title: 'Web Performance & Accessibility', desc: 'Learn how to optimize assets, improve Core Web Vitals, and make sites accessible (a11y) to everyone.' },
            { step: 'Step 5', title: 'Build Frontend Projects', desc: 'Create complete, interactive apps — e-commerce fronts, dashboards, and landing pages to showcase your skills.' }
        ],
        freeCourses: [
            { title: 'HTML & CSS Full Course', channel: 'SuperSimpleDev', duration: '6h 30min', rating: 4.9, url: 'https://www.youtube.com/watch?v=G3e-cpL7ofc', color: '#F59E0B' },
            { title: 'JavaScript Full Course for Beginners', channel: 'freeCodeCamp', duration: '8h', rating: 4.8, url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg', color: '#3B82F6' },
            { title: 'React Full Course 2024', channel: 'freeCodeCamp', duration: '12h', rating: 4.9, url: 'https://www.youtube.com/watch?v=bMknfKXIFA8', color: '#06B6D4' },
            { title: 'Tailwind CSS Crash Course', channel: 'Traversy Media', duration: '1h 30min', rating: 4.7, url: 'https://www.youtube.com/watch?v=UBOj6rqRUME', color: '#10B981' }
        ],
        paidCourses: [
            { title: 'The Complete Web Developer in 2024', platform: 'Udemy', instructor: 'Andrei Neagoie', price: '$49', rating: 4.7, url: '#', color: '#F59E0B' },
            { title: 'React - The Complete Guide (incl Hooks, Redux)', platform: 'Udemy', instructor: 'Maximilian Schwarzmüller', price: '$59', rating: 4.6, url: '#', color: '#06B6D4' },
            { title: 'Advanced CSS and Sass', platform: 'Udemy', instructor: 'Jonas Schmedtmann', price: '$45', rating: 4.8, url: '#', color: '#3B82F6' },
            { title: 'Meta Front-End Developer Professional Certificate', platform: 'Coursera', instructor: 'Meta', price: '$49/month', rating: 4.7, url: '#', color: '#8B5CF6' }
        ]
    },
    'cybersecurity-analyst': {
        title: 'Cybersecurity Analyst',
        icon: '🛡️',
        match: 'your investigative mindset and passion for protecting systems and solving security puzzles',
        overview: 'Cybersecurity Analysts protect organizations from cyber threats by monitoring networks, analyzing vulnerabilities, and responding to security incidents. They are the digital guardians keeping data and infrastructure safe.',
        responsibilities: [
            'Monitor networks and systems for security threats and breaches',
            'Conduct vulnerability assessments and penetration testing',
            'Investigate security incidents and perform forensic analysis',
            'Implement security policies and best practices',
            'Stay current with emerging threats and attack vectors'
        ],
        skills: ['Networking', 'Linux', 'Security Tools', 'Python', 'Incident Response', 'Risk Assessment', 'Cryptography', 'Firewalls'],
        tools: ['Wireshark', 'Metasploit', 'Burp Suite', 'Nmap', 'Splunk', 'Kali Linux'],
        demand: 93,
        demandLabel: 'Extremely High',
        allSkills: ['Networking', 'Linux', 'Security Tools', 'Python', 'Incident Response', 'Risk Assessment', 'Cryptography', 'Firewalls', 'SIEM', 'Ethical Hacking', 'Forensics', 'Compliance'],
        roadmap: [
            { step: 'Step 1', title: 'Learn Networking Fundamentals', desc: 'Master TCP/IP, DNS, HTTP, subnetting, and network protocols — the foundation of all cybersecurity knowledge.' },
            { step: 'Step 2', title: 'Master Linux & Command Line', desc: 'Learn Linux system administration, bash scripting, file permissions, and process management.' },
            { step: 'Step 3', title: 'Study Security Concepts', desc: 'Learn cryptography, authentication, firewalls, IDS/IPS, vulnerability types (OWASP Top 10), and risk frameworks.' },
            { step: 'Step 4', title: 'Hands-on Security Tools', desc: 'Practice with Wireshark, Nmap, Metasploit, Burp Suite. Use platforms like TryHackMe and HackTheBox.' },
            { step: 'Step 5', title: 'Build Security Projects & Certifications', desc: 'Set up home labs, perform CTF challenges, and work toward CompTIA Security+ or CEH certification.' }
        ],
        freeCourses: [
            { title: 'Ethical Hacking Full Course', channel: 'freeCodeCamp', duration: '15h', rating: 4.9, url: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE', color: '#EF4444' },
            { title: 'Networking Fundamentals', channel: 'NetworkChuck', duration: '4h', rating: 4.8, url: 'https://www.youtube.com/watch?v=qiQR5rTSshw', color: '#3B82F6' },
            { title: 'CompTIA Security+ Full Course', channel: 'Professor Messer', duration: '12h', rating: 4.9, url: 'https://www.youtube.com/watch?v=9Hd8QJmZQUc', color: '#8B5CF6' },
            { title: 'Linux for Ethical Hackers', channel: 'The Cyber Mentor', duration: '3h', rating: 4.8, url: 'https://www.youtube.com/watch?v=U1w4T03B30I', color: '#10B981' }
        ],
        paidCourses: [
            { title: 'Learn Ethical Hacking From Scratch', platform: 'Udemy', instructor: 'Zaid Sabih', price: '$49', rating: 4.6, url: '#', color: '#EF4444' },
            { title: 'Google Cybersecurity Professional Certificate', platform: 'Coursera', instructor: 'Google', price: '$39/month', rating: 4.8, url: '#', color: '#3B82F6' },
            { title: 'Practical Ethical Hacking', platform: 'TCM Security', instructor: 'Heath Adams', price: '$29', rating: 4.9, url: '#', color: '#F59E0B' },
            { title: 'CompTIA Security+ (SY0-601) Complete Course', platform: 'Udemy', instructor: 'Jason Dion', price: '$45', rating: 4.7, url: '#', color: '#8B5CF6' }
        ]
    },
    'devops-engineer': {
        title: 'DevOps Engineer',
        icon: '☁️',
        match: 'your love for automation, efficiency, and making systems run smoothly at scale',
        overview: 'DevOps Engineers bridge development and operations, automating infrastructure, managing CI/CD pipelines, and ensuring reliable deployments. They focus on making software delivery faster, safer, and more efficient.',
        responsibilities: [
            'Design and manage CI/CD pipelines for automated deployments',
            'Provision and manage cloud infrastructure (AWS, GCP, Azure)',
            'Implement Infrastructure as Code using Terraform and Ansible',
            'Monitor system performance and set up alerting',
            'Ensure high availability, disaster recovery, and scalability'
        ],
        skills: ['Linux', 'Cloud Platforms', 'Docker', 'Kubernetes', 'CI/CD', 'Scripting', 'Monitoring', 'Networking'],
        tools: ['Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'AWS', 'Prometheus'],
        demand: 91,
        demandLabel: 'Very High',
        allSkills: ['Linux', 'Cloud Platforms', 'Docker', 'Kubernetes', 'CI/CD', 'Scripting', 'Monitoring', 'Networking', 'Terraform', 'Ansible', 'Git', 'Security'],
        roadmap: [
            { step: 'Step 1', title: 'Master Linux & Scripting', desc: 'Learn Linux administration, Bash scripting, Python automation, and system fundamentals.' },
            { step: 'Step 2', title: 'Learn Cloud Platforms', desc: 'Master AWS (EC2, S3, IAM, VPC) or GCP/Azure. Understand cloud architecture and managed services.' },
            { step: 'Step 3', title: 'Containerization & Orchestration', desc: 'Learn Docker for containerizing apps and Kubernetes for orchestration. Understand pods, services, and deployments.' },
            { step: 'Step 4', title: 'CI/CD & Infrastructure as Code', desc: 'Build automated pipelines with GitHub Actions or Jenkins. Learn Terraform for IaC and Ansible for configuration management.' },
            { step: 'Step 5', title: 'Build DevOps Projects', desc: 'Deploy full applications with automated CI/CD, monitoring (Prometheus/Grafana), and blue-green deployments.' }
        ],
        freeCourses: [
            { title: 'AWS Cloud Practitioner — Full Course', channel: 'freeCodeCamp', duration: '13h', rating: 4.8, url: 'https://www.youtube.com/watch?v=SOTamWNgDKc', color: '#F59E0B' },
            { title: 'Docker Tutorial for Beginners', channel: 'TechWorld with Nana', duration: '3h', rating: 4.9, url: 'https://www.youtube.com/watch?v=3c-iBn73dDE', color: '#06B6D4' },
            { title: 'Kubernetes Tutorial for Beginners', channel: 'TechWorld with Nana', duration: '4h', rating: 4.9, url: 'https://www.youtube.com/watch?v=X48VuDVv0do', color: '#3B82F6' },
            { title: 'Terraform Course — Automate AWS', channel: 'freeCodeCamp', duration: '2h 30min', rating: 4.7, url: 'https://www.youtube.com/watch?v=SLB_c_ayRMo', color: '#8B5CF6' }
        ],
        paidCourses: [
            { title: 'DevOps Bootcamp: Terraform, AWS, Docker', platform: 'Udemy', instructor: 'Stephen Grider', price: '$59', rating: 4.7, url: '#', color: '#06B6D4' },
            { title: 'Docker Mastery: with Kubernetes +Swarm', platform: 'Udemy', instructor: 'Bret Fisher', price: '$49', rating: 4.6, url: '#', color: '#3B82F6' },
            { title: 'AWS Certified Solutions Architect - Associate', platform: 'Udemy', instructor: 'Stephane Maarek', price: '$45', rating: 4.7, url: '#', color: '#F59E0B' },
            { title: 'IBM DevOps and Software Engineering Certificate', platform: 'Coursera', instructor: 'IBM', price: '$49/month', rating: 4.6, url: '#', color: '#8B5CF6' }
        ]
    },
    'data-engineer': {
        title: 'Data Engineer',
        icon: '🚰',
        match: 'your love for building robust systems and processing massive streams of information',
        overview: 'Data Engineers build and maintain the infrastructure that allows data to flow reliably. They design data pipelines to collect, transform, and store data for analysis.',
        responsibilities: [
            'Design and build scalable data pipelines',
            'Develop ETL (Extract, Transform, Load) processes',
            'Manage cloud data warehouses and data lakes',
            'Optimize database systems for performance',
            'Collaborate with Data Scientists to prepare data for models'
        ],
        skills: ['Python', 'SQL', 'Data Warehousing', 'Spark/Hadoop', 'AWS/GCP', 'ETL', 'Data Modeling', 'Airflow'],
        tools: ['Apache Spark', 'Snowflake', 'Airflow', 'Kafka', 'AWS Redshift', 'dbt'],
        demand: 94,
        demandLabel: 'Extremely High',
        allSkills: ['Python', 'SQL', 'Data Warehousing', 'Spark', 'Hadoop', 'AWS', 'GCP', 'ETL', 'Data Modeling', 'Airflow', 'Kafka', 'Database Design'],
        roadmap: [
            { step: 'Step 1', title: 'Master Advanced SQL & Databases', desc: 'Learn query optimization, indexing, and complex joins across both relational and NoSQL databases.' },
            { step: 'Step 2', title: 'Learn Python & Scripting', desc: 'Master Python for data manipulation, particularly libraries like Pandas, and learn shell scripting.' },
            { step: 'Step 3', title: 'Data Warehousing & Modeling', desc: 'Study data architecture, star schemas, snowflake schemas, and cloud warehouses like Snowflake or Redshift.' },
            { step: 'Step 4', title: 'Build ETL Pipelines', desc: 'Learn to extract, transform, and load data using orchestration tools like Apache Airflow or dbt.' },
            { step: 'Step 5', title: 'Master Big Data Tools', desc: 'Understand distributed computing with Apache Spark, Hadoop, and streaming with Kafka.' }
        ],
        freeCourses: [
            { title: 'Data Engineering Course for Beginners', channel: 'freeCodeCamp', duration: '4h', rating: 4.7, url: 'https://www.youtube.com/watch?v=qWQbgEXhq0c', color: '#3B82F6' },
            { title: 'SQL & Database Design', channel: 'freeCodeCamp', duration: '8h', rating: 4.8, url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY', color: '#10B981' },
            { title: 'Apache Spark Crash Course', channel: 'freeCodeCamp', duration: '3h', rating: 4.6, url: 'https://www.youtube.com/watch?v=Qh_B2v6Q1Hw', color: '#EF4444' },
            { title: 'Apache Airflow Tutorial', channel: 'DataTalksClub', duration: '2h', rating: 4.7, url: 'https://www.youtube.com/watch?v=K9AnJ9peSUg', color: '#F59E0B' }
        ],
        paidCourses: [
            { title: 'Data Engineering with AWS', platform: 'Udacity', instructor: 'Multiple', price: '$399/month', rating: 4.6, url: '#', color: '#F59E0B' },
            { title: 'Data Engineering, Big Data, and Machine Learning', platform: 'Coursera', instructor: 'Google Cloud', price: '$49/month', rating: 4.7, url: '#', color: '#3B82F6' },
            { title: 'Apache Kafka Series - Learn Apache Kafka', platform: 'Udemy', instructor: 'Stephane Maarek', price: '$45', rating: 4.7, url: '#', color: '#EF4444' },
            { title: 'The Ultimate Hands-On Hadoop', platform: 'Udemy', instructor: 'Frank Kane', price: '$49', rating: 4.5, url: '#', color: '#06B6D4' }
        ]
    },
    'cloud-engineer': {
        title: 'Cloud Engineer',
        icon: '🌩️',
        match: 'your interest in building scalable, global infrastructure and working with cutting-edge platforms',
        overview: 'Cloud Engineers design, implement, and maintain scalable infrastructure on cloud platforms like AWS, Google Cloud, or Azure. They ensure high availability and security for modern applications.',
        responsibilities: [
            'Design and deploy cloud infrastructure and services',
            'Migrate on-premise applications to the cloud',
            'Implement security best practices in cloud environments',
            'Manage computing resources, storage, and networking',
            'Optimize cloud costs and performance'
        ],
        skills: ['AWS/Azure/GCP', 'Linux', 'Networking', 'Security', 'Infrastructure as Code', 'Scripting', 'Virtualization', 'Containers'],
        tools: ['AWS', 'Google Cloud Platform', 'Microsoft Azure', 'Terraform', 'Linux', 'Docker'],
        demand: 92,
        demandLabel: 'Very High',
        allSkills: ['AWS', 'Azure', 'GCP', 'Linux', 'Networking', 'Security', 'Infrastructure as Code', 'Scripting', 'Virtualization', 'Containers', 'Terraform', 'System Architecture'],
        roadmap: [
            { step: 'Step 1', title: 'Master Linux & Networking', desc: 'Learn OS fundamentals, command line, TCP/IP, DNS, and subnetting.' },
            { step: 'Step 2', title: 'Learn Cloud Fundamentals', desc: 'Start with AWS Cloud Practitioner or Azure Fundamentals to understand core services (Compute, Storage, Identity).' },
            { step: 'Step 3', title: 'Master a Major Cloud Platform', desc: 'Deep dive into AWS or Azure. Get hands-on with VPCs, EC2 instances, S3, and IAM.' },
            { step: 'Step 4', title: 'Infrastructure as Code (IaC)', desc: 'Learn to automate cloud deployments using Terraform or AWS CloudFormation.' },
            { step: 'Step 5', title: 'Containerization & Cloud Security', desc: 'Understand Docker and basic Kubernetes in the cloud, and implement strong security postures.' }
        ],
        freeCourses: [
            { title: 'AWS Certified Cloud Practitioner', channel: 'freeCodeCamp', duration: '13h', rating: 4.8, url: 'https://www.youtube.com/watch?v=SOTamWNgDKc', color: '#F59E0B' },
            { title: 'Microsoft Azure Fundamentals', channel: 'freeCodeCamp', duration: '8h', rating: 4.7, url: 'https://www.youtube.com/watch?v=NKEFWy4RWig', color: '#3B82F6' },
            { title: 'Terraform Beginner to Advanced', channel: 'freeCodeCamp', duration: '11h', rating: 4.9, url: 'https://www.youtube.com/watch?v=7xngnjfIlK4', color: '#06B6D4' },
            { title: 'Computer Networking Full Course', channel: 'freeCodeCamp', duration: '8h', rating: 4.8, url: 'https://www.youtube.com/watch?v=IPvYjXCsTg8', color: '#8B5CF6' }
        ],
        paidCourses: [
            { title: 'Ultimate AWS Certified Solutions Architect', platform: 'Udemy', instructor: 'Stephane Maarek', price: '$49', rating: 4.7, url: '#', color: '#F59E0B' },
            { title: 'Cloud Engineering with Google Cloud', platform: 'Coursera', instructor: 'Google Cloud', price: '$49/month', rating: 4.8, url: '#', color: '#3B82F6' },
            { title: 'AZ-104: Microsoft Azure Administrator', platform: 'Udemy', instructor: 'Alan Rodrigues', price: '$45', rating: 4.6, url: '#', color: '#06B6D4' },
            { title: 'Pragmatic System Design', platform: 'Udemy', instructor: 'Gergely Orosz', price: '$59', rating: 4.8, url: '#', color: '#8B5CF6' }
        ]
    },
    'ui-ux-designer': {
        title: 'UI/UX Designer',
        icon: '✨',
        match: 'your empathy for users, creative thinking, and passion for making technology accessible and beautiful',
        overview: 'UI/UX Designers conduct user research, design wireframes, and create stunning visual interfaces. They ensure that applications are not only beautiful but also intuitive and easy to use.',
        responsibilities: [
            'Conduct user research and usability testing',
            'Create wireframes, storyboards, and user flows',
            'Design high-fidelity mockups and interactive prototypes',
            'Establish design systems and style guides',
            'Collaborate with developers to ensure accurate implementation'
        ],
        skills: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design', 'Interaction Design', 'Information Architecture', 'Usability Testing', 'Empathy'],
        tools: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Miro', 'Zeplin'],
        demand: 87,
        demandLabel: 'High',
        allSkills: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design', 'Interaction Design', 'Information Architecture', 'Usability Testing', 'Empathy', 'Figma', 'Typography', 'Color Theory', 'Accessibility'],
        roadmap: [
            { step: 'Step 1', title: 'Learn UX Fundamentals', desc: 'Understand design thinking, user psychology, information architecture, and empathy mapping.' },
            { step: 'Step 2', title: 'Master Design Tools', desc: 'Deep dive into Figma. Learn to use auto-layout, components, variants, and prototyping features.' },
            { step: 'Step 3', title: 'Study Visual Design (UI)', desc: 'Learn color theory, typography, spacing, visual hierarchy, and grid systems.' },
            { step: 'Step 4', title: 'User Research & Testing', desc: 'Learn how to conduct user interviews, A/B testing, and gather actionable feedback.' },
            { step: 'Step 5', title: 'Build a Design Portfolio', desc: 'Redesign existing apps or create new concepts showcasing your entire process from research to final UI.' }
        ],
        freeCourses: [
            { title: 'UI / UX Design Tutorial', channel: 'freeCodeCamp', duration: '6h', rating: 4.7, url: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU', color: '#8B5CF6' },
            { title: 'Figma Tutorial for Beginners', channel: 'freeCodeCamp', duration: '3h', rating: 4.8, url: 'https://www.youtube.com/watch?v=jwSmKEKJCE4', color: '#3B82F6' },
            { title: 'UX Research Fundamentals', channel: 'NNgroup', duration: '1h', rating: 4.9, url: 'https://www.youtube.com/watch?v=qTszH9h7_zI', color: '#10B981' },
            { title: 'Color Theory & Typography', channel: 'The Futur', duration: '2h', rating: 4.8, url: 'https://www.youtube.com/watch?v=_GEXc1E_3P4', color: '#F59E0B' }
        ],
        paidCourses: [
            { title: 'Google UX Design Professional Certificate', platform: 'Coursera', instructor: 'Google', price: '$39/month', rating: 4.8, url: '#', color: '#8B5CF6' },
            { title: 'Complete Web & Mobile Designer in 2024: UI/UX, Figma', platform: 'Udemy', instructor: 'Andrei Neagoie', price: '$49', rating: 4.6, url: '#', color: '#3B82F6' },
            { title: 'User Experience Design Essentials', platform: 'Udemy', instructor: 'Daniel Walter Scott', price: '$45', rating: 4.7, url: '#', color: '#10B981' },
            { title: 'Shift Nudge - UI Design Course', platform: 'Shift Nudge', instructor: 'MDS', price: '$999', rating: 5.0, url: '#', color: '#F59E0B' }
        ]
    },
    'product-manager': {
        title: 'Product Manager',
        icon: '📋',
        match: 'your leadership skills, strategic thinking, and ability to align customer needs with business goals',
        overview: 'Product Managers are the CEOs of a product. They define the product vision, prioritize features, and lead cross-functional teams of engineers and designers to build products that customers love.',
        responsibilities: [
            'Define product vision, strategy, and roadmap',
            'Gather and analyze user feedback and market requirements',
            'Write product requirement documents (PRDs) and user stories',
            'Prioritize the engineering backlog and manage sprints',
            'Communicate product status to stakeholders and executives'
        ],
        skills: ['Product Strategy', 'Agile/Scrum', 'Data Analysis', 'User Empathy', 'Stakeholder Management', 'Communication', 'Prioritization', 'Market Research'],
        tools: ['Jira', 'Confluence', 'Amplitude', 'Notion', 'Miro', 'Linear'],
        demand: 89,
        demandLabel: 'High',
        allSkills: ['Product Strategy', 'Agile', 'Scrum', 'Data Analysis', 'User Empathy', 'Stakeholder Management', 'Communication', 'Prioritization', 'Market Research', 'Wireframing', 'SQL', 'A/B Testing'],
        roadmap: [
            { step: 'Step 1', title: 'Understand the Product Lifecycle', desc: 'Learn how products are built from ideation and validation to development, launch, and iteration.' },
            { step: 'Step 2', title: 'Master Agile & Scrum', desc: 'Learn how software teams operate. Understand sprints, backlog grooming, and user stories.' },
            { step: 'Step 3', title: 'Develop Strategic Thinking', desc: 'Learn how to prioritize features using frameworks like RICE or Kano. Write clear PRDs.' },
            { step: 'Step 4', title: 'Data & Metrics', desc: 'Learn SQL and product analytics tools. Understand KPIs like churn, retention, and conversion rates.' },
            { step: 'Step 5', title: 'Communication & Leadership', desc: 'Learn how to align stakeholders, manage expectations, and lead teams without direct authority.' }
        ],
        freeCourses: [
            { title: 'Product Management for Beginners', channel: 'freeCodeCamp', duration: '3h', rating: 4.7, url: 'https://www.youtube.com/watch?v=Q74Pq9B3Qh0', color: '#F59E0B' },
            { title: 'Agile & Scrum Full Course', channel: 'Simplilearn', duration: '2h', rating: 4.6, url: 'https://www.youtube.com/watch?v=bO1btoLbsSg', color: '#3B82F6' },
            { title: 'SQL for Product Managers', channel: 'freeCodeCamp', duration: '4h', rating: 4.8, url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY', color: '#06B6D4' },
            { title: 'Product Analytics & Metrics', channel: 'Product School', duration: '1h', rating: 4.9, url: 'https://www.youtube.com/watch?v=2r1TjM4a-3w', color: '#8B5CF6' }
        ],
        paidCourses: [
            { title: 'Become a Product Manager', platform: 'Udemy', instructor: 'Cole Mercer', price: '$49', rating: 4.6, url: '#', color: '#F59E0B' },
            { title: 'Software Product Management Specialization', platform: 'Coursera', instructor: 'University of Alberta', price: '$49/month', rating: 4.7, url: '#', color: '#3B82F6' },
            { title: 'Product Management A-Z', platform: 'Udemy', instructor: 'Dimitri Psimaras', price: '$45', rating: 4.6, url: '#', color: '#06B6D4' },
            { title: 'Reforge - Product Strategy', platform: 'Reforge', instructor: 'Casey Winters', price: '$1995/yr', rating: 4.9, url: '#', color: '#8B5CF6' }
        ]
    }
};

// ==========================================
// ADAPTIVE QUESTION ENGINE
// ==========================================
const QUESTIONS = [
    {
        id: 'q1',
        text: "Let's start! 😊 What excites you the most about technology?",
        options: [
            { text: '🔍 Analyzing data to find patterns and make predictions', tags: ['data-scientist', 'ml-engineer', 'data-engineer'] },
            { text: '🏗️ Building websites or apps that people can use', tags: ['frontend-developer', 'backend-developer', 'ui-ux-designer'] },
            { text: '🛡️ Keeping systems safe from hackers and cyber threats', tags: ['cybersecurity-analyst', 'cloud-engineer'] },
            { text: '⚡ Automating tasks and planning how products should work', tags: ['devops-engineer', 'product-manager'] }
        ]
    },
    {
        id: 'q2',
        text: "When faced with a problem, how do you usually approach it?",
        options: [
            { text: '📊 I look at the numbers and figure out what they tell me', tags: ['data-scientist', 'data-engineer'] },
            { text: '🎨 I think about how an end user feels and sketch out ideas', tags: ['ui-ux-designer', 'frontend-developer'] },
            { text: '🧩 I break it down into technical steps and build a solution', tags: ['backend-developer', 'cloud-engineer'] },
            { text: '📋 I decide what is most important to fix first and organize the team', tags: ['product-manager', 'devops-engineer'] }
        ]
    },
    {
        id: 'q3',
        text: "Which of these work outcomes would make you most proud?",
        options: [
            { text: '📈 A flawless dashboard connecting huge streams of complex data', tags: ['data-engineer', 'data-scientist'] },
            { text: '🤖 A smart system that learns and improves over time', tags: ['ml-engineer'] },
            { text: '💻 A polished app with a gorgeous design that users love', tags: ['ui-ux-designer', 'frontend-developer'] },
            { text: '🔒 A rock-solid server setup that never goes down and is fully secure', tags: ['cybersecurity-analyst', 'cloud-engineer', 'backend-developer'] }
        ]
    },
    {
        id: 'q4',
        text: "Which of these activities sounds most interesting to you?",
        options: [
            { text: '📋 Talking to users, making plans, and deciding what features to build next', tags: ['product-manager'] },
            { text: '🛠️ Writing code, connecting APIs, and moving massive datasets', tags: ['backend-developer', 'data-engineer'] },
            { text: '🕵️ Investigating threats, stopping hackers, and locking down servers', tags: ['cybersecurity-analyst'] },
            { text: '☁️ Setting up cloud tools, containers, and deployment automation', tags: ['devops-engineer', 'cloud-engineer'] }
        ]
    },
    {
        id: 'q5',
        text: "Last one! What would you enjoy learning more about?",
        options: [
            { text: '🧠 How AI models are built, trained, and optimized', tags: ['ml-engineer', 'data-scientist'] },
            { text: '🎨 Design psychology, wireframing, and user empathy', tags: ['ui-ux-designer', 'frontend-developer'] },
            { text: '🌐 How to scale backend servers, databases, and big data pipelines', tags: ['backend-developer', 'data-engineer', 'cloud-engineer'] },
            { text: '📈 Business strategy, agile frameworks, and competitive analysis', tags: ['product-manager'] }
        ]
    }
];

// ==========================================
// PROJECTS DATA
// ==========================================
const PROJECTS = {
    'ai-data': [
        {
            title: 'Spam Email Classifier',
            desc: 'Build a machine learning model that classifies emails as spam or not spam using NLP techniques.',
            level: 'beginner',
            skills: ['Python', 'Scikit-learn', 'NLP'],
            github: 'https://github.com/topics/spam-classifier',
            tutorial: 'https://www.youtube.com/results?search_query=spam+email+classifier+python'
        },
        {
            title: 'Data Visualization Dashboard',
            desc: 'Create an interactive dashboard to visualize datasets using charts, graphs, and filters.',
            level: 'beginner',
            skills: ['Python', 'Plotly', 'Pandas'],
            github: 'https://github.com/topics/data-dashboard',
            tutorial: 'https://www.youtube.com/results?search_query=data+dashboard+python+plotly'
        },
        {
            title: 'Movie Recommendation System',
            desc: 'Build a recommendation engine using collaborative filtering and content-based approaches.',
            level: 'intermediate',
            skills: ['Python', 'Machine Learning', 'Pandas'],
            github: 'https://github.com/topics/recommendation-system',
            tutorial: 'https://www.youtube.com/results?search_query=movie+recommendation+system+python'
        },
        {
            title: 'Sentiment Analysis Tool',
            desc: 'Analyze sentiment in social media posts or product reviews using NLP and deep learning.',
            level: 'intermediate',
            skills: ['Python', 'NLP', 'TensorFlow'],
            github: 'https://github.com/topics/sentiment-analysis',
            tutorial: 'https://www.youtube.com/results?search_query=sentiment+analysis+python'
        },
        {
            title: 'AI Chatbot with LLM',
            desc: 'Build an intelligent chatbot using transformer models and natural language understanding.',
            level: 'advanced',
            skills: ['Python', 'Transformers', 'NLP', 'APIs'],
            github: 'https://github.com/topics/chatbot-ai',
            tutorial: 'https://www.youtube.com/results?search_query=build+AI+chatbot+python'
        },
        {
            title: 'Real-time Object Detection',
            desc: 'Implement a computer vision system for real-time object detection using YOLO or similar models.',
            level: 'advanced',
            skills: ['Python', 'Computer Vision', 'PyTorch'],
            github: 'https://github.com/topics/object-detection',
            tutorial: 'https://www.youtube.com/results?search_query=object+detection+yolo+python'
        }
    ],
    'software-dev': [
        {
            title: 'Todo List Web App',
            desc: 'Build a responsive task management app with CRUD operations, categories, and local storage.',
            level: 'beginner',
            skills: ['HTML', 'CSS', 'JavaScript'],
            github: 'https://github.com/topics/todo-app',
            tutorial: 'https://www.youtube.com/results?search_query=todo+list+app+javascript'
        },
        {
            title: 'Portfolio Website',
            desc: 'Create a personal developer portfolio with project showcases, contact form, and animations.',
            level: 'beginner',
            skills: ['HTML', 'CSS', 'JavaScript'],
            github: 'https://github.com/topics/portfolio-website',
            tutorial: 'https://www.youtube.com/results?search_query=developer+portfolio+website'
        },
        {
            title: 'REST API Backend',
            desc: 'Design and build a complete RESTful API with authentication, validation, and database integration.',
            level: 'intermediate',
            skills: ['Node.js', 'Express', 'MongoDB'],
            github: 'https://github.com/topics/rest-api',
            tutorial: 'https://www.youtube.com/results?search_query=rest+api+nodejs+express'
        },
        {
            title: 'E-commerce Platform',
            desc: 'Build a full-featured e-commerce site with product listings, cart, payments, and admin dashboard.',
            level: 'intermediate',
            skills: ['React', 'Node.js', 'Stripe API'],
            github: 'https://github.com/topics/ecommerce',
            tutorial: 'https://www.youtube.com/results?search_query=ecommerce+fullstack+react'
        },
        {
            title: 'Full Stack SaaS Application',
            desc: 'Design a complete SaaS application with subscriptions, user accounts, dashboards, and analytics.',
            level: 'advanced',
            skills: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe'],
            github: 'https://github.com/topics/saas-boilerplate',
            tutorial: 'https://www.youtube.com/results?search_query=build+saas+nextjs'
        },
        {
            title: 'Real-time Chat Application',
            desc: 'Build a scalable chat app with WebSockets, real-time messaging, rooms, and read receipts.',
            level: 'advanced',
            skills: ['React', 'Socket.io', 'Node.js', 'Redis'],
            github: 'https://github.com/topics/chat-application',
            tutorial: 'https://www.youtube.com/results?search_query=real+time+chat+app+socketio'
        }
    ],
    'cybersecurity': [
        {
            title: 'Password Strength Checker',
            desc: 'Build a tool that analyzes password strength and suggests improvements based on security best practices.',
            level: 'beginner',
            skills: ['Python', 'Regex', 'Security Basics'],
            github: 'https://github.com/topics/password-strength',
            tutorial: 'https://www.youtube.com/results?search_query=password+strength+checker+python'
        },
        {
            title: 'Network Scanner',
            desc: 'Create a network scanning tool that discovers devices and open ports on a network.',
            level: 'beginner',
            skills: ['Python', 'Networking', 'Scapy'],
            github: 'https://github.com/topics/network-scanner',
            tutorial: 'https://www.youtube.com/results?search_query=network+scanner+python'
        },
        {
            title: 'Vulnerability Scanner',
            desc: 'Build an automated vulnerability scanner that checks web applications for common security flaws.',
            level: 'intermediate',
            skills: ['Python', 'Security Tools', 'Web Security'],
            github: 'https://github.com/topics/vulnerability-scanner',
            tutorial: 'https://www.youtube.com/results?search_query=vulnerability+scanner+python'
        },
        {
            title: 'Encrypted File Sharing',
            desc: 'Create a secure file sharing system with end-to-end encryption and access control.',
            level: 'intermediate',
            skills: ['Python', 'Cryptography', 'Flask'],
            github: 'https://github.com/topics/encrypted-file-sharing',
            tutorial: 'https://www.youtube.com/results?search_query=encrypted+file+sharing+python'
        },
        {
            title: 'Intrusion Detection System',
            desc: 'Build an IDS that monitors network traffic and detects suspicious activity using ML techniques.',
            level: 'advanced',
            skills: ['Python', 'Machine Learning', 'Networking'],
            github: 'https://github.com/topics/intrusion-detection',
            tutorial: 'https://www.youtube.com/results?search_query=intrusion+detection+system+python'
        },
        {
            title: 'Security Audit Platform',
            desc: 'Develop a comprehensive security auditing platform with automated scanning, reporting, and compliance checks.',
            level: 'advanced',
            skills: ['Python', 'Docker', 'Security Frameworks'],
            github: 'https://github.com/topics/security-audit',
            tutorial: 'https://www.youtube.com/results?search_query=security+audit+tool+python'
        }
    ]
};

// ==========================================
// NAVIGATION
// ==========================================
function navigateTo(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu
        document.getElementById('navLinks').classList.remove('open');
        document.getElementById('hamburger').classList.remove('active');
    }
}

// Active nav link on scroll
function updateActiveNav() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (window.scrollY >= top) current = section.id;
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
}

// Navbar scroll effect
function handleNavScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Hamburger
document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('open');
    document.getElementById('hamburger').classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('open');
        document.getElementById('hamburger').classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
    updateActiveNav();
    handleNavScroll();
    revealElements();
});

// ==========================================
// SCROLL REVEAL
// ==========================================
function revealElements() {
    document.querySelectorAll('[data-reveal]:not(.revealed)').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
            el.classList.add('revealed');
        }
    });
}

// ==========================================
// CHAT / QUIZ ENGINE (Grok API + Fallback)
// ==========================================
async function checkGrokAvailability() {
    try {
        const res = await fetch('/api/health');
        const data = await res.json();
        state.useGrok = data.grokConfigured;
    } catch { state.useGrok = false; }
}

function initChat() {
    const chatWindow = document.getElementById('chatWindow');
    const chatOptions = document.getElementById('chatOptions');
    chatWindow.innerHTML = '';
    chatOptions.innerHTML = '';
    checkGrokAvailability();

    addAIMessage("Hi! 👋 I'm your AI Career Guide. I'll ask you a few simple questions to understand your interests and recommend the best tech career for you.\n\nFirst, tell me — what best describes you right now?");

    setTimeout(() => {
        const professions = [
            { label: '🎓 Student', value: 'Student' },
            { label: '💼 Working Professional', value: 'Working Professional' },
            { label: '🔄 Career Switcher', value: 'Career Switcher' },
            { label: '🧑‍💻 Freelancer', value: 'Freelancer' }
        ];
        professions.forEach(p => {
            const btn = document.createElement('button');
            btn.className = 'chat-option-btn';
            btn.textContent = p.label;
            btn.onclick = () => selectProfession(p);
            chatOptions.appendChild(btn);
        });
    }, 800);
}

async function selectProfession(prof) {
    addUserMessage(prof.label);
    state.profession = prof.value;
    state.currentQuestion = 0;
    state.answers = [];
    state.grokQA = [];
    document.getElementById('chatOptions').innerHTML = '';
    await new Promise(r => setTimeout(r, 400));
    await addAIMessage(`Great! As a ${prof.value}, let me tailor my questions just for you. Let's begin! 🚀`);
    await new Promise(r => setTimeout(r, 300));
    await askNextQuestion();
}

async function askNextQuestion() {
    if (state.currentQuestion >= state.totalQuestions) {
        await runAnalysis();
        return;
    }
    if (state.useGrok) {
        await askGrokQuestion();
    } else {
        await askFallbackQuestion(state.currentQuestion);
    }
}

async function askGrokQuestion() {
    const chatOptions = document.getElementById('chatOptions');
    chatOptions.innerHTML = '';
    try {
        const res = await fetch('/api/generate-question', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                profession: state.profession,
                previousQA: state.grokQA,
                questionNumber: state.currentQuestion + 1,
                totalQuestions: state.totalQuestions
            })
        });
        const data = await res.json();
        if (data.fallback || data.error) throw new Error(data.error);

        await addAIMessage(data.question);
        setTimeout(() => {
            data.options.forEach((opt, i) => {
                const btn = document.createElement('button');
                btn.className = 'chat-option-btn';
                btn.textContent = opt;
                btn.onclick = () => selectGrokAnswer(data.question, opt);
                chatOptions.appendChild(btn);
            });
        }, 300);
    } catch (err) {
        console.warn('Grok API failed, using fallback:', err.message);
        state.useGrok = false;
        await askFallbackQuestion(state.currentQuestion);
    }
}

async function selectGrokAnswer(question, answer) {
    addUserMessage(answer);
    state.grokQA.push({ question, answer });
    state.currentQuestion++;
    document.getElementById('chatOptions').innerHTML = '';
    await new Promise(r => setTimeout(r, 400));
    await askNextQuestion();
}

async function askFallbackQuestion(index) {
    if (index >= QUESTIONS.length) { await runAnalysis(); return; }
    const q = QUESTIONS[index];
    await addAIMessage(q.text);
    const chatOptions = document.getElementById('chatOptions');
    chatOptions.innerHTML = '';
    setTimeout(() => {
        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'chat-option-btn';
            btn.textContent = opt.text;
            btn.onclick = () => selectFallbackAnswer(opt, index);
            chatOptions.appendChild(btn);
        });
    }, 300);
}

async function selectFallbackAnswer(option, questionIndex) {
    addUserMessage(option.text);
    state.answers.push(option.tags);
    state.grokQA.push({ question: QUESTIONS[questionIndex].text, answer: option.text });
    state.currentQuestion = questionIndex + 1;
    document.getElementById('chatOptions').innerHTML = '';
    await new Promise(r => setTimeout(r, 400));
    await askNextQuestion();
}

function addAIMessage(text) {
    const chatWindow = document.getElementById('chatWindow');
    const typing = document.createElement('div');
    typing.className = 'chat-msg ai';
    typing.innerHTML = `
        <div class="chat-avatar">🤖</div>
        <div class="chat-bubble">
            <div class="typing-indicator"><span></span><span></span><span></span></div>
        </div>
    `;
    chatWindow.appendChild(typing);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    return new Promise(resolve => {
        setTimeout(() => {
            typing.querySelector('.chat-bubble').innerHTML = text.replace(/\n/g, '<br>');
            chatWindow.scrollTop = chatWindow.scrollHeight;
            resolve();
        }, 1000 + Math.random() * 500);
    });
}

function addUserMessage(text) {
    const chatWindow = document.getElementById('chatWindow');
    const msg = document.createElement('div');
    msg.className = 'chat-msg user';
    msg.innerHTML = `
        <div class="chat-avatar">👤</div>
        <div class="chat-bubble">${text}</div>
    `;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function runAnalysis() {
    const chatOptions = document.getElementById('chatOptions');
    chatOptions.innerHTML = '';
    await addAIMessage("Thank you for your answers! Let me analyze your responses...");

    const chatWindow = document.getElementById('chatWindow');
    const analysis = document.createElement('div');
    analysis.className = 'analysis-overlay';
    analysis.innerHTML = `
        <div class="analysis-spinner"></div>
        <div class="analysis-text">Analyzing your interests<span class="analysis-dots"></span></div>
    `;
    chatWindow.appendChild(analysis);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    let bestCareer;

    // Try Grok analysis if available
    if (state.useGrok && state.grokQA.length > 0) {
        try {
            const res = await fetch('/api/analyze-career', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ profession: state.profession, allQA: state.grokQA })
            });
            const data = await res.json();
            if (!data.fallback && !data.error && data.careerId && CAREERS[data.careerId]) {
                bestCareer = data.careerId;
                if (data.matchReason) CAREERS[bestCareer]._grokMatch = data.matchReason;
            }
        } catch (err) { console.warn('Grok analysis failed, using fallback:', err.message); }
    }

    // Fallback scoring
    if (!bestCareer) {
        const scores = {};
        state.answers.forEach(tags => {
            tags.forEach(tag => { scores[tag] = (scores[tag] || 0) + 1; });
        });
        if (Object.keys(scores).length > 0) {
            bestCareer = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
        } else {
            bestCareer = 'fullstack-developer';
        }
    }

    state.recommendedCareer = bestCareer;
    await new Promise(r => setTimeout(r, 3000));
    analysis.remove();

    const career = CAREERS[bestCareer];
    const matchText = career._grokMatch || career.match;
    await addAIMessage(`🎉 Based on your responses, I recommend <strong>${career.title}</strong> as your ideal tech career!\n\n${matchText}\n\nScroll down to the <strong>Career Insights</strong> section to see your full personalized recommendation.`);

    chatOptions.innerHTML = `
        <button class="chat-option-btn" onclick="navigateTo('career-insights')">View My Career Insights →</button>
        <button class="chat-option-btn" onclick="restartQuiz()">Try Again 🔄</button>
    `;
    populateInsights(bestCareer);
    updateProgress(1);
}

function restartQuiz() {
    state.currentQuestion = 0;
    state.answers = [];
    state.grokQA = [];
    state.profession = null;
    state.recommendedCareer = null;
    document.getElementById('insightsPlaceholder').style.display = '';
    document.getElementById('insightsResults').style.display = 'none';
    document.getElementById('learningPlaceholder').style.display = '';
    document.getElementById('learningContent').style.display = 'none';
    initChat();
}

// ==========================================
// CAREER INSIGHTS
// ==========================================
function populateInsights(careerId) {
    const career = CAREERS[careerId];
    document.getElementById('insightsPlaceholder').style.display = 'none';
    document.getElementById('insightsResults').style.display = '';

    document.getElementById('resultIcon').textContent = career.icon;
    document.getElementById('resultCareer').textContent = career.title;
    document.getElementById('resultMatch').textContent = `Based on ${career.match}`;
    document.getElementById('resultOverview').textContent = career.overview;

    const respList = document.getElementById('resultResponsibilities');
    respList.innerHTML = career.responsibilities.map(r => `<li>${r}</li>`).join('');

    const skillsDiv = document.getElementById('resultSkills');
    skillsDiv.innerHTML = career.skills.map(s => `<span class="skill-tag">${s}</span>`).join('');

    const toolsDiv = document.getElementById('resultTools');
    toolsDiv.innerHTML = career.tools.map(t => `<span class="skill-tag">${t}</span>`).join('');

    // Demand bar
    const demandFill = document.getElementById('demandFill');
    const demandLabel = document.getElementById('demandLabel');
    demandLabel.textContent = career.demandLabel;
    setTimeout(() => {
        demandFill.style.width = career.demand + '%';
    }, 500);

    // Skill gap checklist
    const checklist = document.getElementById('skillgapChecklist');
    checklist.innerHTML = career.allSkills.map(skill => `
        <div class="skillgap-item" onclick="toggleSkillItem(this)">
            <input type="checkbox" value="${skill}">
            <div class="skillgap-check"></div>
            <span class="skillgap-label">${skill}</span>
        </div>
    `).join('');

    document.getElementById('skillgapResults').style.display = 'none';
    document.getElementById('analyzeSkillsBtn').style.display = '';
}

function toggleSkillItem(el) {
    const checkbox = el.querySelector('input[type="checkbox"]');
    checkbox.checked = !checkbox.checked;
    el.classList.toggle('selected', checkbox.checked);
}

// ==========================================
// SKILL GAP ANALYZER
// ==========================================
function analyzeSkillGap() {
    const career = CAREERS[state.recommendedCareer];
    const checked = document.querySelectorAll('#skillgapChecklist input:checked');
    const userSkills = Array.from(checked).map(c => c.value);
    state.userSkills = userSkills;

    const haveDiv = document.getElementById('skillsHave');
    const needDiv = document.getElementById('skillsNeed');

    const skillsHave = career.allSkills.filter(s => userSkills.includes(s));
    const skillsNeed = career.allSkills.filter(s => !userSkills.includes(s));

    haveDiv.innerHTML = skillsHave.length > 0
        ? skillsHave.map(s => `<span class="skill-tag have">${s}</span>`).join('')
        : '<span style="color:var(--text-muted);font-size:14px;">No matching skills yet — that\'s okay! Everyone starts somewhere.</span>';

    needDiv.innerHTML = skillsNeed.map(s => `<span class="skill-tag need">${s}</span>`).join('');

    document.getElementById('skillgapResults').style.display = '';
    document.getElementById('analyzeSkillsBtn').style.display = 'none';
    state.skillGapDone = true;
    updateProgress(2);
}

// ==========================================
// LEARNING HUB
// ==========================================
function startLearning() {
    if (!state.recommendedCareer) return;
    const career = CAREERS[state.recommendedCareer];

    document.getElementById('learningPlaceholder').style.display = 'none';
    document.getElementById('learningContent').style.display = '';

    // Build timeline
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = career.roadmap.map((item, i) => `
        <div class="timeline-step" style="animation-delay: ${i * 0.15}s">
            <div class="timeline-dot"></div>
            <div class="step-badge">${item.step}</div>
            <h4>${item.title}</h4>
            <p>${item.desc}</p>
        </div>
    `).join('');

    // Build free course cards
    const freeGrid = document.getElementById('freeCoursesGrid');
    freeGrid.innerHTML = career.freeCourses.map(course => {
        const videoId = course.url.match(/[?&]v=([^&]+)/)?.[1] || '';
        const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        // Star rating generator
        const stars = '★'.repeat(Math.round(course.rating)) + '☆'.repeat(5 - Math.round(course.rating));
        
        return `
        <a href="${course.url}" target="_blank" rel="noopener" class="course-card" data-reveal>
            <div class="course-thumb" style="background-image: url('${thumbUrl}')">
                <div class="course-badge">Free on YouTube</div>
                <div class="play-icon"></div>
            </div>
            <div class="course-info">
                <h4>${course.title}</h4>
                <div class="course-rating">
                    <span class="course-rating-stars">${stars}</span>
                    <span>${course.rating.toFixed(1)}</span>
                </div>
                <div class="course-meta">
                    <span>📺 ${course.channel}</span>
                    <span>⏱ ${course.duration}</span>
                </div>
                <span class="course-link">Watch Course →</span>
            </div>
        </a>`;
    }).join('');

    // Build paid course cards
    const paidGrid = document.getElementById('paidCoursesGrid');
    paidGrid.innerHTML = career.paidCourses.map(course => {
        // Star rating generator
        const stars = '★'.repeat(Math.round(course.rating)) + '☆'.repeat(5 - Math.round(course.rating));
        
        return `
        <a href="${course.url}" target="_blank" rel="noopener" class="course-card" data-reveal>
            <div class="course-thumb" style="background-image: linear-gradient(135deg, ${course.color}22, ${course.color}), url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60')">
                <div class="course-badge">${course.platform}</div>
                <div class="play-icon"></div>
            </div>
            <div class="course-info">
                <h4>${course.title}</h4>
                <div class="course-rating">
                    <span class="course-rating-stars">${stars}</span>
                    <span>${course.rating.toFixed(1)}</span>
                </div>
                <div class="course-meta">
                    <span>👨‍🏫 ${course.instructor}</span>
                    <span style="font-weight:700; color:var(--text-primary); margin-left:auto;">${course.price}</span>
                </div>
                <span class="course-link">View Course Details →</span>
            </div>
        </a>`;
    }).join('');

    // Tab Logic
    const tabs = document.querySelectorAll('.course-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const type = tab.dataset.type;
            document.getElementById('freeCoursesGrid').style.display = type === 'free' ? 'grid' : 'none';
            document.getElementById('paidCoursesGrid').style.display = type === 'paid' ? 'grid' : 'none';
        });
    });

    state.learningStarted = true;
    updateProgress(3);

    navigateTo('learning-hub');

    // Trigger reveal for new elements
    setTimeout(revealElements, 300);
}

function adjustColor(hex, amount) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

// ==========================================
// PROJECTS & RESOURCES
// ==========================================
function initProjects() {
    renderProjects('ai-data');

    document.querySelectorAll('.domain-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.domain-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderProjects(tab.dataset.domain);
        });
    });
}

function renderProjects(domain) {
    const grid = document.getElementById('projectsGrid');
    const projects = PROJECTS[domain] || [];

    grid.innerHTML = projects.map(p => `
        <div class="project-card" data-reveal>
            <span class="project-level ${p.level}">${p.level}</span>
            <h4>${p.title}</h4>
            <p>${p.desc}</p>
            <div class="project-skills">
                ${p.skills.map(s => `<span>${s}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${p.github}" target="_blank">GitHub →</a>
                <a href="${p.tutorial}" target="_blank">Tutorial →</a>
            </div>
        </div>
    `).join('');

    // Trigger reveal
    setTimeout(revealElements, 100);
}

// ==========================================
// PROGRESS TRACKER
// ==========================================
function toggleTracker() {
    state.trackerOpen = !state.trackerOpen;
    document.getElementById('trackerPanel').classList.toggle('open', state.trackerOpen);
}

function updateProgress(stage) {
    const steps = [
        document.getElementById('trackerStep1'),
        document.getElementById('trackerStep2'),
        document.getElementById('trackerStep3'),
        document.getElementById('trackerStep4')
    ];

    const fill = document.getElementById('trackerFill');

    steps.forEach((step, i) => {
        step.classList.remove('completed', 'active');
        if (i < stage) {
            step.classList.add('completed');
        } else if (i === stage) {
            step.classList.add('active');
        }
    });

    fill.style.width = (stage / 4 * 100) + '%';
}

// Close tracker when clicking outside
document.addEventListener('click', (e) => {
    const tracker = document.getElementById('progressTracker');
    if (!tracker.contains(e.target) && state.trackerOpen) {
        state.trackerOpen = false;
        document.getElementById('trackerPanel').classList.remove('open');
    }
});

// ==========================================
// INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initChat();
    initProjects();
    revealElements();
    updateProgress(0);
});
