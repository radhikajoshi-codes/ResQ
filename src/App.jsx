import React, { useState, useEffect } from 'react';
import CitizenNavbar from './components/citizen/CitizenNavbar';
import Screen1Home from './components/citizen/Screen1Home';
import Screen2Questions from './components/citizen/Screen2Questions';
import Screen3RiskResult from './components/citizen/Screen3RiskResult';
import Screen4WhatToDo from './components/citizen/Screen4WhatToDo';
import Screen5SafeOptions from './components/citizen/Screen5SafeOptions';
import Screen6AskResQ from './components/citizen/Screen6AskResQ';
import Screen7WhatIf from './components/citizen/Screen7WhatIf';
import EmergencySosModal from './components/citizen/EmergencySosModal';
import SafetyNoticeFooter from './components/citizen/SafetyNoticeFooter';

import { calculateRisk, DISASTERS, DISASTER_QUESTIONS } from './services/riskEngine';

export default function App() {
  // Navigation: 'home' | 'questions' | 'risk' | 'ask'
  const [currentNav, setCurrentNav] = useState('home');

  // User input states
  const [location, setLocation] = useState('Riverside / Lower Basin');
  const [selectedDisaster, setSelectedDisaster] = useState('flood');
  const [answers, setAnswers] = useState({});

  // Has the user generated a risk calculation yet?
  const [hasAssessedRisk, setHasAssessedRisk] = useState(false);
  const [riskResult, setRiskResult] = useState(() => 
    calculateRisk('flood', 'Riverside / Lower Basin', {})
  );

  // Emergency SOS Modal
  const [sosModalOpen, setSosModalOpen] = useState(false);

  // When disaster or location changes, update defaults
  const handleSelectDisaster = (disasterId) => {
    setSelectedDisaster(disasterId);
    // Initialize default answers for this disaster
    const questions = DISASTER_QUESTIONS[disasterId] || [];
    const defaults = {};
    questions.forEach(q => {
      defaults[q.id] = q.default;
    });
    setAnswers(defaults);
  };

  const handleUpdateAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // Flow handlers
  const handleProceedToQuestions = () => {
    setCurrentNav('questions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalyzeRisk = () => {
    const computed = calculateRisk(selectedDisaster, location, answers);
    setRiskResult(computed);
    setHasAssessedRisk(true);
    setCurrentNav('risk');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSelectedDisaster('flood');
    setLocation('Riverside / Lower Basin');
    const questions = DISASTER_QUESTIONS.flood || [];
    const defaults = {};
    questions.forEach(q => { defaults[q.id] = q.default; });
    setAnswers(defaults);
    setCurrentNav('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpToSection = (sectionId) => {
    if (sectionId === 'ask-resq') {
      const el = document.getElementById('ask-resq');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        setCurrentNav('ask');
      }
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="resq-app">
      {/* 1. Master Citizen Navigation */}
      <CitizenNavbar
        currentNav={currentNav}
        onChangeNav={(nav) => {
          if (nav === 'risk' && !hasAssessedRisk) {
            handleAnalyzeRisk();
          } else {
            setCurrentNav(nav);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        hasAssessedRisk={hasAssessedRisk}
        onOpenSos={() => setSosModalOpen(true)}
      />

      {/* 2. Main Content Screens */}
      <main style={{ flex: 1 }}>
        {/* SCREEN 1: HOME */}
        {currentNav === 'home' && (
          <Screen1Home
            location={location}
            onChangeLocation={setLocation}
            selectedDisaster={selectedDisaster}
            onSelectDisaster={handleSelectDisaster}
            onProceed={handleProceedToQuestions}
          />
        )}

        {/* SCREEN 2: SIMPLE QUESTIONS */}
        {currentNav === 'questions' && (
          <Screen2Questions
            location={location}
            selectedDisaster={selectedDisaster}
            answers={answers}
            onUpdateAnswer={handleUpdateAnswer}
            onBack={() => setCurrentNav('home')}
            onAnalyze={handleAnalyzeRisk}
          />
        )}

        {/* SCREEN 3 + 4 + 5 + 7 + 6: MY RISK RESULT & CITIZEN SAFETY FLOW */}
        {currentNav === 'risk' && (
          <div style={{ padding: '2rem 0 3.5rem 0' }}>
            <div className="citizen-container">
              
              {/* SCREEN 3: RISK RESULT (The centerpiece) */}
              <Screen3RiskResult
                riskResult={riskResult}
                onRecalculate={() => setCurrentNav('questions')}
                onJumpToSection={handleJumpToSection}
              />

              {/* SCREEN 4: WHAT TO DO NOW */}
              <Screen4WhatToDo
                guidance={riskResult.guidance}
                disasterName={riskResult.disasterName}
              />

              {/* SCREEN 5: SAFE OPTIONS & MAP */}
              <Screen5SafeOptions
                resources={riskResult.nearbyResources}
                userLocation={riskResult.location}
                disasterName={riskResult.disasterName}
                riskLevel={riskResult.riskLevel}
              />

              {/* SCREEN 7: SIMPLE WHAT-IF SCENARIO */}
              <Screen7WhatIf
                whatIfConfig={riskResult.whatIf}
                baseScore={riskResult.score}
                disasterName={riskResult.disasterName}
              />

              {/* SCREEN 6: ASK RESQ */}
              <Screen6AskResQ
                disasterId={riskResult.disasterId}
                disasterName={riskResult.disasterName}
                location={riskResult.location}
                riskScore={riskResult.score}
                riskLevel={riskResult.riskLevel}
                nearbyResources={riskResult.nearbyResources}
              />

            </div>
          </div>
        )}

        {/* STANDALONE ASK RESQ VIEW (when clicked in header nav) */}
        {currentNav === 'ask' && (
          <div style={{ padding: '2.5rem 0 3.5rem 0' }}>
            <div className="citizen-container">
              <Screen6AskResQ
                disasterId={riskResult.disasterId}
                disasterName={riskResult.disasterName}
                location={riskResult.location}
                riskScore={riskResult.score}
                riskLevel={riskResult.riskLevel}
                nearbyResources={riskResult.nearbyResources}
              />
            </div>
          </div>
        )}
      </main>

      {/* 3. Safety Notice & Disclaimer Footer */}
      <SafetyNoticeFooter
        onOpenSos={() => setSosModalOpen(true)}
        onReset={handleReset}
      />

      {/* 4. Direct SOS Emergency Modal */}
      <EmergencySosModal
        isOpen={sosModalOpen}
        onClose={() => setSosModalOpen(false)}
      />
    </div>
  );
}
