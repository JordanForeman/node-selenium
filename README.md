# node-selenium

A node.js implementation of the Selenium WebDriver specific to BHG

## Prerequisites

- Be sure to get set up with both [ChromeDriver]() and the [stand-alone Selenium server]()
- `npm install`
- update `index.js:1` with the location of your Selenium Server (.jar) file 

## Running tests

### Simple Test

```
mocha index.js
```

or

```
npm test
```

### Test with Environment (dev/test/www)

```
ENV='dev' mocha index.js
```

or

```
ENV='www' npm test
```


### Test with custom selenium-server.jar

```
SELENIUM_LOCATION='path/to/selenium.jar' mocha index.js
```

or

```
SELENIUM_LOCATION='path/to/selenium.jar' npm test
```