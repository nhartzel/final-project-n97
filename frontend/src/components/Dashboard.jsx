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
          
          <h3>Infrastructure & Hosting</h3>
          <p>
            The entire stack is hosted on a <strong>DigitalOcean Droplet</strong> running Ubuntu 24.04 LTS. 
            <strong>NGINX</strong> serves as the primary web server and reverse proxy. It listens on public port 80, 
            serving the static React frontend files directly while strictly proxying API requests (<code>/api/*</code>) 
            to the <strong>Node.js/Express</strong> backend running internally on port 3000 via <strong>PM2</strong> 
             process management.
          </p>
          
          <h3>Authentication & Security</h3>
          <p>
            Security is implemented via a stateless <strong>JSON Web Token (JWT)</strong> architecture:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', lineHeight: '1.6', color: '#444'}}>
            <li>
              <strong>Backend:</strong> Passwords are never stored in plain text; they are salted and hashed using <code>bcrypt</code>. 
              Upon login, the server signs a JWT containing the user identity, encrypted with a private server-side secret.
            </li>
            <li>
              <strong>Frontend:</strong> The client stores this token in <code>localStorage</code>. A custom authentication handler 
              automatically retrieves this token and attaches it to the <code>Authorization: Bearer</code> header for all 
              subsequent requests to protected routes.
            </li>
          </ul>

          <p>
            Data persistence is handled by a <strong>MySQL</strong> database running on the same droplet (port 3306). 
            For security, the database is bound to the local loopback address, making it inaccessible from the public 
            internet and reachable only by the local backend service.
          </p>

          <div className="tech-tags">
            <span>DigitalOcean</span>
            <span>Ubuntu 24.04</span>
            <span>NGINX</span>
            <span>PM2</span>
            <span>React + Vite</span>
            <span>Node.js</span>
            <span>MySQL</span>
            <span>JWT Auth</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;