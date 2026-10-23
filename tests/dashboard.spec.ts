import { test, expect } from '../src/fixtures/base';
import { OrangeHrmLoginPage } from '../src/pages/OrangeHrmLoginPage';
import dashboardData from './data/dashboard.json';

test.describe('OrangeHRM dashboard', () => {
  test('Admin sees the dashboard and left navigation entries @smoke @critical', async ({ page }) => {
    const loginPage = new OrangeHrmLoginPage(page);

    const dashboardPage = await test.step('Log in as the OrangeHRM administrator', async () => {
      await loginPage.goto();
      return loginPage.login(
        dashboardData.credentials.username,
        dashboardData.credentials.password,
      );
    });

    await test.step('Verify the dashboard heading and left navigation', async () => {
      const actualUrl = page.url();
      console.log(`Expected URL: ${dashboardData.expected.url}; Actual URL: ${actualUrl}`);
      await expect(page).toHaveURL(dashboardData.expected.url);

      const actualHeading = await dashboardPage.dashboardHeading.textContent();
      console.log(`Expected heading: ${dashboardData.expected.heading}; Actual heading: ${actualHeading}`);
      await expect(dashboardPage.dashboardHeading).toHaveText(dashboardData.expected.heading);

      const leftPanelLocators = [dashboardPage.adminNavigation, dashboardPage.leaveNavigation];
      for (const [index, navigationLocator] of leftPanelLocators.entries()) {
        const expectedLink = dashboardData.expected.leftPanelLinks[index];
        const actualLink = await navigationLocator.textContent();
        console.log(`Expected left-panel link: ${expectedLink}; Actual link: ${actualLink}`);
        await expect(navigationLocator).toHaveText(expectedLink);
      }
    });
  });
});