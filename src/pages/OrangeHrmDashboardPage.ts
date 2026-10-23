import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { OrangeHrmLeavePage } from './OrangeHrmLeavePage';

export class OrangeHrmDashboardPage extends BasePage {
  readonly dashboardHeading: Locator;
  readonly adminNavigation: Locator;
  readonly leaveNavigation: Locator;

  constructor(page: Page) {
    super(page);
    this.dashboardHeading = this.page.getByRole('heading', { name: 'Dashboard', exact: true });
    this.adminNavigation = this.page.getByRole('link', { name: 'Admin', exact: true });
    this.leaveNavigation = this.page.getByRole('link', { name: 'Leave', exact: true });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    await this.waitForReady();
  }

  async openLeave(): Promise<OrangeHrmLeavePage> {
    await this.leaveNavigation.click();
    await this.page.waitForURL('**/leave/viewLeaveList');

    return new OrangeHrmLeavePage(this.page);
  }
}