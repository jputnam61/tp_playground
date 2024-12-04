import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';

export function PageObjectModelSection() {
  return (
    <Card>
      <CardContent className="pt-6">
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-8">
            {/* Introduction */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Page Object Model Framework</h3>
              <p className="text-muted-foreground">
                The Page Object Model (POM) is a design pattern that creates an object repository 
                for storing web elements. It helps reduce code duplication and improves test case maintenance.
              </p>
            </section>

            {/* Core Concepts */}
            <section className="space-y-4">
              <h4 className="font-semibold">Core Concepts</h4>
              <div className="space-y-2">
                <p className="text-sm">1. Each page in your application has a corresponding class</p>
                <p className="text-sm">2. Web elements are defined as properties</p>
                <p className="text-sm">3. Page interactions are defined as methods</p>
                <p className="text-sm">4. Tests interact with pages through their public interface</p>
              </div>
            </section>

            {/* Basic Structure */}
            <section className="space-y-4">
              <h4 className="font-semibold">Basic Structure</h4>
              <pre className="bg-muted p-4 rounded-lg text-sm">
{`// pages/LoginPage.ts
export class LoginPage {
  // Selectors
  private selectors = {
    username: '[data-testid="username-input"]',
    password: '[data-testid="password-input"]',
    loginButton: '[data-testid="login-button"]',
    errorMessage: '[data-testid="error-message"]'
  };

  constructor(private page: Page) {}

  // Actions
  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  // Element interactions
  private async enterUsername(username: string) {
    await this.page.fill(this.selectors.username, username);
  }

  private async enterPassword(password: string) {
    await this.page.fill(this.selectors.password, password);
  }

  private async clickLogin() {
    await this.page.click(this.selectors.loginButton);
  }

  // Assertions
  async getErrorMessage() {
    return this.page.textContent(this.selectors.errorMessage);
  }
}`}</pre>
            </section>

            {/* Best Practices */}
            <section className="space-y-4">
              <h4 className="font-semibold">Best Practices</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">1. Encapsulation</h5>
                  <pre className="bg-muted p-4 rounded-lg text-sm">
{`// ❌ Bad Practice
class LoginPage {
  public usernameInput = '[data-testid="username-input"]';
  
  async login(username: string) {
    // Direct element access from test
    await page.fill(this.usernameInput, username);
  }
}

// ✅ Good Practice
class LoginPage {
  private selectors = {
    username: '[data-testid="username-input"]'
  };
  
  async enterUsername(username: string) {
    await this.page.fill(this.selectors.username, username);
  }
}`}</pre>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium">2. Action Composition</h5>
                  <pre className="bg-muted p-4 rounded-lg text-sm">
{`// ❌ Bad Practice
test('user login', async () => {
  await loginPage.enterUsername('user');
  await loginPage.enterPassword('pass');
  await loginPage.clickLogin();
});

// ✅ Good Practice
test('user login', async () => {
  await loginPage.login('user', 'pass');
});`}</pre>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium">3. Reusable Components</h5>
                  <pre className="bg-muted p-4 rounded-lg text-sm">
{`// components/NavigationBar.ts
export class NavigationBar {
  private selectors = {
    home: '[data-testid="nav-home"]',
    profile: '[data-testid="nav-profile"]'
  };

  constructor(private page: Page) {}

  async navigateToHome() {
    await this.page.click(this.selectors.home);
  }

  async navigateToProfile() {
    await this.page.click(this.selectors.profile);
  }
}

// pages/HomePage.ts
export class HomePage {
  readonly navigation: NavigationBar;

  constructor(page: Page) {
    this.navigation = new NavigationBar(page);
  }
}`}</pre>
                </div>
              </div>
            </section>

            {/* Complete Example */}
            <section className="space-y-4">
              <h4 className="font-semibold">Complete Example</h4>
              <pre className="bg-muted p-4 rounded-lg text-sm">
{`// tests/e2e/user-workflow.spec.ts
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ProfilePage } from '../pages/ProfilePage';

test.describe('User Workflow', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let profilePage: ProfilePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    profilePage = new ProfilePage(page);
  });

  test('should complete end-to-end workflow', async () => {
    // Login
    await loginPage.navigate();
    await loginPage.login('testuser', 'password');
    await homePage.waitForLoad();

    // Update profile
    await homePage.navigation.navigateToProfile();
    await profilePage.waitForLoad();
    await profilePage.updateProfile({
      name: 'Test User',
      email: 'test@example.com'
    });

    // Verify updates
    const profile = await profilePage.getProfileInfo();
    expect(profile.name).toBe('Test User');
    expect(profile.email).toBe('test@example.com');
  });
});`}</pre>
            </section>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}