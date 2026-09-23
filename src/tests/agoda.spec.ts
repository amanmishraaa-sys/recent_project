import { test } from "../fixtures/fixtures";

test.describe(`Search available flights for today and tomorrow`, () => {
  test(`Search available flights for today`, async ({ agodaPage }) => {
    await agodaPage.selectOneWay();
    await agodaPage.uncheckSearchForHotelCheckBox();
    await agodaPage.fillLocationForFlyingFromField();
    await agodaPage.fillLocationForFlyingToField();
    await agodaPage.selectDepartureDate("today");
    await agodaPage.clickSearchButton();
    await agodaPage.waitForPageLoad();
  });

  test(`Search available flights for tomorrow`, async ({ agodaPage }) => {
    await agodaPage.selectOneWay();
    await agodaPage.uncheckSearchForHotelCheckBox();
    await agodaPage.fillLocationForFlyingFromField();
    await agodaPage.fillLocationForFlyingToField();
    await agodaPage.selectDepartureDate("tomorrow");
    await agodaPage.clickSearchButton();
    await agodaPage.waitForPageLoad();
  });

  test(`Verify that error message is displayed on clicking search button without filling any mandatory fields`, async ({
    agodaPage,
  }) => {
    await agodaPage.clickSearchButton();
    await agodaPage.verifyErrorMessage();
    await agodaPage.waitForPageLoad();
  });
});
