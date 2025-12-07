import React from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p className="subtitle">Agentic AI & System Architecture</p>
      </div>

      <div className="dashboard-grid">
        {/* Section 1: The McKinsey Summary (Requirement: 200 words + Reference) */}
        <div className="dashboard-card summary-card">
          <h2>The Rise of Agentic AI</h2>
          <p>
            According to McKinsey’s "State of AI in 2025" report, the artificial intelligence landscape has 
            undergone a fundamental shift from passive generation to active execution. While 2023–2024 was 
            defined by "Chatbots" that could merely write text, 2025 has ushered in the era of 
            "Agentic AI"—autonomous systems capable of planning multi-step workflows, executing tasks, and 
            correcting their own errors without human intervention.
          </p>
          <p>
            The data highlights a rapid pivot in enterprise strategy: <strong>62% of organizations</strong> are now actively 
            piloting autonomous agents, and <strong>23%</strong> have successfully scaled them into production environments. 
            This transition changes the game by moving AI from a "support tool" that answers questions to a "task owner" 
            that drives outcomes. High-performing organizations are no longer just using AI to summarize meetings; 
            they are redesigning entire business workflows—particularly in IT and knowledge management—where agents 
            now function as digital coworkers capable of independently troubleshooting systems and managing complex 
            data pipelines. This evolution marks the end of AI as a novelty and the beginning of AI as a core operational engine.
          </p>
          <div className="card-footer">
            <strong>Source: </strong> 
            <a 
              href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              McKinsey: The State of AI in 2025
            </a>
          </div>
        </div>

        {/* Section 2: Technical Stack (Requirement: Tech aspects & Infrastructure) */}
        <div className="dashboard-card tech-card">
          <h2>Technical Architecture</h2>
          <p>
            This application is a <strong>Single Page Application (SPA)</strong> designed with a fully decoupled architecture. 
            The frontend is built using <strong>React</strong> and served via <strong>NGINX</strong> on standard HTTP port 80. 
            It communicates asynchronously with a <strong>Node.js/Express</strong> backend running independently on port 3000.
          </p>
          <p>
            Security is managed through <strong>JSON Web Tokens (JWT)</strong>. Upon login, the backend issues a signed token 
            which the frontend stores in LocalStorage and attaches to the headers of subsequent API requests. 
            The backend middleware intercepts these requests to validate identity before serving protected data. 
            All persistent user data is stored in a <strong>MySQL</strong> database hosted on the same virtual private server.
          </p>
          <div className="tech-tags">
            <span>React</span>
            <span>Node.js</span>
            <span>Express</span>
            <span>MySQL</span>
            <span>NGINX</span>
            <span>JWT</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;