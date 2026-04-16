# E2E Sauce Labs Test Coverage

| Test Name | Purpose | Flow/Action | Expected Result | Test Built | Test Passes | Notes |
|---|---|---|---|---|---|---|
| Login - standard_user | Verifies login success using correct credentials | Login via each user type → tapLogin | User is logged in under expected type; Logged in homepage loads | ✅ | ✅ | |
| Login - fail | Verifies expected error response when login is unsuccessful | - Attempt login without entering username/pw - Logout and attempt to back navigate to login again | Error message is correctly surfaced in UI | ✅ | ✅ | ⚠️ Login timeouts without notification to user. Result of failed page load due to auto-logout is an error message that overflows the allowed space. Suggest allowing error message window size to auto-adjust to returned text. |
| Menu | Verify menu loads on tap | - Verify menu in view on tap - Verify menu collapse on 'X' tap | Menu can be successfully opened and closed without selecting menu options | ✅ | ✅ | |
| | Verify "About" | - Note start page - Tap About - Verify new page loads - Tap back = original page loaded | User is taken to Saucelabs URL | ✅ | ✅ | |
| | Verify "All Items" | - Tap into a specific item page - Tap option | User is returned to home products page | ✅ | ✅ | ⚠️ Home page title = "Products", while corresponding menu option = "All Items". A design change should be made here to avoid user confusion. |
| | Verify "Logout" | Tap option | User is logged out | ✅ | ✅ | |
| Inventory Items | Verify all primary item card actions | - Tap item card - Verify item page loads | | ✅ | ✅ | |
| | | - Add to Cart - Verify item in card + cart icon added/updated - Use menu → reset to clear cart - Refresh page | Items can be added to cart from item inventory page | ✅ | ✅ | ℹ️ Menu → Reset App State is specific to resetting the state of the cart. Recommend updating title for clarity. |
| | Verify all primary item page actions | - Load item detail page - Verify expected item data is present - Add item to cart - Remove item from cart - Cart badge is updated | Items can be viewed, added and removed from cart via item detail page | ✅ | ✅ |data-test IDs for these items relate to the title. Tests will fail if these values ever change |
| Cart | Verify basic actions in Cart | - Add item/s to cart - Go to cart - Remove items from cart | Items can be added to cart, viewed in cart, and removed from cart | ✅ | ✅ | |
| Error Cases | TBA later | | | ❌ | ❌ | ℹ️ Focusing on P1/BAT test coverage only for phase 1 testing |
