import { Page, Locator, test, expect } from "@playwright/test";

export class SearchPage {
  readonly url: string;
  readonly flightHotel: Locator;
  readonly locationSelection: (fieldName: string) => Locator;
  readonly delhiAsSuggestion: Locator;
  readonly mumbaiAsSuggestion: Locator;
  readonly roundTrip: Locator;
  readonly oneWaySelect: Locator;
  readonly firstSelection: Locator;
  readonly secondSelection: Locator;
  readonly selectDate: (dateText: string) => Locator;
  readonly searchForHotelCheckbox: Locator;
  readonly searchButton: Locator;
  readonly errorMessage: Locator;

  constructor(readonly page: Page) {
    this.url = "https://www.agoda.com";
    this.flightHotel = page.locator('[data-selenium="header-packages"] a');
    this.locationSelection = (fieldName: string) =>
      page.getByRole("combobox", { name: fieldName });
    this.delhiAsSuggestion = page.locator("p").filter({ hasText: "DEL" });
    this.mumbaiAsSuggestion = page.locator("p").getByText("BOM");
    this.roundTrip = page.getByRole("button", { name: "Round-trip" });
    this.oneWaySelect = page
      .locator('[class="Popup__content"] div span')
      .getByText("One-way");
    this.firstSelection = page
      .locator("li div p span")
      .getByText("Indira Gandhi International Airport");
    this.secondSelection = page
      .locator("li div p span")
      .getByText("Chhatrapati Shivaji Maharaj International Airport");
    this.selectDate = (dateText: string) =>
      page.getByRole("button", { name: dateText });
    this.searchForHotelCheckbox = page
      .locator("label")
      .filter({ hasText: "Search for hotel in different cities or dates" })
      .locator("span span");
    this.searchButton = page.getByRole("button", {
      name: "SEARCH FLIGHT + HOTEL",
    });
    this.errorMessage = page
      .locator('[class="ModalMessage ModalMessage--center"]')
      .getByText(
        "Please enter the name of a country, city, airport, neighborhood, landmark, or property to proceed.",
      );
  }

  async navigateToPage() {
    await this.page.goto(this.url);
    await this.clickOnFlightHotel();
    await this.page.waitForLoadState("networkidle");
  }

  async clickOnFlightHotel() {
    await this.flightHotel.click();
  }

  async uncheckSearchForHotelCheckBox() {
    if (await this.searchForHotelCheckbox.isChecked()) {
      await this.searchForHotelCheckbox.uncheck();
    }
  }

  async selectOneWay() {
    await this.roundTrip.click();
    await this.oneWaySelect.click();
  }

  async fillLocationForFlyingFromField() {
    await this.handleAutoSuggestionBox(
      this.locationSelection("Flying from"),
      "New Delhi (DEL)",
      this.firstSelection,
    );
  }

  async fillLocationForFlyingToField() {
    await this.handleAutoSuggestionBox(
      this.locationSelection("Flying to"),
      "Mumbai (BOM)",
      this.secondSelection,
    );
  }

  async clickSearchButton() {
    await this.searchButton.click();
  }

  getTodaysDate(): string {
    const date: Date = new Date();
    return date.toDateString();
  }

  getTomorrowsDate(): string {
    const tomorrow: Date = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toDateString();
  }

  async selectDepartureDate(day: string) {
    const dateText: string =
      day.toLowerCase() == "today"
        ? this.getTodaysDate()
        : this.getTomorrowsDate();
    await this.selectDate(dateText).click();
  }

  async handleAutoSuggestionBox(
    inputFieldLocator: Locator,
    searchText: string,
    sugesstionDropdownlocator: Locator,
  ) {
    await inputFieldLocator.fill(searchText);
    await expect(sugesstionDropdownlocator).toBeVisible();
    await sugesstionDropdownlocator.click();
    await expect(inputFieldLocator).toHaveValue(searchText);
  }

  async verifyErrorMessage() {
    await expect(this.errorMessage).toBeVisible();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
  }
}
