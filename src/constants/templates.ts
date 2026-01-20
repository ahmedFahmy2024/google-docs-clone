export const templates = [
  {
    id: 1,
    label: "Blank Document",
    imageUrl: "/blank-document.svg",
    initialContent: "",
  },
  {
    id: 2,
    label: "Letter",
    imageUrl: "/letter.svg",
    initialContent: `
      <h1>[Your Name]</h1>
      <p>[Your Address] | [Your Phone] | [Your Email]</p>
      <p>[Date]</p>
      <p>[Recipient Name]<br>[Recipient Address]</p>
      <p>Dear [Recipient Name],</p>
      <p>I am writing to you regarding [Subject]. [Your letter body goes here...]</p>
      <p>Sincerely,</p>
      <br />
      <p>[Your Name]</p>
    `,
  },
  {
    id: 3,
    label: "Project Proposal",
    imageUrl: "/project-proposal.svg",
    initialContent: `
      <h1>Project Proposal</h1>
      <h2>Executive Summary</h2>
      <p>A brief overview of the project goals and expected outcomes.</p>
      <h2>Objectives</h2>
      <ul>
        <li>Objective 1</li>
        <li>Objective 2</li>
        <li>Objective 3</li>
      </ul>
      <h2>Scope of Work</h2>
      <p>Detailed description of the tasks and deliverables.</p>
      <h2>Timeline</h2>
      <p>Estimated dates for project milestones.</p>
      <h2>Budget</h2>
      <p>Breakdown of estimated costs.</p>
    `,
  },
  {
    id: 4,
    label: "Resume",
    imageUrl: "/resume.svg",
    initialContent: `
      <h1>[Your Name]</h1>
      <p>[City, State] | [Phone Number] | [Email] | [LinkedIn/Portfolio]</p>
      <h2>Professional Summary</h2>
      <p>Dynamic professional with experience in [Your Field]. Proven ability to [Key Skill].</p>
      <h2>Experience</h2>
      <p><strong>[Job Title]</strong> | [Company Name] | [Dates]</p>
      <ul>
        <li>Accomplished [Task] resulting in [Result].</li>
        <li>Led [Project] with a team of [Number] people.</li>
      </ul>
      <h2>Education</h2>
      <p><strong>[Degree]</strong> | [University Name] | [Graduation Year]</p>
      <h2>Skills</h2>
      <p>List your key technical and soft skills here.</p>
    `,
  },
  {
    id: 5,
    label: "Software Proposal",
    imageUrl: "/software-proposal.svg",
    initialContent: `
      <h1>Software Proposal</h1>
      <h2>Project Overview</h2>
      <p>Description of the software to be developed and its purpose.</p>
      <h2>Problem Statement</h2>
      <p>The challenges this software aims to solve.</p>
      <h2>Proposed Solution</h2>
      <p>How the software will address the identified problems.</p>
      <h2>Technology Stack</h2>
      <ul>
        <li>Frontend: [e.g., React, Next.js]</li>
        <li>Backend: [e.g., Node.js, Convex]</li>
        <li>Database: [e.g., PostgreSQL]</li>
      </ul>
      <h2>Development Roadmap</h2>
      <p>Phase 1: Planning | Phase 2: Design | Phase 3: Implementation</p>
    `,
  },
  {
    id: 6,
    label: "Business Letter",
    imageUrl: "/business-letter.svg",
    initialContent: `
      <h1>Business Letter</h1>
      <hr />
      <p><strong>From:</strong> [Your Company Name]</p>
      <p><strong>To:</strong> [Recipient Company Name]</p>
      <p><strong>Date:</strong> [Current Date]</p>
      <p><strong>Subject:</strong> [Formal Subject Line]</p>
      <br />
      <p>Dear [Recipient Name],</p>
      <p>This letter is to formally communicate regarding [Topic].</p>
      <p>We look forward to your response.</p>
      <p>Best regards,</p>
      <br />
      <p>[Your Signature Name]</p>
      <p>[Your Title]</p>
    `,
  },
  {
    id: 7,
    label: "Cover Letter",
    imageUrl: "/cover-letter.svg",
    initialContent: `
      <h1>Cover Letter</h1>
      <p>[Date]</p>
      <p>[Hiring Manager Name]<br>[Company Name]<br>[Company Address]</p>
      <p>Dear [Hiring Manager Name],</p>
      <p>I am writing to express my strong interest in the [Job Title] position at [Company Name]. With my background in [Field], I am confident that I would be a valuable asset to your team.</p>
      <p>In my previous role at [Previous Company], I [Key Achievement]. I am particularly drawn to [Company Name] because of [Reason].</p>
      <p>Thank you for your time and consideration.</p>
      <p>Sincerely,</p>
      <br />
      <p>[Your Name]</p>
    `,
  },
];
