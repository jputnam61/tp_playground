import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function PageObjectModelSetupPage() {
  return (
    <Tabs defaultValue="setup" className="space-y-8">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="setup">Initial Setup</TabsTrigger>
        <TabsTrigger value="structure">Project Structure</TabsTrigger>
        <TabsTrigger value="examples">Examples</TabsTrigger>
      </TabsList>

      <TabsContent value="setup" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Setting Up Page Object Model</CardTitle>
            <CardDescription>
              Learn how to set up a robust Page Object Model framework
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-6">
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold">1. Project Dependencies</h3>
                  <pre className="bg-muted p-4 rounded-lg text-sm">
{`// package.json
{
  "dependencies": {
    "@playwright/test": "^1.41.0",
    "typescript": "^5.3.3"
  }
}`}
                  </pre>
                </section>

                <section className="space-y-4">
                  <h3 className="text-lg font-semibold">2. TypeScript Configuration</h3>
                  <pre className="bg-muted p-4 rounded-lg text-sm">
{`// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "baseUrl": "./",
    "paths": {
      "@pages/*": ["pages/*"],
      "@components/*": ["components/*"]
    },
    "strict": true
  }
}`}
                  </pre>
                </section>

                <section className="space-y-4">
                  <h3 className="text-lg font-semibold">3. Base Page Setup</h3>
                  <pre className="bg-muted p-4 rounded-lg text-sm">
{`// pages/BasePage.ts
export class BasePage {
  constructor(protected page: Page) {}

  protected async waitForElement(selector: string) {
    await this.page.waitForSelector(selector);
  }

  protected async click(selector: string) {
    await this.waitForElement(selector);
    await this.page.click(selector);
  }

  protected async fill(selector: string, text: string) {
    await this.waitForElement(selector);
    await this.page.fill(selector, text);
  }
}`}
                  </pre>
                </section>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="structure" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Project Structure</CardTitle>
            <CardDescription>
              Recommended folder structure for Page Object Model
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-6">
                <pre className="bg-muted p-4 rounded-lg text-sm">
{`project-root/
├── pages/
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   └── DashboardPage.ts
├── components/
│   ├── Navigation.ts
│   └── Modal.ts
├── tests/
│   └── e2e/
│       ├── auth.spec.ts
│       └── dashboard.spec.ts
├── utils/
│   └── test-helpers.ts
└── playwright.config.ts`}
                </pre>

                <section className="space-y-4">
                  <h3 className="text-lg font-semibold">Component Structure</h3>
                  <pre className="bg-muted p-4 rounded-lg text-sm">
{`// components/Navigation.ts
export class Navigation {
  private selectors = {
    menu: '#main-menu',
    dashboard: '#nav-dashboard',
    profile: '#nav-profile'
  };

  constructor(private page: Page) {}

  async navigateToDashboard() {
    await this.page.click(this.selectors.dashboard);
  }

  async navigateToProfile() {
    await this.page.click(this.selectors.profile);
  }
}`}
                  </pre>
                </section>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="examples" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Implementation Examples</CardTitle>
            <CardDescription>
              Real-world examples of Page Object Model implementation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-6">
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold">Login Page Example</h3>
                  <pre className="bg-muted p-4 rounded-lg text-sm">
{`// pages/LoginPage.ts
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private selectors = {
    username: '#input-username',
    password: '#input-password',
    loginButton: '#button-login',
    errorMessage: '#login-error'
  };

  async login(username: string, password: string) {
    await this.fill(this.selectors.username, username);
    await this.fill(this.selectors.password, password);
    await this.click(this.selectors.loginButton);
  }

  async getErrorMessage() {
    await this.waitForElement(this.selectors.errorMessage);
    return this.page.textContent(this.selectors.errorMessage);
  }
}`}
                  </pre>
                </section>

                <section className="space-y-4">
                  <h3 className="text-lg font-semibold">Test Implementation</h3>
                  <pre className="bg-muted p-4 rounded-lg text-sm">
{`// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';

test.describe('Authentication', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('/login');
  });

  test('should login successfully', async () => {
    await loginPage.login('testuser', 'password');
    await expect(page).toHaveURL('/dashboard');
  });

  test('should show error for invalid credentials', async () => {
    await loginPage.login('invalid', 'wrong');
    const error = await loginPage.getErrorMessage();
    expect(error).toBe('Invalid credentials');
  });
});`}
                  </pre>
                </section>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}