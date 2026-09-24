import { test } from "../fixtures/fixtures";

/*
  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<IMPORTANT NOTE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  Verification steps in the below mentioned TCs has not been added because I am not getting any result for the selected route with today/tomorrow's date.
  Please check the precvious reports in Github actions section on git.
*/
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
