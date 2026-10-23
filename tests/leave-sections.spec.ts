import { test, expect } from '../src/fixtures/base';
import { OrangeHrmLoginPage } from '../src/pages/OrangeHrmLoginPage';
import leaveSectionData from './data/leave-section.json';

test.describe('OrangeHRM Leave sections', () => {
  test('Admin can view all Leave List sections @smoke @critical', async ({ page }) => {
    const loginPage = new OrangeHrmLoginPage(page);

    const dashboardPage = await test.step('Log in as the OrangeHRM administrator', async () => {
      await loginPage.goto();
      return loginPage.login(
        leaveSectionData.credentials.username,
        leaveSectionData.credentials.password,
      );
    });

    const leavePage = await test.step('Navigate to Leave', async () => dashboardPage.openLeave());

    await test.step('Verify the Leave heading and seven sections', async () => {
      const actualUrl = page.url();
      console.log(`Expected URL: ${leaveSectionData.expected.url}; Actual URL: ${actualUrl}`);
      await expect(page).toHaveURL(leaveSectionData.expected.url);

      const actualHeading = await leavePage.leaveHeading.textContent();
      console.log(`Expected heading: ${leaveSectionData.expected.heading}; Actual heading: ${actualHeading}`);
      await expect(leavePage.leaveHeading).toHaveText(leaveSectionData.expected.heading);

      const sectionLocators = [
        leavePage.leaveListSection,
        leavePage.employeeNameSection.first(),
        leavePage.fromDateSection,
        leavePage.toDateSection,
        leavePage.leaveStatusSection,
        leavePage.leaveTypeSection.first(),
        leavePage.subUnitSection,
      ];

      for (const [index, sectionLocator] of sectionLocators.entries()) {
        const expectedSection = leaveSectionData.expected.sections[index];
        const actualSection = await sectionLocator.textContent();
        console.log(`Expected section: ${expectedSection}; Actual section: ${actualSection}`);
        await expect(sectionLocator).toHaveText(expectedSection);
      }
    });
  });
});