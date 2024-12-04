import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CodeExampleProps {
  language: string;
}

export function CodeExample({ language }: CodeExampleProps) {
  const getExample = () => {
    switch (language) {
      case 'java':
        return {
          title: 'Example Test',
          code: `import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class GoogleSearchTest {
    private WebDriver driver;
    private WebDriverWait wait;

    @Before
    public void setUp() {
        // Initialize ChromeDriver
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        
        // Maximize window
        driver.manage().window().maximize();
    }

    @Test
    public void testGoogleSearch() {
        try {
            // Navigate to Google
            driver.get("https://www.google.com");

            // Find and interact with search box
            WebElement searchBox = wait.until(ExpectedConditions
                .elementToBeClickable(By.name("q")));
            searchBox.sendKeys("Selenium WebDriver");
            searchBox.submit();

            // Verify search results appear
            wait.until(ExpectedConditions
                .presenceOfElementLocated(By.id("search")));
            
            // Verify title contains search term
            assert driver.getTitle().contains("Selenium WebDriver");
            
        } catch (Exception e) {
            System.err.println("Test failed: " + e.getMessage());
            throw e;
        }
    }

    @After
    public void tearDown() {
        // Clean up
        if (driver != null) {
            driver.quit();
        }
    }
}`
        };

      case 'python':
        return {
          title: 'Example Test',
          code: `from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import unittest

class GoogleSearchTest(unittest.TestCase):
    def setUp(self):
        # Initialize ChromeDriver with WebDriver Manager
        service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=service)
        self.wait = WebDriverWait(self.driver, 10)
        
        # Maximize window
        self.driver.maximize_window()

    def test_google_search(self):
        try:
            # Navigate to Google
            self.driver.get("https://www.google.com")

            # Find and interact with search box
            search_box = self.wait.until(
                EC.element_to_be_clickable((By.NAME, "q"))
            )
            search_box.send_keys("Selenium WebDriver")
            search_box.submit()

            # Verify search results appear
            self.wait.until(
                EC.presence_of_element_located((By.ID, "search"))
            )

            # Verify title contains search term
            self.assertIn("Selenium WebDriver", self.driver.title)

        except Exception as e:
            print(f"Test failed: {str(e)}")
            raise

    def tearDown(self):
        # Clean up
        if self.driver:
            self.driver.quit()

if __name__ == "__main__":
    unittest.main()`
        };

      case 'csharp':
        return {
          title: 'Example Test',
          code: `using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using WebDriverManager;
using WebDriverManager.DriverConfigs.Impl;
using SeleniumExtras.WaitHelpers;

namespace SeleniumTests;

public class GoogleSearchTests
{
    private IWebDriver _driver;
    private WebDriverWait _wait;

    [SetUp]
    public void Setup()
    {
        // Setup ChromeDriver using WebDriverManager
        new DriverManager().SetUpDriver(new ChromeConfig());
        _driver = new ChromeDriver();
        _wait = new WebDriverWait(_driver, TimeSpan.FromSeconds(10));

        // Maximize window
        _driver.Manage().Window.Maximize();
    }

    [Test]
    public void GoogleSearch_WhenSearchingForSelenium_ShouldDisplayResults()
    {
        try
        {
            // Navigate to Google
            _driver.Navigate().GoToUrl("https://www.google.com");

            // Find and interact with search box
            var searchBox = _wait.Until(
                ExpectedConditions.ElementToBeClickable(By.Name("q"))
            );
            searchBox.SendKeys("Selenium WebDriver");
            searchBox.Submit();

            // Wait for and verify search results
            _wait.Until(
                ExpectedConditions.ElementIsVisible(By.Id("search"))
            );

            // Verify title contains search term
            Assert.That(_driver.Title, Does.Contain("Selenium WebDriver"));
        }
        catch (Exception ex)
        {
            TestContext.WriteLine($"Test failed: {ex.Message}");
            throw;
        }
    }

    [TearDown]
    public void Cleanup()
    {
        _driver?.Quit();
    }
}`
        };

      case 'ruby':
        return {
          title: 'Example Test',
          code: `require 'spec_helper'

RSpec.describe 'Google Search' do
  let(:driver) { @driver }
  let(:wait) { @wait }

  it 'should display search results for Selenium WebDriver' do
    begin
      # Navigate to Google
      driver.get 'https://www.google.com'

      # Find and interact with search box
      search_box = wait.until {
        driver.find_element(name: 'q')
      }
      search_box.send_keys('Selenium WebDriver')
      search_box.submit

      # Wait for and verify search results
      wait.until {
        driver.find_element(id: 'search').displayed?
      }

      # Verify title contains search term
      expect(driver.title).to include('Selenium WebDriver')

    rescue StandardError => e
      puts "Test failed: #{e.message}"
      raise
    end
  end
end`
        };

      case 'javascript':
        return {
          title: 'Example Test',
          code: `const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

async function googleSearchTest() {
    // Initialize driver
    const driver = await new Builder().forBrowser('chrome').build();
    
    try {
        // Set implicit wait and maximize window
        await driver.manage().setTimeouts({ implicit: 10000 });
        await driver.manage().window().maximize();

        // Navigate to Google
        await driver.get('https://www.google.com');

        // Find and interact with search box
        const searchBox = await driver.findElement(By.name('q'));
        await searchBox.sendKeys('Selenium WebDriver');
        await searchBox.submit();

        // Wait for and verify search results
        await driver.wait(until.elementLocated(By.id('search')), 10000);
        
        // Verify title contains search term
        const title = await driver.getTitle();
        assert(title.includes('Selenium WebDriver'), 
            'Title should contain search term');

    } catch (error) {
        console.error('Test failed:', error);
        throw error;
    } finally {
        // Clean up
        await driver.quit();
    }
}

// Run the test
googleSearchTest().catch(console.error);`
        };

      default:
        return {
          title: 'Select a Language',
          code: 'Please select a programming language to view example code.',
        };
    }
  };

  const example = getExample();

  return (
    <Card className="mt-8 bg-card/95 backdrop-blur border-border/30">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4 text-primary">{example.title}</h3>
        <ScrollArea className="h-[600px] w-full rounded-md border border-border/30">
          <pre className="p-4 text-sm bg-muted/80">
            <code className="text-foreground/90">{example.code}</code>
          </pre>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}