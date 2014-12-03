var jarLocation = process.env.SELENIUM_LOCATION || "C:/Users/jforeman/bin/selenium-server-standalone-2.44.0.jar";
var testEnvironment = process.env.ENV || "test";
console.log(jarLocation);

var webdriver = require('selenium-webdriver'),
	SeleniumServer = require('selenium-webdriver/remote').SeleniumServer,
	assert = require('assert'),
	test = require('selenium-webdriver/testing');

var server = new SeleniumServer(jarLocation, {
	port: 4444
});

server.start();

var driver = new webdriver.Builder()
				.usingServer(server.address())
				.withCapabilities(webdriver.Capabilities.firefox())
				.build();

test.describe('Home Page', function(){
	this.timeout(Infinity);
	driver.get('http://'+testEnvironment+'.bhg.com');

	test.it('Page title is correct', function(){
		var expectation = "Better Homes and Gardens - Home Decorating, Remodeling and Design Ideas, Gardening, Recipes";
		driver.getTitle().then(function(title){
			assert.equal(expectation, title);
		});
	});

	test.it('Main Content Well - Teaser placement below dynamic lead', function(){
		var teaser2Selector = "#monetate_selectorBanner_297a67a0_00 > img";
		driver.findElement(webdriver.By.css(teaser2Selector)).then(function(teaser){
			teaser.getLocation().then(function(location){
				assert(location, "FAILURE: teaser2 not located on screen");
			});
		});
	});

	test.it('Pinterest Module Loaded', function(){
		var selector = "ul.pinterestItems";
		driver.findElement(webdriver.By.css(selector)).then(function(listContainer){
			assert(listContainer, "Pinterest module did not load");
		});
	});

	test.it('Pinterest Module Has exactly 4 pins', function(){
		var selector = "ul.pinterestItems li",
			expectation = 4;
		driver.findElements(webdriver.By.css(selector)).then(function(pins){
			assert(pins, "Could not retrieve pins");
			assert.equal(pins.length, expectation, "Should be "+expectation+" pins, was " + pins.length);
		});
	});

	test.it('Teaser placement in footer', function(){
		var selector = "#_content_campaigns_bhg_footerSub img";
		driver.findElement(webdriver.By.css(selector)).then(function(teaser){
			teaser.getLocation().then(function(location){
				assert(location, "FAILURE: teaser not located in footer");
			});
		});
	});

	test.it('cleans up after itself', function(){
		driver.close();
	});

});
