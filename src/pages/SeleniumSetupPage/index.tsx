import { useState } from 'react';
import { LanguageSelector } from './LanguageSelector';
import { SetupInstructions } from './SetupInstructions';
import { CodeExample } from './CodeExample';

export function SeleniumSetupPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('java');

  return (
    <div className="space-y-8">
      <div className="flex justify-end mb-2">
        <LanguageSelector
          value={selectedLanguage}
          onValueChange={setSelectedLanguage}
        />
      </div>
      <SetupInstructions language={selectedLanguage} />
      <CodeExample language={selectedLanguage} />
    </div>
  );
}