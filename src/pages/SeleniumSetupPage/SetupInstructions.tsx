import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SetupInstructionsProps {
  language: string;
}

export function SetupInstructions({ language }: SetupInstructionsProps) {
  const getInstructions = () => {
    switch (language) {
      case 'java':
        return {
          title: 'Java Setup',
          steps: [
            'Install Java JDK 11 or newer',
            {
              title: 'Create a new Maven project and add dependencies to pom.xml:',
              code: `<dependencies>
    <!-- Selenium WebDriver -->
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>4.16.1</version>
    </dependency>
    
    <!-- JUnit for testing -->
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.13.2</version>
        <scope>test</scope>
    </dependency>
    
    <!-- WebDriverManager -->
    <dependency>
        <groupId>io.github.bonigarcia</groupId>
        <artifactId>webdrivermanager</artifactId>
        <version>5.6.2</version>
    </dependency>
</dependencies>`,
            },
            {
              title: 'Configure WebDriver in your test:',
              code: `WebDriver driver = new ChromeDriver();
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));`,
            },
          ],
        };

      case 'python':
        return {
          title: 'Python Setup',
          steps: [
            'Install Python 3.7 or newer',
            {
              title: 'Install required packages:',
              code: `pip install selenium
pip install webdriver-manager
pip install pytest`,
            },
            {
              title: 'Configure WebDriver in your test:',
              code: `from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)`,
            },
          ],
        };

      case 'csharp':
        return {
          title: 'C# Setup',
          steps: [
            'Install Visual Studio or Visual Studio Code with C# extension',
            'Install .NET 6.0 SDK or newer',
            {
              title: 'Create a new NUnit test project:',
              code: 'dotnet new nunit -n SeleniumTests',
            },
            {
              title: 'Install required NuGet packages:',
              code: `dotnet add package Selenium.WebDriver
dotnet add package Selenium.Support
dotnet add package NUnit
dotnet add package NUnit3TestAdapter
dotnet add package WebDriverManager`,
            },
            {
              title: 'Configure WebDriver in your test class:',
              code: `using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using WebDriverManager;
using WebDriverManager.DriverConfigs.Impl;

// In your test setup
new DriverManager().SetUpDriver(new ChromeConfig());
IWebDriver driver = new ChromeDriver();
driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);`,
            },
            'Add test/bin folder to .gitignore',
            {
              title: 'Recommended VS Code extensions:',
              code: `- C# Dev Kit
- .NET Core Test Explorer
- NuGet Package Manager`,
            },
          ],
        };

      case 'ruby':
        return {
          title: 'Ruby Setup',
          steps: [
            'Install Ruby 3.0 or newer',
            'Install Bundler: gem install bundler',
            {
              title: 'Create a new project and add to Gemfile:',
              code: `source 'https://rubygems.org'

gem 'selenium-webdriver', '~> 4.16'
gem 'rspec', '~> 3.12'
gem 'webdrivers', '~> 5.3'
gem 'rubocop', '~> 1.57'`,
            },
            {
              title: 'Install dependencies:',
              code: 'bundle install',
            },
            {
              title: 'Configure WebDriver in your test:',
              code: `require 'selenium-webdriver'
require 'webdrivers/chromedriver'

# Initialize driver with Chrome
driver = Selenium::WebDriver.for :chrome
wait = Selenium::WebDriver::Wait.new(timeout: 10)`,
            },
            {
              title: 'Create RSpec configuration in spec/spec_helper.rb:',
              code: `require 'selenium-webdriver'
require 'webdrivers'

RSpec.configure do |config|
  config.before(:each) do
    @driver = Selenium::WebDriver.for :chrome
    @wait = Selenium::WebDriver::Wait.new(timeout: 10)
  end

  config.after(:each) do
    @driver.quit
  end
end`,
            },
          ],
        };

      case 'javascript':
        return {
          title: 'JavaScript Setup',
          steps: [
            'Install Node.js 14 or newer',
            {
              title: 'Initialize a new Node.js project:',
              code: 'npm init -y',
            },
            {
              title: 'Install required packages:',
              code: `npm install selenium-webdriver
npm install chromedriver
npm install mocha chai`,
            },
            {
              title: 'Configure WebDriver in your test:',
              code: `const { Builder, By, until } = require('selenium-webdriver');
const driver = await new Builder().forBrowser('chrome').build();`,
            },
          ],
        };

      default:
        return {
          title: 'Select a Language',
          steps: ['Please select a programming language to view setup instructions.'],
        };
    }
  };

  const instructions = getInstructions();

  return (
    <Card className="bg-card/95 backdrop-blur border-border/30">
      <CardHeader className="border-b border-border/30">
        <CardTitle className="text-primary">{instructions.title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          Complete setup guide with dependencies and configuration
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <ScrollArea className="h-[400px] pr-4">
          <ol className="space-y-6 list-decimal list-inside">
            {instructions.steps.map((step, index) => (
              <li key={index} className="space-y-2">
                {typeof step === 'string' ? (
                  <span className="text-foreground/90">{step}</span>
                ) : (
                  <>
                    <span className="text-foreground/90">{step.title}</span>
                    <pre className="bg-muted/80 p-4 rounded-lg text-sm mt-2 overflow-x-auto border border-border/20">
                      <code className="text-foreground/90">{step.code}</code>
                    </pre>
                  </>
                )}
              </li>
            ))}
          </ol>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}