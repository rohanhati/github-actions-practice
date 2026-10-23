import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { OrangeHrmDashboardPage } from './OrangeHrmDashboardPage';

export class OrangeHrmLoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = this.page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await this.waitForReady();
  }

  async login(username: string, password: string): Promise<OrangeHrmDashboardPage> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL('**/dashboard/index');

    return new OrangeHrmDashboardPage(this.page);
  }
}