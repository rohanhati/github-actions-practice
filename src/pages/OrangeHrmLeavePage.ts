import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrangeHrmLeavePage extends BasePage {
  readonly leaveHeading: Locator;
  readonly leaveListSection: Locator;
  readonly employeeNameSection: Locator;
  readonly fromDateSection: Locator;
  readonly toDateSection: Locator;
  readonly leaveStatusSection: Locator;
  readonly leaveTypeSection: Locator;
  readonly subUnitSection: Locator;

  constructor(page: Page) {
    super(page);
    this.leaveHeading = this.page.getByRole('heading', { name: 'Leave', exact: true });
    this.leaveListSection = this.page.getByRole('heading', { name: 'Leave List', exact: true });
    this.employeeNameSection = this.page.getByText('Employee Name', { exact: true });
    this.fromDateSection = this.page.getByText('From Date', { exact: true });
    this.toDateSection = this.page.getByText('To Date', { exact: true });
    this.leaveStatusSection = this.page.getByText('Show Leave with Status', { exact: true });
    this.leaveTypeSection = this.page.getByText('Leave Type', { exact: true });
    this.subUnitSection = this.page.getByText('Sub Unit', { exact: true });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList');
    await this.waitForReady();
  }
}