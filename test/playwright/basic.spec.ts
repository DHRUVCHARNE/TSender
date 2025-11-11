//test/example.spec.ts
import basicSetup from '../wallet-setup/basic.setup';
import { testWithSynpress } from '@synthetixio/synpress';
import { MetaMask,metaMaskFixtures } from '@synthetixio/synpress/playwright';
//data-testid="rk-wallet-option-metaMask"
const test = testWithSynpress(metaMaskFixtures(basicSetup));
const {expect} = test;

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/TSender/);
});

test("should show the airdrop form if connected, else not", async ({
  page,context,metamaskPage,extensionId
}) =>{
    await page.goto('/');
  await expect(page.getByText('Please connect')).toBeVisible();

  const metamask = new MetaMask(context,metamaskPage,
    basicSetup.walletPassword,extensionId
  );
  await page.getByTestId('rk-connect-button').click();
  await page.getByTestId('rk-wallet-option-metaMask').waitFor({state:'visible',timeout:3000});
  await page.getByTestId('rk-wallet-option-metaMask').click();
  await metamask.connectToDapp();
})