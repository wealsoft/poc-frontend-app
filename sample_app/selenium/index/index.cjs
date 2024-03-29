const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome.js');
const chromedriver = new chrome.ServiceBuilder("/usr/local/bin/chromedriver");

const options = new chrome.Options();
options.setChromeBinaryPath("/usr/bin/google-chrome-stable"); // Google Chrome のパスを指定
options.addArguments("--headless"); // ヘッドレスモードを有効にする
options.addArguments("--disable-dev-shm-usage");
options.addArguments("--no-sandbox");
options.addArguments("--remote-debugging-port=9222");

const driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(options)
  .setChromeService(chromedriver)
  .build();

// テストコードを書く

async function runTest(){
  try {
    // 指定されたURLに移動
    await driver.get("http://localhost:3000/");

    // リンク先の要素を検索し、クリックして移動
    const linkElement = await driver.wait(
      until.elementLocated(By.linkText("Next.js!")),
      10000
    ); // 10秒間待機する
    await linkElement.click();

    // 現在のURLを取得し、レスポンスを確認
    const currentUrl = await driver.getCurrentUrl();
    // 結果を出力
    console.log(`Current URL: ${currentUrl}`);

    // seleniumにレスポンス取得メソッドがないため、無理やりJSのメソッドを使う
    const httpStatusCode = await driver.executeScript(`
    return fetch(window.location.href, { method: 'HEAD' })
      .then(response => response.status);
    `);

    console.log(`HTTP Status Code: ${httpStatusCode}`);

    // リンク先のページがアクティブであることを確認
    if (currentUrl === "https://nextjs.org/") {
      console.log("Link is active.");
    } else {
      console.log("Link is not active.");
    }

    // HTTPレスポンスが200であることを確認
    if (httpStatusCode === 200) {
      console.log("HTTP response status is 200.");
    } else {
      console.log(`HTTP response status is ${httpStatusCode}.`);
    }
  } catch (err) {
    console.error("An error occurred:", err);
  } finally {
    try {
      await driver.quit();
    } catch (err) {
      console.error('An error occurred while quitting the driver:', err);
    }
  }
}

module.exports = runTest;