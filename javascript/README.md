# Install
~~~
npm install  --sav-dev@stryker-mutator/core
npx stryker init
~~~

# Add configurations
In the ```stryker.config.json``` file add ```"json"``` to the reporters list.
~~~
"reporters": [
    "html",
    "clear-text",
    "progress",
    "json"
]
~~~

In the same file add ```"mutate"``` field, according to the directory structure:
~~~
"mutate": [
    "*.js",
    "!*.test.js"
]
~~~

# Add ```"test"``` package
In the ```package.json file``` add to the list:
~~~
"test": "jest"
~~~

# Run
~~~
npm init -y
npm i --save-dev jest
npm test
~~~