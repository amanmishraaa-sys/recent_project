import { Page, test as base } from "@playwright/test";
import { SearchPage } from "../pages/searchPage";

type Fixtures = {
    agodaPage: SearchPage;
}

export const test = base.extend<Fixtures>({
    agodaPage: async({page}, use) => {
        const searchPage = new SearchPage(page);
        await searchPage.navigateToPage();
        use(searchPage);
    },
});