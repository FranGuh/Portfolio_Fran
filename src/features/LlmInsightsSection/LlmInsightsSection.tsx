import React from "react";
import "./LlmInsightsSection.css";

interface InsightItem {
  tag: string;
  title: string;
  description: string;
}

interface LlmInsightsSectionProps {
  title: string;
  subtitle: string;
  insights: InsightItem[];
}

const LlmInsightsSection: React.FC<LlmInsightsSectionProps> = ({ title, subtitle, insights }) => {
  return (
    <section className="LlmInsightsSection">
      <div className="LlmInsightsSection__content">
        <div className="LlmInsightsSection__header">
          <span className="LlmInsightsSection__badge">Realizaciones Técnicas</span>
          <h2 className="LlmInsightsSection__title">{title}</h2>
          <p className="LlmInsightsSection__subtitle">{subtitle}</p>
        </div>
        <div className="LlmInsightsSection__grid">
          {insights.map((insight, index) => (
            <div key={index} className="LlmInsightCard">
              <span className="LlmInsightCard__tag">{insight.tag}</span>
              <h3 className="LlmInsightCard__title">{insight.title}</h3>
              <p className="LlmInsightCard__desc">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LlmInsightsSection;
