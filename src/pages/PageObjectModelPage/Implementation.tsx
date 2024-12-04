import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export function Implementation() {
  return (
    <div className="space-y-6">
      {/* Base Page Object */}
      <Card>
        <CardHeader>
          <CardTitle>Base Page Object</CardTitle>
          <CardDescription>
            Common functionality shared across all page objects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            <pre className="text-sm">
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

  protected async getText(selector: string) {
    await this.waitForElement(selector);
    return this.page.textContent(selector);
  }

  protected async isVisible(selector: string) {
    return this.page.isVisible(selector);
  }
}`}
            </pre>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Login Page Object */}
      <Card>
        <CardHeader>
          <CardTitle>Login Page Object</CardTitle>
          <CardDescription>
            Handles authentication-related interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            <pre className="text-sm">
{`// pages/LoginPage.ts
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Selectors
  private selectors = {
    username: '[data-testid="username-input"]',
    password: '[data-testid="password-input"]',
    loginButton: '[data-testid="login-button"]',
    errorMessage: '[data-testid="error-message"]'
  };

  async login(username: string, password: string) {
    await this.fill(this.selectors.username, username);
    await this.fill(this.selectors.password, password);
    await this.click(this.selectors.loginButton);
  }

  async getErrorMessage() {
    return this.getText(this.selectors.errorMessage);
  }

  async isLoggedIn() {
    return !(await this.isVisible(this.selectors.loginButton));
  }
}`}
            </pre>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Product Management Page Object */}
      <Card>
        <CardHeader>
          <CardTitle>Product Management Page Object</CardTitle>
          <CardDescription>
            Handles product creation and management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            <pre className="text-sm">
{`// pages/ProductManagementPage.ts
import { BasePage } from './BasePage';

interface ProductData {
  name: string;
  quantity: number;
  color: string;
}

export class ProductManagementPage extends BasePage {
  private selectors = {
    nameInput: '[data-testid="product-name-input"]',
    quantityInput: '[data-testid="product-quantity-input"]',
    colorSelect: '[data-testid="product-color-select"]',
    submitButton: '[data-testid="submit-product-button"]'
  };

  async addProduct(product: ProductData) {
    await this.fill(this.selectors.nameInput, product.name);
    await this.fill(
      this.selectors.quantityInput, 
      product.quantity.toString()
    );
    await this.click(this.selectors.colorSelect);
    await this.page.click(\`text=\${product.color}\`);
    await this.click(this.selectors.submitButton);
  }

  async isSubmitEnabled() {
    const button = await this.page.$(this.selectors.submitButton);
    return !(await button?.isDisabled());
  }
}`}
            </pre>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Product List Page Object */}
      <Card>
        <CardHeader>
          <CardTitle>Product List Page Object</CardTitle>
          <CardDescription>
            Handles product listing and searching
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            <pre className="text-sm">
{`// pages/ProductListPage.ts
import { BasePage } from './BasePage';

export class ProductListPage extends BasePage {
  private selectors = {
    searchInput: '[data-testid="product-search-input"]',
    productItem: (index: number) => \`[data-testid="product-item-\${index}"]\`,
    noProducts: 'text="No products found"'
  };

  async searchProducts(term: string) {
    await this.fill(this.selectors.searchInput, term);
  }

  async getProductCount() {
    const items = await this.page.$$('[data-testid^="product-item-"]');
    return items.length;
  }

  async getProductDetails(index: number) {
    const selector = this.selectors.productItem(index);
    const name = await this.getText(\`\${selector} h4\`);
    const quantityText = await this.getText(
      \`\${selector} p\`
    );
    const quantity = parseInt(
      quantityText.match(/\\d+/)?.[0] ?? '0'
    );

    return { name, quantity };
  }

  async hasNoProducts() {
    return this.isVisible(this.selectors.noProducts);
  }
}`}
            </pre>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Example Test */}
      <Card>
        <CardHeader>
          <CardTitle>Example Test Implementation</CardTitle>
          <CardDescription>
            Complete test using the Page Object Model
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            <pre className="text-sm">
{`// tests/product-workflow.spec.ts
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductManagementPage } from '../pages/ProductManagementPage';
import { ProductListPage } from '../pages/ProductListPage';

test.describe('Product Management Workflow', () => {
  let loginPage: LoginPage;
  let productManagement: ProductManagementPage;
  let productList: ProductListPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productManagement = new ProductManagementPage(page);
    productList = new ProductListPage(page);

    // Login before each test
    await loginPage.login('admin', 'password');
    await expect(loginPage.isLoggedIn()).toBeTruthy();
  });

  test('should add and find product', async () => {
    // Add new product
    const product = {
      name: 'Test Product',
      quantity: 5,
      color: 'blue'
    };
    await productManagement.addProduct(product);

    // Search for the product
    await productList.searchProducts(product.name);
    
    // Verify product details
    const count = await productList.getProductCount();
    expect(count).toBe(1);

    const details = await productList.getProductDetails(0);
    expect(details.name).toBe(product.name);
    expect(details.quantity).toBe(product.quantity);
  });

  test('should handle no results', async () => {
    await productList.searchProducts('nonexistent');
    expect(await productList.hasNoProducts()).toBeTruthy();
  });
});`}
            </pre>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}